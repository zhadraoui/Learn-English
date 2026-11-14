import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import { GoogleGenAI } from '@google/genai';
import express from 'express';
import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { promises as fs } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  VIDEO_DURATION_SEC,
  VoiceId,
  normalizeSingleLetter,
} from './app/core/alphabet-data';
import { normalizeSpeakText } from './app/core/phonics-courses';
import {
  encodeWavBuffer,
  fitNarrationToDuration,
  mixPcmBuffers,
  parseWavBuffer,
  synthesizeLullabyPcm,
} from './server/wav-utils';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(express.json({ limit: '48mb' }));

interface CachedVoiceEntry {
  voiceSamples: Int16Array;
  sampleRate: number;
  voiceWavBase64: string;
  onsetsSec: number[];
  source: 'gemini-tts';
}

const voiceCache = new Map<VoiceId, CachedVoiceEntry>();
const singleLetterCache = new Map<string, string>();
const phonicsAudioCache = new Map<string, string>();
let cachedLullabyPcm: Int16Array | null = null;
let cachedLullabyBase64: string | null = null;

function getLullabyData(): { pcm: Int16Array; base64: string } {
  if (!cachedLullabyPcm || !cachedLullabyBase64) {
    cachedLullabyPcm = synthesizeLullabyPcm(VIDEO_DURATION_SEC, 24000);
    cachedLullabyBase64 = encodeWavBuffer(cachedLullabyPcm, 24000).toString('base64');
  }
  return { pcm: cachedLullabyPcm, base64: cachedLullabyBase64 };
}

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env['GEMINI_API_KEY'];
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    apiVersion: 'v1beta',
    httpOptions: {
      apiVersion: 'v1beta',
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function normalizeVoiceId(input: unknown): VoiceId {
  if (input === 'Zephyr' || input === 'Puck' || input === 'Kore') {
    return input;
  }
  return 'Kore';
}

function extractFriendlyError(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err);
  try {
    const parsed = JSON.parse(raw) as { error?: { message?: string; status?: string } };
    if (parsed?.error?.message) {
      return parsed.error.message.split('\n')[0].slice(0, 140);
    }
  } catch {
    // Not raw JSON
  }
  return raw.split('\n')[0].slice(0, 140);
}

function rawAudioToSamples(rawBuf: Buffer): { samples: Int16Array; sampleRate: number } {
  if (rawBuf.length >= 12 && rawBuf.toString('ascii', 0, 4) === 'RIFF') {
    const parsed = parseWavBuffer(rawBuf);
    return { samples: parsed.samples, sampleRate: parsed.sampleRate };
  }
  const count = Math.floor(rawBuf.length / 2);
  const samples = new Int16Array(count);
  for (let i = 0; i < count; i++) {
    samples[i] = rawBuf.readInt16LE(i * 2);
  }
  return { samples, sampleRate: 24000 };
}

async function callGeminiTts(
  voice: VoiceId,
  text: string,
  style: string,
): Promise<{ samples: Int16Array; sampleRate: number }> {
  const ai = getGeminiClient();
  if (!ai) {
    throw new Error('Clé GEMINI_API_KEY non configurée sur le serveur.');
  }

  let base64Audio: string | undefined;
  let lastErr: unknown;

  try {
    const interaction = await ai.interactions.create({
      model: 'gemini-3.8-flash-lite-tts',
      input: [
        {
          type: 'text',
          text,
          annotations: [
            {
              type: 'speech_metadata',
              style,
            },
          ],
        },
      ],
      response_format: { type: 'audio' },
      generation_config: {
        speech_config: [
          {
            language: 'en-US',
            voice,
          },
        ],
      },
    });
    base64Audio = interaction.output_audio?.data;
  } catch (err1) {
    lastErr = err1;
    const candidateModels = [
      'gemini-3.8-flash-lite-tts',
      'gemini-3.8-flash-tts',
      'gemini-2.5-flash-preview-tts',
    ];
    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `Speak gently, warmly, calmly, and clearly in English for a child: ${text}`,
                },
              ],
            },
          ],
          config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: voice },
              },
            },
          },
        });
        const audioData =
          response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (audioData) {
          base64Audio = audioData;
          break;
        }
      } catch (err2) {
        lastErr = err2;
        const errMsg = err2 instanceof Error ? err2.message : String(err2);
        if (errMsg.includes('speechConfig')) {
          try {
            const plainResponse = await ai.models.generateContent({
              model,
              contents: `Speak gently, warmly, calmly, and clearly in English for a child: ${text}`,
              config: {
                responseModalities: ['AUDIO'],
              },
            });
            const audioData =
              plainResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
            if (audioData) {
              base64Audio = audioData;
              break;
            }
          } catch (err3) {
            lastErr = err3;
          }
        }
      }
    }
  }

  if (!base64Audio) {
    throw lastErr instanceof Error
      ? lastErr
      : new Error('Aucune donnée audio retournée par Gemini TTS.');
  }

  return rawAudioToSamples(Buffer.from(base64Audio, 'base64'));
}

async function generateOrFetchVoice(voice: VoiceId): Promise<CachedVoiceEntry> {
  const existing = voiceCache.get(voice);
  if (existing) {
    return existing;
  }

  const alphabetPrompt =
    'A... B... C... D... E... F... G... H... I... J... K... L... M... N... O... P... Q... R... S... T... U... V... W... X... Y... Z.';
  const { samples, sampleRate } = await callGeminiTts(
    voice,
    alphabetPrompt,
    "Warm, gentle, soothing, calm children's storybook narrator speaking the English alphabet slowly and clearly with peaceful pauses between each letter.",
  );

  const { fittedSamples, onsetsSec } = fitNarrationToDuration(
    samples,
    sampleRate,
    VIDEO_DURATION_SEC,
    1.0,
    1.5,
  );
  const fittedWav = encodeWavBuffer(fittedSamples, sampleRate);

  const entry: CachedVoiceEntry = {
    voiceSamples: fittedSamples,
    sampleRate,
    voiceWavBase64: fittedWav.toString('base64'),
    onsetsSec,
    source: 'gemini-tts',
  };
  voiceCache.set(voice, entry);
  return entry;
}

/**
 * Generate or return cached soothing 30-second English Alphabet TTS audio + gentle lullaby bed.
 */
app.post('/api/alphabet/audio', async (req, res) => {
  const voice = normalizeVoiceId(req.body?.voice);
  const lullaby = getLullabyData();

  try {
    const entry = await generateOrFetchVoice(voice);
    res.json({
      voice,
      source: entry.source,
      voiceWavBase64: entry.voiceWavBase64,
      lullabyWavBase64: lullaby.base64,
      onsetsSec: entry.onsetsSec,
      durationSec: VIDEO_DURATION_SEC,
    });
  } catch (err) {
    const message = extractFriendlyError(err);
    res.json({
      voice,
      source: 'fallback',
      voiceWavBase64: null,
      lullabyWavBase64: lullaby.base64,
      onsetsSec: [],
      durationSec: VIDEO_DURATION_SEC,
      error: message,
    });
  }
});

/**
 * Pronounce a single English alphabet letter gently and clearly with Gemini TTS.
 */
app.post('/api/alphabet/letter-audio', async (req, res) => {
  const letter = normalizeSingleLetter(req.body?.letter);
  if (!letter) {
    res.status(400).json({ error: 'Lettre invalide (A-Z attendu).' });
    return;
  }

  const voice = normalizeVoiceId(req.body?.voice);
  const cacheKey = `${voice}:${letter}`;
  const cached = singleLetterCache.get(cacheKey);
  if (cached) {
    res.json({
      letter,
      voice,
      source: 'gemini-tts',
      wavBase64: cached,
    });
    return;
  }

  try {
    const { samples, sampleRate } = await callGeminiTts(
      voice,
      `The letter ${letter}.`,
      "Warm, gentle, calm children's storybook narrator pronouncing only this single English letter clearly and softly.",
    );
    const wavBase64 = encodeWavBuffer(samples, sampleRate).toString('base64');
    singleLetterCache.set(cacheKey, wavBase64);
    res.json({
      letter,
      voice,
      source: 'gemini-tts',
      wavBase64,
    });
  } catch (err) {
    const message = extractFriendlyError(err);
    res.json({
      letter,
      voice,
      source: 'fallback',
      wavBase64: null,
      error: message,
    });
  }
});

/**
 * Pronounce an English phonics rule, example word, or exception word gently with Gemini TTS.
 */
app.post('/api/phonics/speak', async (req, res) => {
  const text = normalizeSpeakText(req.body?.text);
  if (!text) {
    res.status(400).json({ error: 'Texte anglais invalide pour la prononciation.' });
    return;
  }

  const voice = normalizeVoiceId(req.body?.voice);
  const kind =
    req.body?.kind === 'rule' || req.body?.kind === 'exception' ? req.body.kind : 'word';
  const cacheKey = `${voice}:${kind}:${text.toLowerCase()}`;
  const cached = phonicsAudioCache.get(cacheKey);
  if (cached) {
    res.json({
      text,
      voice,
      kind,
      source: 'gemini-tts',
      wavBase64: cached,
    });
    return;
  }

  try {
    const style =
      kind === 'rule'
        ? 'Warm, gentle, patient English phonics teacher explaining a pronunciation rule clearly and slowly.'
        : 'Warm, gentle, calm English pronunciation teacher speaking a single English word or short phrase slowly and clearly.';
    const promptText = kind === 'rule' ? text : `${text}.`;
    const { samples, sampleRate } = await callGeminiTts(voice, promptText, style);
    const wavBase64 = encodeWavBuffer(samples, sampleRate).toString('base64');
    if (phonicsAudioCache.size >= 400) {
      const oldestKey = phonicsAudioCache.keys().next().value;
      if (oldestKey) {
        phonicsAudioCache.delete(oldestKey);
      }
    }
    phonicsAudioCache.set(cacheKey, wavBase64);
    res.json({
      text,
      voice,
      kind,
      source: 'gemini-tts',
      wavBase64,
    });
  } catch (err) {
    const message = extractFriendlyError(err);
    res.json({
      text,
      voice,
      kind,
      source: 'fallback',
      wavBase64: null,
      error: message,
    });
  }
});

/**
 * Compile client-rendered 1280x720 JPEG frames + mixed 30s WAV audio into a real MP4 (H.264/AAC).
 */
app.post('/api/alphabet/export-mp4', async (req, res) => {
  const frames = req.body?.frames;
  const fps = Math.max(4, Math.min(30, Number(req.body?.fps) || 10));
  const voice = normalizeVoiceId(req.body?.voice);
  const includeMusic = req.body?.includeMusic !== false;
  const musicVolume = Math.max(0, Math.min(1, Number(req.body?.musicVolume ?? 0.22)));

  if (!Array.isArray(frames) || frames.length < 10) {
    res.status(400).json({ error: 'Invalid or insufficient video frames provided.' });
    return;
  }

  const jobId = randomUUID();
  const wavPath = join(tmpdir(), `alphabet-audio-${jobId}.wav`);
  const mp4Path = join(tmpdir(), `alphabet-video-${jobId}.mp4`);

  try {
    const lullaby = getLullabyData();
    let voiceSamples: Int16Array = new Int16Array(VIDEO_DURATION_SEC * 24000);
    try {
      const cached = await generateOrFetchVoice(voice);
      voiceSamples = cached.voiceSamples;
    } catch {
      // Proceed with lullaby audio if Gemini TTS is unavailable in environment
    }

    const mixedSamples = includeMusic
      ? mixPcmBuffers(voiceSamples, lullaby.pcm, musicVolume * 0.65, 1.0)
      : voiceSamples;
    const finalWav = encodeWavBuffer(mixedSamples, 24000);
    await fs.writeFile(wavPath, finalWav);

    await new Promise<void>((resolve, reject) => {
      const ff = spawn('ffmpeg', [
        '-y',
        '-f',
        'image2pipe',
        '-vcodec',
        'mjpeg',
        '-framerate',
        String(fps),
        '-i',
        'pipe:0',
        '-i',
        wavPath,
        '-c:v',
        'libx264',
        '-preset',
        'ultrafast',
        '-crf',
        '21',
        '-pix_fmt',
        'yuv420p',
        '-r',
        '24',
        '-c:a',
        'aac',
        '-b:a',
        '192k',
        '-t',
        String(VIDEO_DURATION_SEC),
        '-movflags',
        '+faststart',
        mp4Path,
      ]);

      let stderr = '';
      ff.stderr.on('data', (chunk) => {
        stderr += chunk.toString();
      });

      ff.on('error', (err) => reject(err));
      ff.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`ffmpeg exited with code ${code}: ${stderr.slice(-400)}`));
        }
      });

      for (const frameDataUrl of frames) {
        if (typeof frameDataUrl !== 'string') continue;
        const commaIdx = frameDataUrl.indexOf(',');
        const b64 = commaIdx >= 0 ? frameDataUrl.slice(commaIdx + 1) : frameDataUrl;
        ff.stdin.write(Buffer.from(b64, 'base64'));
      }
      ff.stdin.end();
    });

    const mp4Buffer = await fs.readFile(mp4Path);
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="english-alphabet-30s.mp4"',
    );
    res.send(mp4Buffer);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'MP4 export failed.';
    res.status(500).json({ error: message });
  } finally {
    await fs.unlink(wavPath).catch(() => undefined);
    await fs.unlink(mp4Path).catch(() => undefined);
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);

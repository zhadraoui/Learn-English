export interface ParsedWav {
  sampleRate: number;
  numChannels: number;
  bitsPerSample: number;
  samples: Int16Array;
}

export interface SpeechSegment {
  startSample: number;
  endSample: number;
  startSec: number;
  endSec: number;
}

export function parseWavBuffer(buf: Buffer): ParsedWav {
  if (buf.length < 44 || buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WAVE') {
    throw new Error('Invalid WAV header');
  }

  let sampleRate = 24000;
  let numChannels = 1;
  let bitsPerSample = 16;
  let dataOffset = 44;
  let dataSize = buf.length - 44;

  let offset = 12;
  while (offset + 8 <= buf.length) {
    const chunkId = buf.toString('ascii', offset, offset + 4);
    const chunkSize = buf.readUInt32LE(offset + 4);
    if (chunkId === 'fmt ' && offset + 24 <= buf.length) {
      numChannels = buf.readUInt16LE(offset + 10);
      sampleRate = buf.readUInt32LE(offset + 12);
      bitsPerSample = buf.readUInt16LE(offset + 22);
    } else if (chunkId === 'data') {
      dataOffset = offset + 8;
      dataSize = Math.min(chunkSize, buf.length - dataOffset);
      break;
    }
    offset += 8 + chunkSize + (chunkSize % 2);
  }

  const sampleCount = Math.floor(dataSize / 2);
  const samples = new Int16Array(sampleCount);
  for (let i = 0; i < sampleCount; i++) {
    samples[i] = buf.readInt16LE(dataOffset + i * 2);
  }

  return { sampleRate, numChannels, bitsPerSample, samples };
}

export function encodeWavBuffer(samples: Int16Array, sampleRate = 24000): Buffer {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = samples.length * 2;
  const header = Buffer.alloc(44);

  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16); // PCM
  header.writeUInt16LE(1, 20); // Linear PCM
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);

  const body = Buffer.allocUnsafe(dataSize);
  for (let i = 0; i < samples.length; i++) {
    body.writeInt16LE(samples[i], i * 2);
  }
  return Buffer.concat([header, body]);
}

export function detectSpeechSegments(
  samples: Int16Array,
  sampleRate: number,
  options?: {
    windowMs?: number;
    thresholdRatio?: number;
    minSilenceMs?: number;
    minSegmentMs?: number;
  },
): SpeechSegment[] {
  const windowMs = options?.windowMs ?? 20;
  const thresholdRatio = options?.thresholdRatio ?? 0.045;
  const minSilenceMs = options?.minSilenceMs ?? 190;
  const minSegmentMs = options?.minSegmentMs ?? 90;

  const winSamples = Math.max(1, Math.floor((sampleRate * windowMs) / 1000));
  const minSilenceWins = Math.max(1, Math.ceil(minSilenceMs / windowMs));
  const minSegWins = Math.max(1, Math.ceil(minSegmentMs / windowMs));

  const rmsValues: number[] = [];
  let maxRms = 0;
  for (let i = 0; i < samples.length; i += winSamples) {
    const end = Math.min(samples.length, i + winSamples);
    let sumSq = 0;
    for (let j = i; j < end; j++) {
      const v = samples[j] / 32768;
      sumSq += v * v;
    }
    const rms = Math.sqrt(sumSq / Math.max(1, end - i));
    rmsValues.push(rms);
    if (rms > maxRms) maxRms = rms;
  }

  if (maxRms < 0.005) {
    return [];
  }

  const threshold = Math.max(0.008, maxRms * thresholdRatio);
  const rawSegments: { startWin: number; endWin: number }[] = [];
  let activeStart = -1;
  let silenceCount = 0;

  for (let w = 0; w < rmsValues.length; w++) {
    if (rmsValues[w] >= threshold) {
      if (activeStart === -1) {
        activeStart = w;
      }
      silenceCount = 0;
    } else if (activeStart !== -1) {
      silenceCount++;
      if (silenceCount >= minSilenceWins) {
        const endWin = w - silenceCount + 1;
        if (endWin - activeStart >= minSegWins) {
          rawSegments.push({ startWin: activeStart, endWin });
        }
        activeStart = -1;
        silenceCount = 0;
      }
    }
  }

  if (activeStart !== -1) {
    const endWin = rmsValues.length;
    if (endWin - activeStart >= minSegWins) {
      rawSegments.push({ startWin: activeStart, endWin });
    }
  }

  const padSamples = Math.floor(sampleRate * 0.04);
  return rawSegments.map((seg) => {
    const startSample = Math.max(0, seg.startWin * winSamples - padSamples);
    const endSample = Math.min(samples.length, seg.endWin * winSamples + padSamples);
    return {
      startSample,
      endSample,
      startSec: startSample / sampleRate,
      endSec: endSample / sampleRate,
    };
  });
}

/**
 * Fits a narration track into an exact targetSec duration (default 30s)
 * by distributing inter-letter silence cleanly without distorting pitch/speed.
 */
export function fitNarrationToDuration(
  samples: Int16Array,
  sampleRate: number,
  targetSec = 30,
  introSec = 1.0,
  outroSec = 1.5,
): { fittedSamples: Int16Array; onsetsSec: number[] } {
  const totalTargetSamples = Math.round(targetSec * sampleRate);
  const out = new Int16Array(totalTargetSamples);
  const segments = detectSpeechSegments(samples, sampleRate);

  if (segments.length === 0) {
    return { fittedSamples: out, onsetsSec: [] };
  }

  // If we didn't detect 26 distinct segments (e.g. merged words), preserve original speech gently padded/centered
  const usableStart = Math.round(introSec * sampleRate);
  const usableEnd = Math.round((targetSec - outroSec) * sampleRate);
  const usableSamples = Math.max(sampleRate, usableEnd - usableStart);

  if (segments.length === 26) {
    const slotSamples = usableSamples / 26;
    const onsetsSec: number[] = [];

    for (let i = 0; i < 26; i++) {
      const seg = segments[i];
      const segLen = seg.endSample - seg.startSample;
      const slotStart = Math.round(usableStart + i * slotSamples);
      const maxCopy = Math.min(segLen, totalTargetSamples - slotStart);
      for (let j = 0; j < maxCopy; j++) {
        out[slotStart + j] = samples[seg.startSample + j];
      }
      onsetsSec.push(Number((slotStart / sampleRate).toFixed(3)));
    }
    return { fittedSamples: out, onsetsSec };
  }

  // Fallback: copy trimmed speech from first speech onset to last speech end into usable window
  const firstStart = segments[0].startSample;
  const lastEnd = segments[segments.length - 1].endSample;
  const speechLen = lastEnd - firstStart;
  const copyLen = Math.min(speechLen, totalTargetSamples - usableStart);
  const offsetStart =
    speechLen < usableSamples
      ? usableStart + Math.floor((usableSamples - speechLen) / 2)
      : Math.max(0, Math.floor((totalTargetSamples - copyLen) / 2));

  for (let i = 0; i < copyLen; i++) {
    out[offsetStart + i] = samples[firstStart + i];
  }

  const onsetsSec = segments.map((s) =>
    Number(((offsetStart + (s.startSample - firstStart)) / sampleRate).toFixed(3)),
  );
  return { fittedSamples: out, onsetsSec };
}

/**
 * Generates a gentle, calming 30-second music-box / celesta lullaby bed
 * in C major pentatonic (C5, D5, E5, G5, A5, C6) with soft bell decay.
 */
export function synthesizeLullabyPcm(durationSec = 30, sampleRate = 24000): Int16Array {
  const totalSamples = Math.round(durationSec * sampleRate);
  const out = new Float32Array(totalSamples);

  // Soft, lullaby-like C major pentatonic notes (Hz)
  const melody = [
    523.25, 659.25, 783.99, 659.25, // C5 E5 G5 E5
    587.33, 659.25, 523.25, 392.00, // D5 E5 C5 G4
    440.00, 523.25, 659.25, 523.25, // A4 C5 E5 C5
    587.33, 440.00, 392.00, 523.25, // D5 A4 G4 C5
  ];

  const noteSpacingSec = 1.15;
  const noteCount = Math.ceil(durationSec / noteSpacingSec);

  for (let n = 0; n < noteCount; n++) {
    const startSec = 0.25 + n * noteSpacingSec;
    if (startSec >= durationSec - 0.5) break;
    const freq = melody[n % melody.length];
    const startIdx = Math.floor(startSec * sampleRate);
    const noteLen = Math.min(Math.floor(2.2 * sampleRate), totalSamples - startIdx);

    for (let i = 0; i < noteLen; i++) {
      const t = i / sampleRate;
      const attack = Math.min(1, t / 0.025);
      const decay = Math.exp(-t * 2.4);
      const env = attack * decay;

      // Warm music-box timbre: fundamental + gentle 2nd harmonic
      const tone =
        0.82 * Math.sin(2 * Math.PI * freq * t) +
        0.18 * Math.sin(2 * Math.PI * freq * 2 * t) * Math.exp(-t * 4.5);

      out[startIdx + i] += tone * env * 0.28;
    }
  }

  // Gentle fade in (0.6s) and fade out (1.5s)
  const fadeInSamples = Math.floor(0.6 * sampleRate);
  const fadeOutSamples = Math.floor(1.5 * sampleRate);
  const pcm = new Int16Array(totalSamples);

  for (let i = 0; i < totalSamples; i++) {
    let gain = 1;
    if (i < fadeInSamples) gain = i / fadeInSamples;
    if (i > totalSamples - fadeOutSamples) {
      gain = Math.max(0, (totalSamples - i) / fadeOutSamples);
    }
    const clamped = Math.max(-0.95, Math.min(0.95, out[i] * gain));
    pcm[i] = Math.round(clamped * 32767);
  }
  return pcm;
}

export function mixPcmBuffers(
  voice: Int16Array,
  music: Int16Array,
  musicGain = 0.16,
  voiceGain = 1.0,
): Int16Array {
  const len = Math.max(voice.length, music.length);
  const mixed = new Int16Array(len);

  for (let i = 0; i < len; i++) {
    const v = i < voice.length ? voice[i] * voiceGain : 0;
    const m = i < music.length ? music[i] * musicGain : 0;
    const sum = v + m;
    // Soft limiting to prevent clipping
    mixed[i] = Math.max(-32767, Math.min(32767, Math.round(sum)));
  }
  return mixed;
}

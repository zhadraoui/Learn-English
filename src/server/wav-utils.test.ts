import test from 'node:test';
import assert from 'node:assert/strict';
import {
  detectSpeechSegments,
  encodeWavBuffer,
  fitNarrationToDuration,
  mixPcmBuffers,
  parseWavBuffer,
  synthesizeLullabyPcm,
} from './wav-utils';

test('encodeWavBuffer and parseWavBuffer round-trip 24kHz PCM cleanly', () => {
  const sampleRate = 24000;
  const input = new Int16Array(2400);
  for (let i = 0; i < input.length; i++) {
    input[i] = Math.round(Math.sin((2 * Math.PI * 440 * i) / sampleRate) * 12000);
  }

  const wav = encodeWavBuffer(input, sampleRate);
  const parsed = parseWavBuffer(wav);

  assert.equal(parsed.sampleRate, sampleRate);
  assert.equal(parsed.numChannels, 1);
  assert.equal(parsed.bitsPerSample, 16);
  assert.equal(parsed.samples.length, input.length);
  assert.equal(parsed.samples[100], input[100]);
});

test('detectSpeechSegments finds 26 synthetic bursts and fitNarrationToDuration aligns to 30s', () => {
  const sampleRate = 24000;
  const burstLen = Math.floor(0.28 * sampleRate);
  const gapLen = Math.floor(0.32 * sampleRate);
  const totalLen = 26 * (burstLen + gapLen);
  const samples = new Int16Array(totalLen);

  for (let b = 0; b < 26; b++) {
    const start = b * (burstLen + gapLen) + 1200;
    for (let i = 0; i < burstLen; i++) {
      samples[start + i] = Math.round(Math.sin((2 * Math.PI * 300 * i) / sampleRate) * 16000);
    }
  }

  const segments = detectSpeechSegments(samples, sampleRate);
  assert.equal(segments.length, 26);

  const fitted = fitNarrationToDuration(samples, sampleRate, 30, 1.0, 1.5);
  assert.equal(fitted.fittedSamples.length, 30 * sampleRate);
  assert.equal(fitted.onsetsSec.length, 26);
  assert.equal(fitted.onsetsSec[0], 1);
  assert.ok(fitted.onsetsSec[25] < 28.5);
});

test('synthesizeLullabyPcm generates 30 seconds of non-silent soft music and mixes cleanly', () => {
  const sampleRate = 24000;
  const music = synthesizeLullabyPcm(30, sampleRate);
  assert.equal(music.length, 30 * sampleRate);

  let peak = 0;
  for (const sample of music) {
    const abs = Math.abs(sample);
    if (abs > peak) peak = abs;
  }
  assert.ok(peak > 1000 && peak < 25000);

  const voice = new Int16Array(30 * sampleRate);
  voice[12000] = 10000;
  const mixed = mixPcmBuffers(voice, music, 0.2);
  assert.equal(mixed.length, 30 * sampleRate);
});

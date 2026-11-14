import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ALPHABET_ENTRIES,
  VIDEO_DURATION_SEC,
  alignTimingsToOnsets,
  buildUniformTimings,
  formatTimecode,
  getLetterCenterTime,
  getPlaybackPhase,
  normalizeSingleLetter,
} from './alphabet-data';

test('alphabet data defines exactly 26 letters A through Z', () => {
  assert.equal(ALPHABET_ENTRIES.length, 26);
  assert.equal(ALPHABET_ENTRIES[0].letter, 'A');
  assert.equal(ALPHABET_ENTRIES[25].letter, 'Z');
});

test('buildUniformTimings covers intro, 26 contiguous letters, and outro within 30s', () => {
  const timings = buildUniformTimings(30, 1.0, 1.5);
  assert.equal(timings.length, 26);
  assert.equal(timings[0].startSec, 1);
  assert.ok(Math.abs(timings[25].endSec - 28.5) < 0.01);

  for (let i = 1; i < timings.length; i++) {
    assert.ok(timings[i].startSec >= timings[i - 1].endSec - 0.002);
    assert.ok(timings[i].endSec > timings[i].startSec);
  }
});

test('alignTimingsToOnsets snaps timings when 26 onsets exist and falls back otherwise', () => {
  const fallback = alignTimingsToOnsets([1, 2, 3], 30);
  assert.equal(fallback.length, 26);
  assert.equal(fallback[0].startSec, 1);

  const syntheticOnsets = Array.from({ length: 26 }, (_, i) => 1.2 + i * 1.03);
  const aligned = alignTimingsToOnsets(syntheticOnsets, VIDEO_DURATION_SEC);
  assert.equal(aligned.length, 26);
  assert.equal(aligned[0].letter, 'A');
  assert.ok(aligned[0].startSec < syntheticOnsets[0]);
  assert.ok(aligned[25].endSec <= VIDEO_DURATION_SEC);
});

test('getPlaybackPhase resolves intro, active letter, and outro deterministically', () => {
  const timings = buildUniformTimings(30, 1.0, 1.5);
  const intro = getPlaybackPhase(timings, 0.5, 30);
  assert.equal(intro.phase, 'intro');
  assert.equal(intro.activeIndex, -1);

  const letterA = getPlaybackPhase(timings, 1.2, 30);
  assert.equal(letterA.phase, 'letter');
  assert.equal(letterA.activeIndex, 0);
  assert.equal(letterA.item?.letter, 'A');

  const letterZ = getPlaybackPhase(timings, 28.1, 30);
  assert.equal(letterZ.phase, 'letter');
  assert.equal(letterZ.activeIndex, 25);
  assert.equal(letterZ.item?.letter, 'Z');

  const outro = getPlaybackPhase(timings, 29.2, 30);
  assert.equal(outro.phase, 'outro');
  assert.equal(outro.activeIndex, -1);
});

test('formatTimecode formats seconds cleanly', () => {
  assert.equal(formatTimecode(0), '00:00');
  assert.equal(formatTimecode(14.4), '00:14');
  assert.equal(formatTimecode(30), '00:30');
  assert.equal(formatTimecode(-4), '00:00');
});

test('getLetterCenterTime and normalizeSingleLetter behave deterministically', () => {
  const timings = buildUniformTimings(30, 1.0, 1.5);
  const centerM = getLetterCenterTime(timings[12]);
  assert.ok(centerM > timings[12].startSec && centerM < timings[12].endSec);

  assert.equal(normalizeSingleLetter('m'), 'M');
  assert.equal(normalizeSingleLetter(' A '), 'A');
  assert.equal(normalizeSingleLetter('AB'), null);
  assert.equal(normalizeSingleLetter('1'), null);
});

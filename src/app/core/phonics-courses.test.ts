import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CourseId,
  PHONICS_COURSES,
  getLessonWords,
  getPhonicsCourse,
  getPhonicsLesson,
  normalizeSpeakText,
} from './phonics-courses';

test('phonics courses define all 6 guides A, E, I, O, U, Y with expected lesson counts', () => {
  const ids = PHONICS_COURSES.map((c) => c.id);
  assert.deepEqual(ids, ['A', 'E', 'I', 'O', 'U', 'Y']);

  const expectedCounts: Record<CourseId, number> = {
    A: 5,
    E: 7,
    I: 6,
    O: 7,
    U: 3,
    Y: 3,
  };

  for (const course of PHONICS_COURSES) {
    assert.equal(course.lessons.length, expectedCounts[course.id]);
    for (const lesson of course.lessons) {
      assert.ok(lesson.ruleFr.length > 10);
      assert.ok(lesson.ruleEn.length > 10);
      assert.ok(lesson.exceptions.length >= 1);
      for (const group of lesson.groups) {
        assert.equal(group.words.length, 10);
      }
      assert.ok(getLessonWords(lesson).length >= 10);
    }
  }
});

test('getPhonicsCourse and getPhonicsLesson resolve valid and fallback selections', () => {
  const courseE = getPhonicsCourse('E');
  assert.equal(courseE.id, 'E');
  assert.equal(getPhonicsLesson('E', 'e-ear').number, 4);
  assert.equal(getPhonicsLesson('E', 'non-existent').id, 'e-ee');
});

test('normalizeSpeakText sanitizes whitespace and rejects invalid inputs', () => {
  assert.equal(normalizeSpeakText('  hello   world  '), 'hello world');
  assert.equal(normalizeSpeakText(''), null);
  assert.equal(normalizeSpeakText('12345'), null);
  assert.equal(normalizeSpeakText(null), null);
  assert.equal(normalizeSpeakText('a'.repeat(221)), null);
});

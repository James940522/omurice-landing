import assert from 'node:assert/strict';
import test from 'node:test';

const { getNewBadgeOpenMonth } = await import(
  '../src/features/store-status-modal/getNewBadgeOpenMonth.ts'
);

test('uses the immediately preceding month for the NEW badge', () => {
  assert.deepEqual(getNewBadgeOpenMonth(new Date(2026, 7, 15)), {
    year: 2026,
    month: 7,
  });
});

test('uses December of the previous year when the current month is January', () => {
  assert.deepEqual(getNewBadgeOpenMonth(new Date(2027, 0, 1)), {
    year: 2026,
    month: 12,
  });
});

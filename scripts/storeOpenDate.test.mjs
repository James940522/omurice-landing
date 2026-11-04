import assert from 'node:assert/strict';
import test from 'node:test';

const { parseStoreOpenDate } = await import(
  '../src/features/store-status-modal/parseStoreOpenDate.ts'
);

test('month-only opening dates preserve the opening month for labels and NEW badges', () => {
  const date = parseStoreOpenDate('2026-05');
  assert.equal(date.year, 2026);
  assert.equal(date.month, 5);
  assert.equal(date.sortTime, Date.parse('2026-05-01T00:00:00+09:00'));
});

test('month-only dates sort with their month and exact dates keep their day order', () => {
  const dates = ['2026-06-01', '2026-05-15', '2026-05', '2026-04-30'];
  dates.sort((a, b) => parseStoreOpenDate(a).sortTime - parseStoreOpenDate(b).sortTime);
  assert.deepEqual(dates, ['2026-04-30', '2026-05', '2026-05-15', '2026-06-01']);
});

test('invalid or missing opening dates do not create a month or sortable date', () => {
  for (const value of ['', '2026-00', '2026-13', '2026-02-30', '2026-05-00']) {
    assert.equal(parseStoreOpenDate(value), null);
  }
});

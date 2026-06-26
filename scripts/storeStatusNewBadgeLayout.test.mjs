import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile('src/features/store-status-modal/ui/StoreItem.tsx', 'utf8');

test('current month store name keeps top space below the NEW badge at desktop widths', () => {
  assert.match(source, /isCurrentMonthOpen \? 'pt-\[10px\] sm:pt-\[14px\]'/);
  assert.equal(source.includes("isCurrentMonthOpen ? 'pt-[10px] sm:pt-0'"), false);
});

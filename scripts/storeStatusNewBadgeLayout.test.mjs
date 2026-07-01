import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const itemSource = await readFile('src/features/store-status-modal/ui/StoreItem.tsx', 'utf8');
const modalSource = await readFile(
  'src/features/store-status-modal/ui/StoreStatusModal.tsx',
  'utf8'
);

test('NEW store name keeps top space below the badge at desktop widths', () => {
  assert.match(itemSource, /isNewOpen \? 'pt-\[10px\] sm:pt-\[14px\]'/);
  assert.equal(itemSource.includes("isNewOpen ? 'pt-[10px] sm:pt-0'"), false);
});

test('store cards receive the previous-month NEW badge target', () => {
  assert.match(modalSource, /getNewBadgeOpenMonth\(new Date\(Date\.now\(\)\)\)/);
  assert.match(modalSource, /newBadgeOpenMonth=\{newBadgeOpenMonth\}/);
  assert.match(itemSource, /year === newBadgeOpenMonth\.year/);
  assert.match(itemSource, /month === newBadgeOpenMonth\.month/);
});

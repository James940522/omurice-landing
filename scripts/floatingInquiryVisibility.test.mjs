import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile('src/features/inquiry/ui/FloatingInquiry.tsx', 'utf8');

test('floating inquiry hides when the contact section or footer is visible', () => {
  assert.match(source, /const \[isFooterInView, setIsFooterInView\]/);
  assert.match(source, /document\.getElementById\('footer'\)/);
  assert.match(source, /setIsFooterInView\(entry\.isIntersecting\)/);
  assert.match(source, /const shouldShow = isVisible && !isContactInView && !isFooterInView;/);
});

import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile('src/widgets/revenue-proof/ui/RevenueProofSection.tsx', 'utf8');

test('revenue proof counter gives animated digits enough vertical room', () => {
  assert.match(source, /animate\(0, targetAmount,/);
  assert.match(source, /Math\.floor\(displayAmount\)\.toLocaleString\('ko-KR'\)/);
  assert.doesNotMatch(source, /digitReel/);
  assert.doesNotMatch(source, /DIGIT_REEL/);
  assert.doesNotMatch(source, /value\.split\(''\)\.map/);
});

test('revenue proof keeps the sales marquee while sizing number cells from content', () => {
  assert.match(source, /const revenueCarouselGroups = \[0, 1, 2\];/);
  assert.match(source, /omurice-marquee-left/);
  assert.match(source, /inline-flex w-auto/);
  assert.doesNotMatch(source, /w-\[0\.\d+em\]/);
});

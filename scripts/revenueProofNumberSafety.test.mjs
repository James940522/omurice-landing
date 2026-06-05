import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile('src/widgets/revenue-proof/ui/RevenueProofSection.tsx', 'utf8');

test('revenue proof counter gives animated digits enough vertical room', () => {
  const stepMatch = source.match(/const DIGIT_REEL_STEP_EM = ([\d.]+);/);

  assert.ok(stepMatch, 'CountingAmount should define a shared digit reel step');
  assert.ok(
    Number(stepMatch[1]) >= 1.28,
    'digit reel step should be large enough for bold GMarketSans numbers'
  );
  assert.equal(source.includes('h-[1.1em]'), false);
  assert.equal(source.includes('leading-[1.1]'), false);
  assert.match(source, /digitCellStyle/);
});

test('revenue proof keeps the sales marquee while sizing number cells from content', () => {
  assert.match(source, /const revenueCarouselGroups = \[0, 1, 2\];/);
  assert.match(source, /omurice-marquee-left/);
  assert.match(source, /inline-flex w-auto/);
  assert.match(source, /className="invisible col-start-1 row-start-1 block"/);
  assert.doesNotMatch(source, /w-\[0\.\d+em\]/);
});

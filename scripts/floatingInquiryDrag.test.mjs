import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile('src/features/inquiry/ui/FloatingInquiry.tsx', 'utf8');

test('mobile floating inquiry panel only collapses from the fold button', () => {
  assert.doesNotMatch(source, /useDragControls/);
  assert.doesNotMatch(source, /handleMobileDragEnd/);
  assert.doesNotMatch(source, /drag="y"/);
  assert.doesNotMatch(source, /onDragEnd=/);
  assert.doesNotMatch(source, /onPointerDown=/);
  assert.match(source, /onClick=\{handleMobileCollapse\}/);
});

import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile('src/features/inquiry/ui/FloatingInquiry.tsx', 'utf8');

test('mobile floating inquiry panel can collapse from a downward drag', () => {
  assert.match(source, /const handleMobileDragEnd/);
  assert.match(source, /drag="y"/);
  assert.match(source, /onDragEnd=\{handleMobileDragEnd\}/);
  assert.match(source, /dragConstraints=\{\{ top: 0, bottom: MOBILE_DRAG_PANEL_RANGE \}\}/);
  assert.match(source, /dragMomentum=\{false\}/);
  assert.match(source, /exit=\{\{ opacity: 0, y: '100%' \}\}/);
});

import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const layoutSource = await readFile('src/app/layout.tsx', 'utf8');
const globalStyles = await readFile('src/app/globals.css', 'utf8');

test('site opts out of browser auto darkening with a light-only color scheme', () => {
  assert.match(layoutSource, /colorScheme:\s*'only light'/);
  assert.match(globalStyles, /color-scheme:\s*only light;/);
});

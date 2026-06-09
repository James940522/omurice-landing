import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const layoutSource = await readFile('src/app/layout.tsx', 'utf8');
const globalStyles = await readFile('src/app/globals.css', 'utf8');

test('site opts out of browser auto darkening with a light-only color scheme', () => {
  assert.match(layoutSource, /colorScheme:\s*'only light'/);
  assert.match(layoutSource, /'supported-color-schemes':\s*'light'/);
  assert.match(globalStyles, /color-scheme:\s*only light;/);
});

test('site keeps the light palette when browsers report a dark color preference', () => {
  assert.match(globalStyles, /@media\s*\(prefers-color-scheme:\s*dark\)/);
  assert.match(globalStyles, /background:\s*#ffffff;/);
  assert.match(globalStyles, /--background:\s*#ffffff;/);
  assert.match(globalStyles, /--foreground:\s*#6b4423;/);
});

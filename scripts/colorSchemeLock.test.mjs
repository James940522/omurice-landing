import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const layoutSource = await readFile('src/app/layout.tsx', 'utf8');
const globalStyles = await readFile('src/app/globals.css', 'utf8');
const nextConfigSource = await readFile('next.config.ts', 'utf8');
const manifestSource = await readFile('src/app/manifest.ts', 'utf8');

test('site opts out of browser auto darkening with a light-only color scheme', () => {
  assert.match(layoutSource, /colorScheme:\s*'only light'/);
  assert.match(layoutSource, /'supported-color-schemes':\s*'light'/);
  assert.match(layoutSource, /style=\{lightSchemeStyle\}/);
  assert.match(globalStyles, /color-scheme:\s*only light;/);
});

test('site keeps the light palette when browsers report a dark color preference', () => {
  assert.match(globalStyles, /@media\s*\(prefers-color-scheme:\s*dark\)/);
  assert.match(globalStyles, /background:\s*#ffffff;/);
  assert.match(globalStyles, /--background:\s*#ffffff;/);
  assert.match(globalStyles, /--foreground:\s*#6b4423;/);
});

test('home document is revalidated so Samsung Internet can pick up color-scheme fixes', () => {
  assert.match(nextConfigSource, /source:\s*'\/'/);
  assert.match(nextConfigSource, /Cache-Control/);
  assert.match(nextConfigSource, /max-age=0,\s*must-revalidate/);
});

test('browser chrome and standalone mode use a white theme color', () => {
  assert.match(layoutSource, /themeColor:\s*'#ffffff'/);
  assert.match(manifestSource, /theme_color:\s*'#ffffff'/);
  assert.match(manifestSource, /background_color:\s*'#ffffff'/);
});

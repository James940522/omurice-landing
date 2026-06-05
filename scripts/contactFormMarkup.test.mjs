import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile('src/widgets/contact-form/ui/ContactFormSection.tsx', 'utf8');

test('store type uses styled radio options instead of a native mobile select popup', () => {
  assert.equal(source.includes('<select'), false);
  assert.match(source, /role="radiogroup"/);
  assert.match(source, /name="storeType"/);
  assert.match(source, /type="radio"/);
});

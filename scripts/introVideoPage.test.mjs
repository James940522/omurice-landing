import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const pageSource = await readFile('src/app/page.tsx', 'utf8');

test('homepage renders the responsive intro video on every mount', () => {
  assert.match(pageSource, /import \{ IntroVideo \} from '@\/features\/intro-video';/);
  assert.match(
    pageSource,
    /<IntroVideo isVisible=\{showIntro\} onComplete=\{\(\) => setShowIntro\(false\)\} \/>/
  );
  assert.match(pageSource, /const \[showIntro, setShowIntro\] = useState\(true\)/);
  assert.doesNotMatch(pageSource, /sessionStorage|localStorage.*[Ii]ntro/);
});

test('legacy intro integration remains present but commented out', () => {
  assert.match(
    pageSource,
    /\/\/ import \{ IntroAnimation \} from '@\/features\/intro-animation';/
  );
  assert.match(
    pageSource,
    /\{\/\* <IntroAnimation isVisible=\{showIntro\} onComplete=\{\(\) => setShowIntro\(false\)\} \/> \*\/\}/
  );
});

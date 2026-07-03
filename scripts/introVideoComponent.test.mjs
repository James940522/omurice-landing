import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const readSource = async (path) => {
  try {
    return await readFile(path, 'utf8');
  } catch {
    return '';
  }
};

const componentSource = await readSource(
  'src/features/intro-video/ui/IntroVideo.tsx'
);
const indexSource = await readSource('src/features/intro-video/index.ts');

test('exports a dedicated intro video feature', () => {
  assert.match(indexSource, /default as IntroVideo/);
  assert.match(componentSource, /interface IntroVideoProps/);
  assert.match(componentSource, /isVisible:\s*boolean/);
  assert.match(componentSource, /onComplete:\s*\(\) => void/);
});

test('loads exactly one responsive muted inline video', () => {
  assert.match(componentSource, /window\.matchMedia\(INTRO_VIDEO_MOBILE_QUERY\)/);
  assert.match(componentSource, /getIntroVideoSource\(isMobile\)/);
  assert.match(componentSource, /autoPlay/);
  assert.match(componentSource, /muted/);
  assert.match(componentSource, /playsInline/);
  assert.match(componentSource, /preload="auto"/);
  assert.match(componentSource, /object-cover/);
  assert.equal(componentSource.match(/<motion\.video/g)?.length, 1);
  assert.doesNotMatch(componentSource, /<motion\.video[^>]*\sloop(?:=|\s|>)/s);
});

test('keeps branded loading feedback until actual playback starts', () => {
  assert.match(componentSource, /오늘은 오므라이스를 준비하고 있어요/);
  assert.match(componentSource, /state\.phase === 'loading'/);
  assert.match(componentSource, /dispatch\(\{ type: 'playing' \}\)/);
  assert.match(componentSource, /role="status"/);
  assert.match(componentSource, /aria-live="polite"/);
});

test('exits safely for completion, media failure, rejected playback, and timeout', () => {
  assert.match(componentSource, /onEnded=\{\(\) => dispatch\(\{ type: 'finish' \}\)\}/);
  assert.match(componentSource, /onError=\{\(\) => dispatch\(\{ type: 'failure' \}\)\}/);
  assert.match(componentSource, /\.catch\(\(\) => dispatch\(\{ type: 'failure' \}\)\)/);
  assert.match(componentSource, /INTRO_VIDEO_LOADING_TIMEOUT_MS/);
  assert.match(componentSource, /y:\s*prefersReducedMotion \? 0 : '8dvh'/);
  assert.match(componentSource, /duration:\s*0\.7/);
  assert.match(componentSource, /completionCalledRef\.current/);
  assert.match(componentSource, /completionCalledRef\.current = true/);
});

test('locks scrolling and restores the previous inline styles', () => {
  assert.match(componentSource, /previousBodyOverflow/);
  assert.match(componentSource, /previousBodyHeight/);
  assert.match(componentSource, /previousRootOverflow/);
  assert.match(componentSource, /document\.body\.style\.overflow = 'hidden'/);
  assert.match(componentSource, /document\.body\.style\.overflow = previousBodyOverflow/);
  assert.match(componentSource, /document\.body\.style\.height = previousBodyHeight/);
  assert.match(componentSource, /document\.documentElement\.style\.overflow = previousRootOverflow/);
});

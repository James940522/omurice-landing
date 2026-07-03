# Responsive Intro Video Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the legacy homepage intro animation with responsive PC/mobile videos, branded loading feedback, and a safe downward fade exit.

**Architecture:** Keep responsive source selection and the intro lifecycle in a small pure model that can be tested with Node's built-in test runner. A focused client component owns video events, loading timeout, scroll locking, and Framer Motion transitions; the homepage only controls visibility and preserves its existing post-intro modal flow.

**Tech Stack:** Next.js 16, React 19, TypeScript, Framer Motion 12, Tailwind CSS 4, Node.js test runner

---

## File Structure

- Create `public/new-asset/intro-video/pc.mp4`: supplied desktop intro video.
- Create `public/new-asset/intro-video/mo.mp4`: supplied mobile intro video.
- Create `src/features/intro-video/model/introVideoModel.ts`: responsive source constants and pure lifecycle reducer.
- Create `src/features/intro-video/ui/IntroVideo.tsx`: full-screen client UI, media events, timeout, animation, and scroll lock.
- Create `src/features/intro-video/index.ts`: public feature export.
- Create `scripts/introVideoAssets.test.mjs`: regression coverage for the copied binary assets.
- Create `scripts/introVideoModel.test.mjs`: unit coverage for source selection and lifecycle transitions.
- Create `scripts/introVideoComponent.test.mjs`: component contract and safety markup coverage.
- Create `scripts/introVideoPage.test.mjs`: homepage integration and legacy-comment coverage.
- Modify `src/app/page.tsx`: render the new feature while commenting out the old integration.

### Task 1: Store and verify the supplied video assets

**Files:**
- Create: `scripts/introVideoAssets.test.mjs`
- Create: `public/new-asset/intro-video/pc.mp4`
- Create: `public/new-asset/intro-video/mo.mp4`

- [ ] **Step 1: Write the failing asset regression test**

Create `scripts/introVideoAssets.test.mjs`:

```js
import assert from 'node:assert/strict';
import { open, stat } from 'node:fs/promises';
import test from 'node:test';

const assets = [
  {
    name: 'desktop',
    path: 'public/new-asset/intro-video/pc.mp4',
    expectedSize: 3_356_416,
  },
  {
    name: 'mobile',
    path: 'public/new-asset/intro-video/mo.mp4',
    expectedSize: 3_930_555,
  },
];

const inspectAsset = async (path) => {
  try {
    const fileStat = await stat(path);
    const file = await open(path, 'r');
    const header = Buffer.alloc(12);
    await file.read(header, 0, header.length, 0);
    await file.close();

    return {
      size: fileStat.size,
      fileType: header.subarray(4, 8).toString('ascii'),
    };
  } catch {
    return null;
  }
};

for (const asset of assets) {
  test(`${asset.name} intro video is stored as the supplied MP4`, async () => {
    const inspected = await inspectAsset(asset.path);

    assert.notEqual(inspected, null);
    assert.equal(inspected.size, asset.expectedSize);
    assert.equal(inspected.fileType, 'ftyp');
  });
}
```

- [ ] **Step 2: Run the asset test and verify RED**

Run:

```bash
node --test scripts/introVideoAssets.test.mjs
```

Expected: FAIL with two assertion failures because neither destination asset exists.

- [ ] **Step 3: Copy the supplied videos into the dedicated asset folder**

Run:

```bash
mkdir -p public/new-asset/intro-video
cp /Users/james/Documents/hero/omurice/pc.mp4 public/new-asset/intro-video/pc.mp4
cp /Users/james/Documents/hero/omurice/mo.mp4 public/new-asset/intro-video/mo.mp4
```

- [ ] **Step 4: Run the asset test and verify GREEN**

Run:

```bash
node --test scripts/introVideoAssets.test.mjs
```

Expected: PASS, 2 tests and 0 failures.

- [ ] **Step 5: Commit the verified assets**

```bash
git add scripts/introVideoAssets.test.mjs public/new-asset/intro-video/pc.mp4 public/new-asset/intro-video/mo.mp4
git commit -m "Assets: add responsive intro videos"
```

### Task 2: Model responsive selection and lifecycle transitions

**Files:**
- Create: `scripts/introVideoModel.test.mjs`
- Create: `src/features/intro-video/model/introVideoModel.ts`

- [ ] **Step 1: Write the failing pure-model tests**

Create `scripts/introVideoModel.test.mjs`:

```js
import assert from 'node:assert/strict';
import test from 'node:test';

const loadModel = async () => {
  try {
    return await import('../src/features/intro-video/model/introVideoModel.ts');
  } catch {
    return {};
  }
};

test('selects one responsive video source from the initial viewport', async () => {
  const {
    getIntroVideoSource,
    INTRO_VIDEO_LOADING_TIMEOUT_MS,
    INTRO_VIDEO_MOBILE_QUERY,
  } = await loadModel();

  assert.equal(typeof getIntroVideoSource, 'function');
  assert.equal(INTRO_VIDEO_MOBILE_QUERY, '(max-width: 767px)');
  assert.equal(INTRO_VIDEO_LOADING_TIMEOUT_MS, 15_000);
  assert.equal(getIntroVideoSource(true), '/new-asset/intro-video/mo.mp4');
  assert.equal(getIntroVideoSource(false), '/new-asset/intro-video/pc.mp4');
});

test('moves from loading to playing only after playback starts', async () => {
  const { INITIAL_INTRO_VIDEO_STATE, reduceIntroVideoState } = await loadModel();

  assert.deepEqual(
    reduceIntroVideoState(INITIAL_INTRO_VIDEO_STATE, { type: 'playing' }),
    {
      phase: 'playing',
      hasStarted: true,
    }
  );
});

test('preserves whether playback began while moving to the terminal exit phase', async () => {
  const { reduceIntroVideoState } = await loadModel();

  assert.deepEqual(
    reduceIntroVideoState(
      { phase: 'playing', hasStarted: true },
      { type: 'finish' }
    ),
    {
      phase: 'exiting',
      hasStarted: true,
    }
  );
  assert.deepEqual(
    reduceIntroVideoState(
      { phase: 'loading', hasStarted: false },
      { type: 'failure' }
    ),
    {
      phase: 'exiting',
      hasStarted: false,
    }
  );
});

test('ignores late playback events after exit begins and can reset for a new mount', async () => {
  const { INITIAL_INTRO_VIDEO_STATE, reduceIntroVideoState } = await loadModel();
  const exitingState = { phase: 'exiting', hasStarted: false };

  assert.deepEqual(
    reduceIntroVideoState(exitingState, { type: 'playing' }),
    exitingState
  );
  assert.deepEqual(
    reduceIntroVideoState(exitingState, { type: 'reset' }),
    INITIAL_INTRO_VIDEO_STATE
  );
});
```

- [ ] **Step 2: Run the model test and verify RED**

Run:

```bash
node --test scripts/introVideoModel.test.mjs
```

Expected: FAIL because the model exports are undefined.

- [ ] **Step 3: Implement the minimal pure model**

Create `src/features/intro-video/model/introVideoModel.ts`:

```ts
export const INTRO_VIDEO_MOBILE_QUERY = '(max-width: 767px)';
export const INTRO_VIDEO_LOADING_TIMEOUT_MS = 15_000;

const INTRO_VIDEO_SOURCES = {
  desktop: '/new-asset/intro-video/pc.mp4',
  mobile: '/new-asset/intro-video/mo.mp4',
} as const;

export const getIntroVideoSource = (isMobile: boolean) =>
  isMobile ? INTRO_VIDEO_SOURCES.mobile : INTRO_VIDEO_SOURCES.desktop;

export type IntroVideoPhase = 'loading' | 'playing' | 'exiting';

export interface IntroVideoState {
  phase: IntroVideoPhase;
  hasStarted: boolean;
}

export type IntroVideoEvent =
  | { type: 'reset' }
  | { type: 'playing' }
  | { type: 'finish' }
  | { type: 'failure' };

export const INITIAL_INTRO_VIDEO_STATE: IntroVideoState = {
  phase: 'loading',
  hasStarted: false,
};

export const reduceIntroVideoState = (
  state: IntroVideoState,
  event: IntroVideoEvent
): IntroVideoState => {
  if (event.type === 'reset') {
    return INITIAL_INTRO_VIDEO_STATE;
  }

  if (state.phase === 'exiting') {
    return state;
  }

  if (event.type === 'playing') {
    return {
      phase: 'playing',
      hasStarted: true,
    };
  }

  return {
    phase: 'exiting',
    hasStarted: state.hasStarted,
  };
};
```

- [ ] **Step 4: Run the model test and verify GREEN**

Run:

```bash
node --test scripts/introVideoModel.test.mjs
```

Expected: PASS, 4 tests and 0 failures.

- [ ] **Step 5: Commit the tested model**

```bash
git add scripts/introVideoModel.test.mjs src/features/intro-video/model/introVideoModel.ts
git commit -m "Test: define intro video lifecycle"
```

### Task 3: Build the full-screen intro video component

**Files:**
- Create: `scripts/introVideoComponent.test.mjs`
- Create: `src/features/intro-video/ui/IntroVideo.tsx`
- Create: `src/features/intro-video/index.ts`

- [ ] **Step 1: Write the failing component contract tests**

Create `scripts/introVideoComponent.test.mjs`:

```js
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
```

- [ ] **Step 2: Run the component test and verify RED**

Run:

```bash
node --test scripts/introVideoComponent.test.mjs
```

Expected: FAIL because the component and public export do not exist.

- [ ] **Step 3: Implement the component**

Create `src/features/intro-video/ui/IntroVideo.tsx`:

```tsx
'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useReducer, useRef, useState } from 'react';

import {
  getIntroVideoSource,
  INITIAL_INTRO_VIDEO_STATE,
  INTRO_VIDEO_LOADING_TIMEOUT_MS,
  INTRO_VIDEO_MOBILE_QUERY,
  reduceIntroVideoState,
} from '../model/introVideoModel';

interface IntroVideoProps {
  isVisible: boolean;
  onComplete: () => void;
}

export default function IntroVideo({
  isVisible,
  onComplete,
}: IntroVideoProps) {
  const [source, setSource] = useState<string | null>(null);
  const [state, dispatch] = useReducer(
    reduceIntroVideoState,
    INITIAL_INTRO_VIDEO_STATE
  );
  const completionCalledRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isVisible) {
      setSource(null);
      return;
    }

    completionCalledRef.current = false;
    dispatch({ type: 'reset' });

    const isMobile = window.matchMedia(INTRO_VIDEO_MOBILE_QUERY).matches;
    setSource(getIntroVideoSource(isMobile));
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyHeight = document.body.style.height;
    const previousRootOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.body.style.height = '100dvh';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.height = previousBodyHeight;
      document.documentElement.style.overflow = previousRootOverflow;
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || !source || state.phase !== 'loading') return;

    const timeout = window.setTimeout(() => {
      dispatch({ type: 'failure' });
    }, INTRO_VIDEO_LOADING_TIMEOUT_MS);

    return () => window.clearTimeout(timeout);
  }, [isVisible, source, state.phase]);

  if (!isVisible) return null;

  const handleCanPlay = (video: HTMLVideoElement) => {
    const playAttempt = video.play();
    void playAttempt.catch(() => dispatch({ type: 'failure' }));
  };

  const handleAnimationComplete = () => {
    if (state.phase !== 'exiting' || completionCalledRef.current) return;

    completionCalledRef.current = true;
    onComplete();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[2147483647] overflow-hidden bg-[#fff9e6]"
      style={{ height: '100dvh' }}
      initial={{ opacity: 1, y: 0 }}
      animate={
        state.phase === 'exiting'
          ? {
              opacity: 0,
              y: prefersReducedMotion ? 0 : '8dvh',
            }
          : { opacity: 1, y: 0 }
      }
      transition={{
        duration: 0.7,
        ease: [0.42, 0, 0.58, 1],
      }}
      aria-busy={state.phase === 'loading'}
      onAnimationComplete={handleAnimationComplete}
    >
      {source && (
        <motion.video
          key={source}
          src={source}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: state.hasStarted ? 1 : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onCanPlay={(event) => handleCanPlay(event.currentTarget)}
          onPlaying={() => dispatch({ type: 'playing' })}
          onEnded={() => dispatch({ type: 'finish' })}
          onError={() => dispatch({ type: 'failure' })}
        />
      )}

      <AnimatePresence>
        {state.phase === 'loading' && (
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-[#fff9e6]"
            role="status"
            aria-live="polite"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <span
              className="h-11 w-11 animate-spin rounded-full border-[3px] border-[#fec601]/25 border-t-[#fec601]"
              aria-hidden="true"
            />
            <p className="text-sm font-semibold tracking-[-0.01em] text-[#6b4423] sm:text-base">
              오늘은 오므라이스를 준비하고 있어요
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
```

- [ ] **Step 4: Add the feature export**

Create `src/features/intro-video/index.ts`:

```ts
export { default as IntroVideo } from './ui/IntroVideo';
```

- [ ] **Step 5: Run the focused component and model tests and verify GREEN**

Run:

```bash
node --test scripts/introVideoModel.test.mjs scripts/introVideoComponent.test.mjs
```

Expected: PASS, 9 tests and 0 failures.

- [ ] **Step 6: Commit the component**

```bash
git add scripts/introVideoComponent.test.mjs src/features/intro-video/ui/IntroVideo.tsx src/features/intro-video/index.ts
git commit -m "Feat: add responsive intro video"
```

### Task 4: Integrate the new intro and preserve the legacy code as comments

**Files:**
- Create: `scripts/introVideoPage.test.mjs`
- Modify: `src/app/page.tsx:25-29`
- Modify: `src/app/page.tsx:226`

- [ ] **Step 1: Write the failing homepage integration tests**

Create `scripts/introVideoPage.test.mjs`:

```js
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
```

- [ ] **Step 2: Run the page integration test and verify RED**

Run:

```bash
node --test scripts/introVideoPage.test.mjs
```

Expected: FAIL because `page.tsx` still imports and renders `IntroAnimation`.

- [ ] **Step 3: Update the homepage feature imports**

Replace the feature import block at `src/app/page.tsx:25-29` with:

```ts
// Features
import { FloatingInquiry } from '@/features/inquiry';
import { IntroVideo } from '@/features/intro-video';
// import { IntroAnimation } from '@/features/intro-animation';
import { StoreStatusModal } from '@/features/store-status-modal';
import { BrandLetterModal } from '@/features/brand-letter-modal';
```

- [ ] **Step 4: Replace the rendered intro and comment out the legacy JSX**

Replace the existing `IntroAnimation` line near the end of `<main>` with:

```tsx
        <IntroVideo isVisible={showIntro} onComplete={() => setShowIntro(false)} />
        {/* <IntroAnimation isVisible={showIntro} onComplete={() => setShowIntro(false)} /> */}
```

- [ ] **Step 5: Run all intro tests and verify GREEN**

Run:

```bash
node --test scripts/introVideoAssets.test.mjs scripts/introVideoModel.test.mjs scripts/introVideoComponent.test.mjs scripts/introVideoPage.test.mjs
```

Expected: PASS, 13 tests and 0 failures.

- [ ] **Step 6: Commit the homepage integration**

```bash
git add scripts/introVideoPage.test.mjs src/app/page.tsx
git commit -m "Feat: show video intro on homepage"
```

### Task 5: Verify behavior, quality, and responsive presentation

**Files:**
- Verify: `public/new-asset/intro-video/*.mp4`
- Verify: `src/features/intro-video/**/*.ts`
- Verify: `src/features/intro-video/**/*.tsx`
- Verify: `src/app/page.tsx`
- Verify: `scripts/*.test.mjs`

- [ ] **Step 1: Run the full Node regression suite**

Run:

```bash
node --test scripts/*.test.mjs
```

Expected: PASS with 0 failures.

- [ ] **Step 2: Run lint**

Run:

```bash
pnpm lint
```

Expected: exit code 0 with no ESLint errors.

- [ ] **Step 3: Run the production build**

Run:

```bash
pnpm build
```

Expected: exit code 0 and a successfully generated `/` route.

- [ ] **Step 4: Start the local site for browser verification**

Run:

```bash
pnpm dev
```

Expected: the Next.js development server reports a local URL and remains running.

- [ ] **Step 5: Verify the desktop intro at a viewport at least 768px wide**

In the in-app browser:

1. Open the reported local homepage URL at 1440×900.
2. Confirm the cream loader appears before playback.
3. Confirm the requested media URL is `/new-asset/intro-video/pc.mp4` and `mo.mp4` is not requested.
4. Confirm the video is muted, fills the viewport without letterboxing, and the page does not scroll during playback.
5. Let playback finish and confirm the overlay moves slightly down while fading away.
6. Confirm the landing modal queue begins after the overlay is gone.

Expected: all six checks pass.

- [ ] **Step 6: Verify the mobile intro below 768px**

Reload the homepage at 390×844:

1. Confirm the requested media URL is `/new-asset/intro-video/mo.mp4` and `pc.mp4` is not requested.
2. Confirm the video fills the mobile viewport with intentional edge cropping.
3. Confirm inline playback and the same loader and exit behavior.

Expected: all three checks pass.

- [ ] **Step 7: Verify the failure fallback**

Use browser request blocking for `**/new-asset/intro-video/*.mp4` and reload the homepage.

Expected: the cream overlay exits within the loading timeout, scroll is restored, and the homepage remains usable.

- [ ] **Step 8: Review the final diff for scope and user-owned changes**

Run:

```bash
git status --short
git diff --check
git diff --stat HEAD~4..HEAD
```

Expected: only intro-video assets, tests, feature files, `src/app/page.tsx`, and the already committed design/plan documents belong to this work. The pre-existing modification to `public/asset/csv/omurice_kakao_stores_clean.csv` remains untouched.

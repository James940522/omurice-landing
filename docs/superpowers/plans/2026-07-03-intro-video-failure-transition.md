# Intro Video Failure Transition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the branded loading layer visible during failure exit and show the complete desktop video without cropping.

**Architecture:** Reuse the existing `state.hasStarted` flag as the loading-layer visibility source. Successful playback sets it to `true` and removes the loader; failure leaves it `false`, so the loader remains inside the already animated outer overlay until the 700 ms exit completes. Keep mobile on `object-cover`, switch desktop to `object-contain`, and expose a sampled golden background behind any desktop side areas.

**Tech Stack:** React 19, TypeScript, Framer Motion 12, Node.js test runner

---

## File Structure

- Modify `scripts/introVideoComponent.test.mjs`: define the failure-loading and responsive fitting contracts.
- Modify `src/features/intro-video/ui/IntroVideo.tsx`: keep the loading layer mounted until playback starts and apply responsive video fitting.

### Task 1: Preserve loading feedback during failure exit

**Files:**
- Modify: `scripts/introVideoComponent.test.mjs:37-43`
- Modify: `src/features/intro-video/ui/IntroVideo.tsx:113`

- [ ] **Step 1: Update the component test for the new visibility rule**

In `scripts/introVideoComponent.test.mjs`, replace:

```js
test('keeps branded loading feedback until actual playback starts', () => {
  assert.match(componentSource, /오늘은 오므라이스를 준비하고 있어요/);
  assert.match(componentSource, /state\.phase === 'loading'/);
  assert.match(componentSource, /dispatch\(\{ type: 'playing' \}\)/);
  assert.match(componentSource, /role="status"/);
  assert.match(componentSource, /aria-live="polite"/);
});
```

with:

```js
test('keeps branded loading feedback until actual playback starts', () => {
  assert.match(componentSource, /오늘은 오므라이스를 준비하고 있어요/);
  assert.match(componentSource, /\{!state\.hasStarted && \(/);
  assert.doesNotMatch(componentSource, /\{state\.phase === 'loading' && \(/);
  assert.match(componentSource, /dispatch\(\{ type: 'playing' \}\)/);
  assert.match(componentSource, /role="status"/);
  assert.match(componentSource, /aria-live="polite"/);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
node --test scripts/introVideoComponent.test.mjs
```

Expected: FAIL because `IntroVideo` still renders the loading layer only while `state.phase === 'loading'`.

- [ ] **Step 3: Implement the minimal loading-layer condition**

In `src/features/intro-video/ui/IntroVideo.tsx`, replace:

```tsx
      <AnimatePresence>
        {state.phase === 'loading' && (
```

with:

```tsx
      <AnimatePresence>
        {!state.hasStarted && (
```

Leave the loading markup, failure dispatches, timeout, and outer exit transition unchanged.

- [ ] **Step 4: Run the focused tests and verify GREEN**

Run:

```bash
node --test scripts/introVideoModel.test.mjs scripts/introVideoComponent.test.mjs
```

Expected: PASS, 9 tests and 0 failures.

- [ ] **Step 5: Commit the failure transition**

```bash
git add scripts/introVideoComponent.test.mjs src/features/intro-video/ui/IntroVideo.tsx
git commit -m "Fix: preserve loader when intro video fails"
```

### Task 2: Preserve the complete desktop video frame

**Files:**
- Modify: `scripts/introVideoComponent.test.mjs:25-35`
- Modify: `src/features/intro-video/ui/IntroVideo.tsx:76,91`

- [ ] **Step 1: Write the failing responsive fitting test**

Add this test to `scripts/introVideoComponent.test.mjs` immediately after `loads exactly one responsive muted inline video`:

```js
test('fills mobile screens while preserving the complete desktop frame', () => {
  assert.match(componentSource, /bg-\[#f29b10\]/);
  assert.match(componentSource, /object-cover md:object-contain/);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
node --test scripts/introVideoComponent.test.mjs
```

Expected: FAIL because the overlay still uses cream behind the video and the video still uses `object-cover` at every breakpoint.

- [ ] **Step 3: Implement the responsive fitting classes**

In `src/features/intro-video/ui/IntroVideo.tsx`, replace the outer overlay class:

```tsx
      className="fixed inset-0 z-[2147483647] overflow-hidden bg-[#fff9e6]"
```

with:

```tsx
      className="fixed inset-0 z-[2147483647] overflow-hidden bg-[#f29b10]"
```

Replace the video class:

```tsx
          className="absolute inset-0 h-full w-full object-cover"
```

with:

```tsx
          className="absolute inset-0 h-full w-full object-cover md:object-contain"
```

Keep the loading layer's own `bg-[#fff9e6]` class unchanged so loading and failure exits retain the approved cream treatment.

- [ ] **Step 4: Run the focused tests and verify GREEN**

Run:

```bash
node --test scripts/introVideoModel.test.mjs scripts/introVideoComponent.test.mjs
```

Expected: PASS, 10 tests and 0 failures.

- [ ] **Step 5: Commit the responsive fitting change**

```bash
git add scripts/introVideoComponent.test.mjs src/features/intro-video/ui/IntroVideo.tsx
git commit -m "Fix: preserve full desktop intro frame"
```

### Task 3: Verify the complete homepage behavior

**Files:**
- Verify: `scripts/*.test.mjs`
- Verify: `src/features/intro-video/**/*.ts`
- Verify: `src/features/intro-video/**/*.tsx`
- Verify: `src/app/page.tsx`

- [ ] **Step 1: Run the full Node regression suite**

Run:

```bash
node --test scripts/*.test.mjs
```

Expected: PASS with 0 failures.

- [ ] **Step 2: Run ESLint**

Run:

```bash
node_modules/.bin/eslint .
```

Expected: 0 errors. The two pre-existing unused-variable warnings in `MenuSection.tsx` and `ReorderProofSection.tsx` may remain.

- [ ] **Step 3: Run the production build**

Run:

```bash
node_modules/.bin/next build
```

Expected: exit code 0, successful TypeScript validation, and a generated `/` route.

- [ ] **Step 4: Confirm the final Git scope**

Run:

```bash
git status --short
git diff --check
```

Expected: no uncommitted intro-video changes. The pre-existing modification to `public/asset/csv/omurice_kakao_stores_clean.csv` remains untouched.

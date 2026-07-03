# Full-Viewport Intro Video Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the PC and mobile intro videos occupy the complete viewport without cropping or empty surrounding areas, accepting aspect-ratio distortion.

**Architecture:** Keep the existing responsive source selection, loading UI, failure fallback, and exit transition unchanged. Replace the shared video fitting class with Tailwind's `object-fill`, and protect the behavior with a source-level regression test.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, Framer Motion 12, Node.js test runner

---

## File Structure

- Modify `scripts/introVideoComponent.test.mjs`: require full-viewport fill fitting and reject crop/contain fitting.
- Modify `src/features/intro-video/ui/IntroVideo.tsx`: apply `object-fill` to the single responsive video element.
- Modify `docs/superpowers/plans/2026-07-03-intro-video-failure-transition.md`: keep the earlier implementation record consistent with the final fitting decision.

### Task 1: Fill the viewport at every breakpoint

**Files:**
- Modify: `scripts/introVideoComponent.test.mjs:25-45`
- Modify: `src/features/intro-video/ui/IntroVideo.tsx:106-112`

- [ ] **Step 1: Write the failing fitting test**

Replace the fitting assertions in `scripts/introVideoComponent.test.mjs` with:

```js
test('fills the complete viewport at every breakpoint', () => {
  assert.match(
    componentSource,
    /className="absolute inset-0 h-full w-full object-fill"/,
  );
  assert.doesNotMatch(componentSource, /object-cover|object-contain/);
});
```

Update the shared video-property assertion from:

```js
assert.match(componentSource, /object-contain/);
```

to:

```js
assert.match(componentSource, /object-fill/);
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
node --test scripts/introVideoComponent.test.mjs
```

Expected: one fitting test fails because `IntroVideo.tsx` still uses `object-contain`.

- [ ] **Step 3: Apply the minimal fitting change**

In `src/features/intro-video/ui/IntroVideo.tsx`, replace:

```tsx
className="absolute inset-0 h-full w-full object-contain"
```

with:

```tsx
className="absolute inset-0 h-full w-full object-fill"
```

- [ ] **Step 4: Run the focused tests and verify GREEN**

Run:

```bash
node --test scripts/introVideoModel.test.mjs scripts/introVideoComponent.test.mjs
```

Expected: 10 tests pass with 0 failures.

- [ ] **Step 5: Commit the behavior change**

```bash
git add scripts/introVideoComponent.test.mjs src/features/intro-video/ui/IntroVideo.tsx
git commit -m "Fix: fill viewport with intro video"
```

### Task 2: Synchronize documentation and verify the application

**Files:**
- Modify: `docs/superpowers/plans/2026-07-03-intro-video-failure-transition.md`
- Verify: `docs/superpowers/specs/2026-07-03-responsive-intro-video-design.md`

- [ ] **Step 1: Update the earlier fitting record**

Replace its responsive `object-contain` contract with the final contract:

```md
Use `object-fill` at every breakpoint so the selected video occupies the complete viewport. Aspect-ratio distortion is accepted in exchange for avoiding both cropping and empty surrounding areas.
```

- [ ] **Step 2: Run all automated checks**

Run:

```bash
node --test scripts/*.test.mjs
node_modules/.bin/eslint .
git diff --check
```

Expected: 34 tests pass, ESLint reports 0 errors, and `git diff --check` reports no formatting errors. The two pre-existing unused-variable warnings may remain.

- [ ] **Step 3: Run the production build**

Run:

```bash
node_modules/.bin/next build --webpack
```

Expected: the optimized production build completes successfully and generates the `/` route.

- [ ] **Step 4: Commit the documentation**

```bash
git add docs/superpowers/specs/2026-07-03-responsive-intro-video-design.md docs/superpowers/plans/2026-07-03-intro-video-fill.md docs/superpowers/plans/2026-07-03-intro-video-failure-transition.md
git commit -m "Docs: record full-viewport intro fitting"
```

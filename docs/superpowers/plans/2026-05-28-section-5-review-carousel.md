# Section 5 Review Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend section 5 with updated brand copy, copied review assets, a right-to-left review carousel, and a warm omurice-tone bottom line.

**Architecture:** Keep all rendering inside `CustomerBrandSection.tsx` and keep assets under `public/new-asset/sec-5/`. Use static image arrays and Framer Motion marquee animation, matching existing component patterns.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Framer Motion, `next/image`.

---

### Task 1: Asset Copy And Static Checks

**Files:**
- Copy: `public/asset/review/*` to `public/new-asset/sec-5/reviews/`
- Validate: `src/widgets/customer-brand/ui/CustomerBrandSection.tsx`

- [ ] **Step 1: Run a failing static check**

```bash
node -e "const fs=require('fs'); const s=fs.readFileSync('src/widgets/customer-brand/ui/CustomerBrandSection.tsx','utf8'); const reviewDir='public/new-asset/sec-5/reviews'; const failures=[]; if(!s.includes('한 번 주문한 고객이 다시 찾는 맛')) failures.push('new eyebrow copy missing'); if(!s.includes('reviewImages')) failures.push('review image array missing'); if(!s.includes('omuriceRibbon')) failures.push('brand ribbon marker missing'); if(!fs.existsSync(reviewDir) || fs.readdirSync(reviewDir).length < 15) failures.push('copied review assets missing'); if(failures.length){ console.error(failures.join('\\n')); process.exit(1); }"
```

Expected: FAIL before implementation because the new copy, copied assets, carousel array, and ribbon marker are not present yet.

- [ ] **Step 2: Copy the review images**

```bash
mkdir -p public/new-asset/sec-5/reviews
cp public/asset/review/* public/new-asset/sec-5/reviews/
```

Expected: `public/new-asset/sec-5/reviews/` contains 15 review screenshots.

### Task 2: Component Update

**Files:**
- Modify: `src/widgets/customer-brand/ui/CustomerBrandSection.tsx`

- [ ] **Step 1: Add review image data and updated copy**

Use the copied review paths under `/new-asset/sec-5/reviews/`, replace the supporting copy with:

```text
한 번 주문한 고객이 다시 찾는 맛
배달앱 평점 5점 만점으로 증명된 오늘은 오므라이스.
실제 고객 리뷰로 브랜드의 만족도를 확인해보세요.
```

- [ ] **Step 2: Add right-to-left carousel and ribbon**

Render duplicated review image lists inside a Framer Motion marquee with `animate={{ x: ['0%', '-50%'] }}`. Add an inline `omuriceRibbon` design using warm orange, yellow, and cream lines.

### Task 3: Verification

**Files:**
- Validate: `src/widgets/customer-brand/ui/CustomerBrandSection.tsx`
- Validate: `public/new-asset/sec-5/reviews/`

- [ ] **Step 1: Run static check**

Run the command from Task 1 Step 1.

Expected: PASS.

- [ ] **Step 2: Run section lint**

```bash
pnpm exec eslint src/widgets/customer-brand/ui/CustomerBrandSection.tsx
```

Expected: exit code 0.

- [ ] **Step 3: Run production build**

```bash
pnpm build
```

Expected: exit code 0.

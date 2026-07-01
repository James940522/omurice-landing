# Store NEW Badge Previous-Month Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mark stores as NEW when their `open_date` is in the calendar month immediately before the current month.

**Architecture:** Add a small pure date helper at the store-status feature boundary so month rollover logic is independently testable. `StoreStatusModal` calculates the NEW-eligible month once and passes it to `StoreItem`, which compares the store date and applies the existing NEW presentation.

**Tech Stack:** TypeScript, React 19, Next.js 16, Node.js test runner

---

### Task 1: Calculate the NEW-eligible opening month

**Files:**
- Create: `src/features/store-status-modal/getNewBadgeOpenMonth.ts`
- Create: `scripts/storeNewBadgeMonth.test.mjs`

- [ ] **Step 1: Write the failing date calculation tests**

```js
import assert from 'node:assert/strict';
import test from 'node:test';

const { getNewBadgeOpenMonth } = await import(
  '../src/features/store-status-modal/getNewBadgeOpenMonth.ts'
);

test('uses the immediately preceding month for the NEW badge', () => {
  assert.deepEqual(getNewBadgeOpenMonth(new Date(2026, 7, 15)), {
    year: 2026,
    month: 7,
  });
});

test('uses December of the previous year when the current month is January', () => {
  assert.deepEqual(getNewBadgeOpenMonth(new Date(2027, 0, 1)), {
    year: 2026,
    month: 12,
  });
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test scripts/storeNewBadgeMonth.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `getNewBadgeOpenMonth.ts`.

- [ ] **Step 3: Implement the pure month helper**

```ts
export interface OpenMonth {
  year: number;
  month: number;
}

export const getNewBadgeOpenMonth = (now: Date): OpenMonth => {
  const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  return {
    year: previousMonth.getFullYear(),
    month: previousMonth.getMonth() + 1,
  };
};
```

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `node --test scripts/storeNewBadgeMonth.test.mjs`

Expected: PASS, 2 tests and 0 failures.

- [ ] **Step 5: Commit the tested helper**

```bash
git add scripts/storeNewBadgeMonth.test.mjs src/features/store-status-modal/getNewBadgeOpenMonth.ts
git commit -m "Test: cover previous-month NEW badge date"
```

### Task 2: Connect the target month to store cards

**Files:**
- Modify: `scripts/storeStatusNewBadgeLayout.test.mjs`
- Modify: `src/features/store-status-modal/ui/StoreStatusModal.tsx`
- Modify: `src/features/store-status-modal/ui/StoreItem.tsx`

- [ ] **Step 1: Update the UI regression test for the new semantics**

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const itemSource = await readFile('src/features/store-status-modal/ui/StoreItem.tsx', 'utf8');
const modalSource = await readFile(
  'src/features/store-status-modal/ui/StoreStatusModal.tsx',
  'utf8'
);

test('NEW store name keeps top space below the badge at desktop widths', () => {
  assert.match(itemSource, /isNewOpen \? 'pt-\[10px\] sm:pt-\[14px\]'/);
  assert.equal(itemSource.includes("isNewOpen ? 'pt-[10px] sm:pt-0'"), false);
});

test('store cards receive the previous-month NEW badge target', () => {
  assert.match(modalSource, /getNewBadgeOpenMonth\(new Date\(Date\.now\(\)\)\)/);
  assert.match(modalSource, /newBadgeOpenMonth=\{newBadgeOpenMonth\}/);
  assert.match(itemSource, /year === newBadgeOpenMonth\.year/);
  assert.match(itemSource, /month === newBadgeOpenMonth\.month/);
});
```

- [ ] **Step 2: Run the UI regression test and verify RED**

Run: `node --test scripts/storeStatusNewBadgeLayout.test.mjs`

Expected: FAIL because `isNewOpen`, `getNewBadgeOpenMonth`, and `newBadgeOpenMonth` are not yet connected.

- [ ] **Step 3: Update `StoreStatusModal` to calculate and pass the target month**

Add the imports:

```ts
import {
  getNewBadgeOpenMonth,
  type OpenMonth,
} from '../getNewBadgeOpenMonth';
```

Replace the current-month state and effect with:

```ts
const [newBadgeOpenMonth, setNewBadgeOpenMonth] = useState<OpenMonth | null>(null);

useEffect(() => {
  setNewBadgeOpenMonth(getNewBadgeOpenMonth(new Date(Date.now())));
}, []);
```

Pass the renamed property:

```tsx
<StoreItem
  key={store.store_code}
  store={store}
  newBadgeOpenMonth={newBadgeOpenMonth}
/>
```

- [ ] **Step 4: Update `StoreItem` to compare against the target month**

Replace the property and comparison names:

```ts
interface StoreItemProps {
  store: Store;
  newBadgeOpenMonth: {
    year: number;
    month: number;
  } | null;
}
```

```ts
const getOpenStatus = (
  openDate: string,
  newBadgeOpenMonth: StoreItemProps['newBadgeOpenMonth']
) => {
  if (!DATE_PATTERN.test(openDate)) {
    return { label: '오픈완료', upcoming: false, isNewOpen: false };
  }

  const [year, month] = openDate.split('-').map(Number);
  const isNewOpen =
    newBadgeOpenMonth !== null &&
    year === newBadgeOpenMonth.year &&
    month === newBadgeOpenMonth.month;

  if (year >= 2026) {
    return { label: `${month}월 오픈`, upcoming: true, isNewOpen };
  }

  return { label: '오픈완료', upcoming: false, isNewOpen: false };
};
```

Rename all remaining `isCurrentMonthOpen` references in `StoreItem` to
`isNewOpen`, keeping the existing badge markup and padding values unchanged.

- [ ] **Step 5: Run focused tests and verify GREEN**

Run: `node --test scripts/storeNewBadgeMonth.test.mjs scripts/storeStatusNewBadgeLayout.test.mjs`

Expected: PASS, 4 tests and 0 failures.

- [ ] **Step 6: Commit the UI behavior change**

```bash
git add scripts/storeStatusNewBadgeLayout.test.mjs src/features/store-status-modal/ui/StoreStatusModal.tsx src/features/store-status-modal/ui/StoreItem.tsx
git commit -m "Fix: show NEW badge for previous-month openings"
```

### Task 3: Verify the complete change

**Files:**
- Verify: `scripts/*.test.mjs`
- Verify: `src/features/store-status-modal/**/*.ts`
- Verify: `src/features/store-status-modal/**/*.tsx`

- [ ] **Step 1: Run all script tests**

Run: `node --test scripts/*.test.mjs`

Expected: PASS with 0 failures.

- [ ] **Step 2: Run lint**

Run: `pnpm lint`

Expected: exit 0 with no new errors.

- [ ] **Step 3: Run the production build**

Run: `pnpm build`

Expected: exit 0 and a successful Next.js production build.

- [ ] **Step 4: Check the final diff and repository state**

Run: `git status --short`

Expected: only the implementation plan remains uncommitted.

- [ ] **Step 5: Commit the implementation plan**

```bash
git add docs/superpowers/plans/2026-07-01-store-new-badge-previous-month.md
git commit -m "Docs: add previous-month NEW badge plan"
```

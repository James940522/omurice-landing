# Section 5 Customer Brand Design

## Goal

Build a new section 5 that follows the provided reference capture: a white, spacious customer-proof section with the exact headline and supporting copy from the reference, plus two provided mobile app screenshots arranged as proof points.

## Placement

The section stays as `CustomerBrandSection` and appears after `ReviewsSection` and before `StoreMapSection` in `src/app/page.tsx`.

## Content

Use the reference copy exactly:

- `고객들이 선택한 브랜드`
- `It’s your um, Eat’s your um!`
- `배달앱 평점 5점 만점! 다양한 고객님들의 입맛을 사로잡은 리뷰를 직접 확인해보세요.`
- `배달앱 평점 5점 만점!`
- `지역 맛집 랭킹 1위!`

## Assets

Convert the two supplied PNG phone screenshots to optimized WebP files under `public/new-asset/sec-5/`:

- `phone-rating.webp`
- `phone-ranking.webp`

The component should reference the WebP assets, not the original PNGs.

## Layout

Desktop uses a two-part header: large black Korean headline on the left and small gray supporting copy on the right. Below, the two screenshots sit side by side with blue labels above each image, echoing the reference capture.

Mobile stacks the header and screenshots vertically, keeps text readable, and prevents the phone images from overflowing the viewport. The provided screenshots already include phone frames, so the implementation must use the images directly and must not draw an extra device frame around them.

The proof labels should be text-only. Do not add emoji icons or decorative symbols to the labels.

## Testing

Run the production build after implementation. Start or reuse a local dev server and visually inspect the section at desktop and mobile viewport widths; if the browser check cannot run, record the blocker in the handoff.

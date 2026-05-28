# Section 5 Customer Brand Design

## Goal

Build a new section 5 that follows the first provided capture as a layout reference only: a white, spacious customer-proof section with a brand-specific headline and supporting copy. The only visual assets used in the section are the provided phone-framed app screenshots.

## Placement

The section stays as `CustomerBrandSection` and appears after `ReviewsSection` and before `StoreMapSection` in `src/app/page.tsx`.

## Content

Use this section copy:

- `고객들이 선택한 브랜드`
- `오늘도 고객이 찾는 오므라이스`
- `배달앱 평점 5점 만점! 오늘은 오므라이스를 선택한 고객님들의 생생한 리뷰를 직접 확인해보세요.`
- `배달앱 평점 5점 만점!`
- `지역 맛집 랭킹 1위!`

## Assets

Use the supplied PNG phone screenshots directly from `public/new-asset/sec-5/`:

- `phone-rating.png`
- `phone-ranking.png`

The component should reference these PNG assets directly and render them without Next image format conversion. Do not convert them to WebP for this section and do not use any other image asset in this section.

## Layout

Desktop uses a two-part header: large black Korean headline on the left and small gray supporting copy on the right. Below, the supplied screenshots sit side by side with text-only blue labels above each image, echoing the reference capture.

Mobile stacks the header and screenshots vertically, keeps text readable, and prevents the phone images from overflowing the viewport. The provided screenshots already include phone frames, so the implementation must use the images directly and must not draw an extra device frame around them.

The proof labels should be text-only. Do not add emoji icons, decorative symbols, SVG waves, decorative illustration assets, background images, or any additional phone-frame drawing.

## Testing

Run the production build after implementation. Start or reuse a local dev server and visually inspect the section at desktop and mobile viewport widths; if the browser check cannot run, record the blocker in the handoff.

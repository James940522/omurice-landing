# Section 5 Customer Brand Design

## Goal

Build a new section 5 that follows the first provided capture as a layout reference only: a white, spacious customer-proof section with a brand-specific headline and supporting copy. The only visual assets used in the section are the provided phone-framed app screenshots.

## Placement

The section stays as `CustomerBrandSection` and appears after `ReviewsSection` and before `StoreMapSection` in `src/app/page.tsx`.

## Content

Use this section copy:

- `고객들이 선택한 브랜드`
- `한 번 주문한 고객이 다시 찾는 맛`
- `배달앱 평점 5점 만점으로 증명된 오늘은 오므라이스. 실제 고객 리뷰로 브랜드의 만족도를 확인해보세요.`
- `배달앱 평점 5점 만점!`
- `지역 맛집 랭킹 1위!`

## Assets

Use the supplied PNG phone screenshots directly from `public/new-asset/sec-5/`:

- `phone-rating.png`
- `phone-ranking.png`

The component should reference these PNG assets directly and render them without Next image format conversion. Do not convert them to WebP for this section and do not use any other image asset in this section.

Copy the review screenshots from `public/asset/review/` into `public/new-asset/sec-5/reviews/` and use the copied files for the section 5 review carousel.

## Layout

Desktop uses a two-part header: large black Korean headline on the left and small gray supporting copy on the right. Below, the supplied screenshots sit side by side with text-only blue labels above each image, echoing the reference capture.

Mobile stacks the header and screenshots vertically, keeps text readable, and prevents the phone images from overflowing the viewport. The provided screenshots already include phone frames, so the implementation must use the images directly and must not draw an extra device frame around them.

The proof labels should be text-only. Do not add emoji icons, decorative symbols, SVG waves, decorative illustration assets, background images, or any additional phone-frame drawing.

Below the proof phones, add a right-to-left infinite review carousel using the copied review screenshots. Duplicate the carousel item list in the DOM so the marquee loops smoothly without blank space. The carousel should overlap the lower-middle area of the phone screenshots and use a transparent-to-white gradient so the overlap feels soft instead of abrupt. The carousel should be decorative proof content and should not introduce controls.

Replace the blue wave reference with a clean brand-text marquee. Use a dark demi-glace brown band with oversized English words moving right-to-left, mixing filled omurice orange and outlined egg-yellow text for depth. The text treatment should feel refined, franchise-focused, and aligned with the Today Omurice orange/yellow tone.

## Testing

Run the production build after implementation. Start or reuse a local dev server and visually inspect the section at desktop and mobile viewport widths; if the browser check cannot run, record the blocker in the handoff.

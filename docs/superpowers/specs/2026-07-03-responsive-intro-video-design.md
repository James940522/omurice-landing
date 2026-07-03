# Responsive Intro Video Design

**Date:** 2026-07-03

## Goal

Replace the current full-screen intro animation with a responsive, muted intro video that plays every time the homepage is entered. Show a branded loading state until playback begins, then reveal the homepage with a soft downward fade after the video finishes.

## Assets

Copy the supplied files without re-encoding:

- `/Users/james/Documents/hero/omurice/pc.mp4` → `public/new-asset/intro-video/pc.mp4`
- `/Users/james/Documents/hero/omurice/mo.mp4` → `public/new-asset/intro-video/mo.mp4`

Both videos are 6.0417 seconds long. The desktop video is 1168×784 and the mobile video is 784×1168.

## Selected Approach

Create a dedicated `IntroVideo` feature. On mount, use `window.matchMedia('(max-width: 767px)')` once to select the mobile or desktop source. Assign only the selected file to the video element so the browser does not download both assets.

The source remains fixed for that intro playback even if the viewport changes. Switching sources during playback would restart the intro, which is a worse experience than keeping the initially selected layout.

Alternatives not selected:

- Media-qualified `<source>` elements are less explicit to control and test.
- Rendering both videos and hiding one with CSS risks downloading both large files.

## Component and Page Integration

Add:

- `src/features/intro-video/ui/IntroVideo.tsx`
- `src/features/intro-video/index.ts`

`IntroVideo` accepts the same simple integration contract as the old feature:

- `isVisible: boolean`
- `onComplete: () => void`

In `src/app/page.tsx`:

- Import and render `IntroVideo`.
- Comment out, rather than delete, the existing `IntroAnimation` import and JSX usage.
- Keep the existing `showIntro` state and completion callback.

This preserves the current modal queue behavior: landing modals begin only after the intro has fully exited.

## Playback and Visual Behavior

The full-screen overlay:

- Uses the existing intro z-index of `2147483647` so it sits above the homepage and modals.
- Uses `#f29b10`, sampled from the desktop video's outer background, behind the video.
- Locks document and body scrolling while visible.
- Restores the previous inline scroll styles on completion or unmount.
- Uses `100dvh` and safe full-viewport positioning.

The video:

- Uses `autoPlay`, `muted`, `playsInline`, and `preload="auto"`.
- Uses `object-fit: contain` at every breakpoint so both mobile and desktop videos remain fully visible without cropping.
- Allows golden areas around the video when its aspect ratio differs from the viewport.
- Has no controls and does not loop.
- Starts transparent beneath the loading layer and fades in when actual playback begins.

The loading UI:

- Appears immediately while the responsive source is being selected and buffered.
- Uses a warm cream full-screen background, a brand-yellow CSS spinner, and the Korean label `오늘은 오므라이스를 준비하고 있어요`.
- Does not depend on an image asset, so it can render before other assets load.
- Fades away only after the video fires `playing`, avoiding a blank frame between loading and playback.

When playback ends:

- Move the entire overlay down by `8dvh` while fading its opacity to zero.
- Use a 700 ms ease-in-out transition.
- Call `onComplete` only after the exit transition finishes.

For users requesting reduced motion, keep the opacity transition but remove the downward travel.

## State Flow

The component uses a small explicit state flow:

1. `selecting`: determine desktop or mobile source.
2. `loading`: source is assigned; loading UI remains visible.
3. `playing`: video has emitted `playing`; loading UI fades away.
4. `exiting`: video ended or a fallback condition occurred.
5. Completion: exit animation ends, scroll is restored, and `onComplete` is called once.

Repeated media events must not call `onComplete` more than once.

## Failure Handling

The intro must never trap the visitor:

- A video `error` event starts the same graceful exit.
- A rejected programmatic playback attempt starts the same graceful exit.
- If playback has not begun within 15 seconds after assigning the source, start the graceful exit.
- Clear the timeout as soon as playback begins or the component unmounts.

No error message is shown; the underlying homepage is the fallback content.

## Testing and Verification

Add focused regression coverage that verifies:

- The mobile source is selected below 768px and the desktop source at 768px and above.
- The video is muted, inline, autoplaying, preloaded, and non-looping.
- Mobile and desktop both use contain fitting over the golden background.
- The loading UI remains until the `playing` event.
- `ended`, `error`, rejected playback, and timeout paths trigger an exit.
- Completion occurs once and only after the exit transition.
- Scroll styles are restored on completion and unmount.
- `page.tsx` renders `IntroVideo` while the legacy `IntroAnimation` integration is commented out.

Run the relevant tests, lint, and production build. Then verify the intro in a real browser at desktop and mobile viewport sizes, including the loading layer and end transition.

## Acceptance Criteria

- Every homepage entry plays the appropriate PC or mobile video once.
- The browser requests only the selected responsive video.
- Visitors see branded loading UI until the video actually starts.
- Mobile and desktop playback are muted, inline, and shown in full without cropping; golden surrounding areas are acceptable.
- The completed video moves slightly down while fading out.
- The homepage and existing landing modals continue normally afterward.
- Video failures and slow loads always release the page.
- The previous intro implementation remains in the repository and its page integration is commented out.

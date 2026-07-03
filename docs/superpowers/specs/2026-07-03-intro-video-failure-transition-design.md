# Intro Video Failure Transition Design

**Date:** 2026-07-03

## Goal

If the responsive intro video cannot load or play, keep the experience visually intentional: continue showing the branded loading UI while the intro overlay fades away, then expose the homepage without an error message.

## Selected Behavior

- Normal playback remains unchanged.
- A video error, rejected `play()` call, or 15-second loading timeout still enters the existing `exiting` state.
- When exit begins before playback has started, keep the cream loading layer, yellow spinner, and loading label mounted.
- Fade and move the complete loading overlay down using the existing 700 ms exit transition.
- Do not add an artificial minimum loading duration.
- Do not show an error message or retry control.
- Restore scrolling and continue the existing landing-modal queue after the overlay completes its exit.

This gives immediate failures enough visual continuity to avoid a flash while still releasing the visitor as quickly as the existing transition allows.

## Implementation Boundary

Update only the loading-layer visibility rule in `IntroVideo`. The existing state model already records whether playback started through `state.hasStarted`, so the loading layer should remain present whenever `state.hasStarted` is `false`, including during a failure-driven exit.

No new state, timeout, dependency, or page integration is required.

## Testing

Update the component regression test to require a loading-layer condition based on `!state.hasStarted` instead of only `state.phase === 'loading'`.

Verify:

- Failure before playback keeps the loading layer mounted during exit.
- Successful playback still removes the loading layer after the `playing` event.
- Existing error, timeout, scroll restoration, responsive source, and homepage integration tests remain green.
- Lint and the production build still pass.

## Acceptance Criteria

- An immediate video failure never exposes a blank or broken-video frame.
- The visitor sees the branded loading UI fade and move down, then the homepage.
- No failure text is presented.
- The failure-handling change does not alter source selection or playback timing.

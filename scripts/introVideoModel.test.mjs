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

  assert.equal(typeof reduceIntroVideoState, 'function');
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

  assert.equal(typeof reduceIntroVideoState, 'function');
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

  assert.equal(typeof reduceIntroVideoState, 'function');
  assert.deepEqual(
    reduceIntroVideoState(exitingState, { type: 'playing' }),
    exitingState
  );
  assert.deepEqual(
    reduceIntroVideoState(exitingState, { type: 'reset' }),
    INITIAL_INTRO_VIDEO_STATE
  );
});

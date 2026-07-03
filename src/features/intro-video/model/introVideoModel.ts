export const INTRO_VIDEO_MOBILE_QUERY = '(max-width: 767px)';
export const INTRO_VIDEO_LOADING_TIMEOUT_MS = 15_000;

const INTRO_VIDEO_SOURCES = {
  desktop: '/new-asset/intro-video/pc.mp4',
  mobile: '/new-asset/intro-video/mo.mp4',
} as const;

export const getIntroVideoSource = (isMobile: boolean) =>
  isMobile ? INTRO_VIDEO_SOURCES.mobile : INTRO_VIDEO_SOURCES.desktop;

export type IntroVideoPhase = 'loading' | 'playing' | 'exiting';

export interface IntroVideoState {
  phase: IntroVideoPhase;
  hasStarted: boolean;
}

export type IntroVideoEvent =
  | { type: 'reset' }
  | { type: 'playing' }
  | { type: 'finish' }
  | { type: 'failure' };

export const INITIAL_INTRO_VIDEO_STATE: IntroVideoState = {
  phase: 'loading',
  hasStarted: false,
};

export const reduceIntroVideoState = (
  state: IntroVideoState,
  event: IntroVideoEvent
): IntroVideoState => {
  if (event.type === 'reset') {
    return INITIAL_INTRO_VIDEO_STATE;
  }

  if (state.phase === 'exiting') {
    return state;
  }

  if (event.type === 'playing') {
    return {
      phase: 'playing',
      hasStarted: true,
    };
  }

  return {
    phase: 'exiting',
    hasStarted: state.hasStarted,
  };
};

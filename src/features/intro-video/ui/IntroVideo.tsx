'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useReducer, useRef, useState } from 'react';

import {
  getIntroVideoSource,
  INITIAL_INTRO_VIDEO_STATE,
  INTRO_VIDEO_LOADING_TIMEOUT_MS,
  INTRO_VIDEO_MOBILE_QUERY,
  reduceIntroVideoState,
} from '../model/introVideoModel';

interface IntroVideoProps {
  isVisible: boolean;
  onComplete: () => void;
}

export default function IntroVideo({
  isVisible,
  onComplete,
}: IntroVideoProps) {
  const [source, setSource] = useState<string | null>(null);
  const [state, dispatch] = useReducer(
    reduceIntroVideoState,
    INITIAL_INTRO_VIDEO_STATE
  );
  const completionCalledRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isVisible) {
      setSource(null);
      return;
    }

    completionCalledRef.current = false;
    dispatch({ type: 'reset' });

    const isMobile = window.matchMedia(INTRO_VIDEO_MOBILE_QUERY).matches;
    setSource(getIntroVideoSource(isMobile));
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyHeight = document.body.style.height;
    const previousRootOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.body.style.height = '100dvh';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.height = previousBodyHeight;
      document.documentElement.style.overflow = previousRootOverflow;
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || !source || state.phase !== 'loading') return;

    const timeout = window.setTimeout(() => {
      dispatch({ type: 'failure' });
    }, INTRO_VIDEO_LOADING_TIMEOUT_MS);

    return () => window.clearTimeout(timeout);
  }, [isVisible, source, state.phase]);

  if (!isVisible) return null;

  const handleCanPlay = (video: HTMLVideoElement) => {
    const playAttempt = video.play();
    void playAttempt.catch(() => dispatch({ type: 'failure' }));
  };

  const handleAnimationComplete = () => {
    if (state.phase !== 'exiting' || completionCalledRef.current) return;

    completionCalledRef.current = true;
    onComplete();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[2147483647] overflow-hidden bg-[#fff9e6]"
      style={{ height: '100dvh' }}
      initial={{ opacity: 1, y: 0 }}
      animate={
        state.phase === 'exiting'
          ? {
              opacity: 0,
              y: prefersReducedMotion ? 0 : '8dvh',
            }
          : { opacity: 1, y: 0 }
      }
      transition={{
        duration: 0.7,
        ease: [0.42, 0, 0.58, 1],
      }}
      aria-busy={state.phase === 'loading'}
      onAnimationComplete={handleAnimationComplete}
    >
      {source && (
        <motion.video
          key={source}
          src={source}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: state.hasStarted ? 1 : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onCanPlay={(event) => handleCanPlay(event.currentTarget)}
          onPlaying={() => dispatch({ type: 'playing' })}
          onEnded={() => dispatch({ type: 'finish' })}
          onError={() => dispatch({ type: 'failure' })}
        />
      )}

      <AnimatePresence>
        {state.phase === 'loading' && (
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-[#fff9e6]"
            role="status"
            aria-live="polite"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <span
              className="h-11 w-11 animate-spin rounded-full border-[3px] border-[#fec601]/25 border-t-[#fec601]"
              aria-hidden="true"
            />
            <p className="text-sm font-semibold tracking-[-0.01em] text-[#6b4423] sm:text-base">
              오늘은 오므라이스를 준비하고 있어요
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

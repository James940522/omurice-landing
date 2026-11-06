import type { CSSProperties } from 'react';

import styles from './SlotNumber.module.css';

interface SlotNumberProps {
  className?: string;
}

const REELS = [
  { steps: 32, duration: '2.5s' },
  { steps: 40, duration: '2.85s' },
  { steps: 50, duration: '3.2s' },
] as const;

export default function SlotNumber({ className }: SlotNumberProps) {
  return (
    <span
      className={[styles.number, className].filter(Boolean).join(' ')}
      role="img"
      aria-label="200"
    >
      {REELS.map(({ steps, duration }, reelIndex) => (
        <span
          key={reelIndex}
          className={styles.window}
          aria-hidden="true"
          style={
            {
              '--slot-steps': steps,
              '--slot-duration': duration,
            } as CSSProperties
          }
        >
          <span className={styles.track}>
            {Array.from({ length: steps + 1 }, (_, index) => (
              <span className={styles.digit} key={index}>
                {index % 10}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

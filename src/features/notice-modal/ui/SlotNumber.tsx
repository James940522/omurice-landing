import type { CSSProperties } from 'react';

import styles from './SlotNumber.module.css';

interface SlotNumberProps {
  className?: string;
}

// A shuffled sequence keeps the reels varied without server/client random mismatches.
const SPIN_DIGITS = [8, 3, 6, 1, 9, 4, 7, 0, 5, 2, 9, 5, 0, 7, 3, 8, 2, 6, 4, 1];

const REELS = [
  { steps: 96, duration: '2.5s', target: 2 },
  { steps: 120, duration: '2.85s', target: 0 },
  { steps: 150, duration: '3.2s', target: 0 },
].map((reel, reelIndex) => ({
  ...reel,
  digits: Array.from({ length: reel.steps + 1 }, (_, index) =>
    index === reel.steps ? reel.target : SPIN_DIGITS[(index + reelIndex * 7) % SPIN_DIGITS.length]
  ),
}));

export default function SlotNumber({ className }: SlotNumberProps) {
  return (
    <span
      className={[styles.number, className].filter(Boolean).join(' ')}
      role="img"
      aria-label="200"
    >
      {REELS.map(({ steps, duration, digits }, reelIndex) => (
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
            {digits.map((digit, index) => (
              <span className={styles.digit} key={index}>
                {digit}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

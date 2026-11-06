'use client';

import { useId } from 'react';
import { AnnouncementModal, type ModalSequence } from '@/shared/ui';
import SlotNumber from './SlotNumber';
import styles from './StoreMilestoneModal.module.css';

interface StoreMilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  sequence?: ModalSequence;
}

const LAUREL_LEAVES = [
  { x: 229, y: 800, angle: -76, size: 1.12 },
  { x: 189, y: 775, angle: 50, size: 1.06 },
  { x: 158, y: 739, angle: -65, size: 1.06 },
  { x: 131, y: 700, angle: -80, size: 1 },
  { x: 110, y: 657, angle: 55, size: 0.96 },
  { x: 101, y: 612, angle: -30, size: 0.94 },
  { x: 105, y: 569, angle: 65, size: 0.87 },
  { x: 120, y: 527, angle: -5, size: 0.84 },
  { x: 142, y: 490, angle: 65, size: 0.78 },
  { x: 170, y: 458, angle: -4, size: 0.7 },
];

function MilestonePoster() {
  const id = useId().replace(/:/g, '');

  return (
    <div className={styles.poster} aria-hidden="true">
      <svg className={styles.art} viewBox="0 0 1080 1440" fill="none">
        <defs>
          <radialGradient id={`${id}-background`} cx="50%" cy="42%" r="76%">
            <stop stopColor="#4c1b02" />
            <stop offset="0.56" stopColor="#351000" />
            <stop offset="1" stopColor="#210900" />
          </radialGradient>
          <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#fff8ad" />
            <stop offset="0.28" stopColor="#fff500" />
            <stop offset="0.7" stopColor="#ffcf00" />
            <stop offset="1" stopColor="#ffed55" />
          </linearGradient>
          <linearGradient id={`${id}-orange`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#ff9a00" />
            <stop offset="1" stopColor="#ff6500" />
          </linearGradient>
          <linearGradient id={`${id}-ribbon`} x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#fff100" />
            <stop offset="0.5" stopColor="#fff6a2" />
            <stop offset="1" stopColor="#ffcf30" />
          </linearGradient>
          <radialGradient id={`${id}-flare`}>
            <stop stopColor="#fff" />
            <stop offset="0.13" stopColor="#ffff9b" />
            <stop offset="0.4" stopColor="#ffb600" />
            <stop offset="1" stopColor="#ff6500" stopOpacity="0" />
          </radialGradient>
          <pattern id={`${id}-grid`} width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 H 0 V 48" stroke="#b46a24" strokeOpacity="0.13" />
          </pattern>
          <filter id={`${id}-shadow`} x="-25%" y="-25%" width="150%" height="160%">
            <feDropShadow dx="0" dy="9" stdDeviation="4" floodColor="#120600" />
          </filter>
          <clipPath id={`${id}-frame`}>
            <rect x="18" y="48" width="1044" height="1344" rx="36" />
          </clipPath>
        </defs>

        <rect width="1080" height="1440" fill={`url(#${id}-background)`} />
        <g clipPath={`url(#${id}-frame)`}>
          <rect width="1080" height="1440" fill={`url(#${id}-grid)`} />
          <path d="m890 350 250 90-32 93-250-90z" fill="#c65a00" opacity="0.2" />

          <g fill="#ffed00">
            <path d="M227 119h80m466 0h80" stroke="#ffed00" strokeWidth="3" />
            <text
              x="540"
              y="131"
              textAnchor="middle"
              fontSize="32"
              fontWeight="900"
              letterSpacing="8"
            >
              TODAY OMURICE
            </text>
          </g>
          <g filter={`url(#${id}-shadow)`}>
            <text
              className={styles.heading}
              x="540"
              y="271"
              textAnchor="middle"
              fill="#fffdf7"
              fontSize="112"
              fontWeight="900"
              letterSpacing="-8"
            >
              오늘은 오므라이스
            </text>
            <rect
              x="304"
              y="328"
              width="472"
              height="108"
              rx="54"
              stroke="#fff000"
              strokeWidth="7"
            />
            <text
              x="540"
              y="409"
              textAnchor="middle"
              fill="#fffdf7"
              fontSize="78"
              fontWeight="900"
              fontStyle="italic"
              letterSpacing="-4"
            >
              광고 없이
            </text>

            {[false, true].map((mirrored) => (
              <g
                key={String(mirrored)}
                transform={mirrored ? 'translate(1100 0) scale(-1 1)' : 'translate(-20 0)'}
              >
                <path
                  d="M230 803C83 755 58 573 170 458"
                  stroke={`url(#${id}-gold)`}
                  strokeWidth="5"
                />
                {LAUREL_LEAVES.map(({ x, y, angle, size }, index) => (
                  <path
                    key={index}
                    d="M0 0C-28-14-35-48-18-69C6-50 13-22 0 0Z"
                    transform={`translate(${x} ${y}) rotate(${angle}) scale(${size})`}
                    fill={`url(#${id}-gold)`}
                    stroke="#fff12a"
                    strokeWidth="1"
                  />
                ))}
              </g>
            ))}

            <text
              className={styles.heading}
              x="804"
              y="653"
              textAnchor="middle"
              fill="#fffdf7"
              fontSize="175"
              fontWeight="900"
              letterSpacing="-15"
            >
              호점
            </text>
            <text
              className={styles.heading}
              x="540"
              y="867"
              textAnchor="middle"
              fill={`url(#${id}-orange)`}
              fontSize="215"
              fontWeight="900"
              fontStyle="italic"
              letterSpacing="-12"
            >
              돌파
            </text>
          </g>

          <rect x="75" y="914" width="930" height="99" rx="50" stroke="#ffed00" strokeWidth="7" />
          <text
            x="540"
            y="983"
            textAnchor="middle"
            fill="#fffdf7"
            fontSize="56"
            fontWeight="900"
            letterSpacing="-2"
          >
            현재 운영 중인 매장 <tspan fill="#ffed00">200호점</tspan> 돌파!
          </text>
          <g
            className={styles.desktopCopy}
            fill="#fffdf7"
            textAnchor="middle"
            fontWeight="500"
            letterSpacing="-1.2"
          >
            <text x="540" y="1072" fontSize="39">
              고객의 선택으로, 광고 없이도
            </text>
            <text x="540" y="1125" fontSize="39">
              오늘은 오므라이스가 <tspan fontWeight="800">200호점을 돌파</tspan>했습니다.
            </text>
            <text x="540" y="1181" fontSize="35">
              성원해주신 모든 점주님과 고객 여러분께 진심으로 감사드립니다.
            </text>
          </g>

          <g
            className={styles.mobileCopy}
            fill="#fffdf7"
            textAnchor="middle"
            fontSize="45"
            fontWeight="500"
            letterSpacing="-1.2"
          >
            <text x="540" y="1060">
              고객의 선택으로, 광고 없이도
            </text>
            <text x="540" y="1117">
              오늘은 오므라이스가 <tspan fontWeight="800">200호점을 돌파</tspan>했습니다.
            </text>
            <text x="540" y="1174">
              성원해주신 모든 점주님과
            </text>
            <text x="540" y="1231">
              고객 여러분께 진심으로 감사드립니다.
            </text>
          </g>

          <g className={styles.desktopCopy}>
            <ellipse cx="540" cy="1226" rx="340" ry="10" fill={`url(#${id}-flare)`} />
            <ellipse cx="540" cy="1226" rx="270" ry="3" fill={`url(#${id}-flare)`} />
          </g>
          <g className={styles.mobileCopy}>
            <ellipse cx="540" cy="1270" rx="340" ry="10" fill={`url(#${id}-flare)`} />
            <ellipse cx="540" cy="1270" rx="270" ry="3" fill={`url(#${id}-flare)`} />
          </g>
          <path d="M18 1287C292 1405 675 1300 1062 1228V1395H18Z" fill={`url(#${id}-ribbon)`} />
          <path
            d="M18 1287C292 1405 675 1300 1062 1228V1258C667 1347 277 1417 18 1313Z"
            fill="#fff9dc"
          />
          <path d="M18 1342C321 1448 688 1329 1062 1267V1395H18Z" fill="#ffb600" />
          <path d="M18 1373C334 1465 715 1335 1062 1303V1395H18Z" fill={`url(#${id}-orange)`} />
        </g>
        <rect x="18" y="48" width="1044" height="1344" rx="36" stroke="#fff000" strokeWidth="8" />
        <rect
          x="23"
          y="53"
          width="1034"
          height="1334"
          rx="32"
          stroke="#fff9b1"
          strokeWidth="2"
          opacity="0.85"
        />
      </svg>
      <div className={styles.number}>
        <SlotNumber />
      </div>
    </div>
  );
}

export default function StoreMilestoneModal({
  isOpen,
  onClose,
  sequence,
}: StoreMilestoneModalProps) {
  if (!isOpen) return null;

  return (
    <AnnouncementModal
      isOpen={isOpen}
      onClose={onClose}
      modalId="store-milestone"
      title="200호점 돌파"
      sequence={sequence}
      width={styles.popupWidth}
    >
      <h2 className="sr-only">오늘은 오므라이스, 광고 없이 200호점 돌파!</h2>
      <p className="sr-only">
        현재 운영 중인 매장 200호점 돌파! 고객의 선택으로, 광고 없이도 오늘은 오므라이스가 200호점을
        돌파했습니다. 성원해주신 모든 점주님과 고객 여러분께 진심으로 감사드립니다.
      </p>
      <MilestonePoster />
    </AnnouncementModal>
  );
}

'use client';

import type { CSSProperties } from 'react';

const franchiseWords = [
  'TODAY OMURICE FRANCHISE',
  'NO HIDDEN COST',
  'OWNER FIRST SYSTEM',
  'HONEST STARTUP COST',
  'OPEN YOUR STORE',
];

const signatureWords = [
  'SIGNATURE SAUCE',
  'TODAY OMURICE',
  'RICE OMELET',
  'FRESH TOPPING',
  'BEST CHOICE',
];

type MarqueeLineProps = {
  items: string[];
  direction: 'left' | 'right';
  duration: string;
  className: string;
  dotClassName: string;
};

function MarqueeLine({
  items,
  direction,
  duration,
  className,
  dotClassName,
}: MarqueeLineProps) {
  const animationClass = direction === 'right' ? 'omurice-marquee-right' : 'omurice-marquee-left';

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`${animationClass} flex h-full w-max items-center whitespace-nowrap`}
        style={{ '--duration': duration } as CSSProperties}
      >
        {Array.from({ length: 4 }).map((_, groupIndex) => (
          <div key={`marquee-group-${groupIndex}`} className="flex shrink-0 items-center">
            {items.map((item, itemIndex) => (
              <span
                key={`${groupIndex}-${itemIndex}-${item}`}
                className="flex items-center px-4 font-heading text-[0.7rem] font-black uppercase tracking-[0.12em] sm:px-7 sm:text-sm lg:px-9 lg:text-base"
              >
                {item}
                <span className={`ml-4 size-1.5 rounded-full sm:ml-7 ${dotClassName}`} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

type SectionMarqueeProps = {
  variant?: 'all' | 'franchise' | 'signature';
};

export function SectionMarquee({ variant = 'all' }: SectionMarqueeProps) {
  const showFranchise = variant === 'all' || variant === 'franchise';
  const showSignature = variant === 'all' || variant === 'signature';

  return (
    <div
      aria-hidden="true"
      className="relative z-10 overflow-hidden border-y border-[#4a260f]/10 bg-[#fff7df]"
    >
      {showFranchise ? (
        <MarqueeLine
          items={franchiseWords}
          direction="left"
          duration="30s"
          className="h-8 bg-[#ff6b12] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] sm:h-10"
          dotClassName="bg-[#fec601]"
        />
      ) : null}
      {showSignature ? (
        <MarqueeLine
          items={signatureWords}
          direction="right"
          duration="36s"
          className="h-9 bg-[#fec601] text-[#5a270d] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] sm:h-11"
          dotClassName="bg-[#ff6b12]"
        />
      ) : null}
    </div>
  );
}

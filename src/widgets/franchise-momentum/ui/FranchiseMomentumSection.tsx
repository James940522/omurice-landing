'use client';

import { motion, useInView } from 'framer-motion';
import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import { fetchStoreCount } from '@/lib/stores';

const ownerQuotes = [
  {
    region: '경북 OO점',
    quote: '두 번째 가게 오픈 준비 중이예요',
  },
  {
    region: '충남 OO점',
    quote: '본사와의 소통이 너무 편해요',
  },
  {
    region: '경기 OO점',
    quote: '알바하다가 장사가 잘 돼서 저도 창업했어요',
  },
  {
    region: '서울 OO점',
    quote: '오므라이스는 블루오션이라 출혈경쟁이 없어요',
  },
  {
    region: '충북 OO점',
    quote: '오늘은 오므라이스는 회전률이 정말 빨라요',
  },
  {
    region: '서울 OO점',
    quote: '창업 혜택이 너무 좋았어요',
  },
  {
    region: '부산 OO점',
    quote: '처음부터 끝까지 책임지고 도와주는 본사라 믿고 맡겨요',
  },
  {
    region: '전남 OO점',
    quote: '오므라이스 재주문율이 엄청 높아요',
  },
  {
    region: '전북 OO점',
    quote: '대행업체 사장님 소개로 창업했어요',
  },
  {
    region: '경기 OO점',
    quote: '2호점 오픈했고, 3호점 오픈준비 중이예요',
  },
  {
    region: '경남 OO점',
    quote: '오므라이스 프랜차이즈 1등이라 창업했어요',
  },
  {
    region: '강원 OO점',
    quote: '지속적인 관리가 너무 좋아요',
  },
  {
    region: '경기 OO점',
    quote: '가게 하나 더 오픈 준비 중이예요',
  },
  {
    region: '충남 OO점',
    quote: '1인 운영 최적화 프랜차이즈라 너무 편해요',
  },
  {
    region: '경기 OO점',
    quote: '오므라이스는 꾸준해서 좋아요',
  },
  {
    region: '대구 OO점',
    quote: '안정적으로 매출이 조금씩 오르고 있어요',
  },
  {
    region: '충북 OO점',
    quote: '소형 매장에서도 가능해서 좋아요',
  },
  {
    region: '전북 OO점',
    quote: '메뉴 사진 퀄리티가 타 프랜차이즈 보다 높아요',
  },
];

const topQuotes = ownerQuotes.slice(0, 9);
const bottomQuotes = ownerQuotes.slice(9);

const ribbonWords = [
  'TODAY OMURICE',
  'OWNER FIRST',
  'FRANCHISE REVIEW',
  'NO.1 OMURICE',
  'REORDER BRAND',
];

const getLoopItems = <T,>(items: T[]) => [...items, ...items, ...items, ...items];

function RibbonMarquee({ direction, duration }: { direction: 'left' | 'right'; duration: string }) {
  const animationClass = direction === 'right' ? 'omurice-marquee-right' : 'omurice-marquee-left';

  return (
    <div className="h-full overflow-hidden bg-[#4a220c] shadow-[0_12px_24px_rgba(74,34,12,0.28)]">
      <div
        className={`${animationClass} flex h-full w-max items-center whitespace-nowrap`}
        style={{ '--duration': duration } as CSSProperties}
      >
        {getLoopItems(ribbonWords).map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="flex items-center px-5 font-heading text-base font-black uppercase tracking-[0.08em] text-[#fec601] sm:px-8 sm:text-xl lg:text-2xl"
          >
            <span className="mr-4 grid size-6 place-items-center rounded-full border-2 border-[#fec601] text-[0.58em] sm:mr-5 sm:size-8">
              TO
            </span>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

function QuoteCard({ region, quote }: { region: string; quote: string }) {
  return (
    <article className="relative h-[144px] w-[256px] shrink-0 rounded-[8px] border border-[#f2c000] bg-white px-5 py-6 text-center shadow-[0_14px_28px_rgba(137,71,0,0.18)] sm:h-[168px] sm:w-[318px] sm:px-7 sm:py-7 lg:h-[184px] lg:w-[360px]">
      <span className="absolute left-3 top-3 size-5 rounded-tl-[7px] border-l border-t border-[#f2c000]" />
      <span className="absolute right-3 top-3 size-5 rounded-tr-[7px] border-r border-t border-[#f2c000]" />
      <span className="absolute bottom-3 left-3 size-5 rounded-bl-[7px] border-b border-l border-[#f2c000]" />
      <span className="absolute bottom-3 right-3 size-5 rounded-br-[7px] border-b border-r border-[#f2c000]" />

      <h3 className="font-heading text-base font-black text-[#2b1608] sm:text-xl">{region}</h3>
      <p className="mt-2 font-heading text-sm font-black tracking-[0.08em] text-[#f01818] sm:text-base">
        ★★★★★
      </p>
      <p className="mx-auto mt-3 max-w-[16rem] break-keep text-sm font-black leading-relaxed text-[#32190b] sm:text-base">
        “{quote}”
      </p>
    </article>
  );
}

function QuoteCarousel({
  items,
  direction,
  duration,
}: {
  items: typeof ownerQuotes;
  direction: 'left' | 'right';
  duration: string;
}) {
  const animationClass = direction === 'right' ? 'omurice-marquee-right' : 'omurice-marquee-left';

  return (
    <div className="overflow-hidden">
      <div
        className={`${animationClass} flex w-max items-stretch gap-5 px-5 sm:gap-7 sm:px-7 lg:gap-8`}
        style={{ '--duration': duration } as CSSProperties}
      >
        {getLoopItems(items).map((item, index) => (
          <QuoteCard key={`${item.region}-${index}-${item.quote}`} {...item} />
        ))}
      </div>
    </div>
  );
}

export default function FranchiseMomentumSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -14% 0px', amount: 0.18 });
  const [storeCount, setStoreCount] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetchStoreCount().then((count) => {
      if (isMounted) {
        setStoreCount(count);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleCount = storeCount ?? 157;

  return (
    <section
      id="franchise-momentum"
      ref={ref}
      aria-labelledby="franchise-momentum-title"
      className="relative isolate overflow-hidden bg-[#fec601] py-14 text-[#32190b] sm:py-16 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_46%,rgba(255,245,182,0.52),transparent_34%),linear-gradient(135deg,#ffb600_0%,#fec601_42%,#f7a900_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(74,34,12,0.42) 1px, transparent 1px), linear-gradient(90deg, rgba(74,34,12,0.42) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />
      <div className="pointer-events-none absolute left-[6%] top-[8%] -z-10 h-48 w-48 rounded-full bg-white/18 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[10%] right-[8%] -z-10 h-56 w-56 rounded-full bg-[#ff6b12]/18 blur-3xl" />

      <div className="relative z-10">
        <QuoteCarousel items={topQuotes} direction="left" duration="54s" />
      </div>

      <div className="pointer-events-none absolute -right-24 top-0 z-20 h-11 w-[calc(100vw+10rem)] rotate-[6deg] overflow-hidden sm:-right-28 sm:-top-1 sm:h-12 lg:-right-36 lg:-top-2 lg:h-14 lg:w-[calc(100vw+18rem)]">
        <RibbonMarquee direction="left" duration="25s" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.72, ease: 'easeOut' }}
        className="relative z-10 mx-auto flex min-h-[270px] max-w-7xl items-center justify-center px-4 py-16 text-center sm:min-h-[330px] sm:py-20 lg:min-h-[390px] lg:py-24"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-36 w-[72vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff6b12]/18 blur-3xl" />
        <h2
          id="franchise-momentum-title"
          className="break-keep font-heading text-[clamp(2.8rem,8vw,7rem)] font-black italic leading-[0.95] tracking-[-0.06em] text-white drop-shadow-[0_7px_0_rgba(74,34,12,0.2),0_18px_36px_rgba(125,63,0,0.16)]"
        >
          {visibleCount}명이 선택한 프랜차이즈
        </h2>
      </motion.div>

      <div className="relative z-10">
        <QuoteCarousel items={bottomQuotes} direction="right" duration="58s" />
      </div>

      <div className="pointer-events-none absolute -left-24 bottom-0 z-20 h-11 w-[calc(100vw+10rem)] rotate-[6deg] overflow-hidden sm:-bottom-1 sm:-left-28 sm:h-12 lg:-bottom-2 lg:-left-36 lg:h-14 lg:w-[calc(100vw+18rem)]">
        <RibbonMarquee direction="right" duration="27s" />
      </div>
    </section>
  );
}

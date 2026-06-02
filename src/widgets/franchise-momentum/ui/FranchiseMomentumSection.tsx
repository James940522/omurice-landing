'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { fetchStoreCount, fetchStores } from '@/lib/stores';
import type { Store } from '@/lib/stores';

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const backdropLines = [
  {
    text: 'TODAY OMURICE OWNER FIRST',
    direction: 'omurice-marquee-left',
    duration: '30s',
    solid: true,
  },
  {
    text: 'FRANCHISE GROWTH SYSTEM',
    direction: 'omurice-marquee-right',
    duration: '36s',
    solid: false,
  },
  {
    text: 'TEN CONTRACTS MOMENTUM',
    direction: 'omurice-marquee-left',
    duration: '32s',
    solid: true,
  },
];

const fallbackStores = [
  { store_code: '1', region: '서울', branch_name: 'OO점', display_name: '', open_date: '2026-05-01', address: '' },
  { store_code: '2', region: '부산', branch_name: 'OO점', display_name: '', open_date: '2026-04-01', address: '' },
  { store_code: '3', region: '경기', branch_name: 'OO점', display_name: '', open_date: '2026-03-01', address: '' },
  { store_code: '4', region: '인천', branch_name: 'OO점', display_name: '', open_date: '2026-02-01', address: '' },
  { store_code: '5', region: '대전', branch_name: 'OO점', display_name: '', open_date: '2026-01-01', address: '' },
  { store_code: '6', region: '제주', branch_name: 'OO점', display_name: '', open_date: '2025-12-01', address: '' },
] satisfies Store[];

const getSortTime = (store: Store) => {
  const openDate = store.open_date?.trim() ?? '';
  if (!DATE_PATTERN.test(openDate)) return Number(store.store_code) || 0;
  return new Date(`${openDate}T00:00:00+09:00`).getTime();
};

const getOpenLabel = (openDate: string) => {
  if (!DATE_PATTERN.test(openDate)) return '오픈완료';
  const [, month] = openDate.split('-').map(Number);
  return `${month}월 오픈완료`;
};

const getStoreLabel = (store: Store) => `${store.region || '전국'} OO점`;

const getLoopItems = <T,>(items: T[]) => [...items, ...items, ...items];

export default function FranchiseMomentumSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -14% 0px', amount: 0.18 });
  const [stores, setStores] = useState<Store[]>([]);
  const [storeCount, setStoreCount] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetchStores().then((storeData) => {
      if (isMounted) {
        setStores(storeData);
      }
    });

    fetchStoreCount().then((count) => {
      if (isMounted) {
        setStoreCount(count);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const recentStores = useMemo(() => {
    const source = stores.length > 0 ? stores : fallbackStores;

    return [...source]
      .sort((a, b) => {
        const timeDiff = getSortTime(b) - getSortTime(a);
        if (timeDiff !== 0) return timeDiff;
        return Number(b.store_code) - Number(a.store_code);
      })
      .slice(0, 14);
  }, [stores]);

  const visibleCount = storeCount ?? (stores.length > 0 ? stores.length : 157);

  return (
    <section
      id="franchise-momentum"
      ref={ref}
      aria-labelledby="franchise-momentum-title"
      className="relative isolate overflow-hidden bg-[#f8b900] py-24 text-[#3b1707] sm:py-28 lg:py-32"
    >
      <Image
        src="/new-asset/franchise-momentum/golden-bg.webp"
        alt=""
        fill
        sizes="100vw"
        className="z-0 object-cover object-center"
        quality={90}
      />
      <div
        className="absolute inset-0 z-[1] opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(92,38,12,0.38) 1px, transparent 1px), linear-gradient(115deg, rgba(92,38,12,0.2) 1px, transparent 1px)',
          backgroundSize: '42px 42px, 22px 22px',
        }}
      />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_18%_24%,rgba(255,255,255,0.45),transparent_28%),radial-gradient(circle_at_78%_74%,rgba(255,107,18,0.14),transparent_34%),linear-gradient(180deg,rgba(255,249,214,0.16),rgba(254,198,1,0.12))]" />
      <div className="absolute -bottom-10 left-0 right-0 z-[2] h-32 -skew-y-3 bg-[#ff6b12]/72" />
      <div className="absolute -bottom-12 left-[18%] right-[-8%] z-[2] h-28 -skew-y-3 bg-[#4a260f]/86" />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] space-y-2 overflow-hidden pt-4 sm:space-y-4">
        {backdropLines.map((line) => (
          <div
            key={line.text}
            className={`${line.direction} flex w-max whitespace-nowrap font-heading text-[clamp(4rem,8.6vw,9.8rem)] font-black uppercase leading-none tracking-[0.02em]`}
            style={{ '--duration': line.duration } as CSSProperties}
          >
            {getLoopItems([line.text]).map((text, index) => (
              <span
                key={`${text}-${index}`}
                className={
                  line.solid
                    ? 'mr-12 text-[#7b2a0b]/18 drop-shadow-[0_2px_0_rgba(255,255,255,0.2)]'
                    : 'mr-12 text-transparent [-webkit-text-stroke:1px_rgba(98,38,12,0.3)]'
                }
              >
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-3 text-center sm:gap-5">
          <div className="rounded-[4px] border border-[#7b2a0b]/28 bg-[#fff7d6]/72 px-5 py-3 font-heading text-xs font-black uppercase tracking-[0.08em] text-[#4a260f] shadow-[0_10px_24px_rgba(131,63,9,0.14)] backdrop-blur-sm sm:text-sm">
            Franchise Growth
          </div>
          <div className="hidden h-px w-16 bg-linear-to-r from-transparent via-[#4a260f] to-transparent sm:block" />
          <div className="rounded-full border border-[#7b2a0b]/18 bg-[#ff6b12] px-5 py-3 font-heading text-xs font-black uppercase tracking-[0.04em] text-white shadow-[0_12px_28px_rgba(255,107,18,0.24)] sm:text-sm">
            1 Month Momentum
          </div>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-[1.05fr_0.72fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative z-10"
          >
            <p className="font-heading text-sm font-black uppercase tracking-[0.2em] text-[#ff6b12] drop-shadow-[0_1px_0_rgba(255,255,255,0.5)] sm:text-base">
              Today Omurice
            </p>
            <h2
              id="franchise-momentum-title"
              className="mt-5 break-keep font-heading text-[clamp(3.05rem,8vw,6.8rem)] font-black leading-[0.98] tracking-[-0.04em] text-[#4a260f] drop-shadow-[0_5px_0_rgba(255,255,255,0.42)]"
            >
              좋은 브랜드는
              <br />
              <span className="text-[#ff6b12] drop-shadow-[0_5px_0_rgba(74,38,15,0.16)]">
                점주님이 먼저
              </span>
              <br />
              알아봅니다.
            </h2>
            <p className="mt-8 max-w-2xl break-keep rounded-2xl border border-[#8a3b0d]/18 bg-[#fff9dc]/54 px-5 py-4 text-base font-black leading-relaxed text-[#5a2c12] shadow-[0_12px_28px_rgba(126,55,0,0.1)] backdrop-blur-sm sm:text-xl">
              점주님들의 선택이 전국 가맹점 수로 쌓이고 있습니다. 오늘은 오므라이스는 실제 확장 속도로 브랜드의 흐름을 증명합니다.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.68, delay: 0.14, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-[18px] border-2 border-[#8a3b0d]/28 bg-[#fff6d1]/78 p-7 shadow-[0_24px_60px_rgba(116,44,0,0.22)] backdrop-blur-sm sm:p-9 lg:mx-0"
          >
            <div className="absolute right-5 top-5 font-heading text-7xl font-black text-[#4a260f]/7">
              O
            </div>
            <p className="font-heading text-sm font-black text-[#ff6b12] sm:text-base">
              누적 가맹점
            </p>
            <div className="mt-5 flex items-end gap-2">
              <span className="font-heading text-[clamp(4.8rem,10vw,6.8rem)] font-black leading-none text-[#4a260f] drop-shadow-[0_4px_0_rgba(255,255,255,0.58)]">
                {visibleCount}
              </span>
              <span className="pb-3 font-heading text-3xl font-black leading-none text-[#ff6b12] drop-shadow-[0_2px_0_rgba(255,255,255,0.4)]">
                개 돌파
              </span>
            </div>
            <div className="mt-6 h-px bg-linear-to-r from-[#4a260f]/55 via-[#ff6b12]/70 to-transparent" />
            <p className="mt-5 break-keep text-sm font-bold leading-relaxed text-[#5a2c12] sm:text-base">
              빠른 오픈 흐름과 안정적인 운영 구조가 점주님들의 선택으로 이어지고 있습니다.
            </p>
            <div className="mt-6 rounded-full border border-[#8a3b0d]/22 bg-[#4a260f] px-4 py-2 text-center font-heading text-xs font-black text-[#fff1c0] shadow-[0_8px_18px_rgba(74,38,15,0.16)] sm:text-sm">
              전국 가맹점 현황 기준
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 mt-16 overflow-hidden pb-2 sm:mt-20">
        <div
          className="omurice-marquee-left flex w-max items-stretch gap-5 px-5"
          style={{ '--duration': '34s' } as CSSProperties}
        >
          {getLoopItems(recentStores).map((store, index) => {
            const openLabel = getOpenLabel(store.open_date?.trim() ?? '');
            const sequence = String((index % recentStores.length) + 1).padStart(2, '0');

            return (
              <div
                key={`${store.store_code}-${index}`}
                className="group relative h-[156px] w-[260px] shrink-0 overflow-hidden rounded-[14px] border border-[#8a3b0d]/28 bg-[#fffaf0]/94 p-6 shadow-[0_18px_42px_rgba(122,52,0,0.22)] backdrop-blur-sm sm:h-[174px] sm:w-[320px]"
              >
                <div className="absolute inset-y-0 left-0 w-2 bg-[#ff6b12]" />
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#fec601]/24 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-2 right-6 font-heading text-8xl font-black text-[#4a260f]/[0.055]">
                  O
                </div>
                <div className="flex items-start justify-between gap-4">
                  <p className="font-heading text-xs font-black text-[#ff6b12]">
                    계약 지점 {sequence}
                  </p>
                  <span className="rounded-[4px] border border-[#8a3b0d]/22 bg-[#4a260f] px-3 py-1 font-heading text-[10px] font-black text-[#fff1c0]">
                    OPEN
                  </span>
                </div>
                <p className="mt-4 break-keep font-heading text-3xl font-black leading-none tracking-[-0.04em] text-[#4a260f] drop-shadow-[0_3px_0_rgba(255,255,255,0.6)] sm:text-4xl">
                  {getStoreLabel(store)}
                </p>
                <div className="absolute bottom-5 left-6 right-6">
                  <p className="font-heading text-lg font-black text-[#5a2c12] sm:text-xl">
                    {openLabel}
                  </p>
                  <div className="mt-3 h-px bg-linear-to-r from-[#4a260f]/50 via-[#ff6b12]/70 to-transparent" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

'use client';

import { animate, motion, useInView } from 'framer-motion';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';

const featuredRevenue = {
  region: '서울 OO점',
  code: 'SL',
  amount: '152,846,300',
};

const revenueItems = [
  {
    region: '서울 OO점',
    code: 'GS',
    amount: '126,552,600',
  },
  {
    region: '경기 OO점',
    code: 'SW',
    amount: '86,744,300',
  },
  {
    region: '서울 OO점',
    code: 'SP',
    amount: '92,800,000',
  },
];

const revenueCarouselGroups = [0, 1, 2];

function CountingAmount({
  value,
  active,
  className,
}: {
  value: string;
  active: boolean;
  className?: string;
}) {
  const [displayAmount, setDisplayAmount] = useState(0);
  const targetAmount = Number(value.replace(/[^\d]/g, ''));

  useEffect(() => {
    if (!active) {
      setDisplayAmount(0);
      return;
    }

    const controls = animate(0, targetAmount, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setDisplayAmount,
    });

    return () => controls.stop();
  }, [active, targetAmount]);

  return (
    <span
      aria-label={value}
      className={`inline-flex w-auto max-w-none items-baseline whitespace-nowrap tabular-nums [font-variant-numeric:tabular-nums] ${className ?? ''}`}
    >
      {Math.floor(displayAmount).toLocaleString('ko-KR')}
    </span>
  );
}

export default function RevenueProofSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -12% 0px', amount: 0.12 });

  return (
    <section
      id="revenue"
      ref={ref}
      className="relative isolate overflow-hidden bg-[#fff5d7] py-20 text-[#3b1707] md:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_18%,rgba(255,107,18,0.22),transparent_30%),radial-gradient(circle_at_86%_16%,rgba(254,198,1,0.26),transparent_34%),linear-gradient(180deg,#fff9e8_0%,#ffe9a8_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(90,44,18,0.32) 1px, transparent 1px), linear-gradient(90deg, rgba(90,44,18,0.32) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 -z-10 h-44 w-32 bg-[#fec601]/60 shadow-[0_20px_60px_rgba(255,107,18,0.18)]"
        style={{ clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 0 100%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 -z-10 h-44 w-40 bg-[#fec601]/70"
        style={{ clipPath: 'polygon(0 0, 100% 32%, 62% 100%, 0 100%)' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="font-heading text-sm font-black uppercase tracking-[0.22em] text-[#ff6b12]">
            Revenue Proof
          </p>
          <h2 className="relative z-10 mt-4 break-keep font-heading text-[clamp(2.7rem,6.2vw,5.8rem)] font-black leading-[1.02] tracking-[-0.04em] text-[#3b1707]">
            숫자로 증명된 매출,
            <br className="sm:hidden" />
            <span className="text-[#7a2d0c] drop-shadow-[0_5px_0_rgba(254,198,1,0.78)]">
              {' '}
              매일 기대되는 운영
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl break-keep text-base font-bold leading-relaxed text-[#6a3515] sm:text-lg">
            오늘은 오므라이스는 실제 운영 현장의 성과를 기준으로, 예비 점주님이 확인해야 할 매출
            흐름을 보여드립니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.72, delay: 0.1, ease: 'easeOut' }}
          className="relative mt-12 overflow-hidden rounded-[26px] border-2 border-[#5a2c12]/24 bg-[#fffaf0] shadow-[0_26px_70px_rgba(122,52,0,0.18)] sm:mt-14"
        >
          <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[#4a260f]" />
          <div className="absolute inset-x-0 bottom-[33%] h-8 bg-[#ff6b12]" />
          <div className="absolute left-1/2 top-8 h-72 w-72 -translate-x-1/2 rounded-full bg-[#fec601]/26 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.11]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(74,38,15,0.32) 1px, transparent 1px), linear-gradient(90deg, rgba(74,38,15,0.32) 1px, transparent 1px)',
              backgroundSize: '34px 34px',
            }}
          />

          <div className="relative z-10 mx-auto flex min-h-[560px] max-w-6xl flex-col items-center px-5 pt-10 text-center sm:min-h-[620px] sm:px-8 sm:pt-14 lg:min-h-[650px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#8a3b0d]/22 bg-[#fff3c6]/88 px-4 py-2 font-heading text-xs font-black text-[#5a2c12] shadow-[0_8px_20px_rgba(122,52,0,0.12)] sm:text-sm">
              월 최고 매출액
              <span className="h-1.5 w-1.5  bg-[#ff6b12]" />
              {featuredRevenue.region}
            </div>

            <div className="relative z-20 mt-6 flex w-full max-w-full flex-wrap items-end justify-center gap-x-2 gap-y-2 px-1 sm:gap-x-3">
              <CountingAmount
                value={featuredRevenue.amount}
                active={isInView}
                className="justify-center font-heading text-[clamp(2.7rem,9.4vw,7.4rem)] font-black leading-[1.14] tracking-[-0.055em] text-[#180904] drop-shadow-[0_6px_0_rgba(255,255,255,0.72)]"
              />
              <span className="mb-1 rounded-full bg-[#ff6b12] px-3 py-2 font-heading text-base font-black text-white shadow-[0_8px_20px_rgba(255,107,18,0.28)] sm:mb-4 sm:px-4 sm:text-2xl lg:text-3xl">
                원 달성
              </span>
            </div>

            <p className="relative z-20 mt-5 max-w-2xl break-keep rounded-2xl border border-[#8a3b0d]/16 bg-white/64 px-5 py-3 text-sm font-black leading-relaxed text-[#5a2c12] backdrop-blur-sm sm:text-base">
              단순한 출점 수가 아닌, 실제 매장에서 반복되는 매출 성과로 브랜드의 경쟁력을
              확인하세요.
            </p>

            <Image
              src="/new-asset/revenue-proof/omurice-revenue-plate.webp"
              alt="오늘은 오므라이스 대표 메뉴"
              width={1448}
              height={1086}
              className="absolute bottom-[2%] left-1/2 z-10 w-[116%] max-w-none -translate-x-1/2 drop-shadow-[0_30px_40px_rgba(32,12,0,0.38)] sm:bottom-[-2%] sm:w-[90%] md:w-[82%] lg:bottom-[-6%] lg:w-[74%] xl:w-[68%]"
              sizes="(max-width: 640px) 116vw, (max-width: 768px) 90vw, (max-width: 1024px) 82vw, 74vw"
              priority={false}
              quality={92}
            />
          </div>
        </motion.div>

        <div className="relative z-20 -mx-4 -mt-6 overflow-hidden px-4 pb-3 sm:-mx-6 sm:-mt-8 sm:px-6 lg:mx-0 lg:px-0">
          <div
            className="omurice-marquee-left flex w-max"
            style={{ '--duration': '24s' } as CSSProperties}
          >
            {revenueCarouselGroups.map((groupIndex) => (
              <div
                key={`revenue-carousel-group-${groupIndex}`}
                aria-hidden={groupIndex > 0}
                className="flex shrink-0 gap-3 pr-3"
              >
                {revenueItems.map((item, index) => (
                  <motion.div
                    key={`${item.region}-${item.code}-${groupIndex}`}
                    initial={{ opacity: 0, y: 22 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.52,
                      delay: 0.18 + index * 0.08,
                      ease: 'easeOut',
                    }}
                    className="w-[74vw] max-w-[300px] shrink-0 overflow-hidden rounded-[14px] border border-[#5a2c12]/24 bg-[#fffaf0] shadow-[0_18px_36px_rgba(122,52,0,0.14)] sm:w-[300px] lg:w-[300px]"
                  >
                    <div className="bg-[#4a260f] px-5 py-4 text-center text-[#fff3c6]">
                      <p className="font-heading text-sm font-black">{item.region}</p>
                      <p className="mt-1 text-xs font-bold text-[#fec601]">월 매출 실적</p>
                    </div>
                    <div className="px-5 py-6 text-center">
                      <CountingAmount
                        value={item.amount}
                        active={isInView}
                        className="justify-center font-heading text-[clamp(1.45rem,6.4vw,2.05rem)] font-black leading-[1.16] tracking-[-0.03em] text-[#ff6b12] sm:text-[2rem]"
                      />
                      <p className="mt-2 font-heading text-sm font-black text-[#5a2c12]">원</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

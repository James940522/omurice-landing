'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

export default function RevenueProofSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -12% 0px', amount: 0.12 });

  return (
    <section
      id="revenue"
      ref={ref}
      className="relative isolate overflow-hidden bg-[#fef9f0] py-20 md:py-28 lg:py-32"
    >
      {/* 우상단 오렌지 장식 */}
      <div
        className="pointer-events-none absolute right-0 top-0 -z-10 h-[48%] w-[16%]"
        style={{ background: '#f5a623', clipPath: 'polygon(32% 0, 100% 0, 100% 100%, 0% 100%)' }}
      />
      {/* 우하단 오렌지 장식 */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 -z-10 h-[48%] w-[16%]"
        style={{ background: '#f5a623', clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 32% 100%)' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          {/* 좌: 텍스트 */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h2
              className="text-3xl font-black leading-[1.22] text-[#1a1a1a] sm:text-4xl md:text-5xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              오늘은 오므라이스는
              <br />
              <span className="text-[#f5a623]">신규 출점 제한지역</span>을 보장해
              <br />
              상권 충돌을 최소화합니다.
            </h2>

            <div className="my-7 h-[3px] w-14 rounded-full bg-[#f5a623]" />

            <p
              className="text-2xl font-black text-[#1a1a1a] sm:text-3xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              같은동네, 같은 프랜차이즈{' '}
              <span className="font-black">✕</span>
            </p>

            <p className="mt-5 text-sm font-medium leading-relaxed text-[#5a4a3a] md:text-base">
              무분별한 확장이 아닌 가맹점의 매출과
              <br />
              철저한 상권 보장을 진행하고 있습니다.
            </p>

            <p className="mt-10 text-[0.7rem] font-medium leading-relaxed text-[#5a4a3a]/65 sm:text-xs">
              *상권 및 배달 구역은 지역, 계약 조건, 배달 플랫폼
              <br />
              운영 환경에 따라 세부 기준이 달라질 수 있습니다.
            </p>
          </motion.div>

          {/* 우: 지도 이미지 */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.14)]"
          >
            {/* 지도 이미지 + VS 뱃지 */}
            <div className="relative">
              <Image
                src="/new-asset/sec-4/territory-map.webp"
                alt="오늘은 오므라이스 상권 보호 지도"
                width={1448}
                height={1086}
                className="h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 55vw"
                quality={90}
              />
              {/* VS 뱃지 */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[#f5a623] bg-white text-lg font-black text-[#1a1a1a] shadow-[0_6px_24px_rgba(0,0,0,0.18)] sm:h-16 sm:w-16 sm:text-xl md:h-20 md:w-20 md:text-2xl">
                  VS
                </div>
              </div>
            </div>

            {/* 하단 라벨 */}
            <div className="grid grid-cols-2 divide-x divide-white/30">
              <div className="bg-[#5a3e28] px-4 py-3 text-center text-white sm:py-4">
                <p className="text-sm font-black tracking-tight sm:text-base md:text-lg">
                  일반브랜드
                </p>
                <p className="mt-0.5 text-[0.65rem] font-medium opacity-75 sm:text-xs md:text-sm">
                  복수 지점 경쟁
                </p>
              </div>
              <div className="bg-[#f5a623] px-4 py-3 text-center text-white sm:py-4">
                <p className="text-sm font-black tracking-tight sm:text-base md:text-lg">
                  오늘은 오므라이스
                </p>
                <p className="mt-0.5 text-[0.65rem] font-medium opacity-90 sm:text-xs md:text-sm">
                  배달 상권 보장
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

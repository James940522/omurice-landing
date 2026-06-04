'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { useRef } from 'react';

const chartCards = [
  {
    src: '/new-asset/reorder-proof/reorder-chart-01.webp',
    width: 832,
    height: 440,
  },
  {
    src: '/new-asset/reorder-proof/reorder-chart-02.webp',
    width: 836,
    height: 426,
  },
  {
    src: '/new-asset/reorder-proof/reorder-chart-03.webp',
    width: 840,
    height: 426,
  },
  {
    src: '/new-asset/reorder-proof/reorder-chart-04.webp',
    width: 836,
    height: 432,
  },
  {
    src: '/new-asset/reorder-proof/reorder-chart-05.webp',
    width: 828,
    height: 432,
  },
  {
    src: '/new-asset/reorder-proof/reorder-chart-06.webp',
    width: 844,
    height: 438,
  },
];

const proofTags = ['재구매 경쟁력', '실제 주문 데이터', '브랜드 충성도'];

export default function ReorderProofSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -12% 0px', amount: 0.12 });

  return (
    <section
      id="reorder-proof"
      ref={ref}
      className="relative isolate overflow-hidden bg-[#281505] py-20 text-white sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_22%,rgba(255,107,18,0.22),transparent_32%),radial-gradient(circle_at_85%_8%,rgba(254,198,1,0.2),transparent_34%),linear-gradient(135deg,#351b08_0%,#1e1006_58%,#3b1d08_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(254,198,1,0.26) 1px, transparent 1px), linear-gradient(90deg, rgba(254,198,1,0.26) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />
      <div className="pointer-events-none absolute -right-12 bottom-0 -z-10 h-52 w-[48vw] bg-[#fec601]/86 sm:h-72" />
      <div
        className="pointer-events-none absolute -right-10 bottom-0 -z-10 h-52 w-[58vw] bg-[#ff6b12]/28 sm:h-72"
        style={{ clipPath: 'polygon(28% 0, 100% 0, 100% 100%, 0 100%)' }}
      />
      <div className="pointer-events-none absolute right-4 top-4 -z-10 font-heading text-[18vw] font-black uppercase leading-none tracking-[-0.06em] text-[#fec601]/[0.075] lg:right-10 lg:top-8">
        Reorder
      </div>
      <div className="pointer-events-none absolute -left-10 bottom-8 -z-10 font-heading text-[15vw] font-black uppercase leading-none tracking-[-0.06em] text-white/[0.055]">
        Today
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.88fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.62, ease: 'easeOut' }}
          >
            <p className="font-heading text-sm font-black uppercase tracking-[0.26em] text-[#ff8a2a] sm:text-base">
              Today Omurice
            </p>
            <h2 className="mt-3 break-keep font-heading text-[clamp(3.2rem,8vw,6.5rem)] font-black leading-[0.96] tracking-[-0.04em] text-white drop-shadow-[0_8px_0_rgba(0,0,0,0.18)]">
              압도적인
              <br />
              <span className="bg-gradient-to-r from-[#fff3a2] via-[#fec601] to-[#ff6b12] bg-clip-text text-transparent">
                재주문율 1위
              </span>
            </h2>
            <p className="mt-6 max-w-xl break-keep text-base font-bold leading-relaxed text-[#fff3d1] sm:text-lg">
              신규 유입보다 더 강한 재주문 흐름, 실제 주문 데이터가 오늘은 오므라이스의 브랜드
              경쟁력을 증명합니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {proofTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#fec601]/18 bg-[#4a260f]/74 px-4 py-2 text-sm font-black text-[#fff2c1] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_10px_24px_rgba(0,0,0,0.14)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.66, delay: 0.08, ease: 'easeOut' }}
            className="overflow-hidden rounded-[22px] border-2 border-[#ffb13b] bg-[#fff3c6] text-[#2a1305] shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
          >
            <div className="relative bg-[#fec601] px-6 py-6 sm:px-8">
              <span className="inline-flex rounded-full bg-[#2a1305] px-4 py-1.5 text-xs font-black text-[#fff3c6]">
                실제 주문 데이터 기반
              </span>
              <div className="mt-5 grid grid-cols-2 gap-5">
                <div>
                  <p className="text-sm font-black text-[#6a3515]">총 주문수</p>
                  <p className="mt-1 font-heading text-[clamp(2.5rem,7vw,4rem)] font-black leading-none tracking-[-0.04em]">
                    1965<span className="text-[0.42em]">건</span>
                  </p>
                </div>
                <div className="border-l border-[#5a2c12]/20 pl-5">
                  <p className="text-sm font-black text-[#6a3515]">재주문 수</p>
                  <p className="mt-1 font-heading text-[clamp(2.5rem,7vw,4rem)] font-black leading-none tracking-[-0.04em]">
                    1072<span className="text-[0.42em]">건</span>
                  </p>
                </div>
              </div>
              <div className="absolute right-6 top-6 h-8 w-8 rotate-12 border-r-4 border-t-4 border-white/72" />
            </div>
            <div className="flex gap-4 px-6 py-5 sm:px-8">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#2a1305] font-heading text-xl font-black text-[#fec601]">
                1
              </div>
              <p className="break-keep text-sm font-black leading-relaxed text-[#3b1707] sm:text-base">
                여러 매장에서 반복되는 재주문 패턴이 안정적인 매출 구조를 보여줍니다.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {chartCards.map((card, index) => (
            <motion.article
              key={card.src}
              initial={{ opacity: 0, y: 26 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.52, delay: 0.14 + index * 0.055, ease: 'easeOut' }}
              className="group relative overflow-visible"
            >
              <span className="absolute -left-1 -top-2 z-20 rounded-full bg-[#ff6b12] px-3 py-1 font-heading text-sm font-black text-white shadow-[0_8px_18px_rgba(255,107,18,0.32)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="overflow-hidden rounded-[14px] border border-[#ffb13b]/45 bg-white shadow-[0_18px_34px_rgba(0,0,0,0.24)] transition-transform duration-300 group-hover:-translate-y-1">
                <Image
                  src={card.src}
                  alt={`최근 7일 신규 주문과 재주문 그래프 ${index + 1}`}
                  width={card.width}
                  height={card.height}
                  className="aspect-[1.9/1] h-auto w-full bg-white object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.58, delay: 0.42, ease: 'easeOut' }}
          className="mx-auto mt-8 flex max-w-5xl flex-col gap-4 rounded-full border border-[#fec601]/28 bg-[#1c0f06]/86 px-5 py-4 text-sm font-bold text-[#fff3d1] shadow-[0_18px_48px_rgba(0,0,0,0.24)] sm:flex-row sm:items-center sm:justify-between sm:px-7"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#fec601] font-heading text-sm font-black text-[#2a1305]">
              DATA
            </span>
            <span className="break-keep">6개 매장의 최근 7일간 실제 주문 데이터를 분석한 결과입니다.</span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#ffe6a3] sm:justify-end">
            <span>기간: 최근 7일</span>
            <span>기준: 신규 주문 / 재주문 비교</span>
            <span>출처: 배달의민족</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

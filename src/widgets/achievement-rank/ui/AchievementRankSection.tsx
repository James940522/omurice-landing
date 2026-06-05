'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const milestones = [
  {
    year: '2025년',
    month: '오픈',
    label: '100호점',
    height: 30,
    desktopHeight: 24,
  },
  {
    year: '2026년',
    month: '1월',
    label: '13호점 오픈',
    height: 38,
    desktopHeight: 32,
  },
  {
    year: '2026년',
    month: '2월',
    label: '6호점 오픈',
    height: 48,
    desktopHeight: 42,
  },
  {
    year: '2026년',
    month: '3월',
    label: '13호점 오픈',
    height: 62,
    desktopHeight: 55,
  },
  {
    year: '2026년',
    month: '4월',
    label: '10호점 오픈',
    height: 76,
    desktopHeight: 70,
  },
  {
    year: '2026년',
    month: '5월',
    label: '10호점 오픈',
    subLabel: '150호점 달성',
    height: 92,
    desktopHeight: 86,
  },
];

export default function AchievementRankSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -18% 0px', amount: 0.2 });

  return (
    <section
      id="achievement-rank"
      ref={ref}
      aria-labelledby="achievement-rank-title"
      className="relative isolate overflow-hidden bg-[#2a1007]"
    >
      <h2 id="achievement-rank-title" className="sr-only">
        독보적인 오므라이스 가맹점 수 1위 브랜드
      </h2>

      <div className="relative h-[min(100svh,177.7vw)] min-h-[540px] bg-[#2a1007] md:h-auto md:min-h-[clamp(620px,56.3vw,920px)]">
        <Image
          src="/new-asset/achievement-rank/mo.webp"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-contain object-top md:hidden"
          quality={90}
        />
        <Image
          src="/new-asset/achievement-rank/pc.webp"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="hidden object-cover object-center md:block"
          quality={90}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(255,214,94,0.12),transparent_32%),linear-gradient(180deg,rgba(36,13,4,0.02),rgba(36,13,4,0.3))] md:hidden" />

        <div
          data-achievement-chart="desktop"
          className="absolute bottom-[4.5%] left-[42%] right-[7%] hidden h-[46%] items-end justify-between gap-[0.85vw] md:flex"
        >
          {milestones.map((item, index) => (
            <motion.div
              key={`${item.year}-${item.month}`}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.55, delay: 0.36 + index * 0.08, ease: 'easeOut' }}
              className="relative flex h-full min-w-0 flex-1 flex-col items-center justify-end"
            >
              <motion.div
                data-achievement-marker="desktop"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.38, delay: 0.72 + index * 0.08, ease: 'backOut' }}
                className="absolute z-20 h-5 w-5 rounded-full border border-[#fff3a8] bg-[radial-gradient(circle_at_35%_28%,#fff7b9_0,#ffd442_34%,#e48500_78%)] shadow-[0_0_18px_rgba(255,202,28,0.96)] lg:h-6 lg:w-6 xl:h-7 xl:w-7"
                style={{ bottom: `${item.desktopHeight}%` }}
              />
              <motion.div
                data-achievement-bar="desktop"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.72, delay: 0.48 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[112px] origin-bottom rounded-t-[22px] border border-[#fff2a2]/80 bg-[linear-gradient(180deg,#fff3b8_0%,#ffd876_44%,#fff0bb_100%)] shadow-[0_0_22px_rgba(255,190,34,0.56),inset_0_0_18px_rgba(255,255,255,0.46)]"
                style={{ height: `${item.desktopHeight}%` }}
              />
              <div
                className="absolute z-20 -translate-y-2 text-center font-black leading-tight text-white drop-shadow-[0_3px_4px_rgba(0,0,0,0.86)]"
                style={{ bottom: `${item.desktopHeight}%` }}
              >
                <span className="block text-[clamp(11px,0.9vw,16px)]">{item.year}</span>
                <span className="block text-[clamp(11px,0.86vw,15px)]">{item.month}</span>
                <span className="block whitespace-nowrap text-[clamp(12px,0.92vw,16px)] text-[#ffe44a]">
                  {item.label}
                </span>
                {item.subLabel ? (
                  <span className="block whitespace-nowrap text-[clamp(11px,0.86vw,15px)] text-[#ffe44a]">
                    {item.subLabel}
                  </span>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>

        <div
          data-achievement-chart="mobile"
          className="absolute inset-x-0 bottom-[7%] grid h-[32%] grid-cols-6 items-end gap-[2.2vw] px-[4%] md:hidden"
        >
          {milestones.map((item, index) => (
            <motion.div
              key={`${item.year}-${item.month}-mobile`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.28 + index * 0.07, ease: 'easeOut' }}
              className="relative flex h-full min-w-0 flex-col items-center justify-end"
            >
              <motion.div
                data-achievement-marker="mobile"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.34, delay: 0.62 + index * 0.07, ease: 'backOut' }}
                className="absolute z-20 h-[13px] w-[13px] rounded-full border border-[#fff3a8] bg-[radial-gradient(circle_at_35%_28%,#fff7b9_0,#ffd442_34%,#e48500_78%)] shadow-[0_0_15px_rgba(255,202,28,0.96)]"
                style={{ bottom: `${item.height}%` }}
              />
              <motion.div
                data-achievement-bar="mobile"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.68, delay: 0.4 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="w-full origin-bottom rounded-t-[13px] border border-[#fff2a2]/80 bg-[linear-gradient(180deg,#fff4bd_0%,#ffd66a_48%,#fff1bd_100%)] shadow-[0_0_16px_rgba(255,190,34,0.5),inset_0_0_13px_rgba(255,255,255,0.48)]"
                style={{ height: `${item.height}%` }}
              />
              <div
                className="absolute z-20 -translate-y-2 text-center font-black leading-[1.05] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                style={{ bottom: `${item.height}%` }}
              >
                <span className="block text-[clamp(7px,1.9vw,12px)]">{item.year}</span>
                <span className="block text-[clamp(7px,1.9vw,12px)]">{item.month}</span>
                <span className="block text-[clamp(7px,2vw,13px)] text-[#ffe44a]">
                  {item.label}
                </span>
                {item.subLabel ? (
                  <span className="block text-[clamp(7px,2vw,13px)] text-[#ffe44a]">
                    {item.subLabel}
                  </span>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: [0, 1, 0.64, 1] } : {}}
          transition={{ duration: 1.2, delay: 1.08 }}
          className="pointer-events-none absolute left-[4%] top-[8%] h-20 w-20 rounded-full bg-[#ffd226]/20 blur-2xl md:left-[3%] md:top-[14%] md:h-32 md:w-32"
        />
      </div>
    </section>
  );
}

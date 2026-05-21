'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const milestones = [
  {
    date: '2025년',
    month: '오픈',
    value: '100호점',
    height: 24,
  },
  {
    date: '2026년',
    month: '1월',
    value: '13호점 오픈',
    height: 36,
  },
  {
    date: '2026년',
    month: '2월',
    value: '6호점 오픈',
    height: 49,
  },
  {
    date: '2026년',
    month: '3월',
    value: '13호점 오픈',
    height: 63,
  },
  {
    date: '2026년',
    month: '4월',
    value: '10호점 오픈',
    height: 78,
  },
  {
    date: '2026년',
    month: '5월',
    value: '10호점 오픈',
    subValue: '150호점 달성',
    height: 92,
  },
];

export default function BrandIntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -15% 0px', amount: 0.08 });

  return (
    <section
      id="brand"
      ref={ref}
      className="relative isolate aspect-9/16 lg:aspect-1528/1029 w-full overflow-hidden bg-[#d84a00] text-white"
    >
      <Image
        src="/new-asset/sec-2/rank-1-bg.webp"
        alt=""
        fill
        sizes="100vw"
        quality={90}
        className="absolute inset-0 -z-30 object-cover object-left lg:object-center"
        priority={false}
      />
      <div className="absolute inset-0 -z-20 bg-linear-to-r from-black/0 via-[#cf3d00]/8 to-[#9d2a00]/22" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/45 via-black/15 to-[#b73400]/18 lg:from-black/4 lg:via-transparent" />

      <div className="absolute inset-0">
        <motion.div
          className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[90%] text-center lg:left-auto lg:translate-x-0 lg:right-[7%] lg:top-[7%] lg:w-[52%]"
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          <p
            className="text-[clamp(1.5rem,4.25vw,4.85rem)] font-black leading-[1.04] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)] lg:drop-shadow-[0_0.32vw_0.72vw_rgba(87,24,0,0.45)]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            독보적인
            <br />
            오므라이스 가맹점 수<span className="ml-2 text-[#ffd21f]">1위</span>
            <br />
            브랜드
          </p>

          <motion.div
            className="mt-[2.4%] space-y-[1.5vw] lg:space-y-[0.2vw] text-[clamp(0.85rem,1.55vw,1.7rem)] font-semibold leading-relaxed text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)] lg:drop-shadow-[0_0.18vw_0.48vw_rgba(87,24,0,0.42)]"
            initial={{ opacity: 0, y: 22 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18, ease: 'easeOut' }}
          >
            <p>
              브랜드 론칭 1년만에 가맹점수
              <span className="mx-1 font-black text-[#ffd21f]">100호점</span>
              돌파!
            </p>
            <p>
              1년 반만에
              <span className="mx-1 font-black text-[#ffd21f]">150호점</span>
              돌파
            </p>
            <p>
              현재 오므라이스 브랜드들 중
              <br className="hidden sm:block" />
              압도적인 가맹점수 1위를 유지하고 있습니다
            </p>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-[5.5%] left-0 right-0 h-[45%] lg:left-auto lg:right-[3%] lg:h-[43%] lg:w-[61%]">
          <div className="absolute inset-x-0 bottom-0 z-20 flex h-full items-end gap-[1.3%] overflow-visible">
            {milestones.map((milestone, index) => (
              <motion.div
                key={`${milestone.date}-${milestone.month}-${milestone.value}`}
                className="relative h-full min-w-0 flex-1"
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.2 + index * 0.09, ease: 'easeOut' }}
              >
                <motion.div
                  className="absolute left-1/2 z-40 w-[140%] -translate-x-1/2 text-center text-[clamp(0.65rem,2.5vw,1.06rem)] font-bold leading-tight text-white drop-shadow-[0_0.14vw_0.36vw_rgba(71,24,0,0.55)]"
                  style={{ bottom: `calc(${milestone.height}% + clamp(0.25rem, 0.8vw, 0.7rem))` }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.55 + index * 0.09 }}
                >
                  <span className="block">{milestone.date}</span>
                  <span className="block">{milestone.month}</span>
                  <span className="mt-1 block text-[#ffd21f]">{milestone.value}</span>
                  {milestone.subValue ? (
                    <span className="block text-[#ffd21f]">{milestone.subValue}</span>
                  ) : null}
                </motion.div>

                <div
                  className="absolute inset-x-0 bottom-0 z-20 mx-auto w-[86%]"
                  style={{ height: `${milestone.height}%` }}
                >
                  <motion.div
                    className="absolute inset-x-0 bottom-0 h-full overflow-hidden rounded-t-[0.8vw] border border-[#ffe8b6] bg-linear-to-b from-white via-[#fff2dc] to-[#ffd39c] shadow-[0_0.65vw_1.7vw_rgba(93,29,0,0.28),0_0_1.45vw_rgba(255,198,1,0.36)]"
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.72, delay: 0.35 + index * 0.12, ease: 'easeOut' }}
                    style={{ transformOrigin: 'bottom' }}
                  >
                    <div className="absolute inset-x-0 top-0 h-[4%] bg-white/90" />
                    <div className="absolute inset-y-0 left-[14%] w-[28%] bg-linear-to-b from-white/75 via-white/35 to-white/0" />
                    <div className="absolute inset-y-0 right-0 w-[22%] bg-linear-to-l from-orange-300/25 to-transparent" />
                    <div className="absolute inset-x-[5%] bottom-[2%] h-[2%] rounded-full bg-orange-900/10" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

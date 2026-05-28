'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const costRows = [
  { item: '가맹비', amount: '300만원', result: '무료', waived: true },
  { item: '교육비', amount: '200만원', result: '현장 교육 무료', waived: true },
  { item: '보증금', amount: '200만원', result: '무료', waived: true },
  { item: '로열티', amount: '20만원', result: '무료', waived: true },
  { item: '인테리어', amount: '자율시공', result: '자율시공' },
  { item: '간판', amount: '자율시공', result: '자율시공' },
  { item: '주방설비 / 집기', amount: '450만원', result: '필수 장비 기준' },
  { item: '초도물품', amount: '100만원', result: '초기 운영 물품' },
  { item: 'POS', amount: '자율', result: '자율 선택' },
];

const marqueeWords = [
  'HONEST STARTUP COST',
  'TODAY OMURICE FRANCHISE',
  'NO HIDDEN COST',
  'OWNER FIRST SYSTEM',
];

export default function FranchiseCostSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -12% 0px', amount: 0.14 });

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-[#fff8ef] pb-20 pt-28 md:pb-28 md:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[#fff8ef]" />
      <div className="pointer-events-none absolute left-0 top-0 -z-20 h-full w-[7vw] bg-[#ffe4c4]/60" />
      <div className="pointer-events-none absolute right-0 top-0 -z-20 h-full w-[7vw] bg-[#ffe4c4]/60" />
      <div className="pointer-events-none absolute left-[5vw] top-0 -z-10 h-full w-px bg-[#ff7a1a]/55" />
      <div className="pointer-events-none absolute right-[5vw] top-0 -z-10 h-full w-px bg-[#ff7a1a]/55" />
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-[0.15] [background-image:linear-gradient(90deg,rgba(85,58,31,0.16)_1px,transparent_1px),linear-gradient(0deg,rgba(85,58,31,0.11)_1px,transparent_1px)] [background-size:10px_10px]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.78),transparent_31%),radial-gradient(circle_at_84%_12%,rgba(255,122,26,0.10),transparent_32%),radial-gradient(circle_at_50%_70%,rgba(255,255,255,0.58),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-x-[-12%] bottom-[-8.5rem] -z-10 h-64 rounded-t-[100%] bg-white md:h-80" />

      <div className="absolute inset-x-0 top-0 z-20 overflow-hidden bg-[#ff6b12] py-2 text-white">
        <motion.div
          className="flex w-max items-center gap-10 whitespace-nowrap text-xs font-black tracking-[0.04em] sm:text-sm"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        >
          {[...marqueeWords, ...marqueeWords, ...marqueeWords].map((word, index) => (
            <span key={`${word}-${index}`}>{word}</span>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center"
        >
          <p className="text-lg font-black text-[#0a3b2f]" style={{ fontFamily: 'Georgia, serif' }}>
            Franchise
          </p>
          <h2
            className="mt-4 text-3xl font-black leading-tight text-[#4a250f] sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            숨겨진 비용 없이
            <br />
            정직하게 시작하세요.
          </h2>
          <p className="mt-5 text-sm font-bold text-[#6b4222] md:text-base">
            자율시공 항목은 점주님의 상황에 맞춰 합리적으로 선택할 수 있습니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mt-10 overflow-hidden border border-[#f4c47d]/70 bg-[#fffef8] shadow-[0_26px_70px_rgba(84,45,10,0.13)]"
        >
          <div className="grid grid-cols-[0.9fr_1fr_1.15fr] bg-[#32190b] px-4 py-5 text-center text-sm font-black text-[#fff2c6] md:text-base">
            <div>항목</div>
            <div>기준 비용</div>
            <div>오늘은 오므라이스</div>
          </div>

          <div className="px-3 py-2 md:px-8">
            {costRows.map((row, index) => (
              <div
                key={row.item}
                className="grid grid-cols-[0.9fr_1fr_1.15fr] items-center border-b border-[#5a2c12]/25 py-3 text-center text-xs font-bold text-[#43210d] last:border-b-0 md:text-sm"
              >
                <div className="font-black">{row.item}</div>
                <div className="flex min-h-8 items-center justify-center">
                  {row.waived ? (
                    <span className="relative inline-flex items-center justify-center px-1 text-[#8a6848]/70">
                      {row.amount}
                      <motion.span
                        className="absolute left-0 top-1/2 h-[2px] w-full origin-left -translate-y-1/2 bg-[#ff4f1f]"
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.5, delay: 0.42 + index * 0.07, ease: 'easeOut' }}
                      />
                    </span>
                  ) : (
                    <span>{row.amount}</span>
                  )}
                </div>
                <div className="flex min-h-8 items-center justify-center">
                  {row.waived ? (
                    <motion.span
                      initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, rotate: -3, scale: 1 } : {}}
                      transition={{ duration: 0.38, delay: 0.7 + index * 0.07, ease: 'easeOut' }}
                      className="inline-flex min-w-16 justify-center border-2 border-[#ff4f1f] px-3 py-1 text-sm font-black text-[#ff4f1f] shadow-[0_0_18px_rgba(255,79,31,0.16)] md:text-base"
                    >
                      {row.result}
                    </motion.span>
                  ) : (
                    <span className="text-[#6b4222]/82">{row.result}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[0.9fr_2.15fr] items-center bg-[#32190b] px-4 py-5 text-center text-[#fff2c6] md:px-8">
            <div className="text-sm font-black md:text-base">금액 합계</div>
            <div className="text-2xl font-black text-[#fec601] md:text-3xl">
              550만원
              <span className="ml-2 align-middle text-xs font-bold text-[#fff2c6]/75 md:text-sm">
                자율시공 항목 별도
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

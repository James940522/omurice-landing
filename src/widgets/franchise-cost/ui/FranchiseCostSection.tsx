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
    <section
      id="franchise-cost"
      ref={ref}
      className="relative isolate overflow-hidden bg-[#fff8ef] pb-20 pt-28 md:pb-28 md:pt-36"
    >
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

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
          className="mt-10 overflow-hidden rounded-[18px] border-2 border-[#5a2c12] bg-[#fffdf4] shadow-[0_30px_80px_rgba(84,45,10,0.18)]"
        >
          <div className="relative overflow-hidden bg-[#32190b] px-4 py-6 text-center text-[#fff2c6] md:px-8">
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.75) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.75) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
            <div className="relative grid gap-3 md:grid-cols-3">
              <div className="rounded-[10px] border border-[#fec601]/35 bg-white/8 px-4 py-4">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#fec601]">
                  Waived
                </p>
                <p className="mt-1 font-heading text-3xl font-black text-white">
                  4개 항목
                </p>
                <p className="mt-1 text-xs font-bold text-[#fff2c6]/75">
                  가맹비 · 교육비 · 보증금 · 로열티
                </p>
              </div>
              <div className="rounded-[10px] border border-[#fec601]/35 bg-[#fec601] px-4 py-4 text-[#32190b] shadow-[0_14px_28px_rgba(254,198,1,0.2)]">
                <p className="text-xs font-black uppercase tracking-[0.14em]">
                  Startup Cost
                </p>
                <p className="mt-1 font-heading text-3xl font-black">
                  550만원
                </p>
                <p className="mt-1 text-xs font-black text-[#5a2c12]">
                  주방설비 · 초도물품 기준
                </p>
              </div>
              <div className="rounded-[10px] border border-[#fec601]/35 bg-white/8 px-4 py-4">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#fec601]">
                  Flexible
                </p>
                <p className="mt-1 font-heading text-3xl font-black text-white">
                  자율 선택
                </p>
                <p className="mt-1 text-xs font-bold text-[#fff2c6]/75">
                  인테리어 · 간판 · POS
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[0.8fr_1fr_1.1fr] bg-[#5a2c12] px-4 py-4 text-center text-xs font-black text-[#fff2c6] md:px-8 md:text-base">
            <div>항목</div>
            <div>일반 기준</div>
            <div>오늘은 오므라이스</div>
          </div>

          <div className="space-y-2 bg-[#fff8ef] px-3 py-3 md:px-6 md:py-5">
            {costRows.map((row, index) => (
              <div
                key={row.item}
                className={`grid grid-cols-[0.8fr_1fr_1.1fr] items-center rounded-[12px] border px-3 py-3 text-center text-xs font-bold text-[#43210d] shadow-[0_8px_18px_rgba(84,45,10,0.06)] md:px-5 md:text-sm ${
                  row.waived
                    ? 'border-[#ff6b12]/45 bg-white'
                    : 'border-[#f4c47d]/75 bg-[#fffdf8]'
                }`}
              >
                <div className="font-heading text-sm font-black md:text-base">{row.item}</div>
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
                    <div className="flex flex-col items-center gap-1">
                      <motion.span
                        initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, rotate: -3, scale: 1 } : {}}
                        transition={{ duration: 0.38, delay: 0.7 + index * 0.07, ease: 'easeOut' }}
                        className="inline-flex min-w-16 justify-center rounded-[4px] border-2 border-[#ff4f1f] bg-[#fff7ed] px-3 py-1 font-heading text-sm font-black text-[#ff4f1f] shadow-[0_0_18px_rgba(255,79,31,0.16)] md:text-base"
                      >
                        0원
                      </motion.span>
                      <span className="text-[11px] font-black text-[#6b4222] md:text-xs">
                        {row.result}
                      </span>
                    </div>
                  ) : (
                    <span className="rounded-full bg-[#fff0d2] px-3 py-1.5 text-xs font-black text-[#6b4222] md:text-sm">
                      {row.result}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#32190b] px-4 py-6 text-center text-[#fff2c6] md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#fec601]">
              Final Estimate
            </p>
            <div className="mt-2 flex flex-wrap items-end justify-center gap-x-3 gap-y-1">
              <span className="font-heading text-lg font-black md:text-xl">예상 준비 비용</span>
              <span className="font-heading text-4xl font-black leading-none text-[#fec601] md:text-5xl">
                550만원
              </span>
              <span className="pb-1 text-xs font-bold text-[#fff2c6]/75 md:text-sm">
                자율시공 항목 별도
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

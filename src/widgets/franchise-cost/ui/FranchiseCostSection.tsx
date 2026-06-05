'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const costRows = [
  { item: '가맹비', amount: '300만원', result: '무료', note: '브랜드 사용 권리', waived: true },
  { item: '교육비', amount: '200만원', result: '현장 교육 무료', note: '오픈 교육 지원', waived: true },
  { item: '보증금', amount: '200만원', result: '무료', note: '초기 부담 절감', waived: true },
  { item: '로열티', amount: '20만원', result: '무료', note: '매월 고정비 절감', waived: true },
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

const waivedCount = costRows.filter((row) => row.waived).length;

function FreeStamp({ label, delay }: { label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 2.3, rotate: -18, y: -18, filter: 'blur(2px)' }}
      animate={{
        opacity: 1,
        scale: [2.3, 0.86, 1.08, 1],
        rotate: [-18, -7, -4, -5],
        y: [-18, 3, -1, 0],
        filter: ['blur(2px)', 'blur(0px)', 'blur(0px)', 'blur(0px)'],
      }}
      transition={{ duration: 0.62, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative inline-flex h-8 min-w-[58px] items-center justify-center border-2 border-[#ff3f16] bg-[#fff7ed]/90 px-2 font-heading text-xs font-black text-[#ff3f16] shadow-[0_10px_24px_rgba(255,63,22,0.18)] md:h-12 md:min-w-[86px] md:border-[3px] md:px-3 md:text-lg"
    >
      <motion.span
        className="absolute inset-[-5px] border border-[#ff3f16]/45"
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: [0, 0.75, 0], scale: [0.75, 1.18, 1.32] }}
        transition={{ duration: 0.52, delay: delay + 0.08, ease: 'easeOut' }}
      />
      <motion.span
        className="absolute -right-2 -top-2 size-2 rounded-full bg-[#ff3f16]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0.7], scale: [0, 1.5, 1] }}
        transition={{ duration: 0.38, delay: delay + 0.2 }}
      />
      <motion.span
        className="absolute -bottom-2 left-2 size-1.5 rounded-full bg-[#ff3f16]/70"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 0.9, 0.55], scale: [0, 1.4, 1] }}
        transition={{ duration: 0.38, delay: delay + 0.25 }}
      />
      {label}
    </motion.div>
  );
}

export default function FranchiseCostSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -12% 0px', amount: 0.14 });
  const [activeRow, setActiveRow] = useState<number | null>(null);

  return (
    <section
      id="franchise-cost"
      ref={ref}
      className="relative isolate overflow-hidden bg-[#fff8ef] pb-10 pt-16 md:pb-28 md:pt-36"
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
          <p
            className="text-base font-black text-[#0a3b2f] md:text-lg"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Franchise
          </p>
          <h2
            className="mt-2 text-[1.65rem] font-black leading-tight text-[#4a250f] sm:text-4xl md:mt-4 md:text-5xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            숨겨진 비용 없이
            <br />
            정직하게 시작하세요.
          </h2>
          <p className="mt-2 text-[11px] font-bold text-[#6b4222] md:mt-5 md:text-base">
            자율시공 항목은 점주님의 상황에 맞춰 합리적으로 선택할 수 있습니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="mt-5 overflow-hidden rounded-[14px] border-2 border-[#5a2c12] bg-[#fffdf4] shadow-[0_30px_80px_rgba(84,45,10,0.18)] md:mt-10 md:rounded-[18px]"
        >
          <div className="relative overflow-hidden bg-[#32190b] px-2.5 py-3 text-center text-[#fff2c6] md:px-8 md:py-6">
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.75) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.75) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
            <div className="relative grid gap-2 md:grid-cols-3 md:gap-3">
              <div className="order-1 rounded-[9px] border border-[#fec601]/35 bg-white/8 px-2.5 py-2 md:rounded-[10px] md:px-4 md:py-4">
                <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#fec601] md:text-xs md:tracking-[0.14em]">
                  Waived
                </p>
                <p className="mt-0.5 font-heading text-xl font-black text-white md:mt-1 md:text-3xl">
                  {waivedCount}개 항목
                </p>
                <p className="mt-0.5 text-[10px] font-bold leading-tight text-[#fff2c6]/75 md:mt-1 md:text-xs">
                  가맹비 · 교육비 · 보증금 · 로열티
                </p>
              </div>
              <div className="order-3 rounded-[9px] border border-[#fec601]/35 bg-[#fec601] px-2.5 py-2 text-[#32190b] shadow-[0_14px_28px_rgba(254,198,1,0.2)] md:order-2 md:rounded-[10px] md:px-4 md:py-4">
                <p className="text-[10px] font-black uppercase tracking-[0.12em] md:text-xs md:tracking-[0.14em]">
                  Startup Cost
                </p>
                <p className="mt-0.5 font-heading text-xl font-black md:mt-1 md:text-3xl">
                  550만원
                </p>
                <p className="mt-0.5 text-[10px] font-black leading-tight text-[#5a2c12] md:mt-1 md:text-xs">
                  주방설비 · 초도물품 기준
                </p>
              </div>
              <div className="order-2 rounded-[9px] border border-[#fec601]/35 bg-white/8 px-2.5 py-2 md:order-3 md:rounded-[10px] md:px-4 md:py-4">
                <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#fec601] md:text-xs md:tracking-[0.14em]">
                  Flexible
                </p>
                <p className="mt-0.5 font-heading text-xl font-black text-white md:mt-1 md:text-3xl">
                  자율 선택
                </p>
                <p className="mt-0.5 text-[10px] font-bold leading-tight text-[#fff2c6]/75 md:mt-1 md:text-xs">
                  인테리어 · 간판 · POS
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[0.8fr_1fr_1.1fr] bg-[#5a2c12] px-2.5 py-2 text-center text-[10px] font-black text-[#fff2c6] md:px-8 md:py-4 md:text-base">
            <div>항목</div>
            <div>일반 기준</div>
            <div>오늘은 오므라이스</div>
          </div>

          <div className="space-y-1 bg-[#fff8ef] px-2 py-2 md:space-y-2 md:px-6 md:py-5">
            {costRows.map((row, index) => {
              const delay = 0.48 + index * 0.08;
              const isActive = activeRow === index;

              return (
                <motion.div
                  key={row.item}
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                  transition={{ duration: 0.45, delay: 0.16 + index * 0.045, ease: 'easeOut' }}
                  whileHover={{ y: -3 }}
                  onMouseEnter={() => setActiveRow(index)}
                  onMouseLeave={() => setActiveRow(null)}
                  className={`group relative grid grid-cols-[0.8fr_1fr_1.1fr] items-center overflow-hidden rounded-[9px] border px-2 py-1.5 text-center text-[10px] font-bold text-[#43210d] shadow-[0_8px_18px_rgba(84,45,10,0.06)] transition-all duration-300 md:rounded-[12px] md:px-5 md:py-3 md:text-sm ${
                    row.waived
                      ? 'border-[#ff6b12]/45 bg-white hover:border-[#ff3f16] hover:shadow-[0_18px_34px_rgba(255,107,18,0.17)]'
                      : 'border-[#f4c47d]/75 bg-[#fffdf8] hover:border-[#fec601] hover:shadow-[0_18px_34px_rgba(84,45,10,0.10)]'
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-[#fec601]/0 via-[#fec601]/0 to-[#ff6b12]/0 transition duration-300 group-hover:via-[#fec601]/10 group-hover:to-[#ff6b12]/5" />
                  {row.waived && (
                    <motion.div
                      className="pointer-events-none absolute bottom-0 left-0 top-0 w-1 bg-[#ff6b12]"
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ duration: 0.42, delay, ease: 'easeOut' }}
                    />
                  )}
                  <div className="relative font-heading text-[11px] font-black md:text-base">
                    {row.item}
                    {row.waived && row.note && (
                      <motion.span
                        className="mt-1 hidden text-[10px] font-black text-[#ff6b12] sm:block"
                        initial={{ opacity: 0 }}
                        animate={
                          isActive || isInView ? { opacity: isActive ? 1 : 0.72 } : { opacity: 0 }
                        }
                      >
                        {row.note}
                      </motion.span>
                    )}
                  </div>
                  <div className="flex min-h-6 items-center justify-center md:min-h-8">
                    {row.waived ? (
                      <span className="relative inline-flex items-center justify-center px-1 text-[#8a6848]/70">
                        {row.amount}
                        <motion.span
                          className="absolute left-0 top-1/2 h-[2px] w-full origin-left -translate-y-1/2 bg-[#ff4f1f]"
                          initial={{ scaleX: 0 }}
                          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                          transition={{ duration: 0.5, delay: delay + 0.05, ease: 'easeOut' }}
                        />
                      </span>
                    ) : (
                      <span>{row.amount}</span>
                    )}
                  </div>
                  <div className="flex min-h-6 items-center justify-center md:min-h-8">
                    {row.waived ? (
                      <div className="flex flex-col items-center gap-1">
                        {isInView && <FreeStamp label="0원" delay={delay + 0.26} />}
                        <span className="text-[10px] font-black text-[#6b4222] md:text-xs">
                          {row.result}
                        </span>
                      </div>
                    ) : (
                      <span className="rounded-full bg-[#fff0d2] px-2 py-1 text-[10px] font-black text-[#6b4222] md:px-3 md:py-1.5 md:text-sm">
                        {row.result}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="bg-[#32190b] px-4 py-3 text-center text-[#fff2c6] md:px-8 md:py-6">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#fec601]">
              Final Estimate
            </p>
            <div className="mt-2 flex flex-wrap items-end justify-center gap-x-3 gap-y-1">
              <span className="font-heading text-base font-black md:text-xl">예상 준비 비용</span>
              <span className="font-heading text-3xl font-black leading-none text-[#fec601] md:text-5xl">
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

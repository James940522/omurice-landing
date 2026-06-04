'use client';

import { ChevronRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const processes = [
  {
    step: 'STEP 01',
    title: '창업 상담',
    description: '전담 상담사와 1:1 맞춤 상담\n입지 분석 및 예상 수익 분석',
    image: '/asset/etc/process-1.png',
  },
  {
    step: 'STEP 02',
    title: '계약 체결',
    description: '투명한 계약 조건 안내\n가맹 계약 및 교육 일정 확정',
    image: '/asset/etc/process-2.png',
  },
  {
    step: 'STEP 03',
    title: '오픈 교육',
    description: '본사 직영점 실습 교육\n조리, 운영 관리 전반',
    image: '/asset/etc/process-3.png',
  },
  {
    step: 'STEP 04',
    title: '사후 관리',
    description: '정기 방문 및 컨설팅\n신메뉴 개발 및 교육 지속',
    image: '/asset/etc/process-4.png',
  },
];

const processGridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const processCardVariants = {
  hidden: {
    opacity: 0,
    x: -46,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.68,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function StartupProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="startup-process"
      className="relative isolate overflow-hidden bg-[#f7a900] py-20 text-[#32190b] md:py-28 lg:py-32"
      ref={ref}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(135deg,#f08d00_0%,#fec601_38%,#eda000_72%,#ff6b12_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.48) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.48) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      <div className="pointer-events-none absolute -left-[8%] top-4 -z-10 h-9 w-[42rem] -rotate-[15deg] bg-[#ff6b12]/82 shadow-[0_16px_36px_rgba(84,35,0,0.16)]" />
      <div className="pointer-events-none absolute -left-[7%] top-6 z-0 hidden w-[42rem] -rotate-[15deg] overflow-hidden whitespace-nowrap font-heading text-xs font-black uppercase tracking-[0.14em] text-[#fff3c6] md:block">
        TODAY OMURICE &nbsp; * &nbsp; START SMALL &nbsp; * &nbsp; GROW STRONG &nbsp; * &nbsp; OWNER FIRST
      </div>
      <div className="pointer-events-none absolute -left-[8%] top-[16%] -z-10 h-28 w-[118%] -rotate-[13deg] bg-[#fff4b8]/26" />
      <div className="pointer-events-none absolute -left-[8%] top-[27%] -z-10 h-24 w-[118%] -rotate-[13deg] bg-[#ff8a12]/18" />
      <div className="pointer-events-none absolute -right-[8%] bottom-[13%] -z-10 h-44 w-[116%] -rotate-[8deg] bg-[#4a260f]/72" />
      <div className="pointer-events-none absolute -bottom-12 right-[-4%] -z-10 h-44 w-[42%] -rotate-[8deg] bg-[#ff6b12]/84" />
      <div className="pointer-events-none absolute left-[4%] top-[7%] -z-10 font-heading text-[clamp(4.5rem,15vw,13rem)] font-black leading-none tracking-[-0.06em] text-white/12">
        STARTUP PROCESS
      </div>
      <div className="pointer-events-none absolute left-10 top-[29%] -z-10 hidden gap-2 md:flex">
        {Array.from({ length: 7 }).map((_, index) => (
          <span key={`process-stripe-${index}`} className="h-3 w-2 -skew-x-[22deg] bg-[#4a260f]/82" />
        ))}
      </div>
      <div className="pointer-events-none absolute right-[11%] top-[24%] z-0 hidden size-24 items-center justify-center rounded-full border-2 border-[#f6c36d] bg-[#2d1609]/92 text-center font-heading text-lg font-black leading-tight text-[#fec601] shadow-[0_16px_36px_rgba(47,21,2,0.24)] lg:flex">
        SINCE
        <br />
        2024
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="mb-14 text-center md:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-heading text-sm font-black uppercase tracking-[0.18em] text-[#ff6b12]">
            Process
          </p>
          <h2
            className="mt-4 text-4xl font-black leading-tight text-[#32190b] drop-shadow-[0_5px_0_rgba(255,244,184,0.6)] md:text-6xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            창업 프로세스
          </h2>
          <p className="mt-5 text-base font-black text-[#4a260f] md:text-xl">
            상담부터 오픈까지, 체계적인 4단계 시스템
          </p>
          <div className="mx-auto mt-7 h-[4px] w-20 bg-[#ff6b12] shadow-[0_6px_0_rgba(74,38,15,0.12)]" />
        </motion.div>

        <div className="relative mx-auto max-w-6xl">
          <div className="pointer-events-none absolute left-[6%] right-[6%] top-[52%] hidden h-px bg-linear-to-r from-transparent via-[#ff6b12]/35 to-transparent lg:block" />
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-[52%] hidden -translate-y-1/2 justify-between lg:flex">
            {processes.map((process) => (
              <span
                key={`${process.step}-dot`}
                className="size-2 border border-[#ff6b12]/55 bg-[#fff8ef]"
              />
            ))}
          </div>

          <motion.div
            className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6"
            variants={processGridVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {processes.map((process, index) => (
              <motion.div
                key={index}
                className="relative"
                variants={processCardVariants}
                whileHover={{ y: -6 }}
              >
                <article className="group relative h-full overflow-hidden rounded-[8px] border border-[#4a260f]/25 bg-[#fffaf0] shadow-[0_22px_55px_rgba(84,35,0,0.24)] ring-1 ring-white/40">
                  <div className="absolute left-3 top-3 z-20 border border-[#fff2c6] bg-[#ff6b12] px-2 py-1 text-[0.62rem] font-black tracking-[0.08em] text-white shadow-[0_8px_18px_rgba(84,35,0,0.2)] sm:left-4 sm:top-4 sm:px-3 sm:text-xs">
                    {process.step}
                  </div>

                  <div className="relative h-32 overflow-hidden sm:h-64 lg:h-56">
                    <Image
                      src={process.image}
                      alt={process.title}
                      fill
                      className="object-cover brightness-[1.04] saturate-[0.96] transition duration-700 group-hover:scale-105"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#32190b]/28 via-transparent to-transparent" />
                  </div>

                  <div className="relative p-3 sm:p-5 md:p-6">
                    <span className="absolute right-3 top-3 font-heading text-4xl font-black leading-none text-[#ff6b12]/18 sm:right-5 sm:top-4 sm:text-5xl">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <h3 className="relative break-keep text-lg font-black text-[#32190b] sm:text-2xl md:text-[1.65rem]">
                      {process.title}
                    </h3>

                    <div className="my-3 h-px bg-linear-to-r from-[#ff6b12] via-[#fec601]/70 to-transparent sm:my-5" />

                    <p className="relative whitespace-pre-line text-[0.72rem] font-semibold leading-relaxed text-[#6b4222]/82 sm:text-sm md:text-base">
                      {process.description}
                    </p>
                  </div>
                </article>

                {index < processes.length - 1 && (
                  <div className="absolute -right-3 top-1/2 z-30 hidden size-7 -translate-y-1/2 items-center justify-center bg-[#ff6b12] text-white shadow-[0_8px_20px_rgba(255,107,18,0.25)] lg:flex">
                    <ChevronRight className="size-5" strokeWidth={2.4} />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

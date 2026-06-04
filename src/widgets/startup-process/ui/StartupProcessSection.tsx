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

export default function StartupProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="startup-process"
      className="relative overflow-hidden bg-[#f7a900] py-20 md:py-32"
      ref={ref}
    >
      <Image
        src="/new-asset/startup-process/process-bg.webp"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none absolute inset-0 z-0 object-cover"
        quality={90}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="mb-14 text-center md:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lg font-black text-[#4a250f]" style={{ fontFamily: 'Georgia, serif' }}>
            Process
          </p>
          <h2
            className="mt-4 text-4xl font-black leading-tight text-[#32190b] md:text-6xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            창업 프로세스
          </h2>
          <p className="mt-5 text-base font-bold text-[#6b4222] md:text-xl">
            상담부터 오픈까지, 체계적인 4단계 시스템
          </p>
          <div className="mx-auto mt-7 h-[3px] w-16 bg-[#ff6b12]" />
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

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {processes.map((process, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * index }}
                whileHover={{ y: -6 }}
              >
                <article className="group relative h-full overflow-hidden rounded-[8px] border border-[#e9b46b]/75 bg-[#fffef8] shadow-[0_22px_55px_rgba(84,45,10,0.13)]">
                  <div className="absolute left-3 top-3 z-20 border border-[#fff2c6] bg-[#ff6b12] px-2 py-1 text-[0.62rem] font-black tracking-[0.08em] text-white shadow-[0_8px_18px_rgba(255,107,18,0.24)] sm:left-4 sm:top-4 sm:px-3 sm:text-xs">
                    {process.step}
                  </div>

                  <div className="relative h-36 overflow-hidden sm:h-64 lg:h-60">
                    <Image
                      src={process.image}
                      alt={process.title}
                      fill
                      className="object-cover brightness-[1.04] saturate-[0.96] transition duration-700 group-hover:scale-105"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#fffef8] via-[#fffef8]/12 to-transparent" />
                  </div>

                  <div className="relative p-3 sm:p-5 md:p-6">
                    <span className="absolute right-3 top-3 text-4xl font-black leading-none text-[#ff6b12]/10 sm:right-5 sm:top-4 sm:text-5xl">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <h3 className="relative text-lg font-black text-[#32190b] sm:text-2xl md:text-[1.65rem]">
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
          </div>
        </div>
      </div>
    </section>
  );
}

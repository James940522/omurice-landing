'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const values = [
  {
    title: '점주님과의 상생',
    subtitle: 'Partnership',
    description: '가맹점의 성장을 기준으로 운영과 관리를 함께합니다.',
  },
  {
    title: '진심을 담은 한 그릇',
    subtitle: 'Sincerity',
    description: '맛과 품질, 정성을 담아 오래 찾는 한 그릇을 만듭니다.',
  },
  {
    title: '지속 가능한 성장',
    subtitle: 'Sustainability',
    description: '작게 시작해도 오래 운영할 수 있는 구조를 만듭니다.',
  },
];

export default function BrandIntroSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="brand" className="relative overflow-hidden py-16 md:py-24 lg:py-32" ref={ref}>
      <div className="absolute inset-0 z-0 bg-amber-400">
        <div className="relative mx-auto h-full w-full max-w-[1920px]">
          <Image
            src="/new-asset/brand-intro/brand-intro-bg.webp"
            alt="오늘은 오므라이스 메뉴"
            fill
            className="object-cover"
            quality={90}
          />
        </div>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/50" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="space-y-8 text-left md:space-y-10 md:text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div>
            <motion.div
              className="mb-3 md:mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-sm font-bold uppercase tracking-widest text-white/80 md:text-base lg:text-lg">
                About Us
              </span>
            </motion.div>

            <motion.h2
              className="typo-h2 mb-6 leading-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              안녕하세요,
              <br />
              <span className="text-yellow-400">오늘은 오므라이스입니다.</span>
            </motion.h2>

            <motion.p
              className="typo-body max-w-2xl text-gray-200 md:mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              실제 운영 데이터를 기반으로
              <br />
              누구나 안정적으로 운영할 수 있는 시스템을 만들었습니다.
              <br />
              <br />
              <span className="text-yellow-400 font-bold">
                &lsquo;꾸준히 선택받는 브랜드&rsquo;
              </span>
              <br className="hidden md:block" />
              <br className="md:hidden" />
              오늘은 오므라이스가 지키는 기준입니다.
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-3 gap-2 pt-2 sm:gap-3 sm:pt-3 md:gap-4 md:pt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="min-w-0 rounded-xl border border-white/20 bg-white/10 p-2.5 text-center backdrop-blur-md transition-all duration-300 hover:bg-white/15 sm:p-4 md:rounded-2xl md:p-5"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <div className="mb-1 truncate text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-yellow-400/90 sm:mb-2 sm:text-[0.65rem] md:text-xs md:tracking-wider">
                  {value.subtitle}
                </div>
                <h3
                  className="mb-1 text-[0.78rem] font-bold leading-tight text-white sm:text-base md:mb-2 md:text-xl"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {value.title}
                </h3>
                <p className="text-[0.8rem] font-medium leading-snug text-gray-300 sm:text-sm md:text-base">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

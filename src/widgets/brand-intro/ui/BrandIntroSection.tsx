'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const values = [
  {
    title: '점주님과의 상생',
    subtitle: 'Partnership',
    description:
      '점주님의 성공이 곧 저희의 성공입니다. 모든 매장이 함께 성장할 수 있도록 끊임없이 고민하고 지원합니다.',
  },
  {
    title: '진심을 담은 한 그릇',
    subtitle: 'Sincerity',
    description:
      '맛있는 오므라이스 한 그릇으로 고객님께 행복을 전합니다. 품질과 정성을 절대 타협하지 않습니다.',
  },
  {
    title: '지속 가능한 성장',
    subtitle: 'Sustainability',
    description:
      '단기 수익이 아닌 장기적 관점에서 안정적이고 지속 가능한 프랜차이즈 시스템을 만들어갑니다.',
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
              수많은 운영 데이터를 기반으로
              <br />
              누구나 안정적으로 운영할 수 있는
              <br /> 표준화된 시스템을 구축했습니다.
              <br />
              <br />
              단기 유행이 아닌,
              <br className="hidden md:block" />
              <span className="text-yellow-400 font-bold">
                &lsquo;꾸준히 매출이 나는 브랜드&rsquo;
              </span>
              <br className="hidden md:block" />
              <br className="md:hidden" />
              외식업의 본질입니다.
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-3"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="rounded-2xl border border-white/20 bg-white/10 p-5 text-left backdrop-blur-md transition-all duration-300 hover:bg-white/15 md:text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-yellow-400/90">
                  {value.subtitle}
                </div>
                <h3
                  className="mb-2 text-lg font-bold text-white md:text-xl"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {value.title}
                </h3>
                <p className="typo-body-sm text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

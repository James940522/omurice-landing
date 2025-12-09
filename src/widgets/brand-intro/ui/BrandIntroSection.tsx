'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function BrandIntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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

  return (
    <section id="brand" className="relative overflow-hidden py-16 md:py-24 lg:py-32" ref={ref}>
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0 bg-amber-400">
        {/* 이미지 컨테이너 - 원본 크기까지만 확대 */}
        <div className="relative w-full h-full max-w-[1920px] mx-auto">
          <Image
            src="/asset/menu/오늘은_오므라이스/메뉴모음컷/메뉴모음컷 6.jpg"
            alt="배경"
            fill
            className="object-cover"
            quality={90}
          />
        </div>
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black/60" />
        {/* 그라데이션 오버레이 - 진중한 느낌 강화 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 텍스트 콘텐츠 - 모바일 좌측, 데스크톱 중앙 정렬 */}
        <motion.div
          className="space-y-8 md:space-y-10 text-left md:text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* 타이틀 */}
          <div>
            <motion.div
              className="mb-3 md:mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-sm md:text-base lg:text-lg text-white/80 font-bold tracking-widest uppercase">
                About Us
              </span>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              안녕하세요,
              <br />
              <span className="text-yellow-400">오늘은 오므라이스입니다.</span>
            </motion.h2>
            <motion.p
              className="text-base md:text-lg text-gray-200 leading-relaxed font-medium max-w-2xl md:mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              수많은 운영 데이터를 기반으로
              <br className="hidden md:block" />
              <span className="md:inline"> </span>누구나 안정적으로 운영할 수 있는
              <br />
              표준화된 시스템을 구축했습니다.
              <br />
              <br />
              단기 유행이 아닌,
              <br className="hidden md:block" />
              <span className="md:inline"> </span>
              <span className="text-yellow-400 font-bold">&lsquo;꾸준히 매출이 나는 브랜드&rsquo;</span>
              <br className="hidden md:block" />
              <span className="md:inline"> </span>가 외식업의 본질입니다.
            </motion.p>
          </div>

          {/* 밸류 리스트 - 가로 배치 */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 text-left md:text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <div className="text-xs text-yellow-400/90 font-semibold uppercase tracking-wider mb-2">
                  {value.subtitle}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

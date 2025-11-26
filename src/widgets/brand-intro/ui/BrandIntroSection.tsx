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
      color: 'from-yellow-400 to-orange-400',
    },
    {
      title: '진심을 담은 한 그릇',
      subtitle: 'Sincerity',
      description:
        '맛있는 오므라이스 한 그릇으로 고객님께 행복을 전합니다. 품질과 정성을 절대 타협하지 않습니다.',
      color: 'from-orange-400 to-red-400',
    },
    {
      title: '지속 가능한 성장',
      subtitle: 'Sustainability',
      description:
        '단기 수익이 아닌 장기적 관점에서 안정적이고 지속 가능한 프랜차이즈 시스템을 만들어갑니다.',
      color: 'from-red-400 to-pink-400',
    },
  ];

  return (
    <section
      id="brand"
      className="relative overflow-hidden py-16 md:py-24 lg:py-32"
      ref={ref}
    >
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/asset/bg/sec2-bg.jpg"
          alt="배경"
          fill
          className="object-cover"
          quality={90}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 좌우 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* 왼쪽: 텍스트 콘텐츠 */}
          <motion.div
            className="space-y-8 md:space-y-10"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
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
                <span className="text-sm md:text-base lg:text-lg text-white font-bold tracking-widest uppercase drop-shadow-lg">
                  About Us
                </span>
              </motion.div>
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                안녕하세요,
                <br />
                <span className="text-yellow-300">오늘은 오므라이스입니다.</span>
              </motion.h2>
              <motion.p
                className="text-base md:text-lg text-white leading-relaxed drop-shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                오늘은 오므라이스는 수많은 운영 데이터를 기반으로
                <br />
                재현성 높은 맛, 표준화된 조리 시스템, 효율적인 동선과 매장 구조를 구축해
                <br />
                누구나 안정적으로 매장을 운영할 수 있도록 돕고 있습니다.
                <br />
                <br />
                우리는 단기적인 유행보다
                <br />
                &lsquo;꾸준히 매출이 나는 브랜드&rsquo;를 만드는 것이 외식업의 본질이라고
                생각합니다.
                <br />
                <br />
                점주님과 함께 성장하는 파트너십,
                <br />
                장기적으로 유지 가능한 운영 구조,
                <br />
                고객에게 신뢰받는 맛과 서비스.
                <br />
                <br />이 세 가지를 지키기 위해 오늘은 오므라이스는 오늘도 고민하고 움직입니다.
              </motion.p>
            </div>

            {/* 밸류 리스트 */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/30 hover:bg-white transition-all duration-300 shadow-lg"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex-1">
                    <div className="text-xs text-gray-600 font-semibold uppercase tracking-wider mb-1">
                      {value.subtitle}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* 오른쪽: 이미지 */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="relative bg-gray-100 rounded-3xl p-3 md:p-4 lg:p-5 border-2 border-gray-200">
              <div className="relative w-full aspect-square">
                <Image
                  src="/asset/menu/메뉴모음컷/01.13108769.jpg"
                  alt="메뉴 이미지"
                  fill
                  className="rounded-2xl shadow-2xl object-cover"
                  quality={75}
                />
              </div>
              {/* 장식 요소 */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-300 rounded-full blur-3xl opacity-30" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-orange-400 rounded-full blur-3xl opacity-30" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

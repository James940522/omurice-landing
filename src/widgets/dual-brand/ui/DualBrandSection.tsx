'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function DualBrandSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      id="dual-brand" 
      className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-16 md:py-24 lg:py-32" 
      ref={ref}
    >
      {/* 부드러운 배경 효과 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-orange-300/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 상단 타이틀 */}
        <motion.div
          className="text-center mb-8 md:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="text-sm md:text-base lg:text-lg text-foreground/70 font-bold tracking-widest uppercase mb-3 block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Dual Brand System
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            제로 커톤 기반으로 한
            <br />
            <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              필만한 브랜드
            </span>
          </motion.h2>
          <motion.p 
            className="text-base md:text-lg lg:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            한국 사람들에게 사랑 받는 메뉴,
            <br />
            매출이 나올만한 메뉴 구성,
            <br />
            브랜딩에 집중했습니다.
          </motion.p>
        </motion.div>

        {/* 브랜드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* 메인 브랜드 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-500 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl border-3 border-amber-600 relative overflow-hidden h-full flex flex-col">
              {/* 장식 요소 */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-300/30 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-orange-400/30 rounded-full blur-3xl" />
              
              <div className="relative z-10 flex flex-col h-full">
                <motion.div
                  className="flex items-center justify-center mb-4 md:mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <span className="bg-white/90 backdrop-blur-sm text-foreground px-4 md:px-5 py-1.5 md:py-2 rounded-full text-sm md:text-base lg:text-lg font-bold shadow-lg border-2 border-amber-700">
                    메인 브랜드
                  </span>
                </motion.div>

                <motion.div
                  className="flex justify-center mb-4 md:mb-6 flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="relative w-full">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-2xl border-2 border-amber-700">
                      <div className="relative w-full h-24 md:h-32 lg:h-36">
                        <Image
                          src="/asset/logo/오므라이스_문구_일자.png"
                          alt="오늘은 오므라이스"
                          fill
                          className="object-contain drop-shadow-lg"
                          quality={90}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <p className="text-white/95 text-sm md:text-base leading-relaxed font-medium">
                    오므라이스 전문점으로 시장을 선도하는 대표 브랜드.
                    <br />
                    다양한 토핑과 소스로 고객의 취향을 만족시키며,
                    <br />
                    안정적인 매출과 높은 재방문율을 자랑합니다.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* 투트랙 브랜드 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl border-3 border-orange-700 relative overflow-hidden h-full flex flex-col">
              {/* 장식 요소 */}
              <div className="absolute top-0 left-0 w-48 h-48 bg-yellow-300/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-56 h-56 bg-red-400/20 rounded-full blur-3xl" />
              
              <div className="relative z-10 flex flex-col h-full">
                <motion.div
                  className="flex items-center justify-center mb-4 md:mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <span className="bg-white/90 backdrop-blur-sm text-foreground px-4 md:px-5 py-1.5 md:py-2 rounded-full text-sm md:text-base lg:text-lg font-bold shadow-lg border-2 border-orange-800">
                    투트랙 브랜드
                  </span>
                </motion.div>

                <motion.div
                  className="flex justify-center mb-4 md:mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <div className="relative w-full max-w-[200px] md:max-w-[220px]">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 shadow-2xl border-2 border-orange-800">
                      <div className="relative w-full aspect-square">
                        <Image
                          src="/asset/logo/에그이츠_로고.jpeg"
                          alt="EGG EATS"
                          fill
                          className="object-contain drop-shadow-lg rounded-lg"
                          quality={90}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="text-center flex-1 flex flex-col justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <p className="text-white/95 text-sm md:text-base leading-relaxed font-medium mb-4">
                    배달 특화 브랜드로 빠르고 효율적인 운영을 추구합니다.
                    <br />
                    간편한 메뉴 구성과 최적화된 주방 시스템으로
                    <br />
                    배달 시장에서 경쟁력을 확보했습니다.
                  </p>

                  <motion.div
                    className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4 border-2 border-white/30"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <p className="text-white text-xs md:text-sm lg:text-base font-bold">
                      ✨ 투트랙 브랜드란?
                    </p>
                    <p className="text-white/90 text-xs md:text-sm mt-1 md:mt-2 leading-relaxed">
                      동일한 재료, 동일한 조리법으로 2개의 브랜드를 운영할 수 있어서 가장 쉽게 추가 매출을 낼 수 있으며, 메인 브랜드 도입시에만 추가 가능합니다.
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 하단 CTA */}
        <motion.div
          className="text-center mt-12 md:mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <motion.a
            href="#contact"
            className="inline-block bg-foreground text-white px-8 py-4 md:px-10 md:py-5 rounded-full text-base md:text-lg lg:text-xl font-bold shadow-strong-hover hover:bg-amber-700 transition-all duration-300 border-3 border-foreground"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            브랜드 상담 받기
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}


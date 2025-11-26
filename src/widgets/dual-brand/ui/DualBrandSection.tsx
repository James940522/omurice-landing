'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function DualBrandSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="dual-brand" className="relative overflow-hidden py-16 md:py-24 lg:py-32" ref={ref}>
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image src="/asset/bg/sec3-bg.jpg" alt="배경" fill className="object-cover" quality={90} />
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
            className="text-sm md:text-base lg:text-lg text-gray-900 bg-white/90 px-6 py-2 rounded-full font-bold tracking-widest uppercase mb-3 inline-block shadow-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Dual Brand System
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 [text-shadow:_2px_2px_0_#fff,_-2px_-2px_0_#fff,_2px_-2px_0_#fff,_-2px_2px_0_#fff,_4px_4px_8px_rgba(255,255,255,0.8)]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            실패 확률을 낮춘
            <br />
            <span className="text-yellow-600">검증된 수익 브랜드</span>
          </motion.h2>
          <motion.p
            className="text-base md:text-lg lg:text-xl text-gray-900 bg-white/80 px-6 py-3 rounded-2xl max-w-3xl mx-auto leading-relaxed font-bold shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            매출 데이터로 검증된 메뉴 구성 +
            <br />
            <span className="text-yellow-600">추가 투자 없이 매출 2배</span> 가능한 투트랙 시스템
          </motion.p>
        </motion.div>

        {/* 브랜드 레이아웃 - 메인 + 추가 옵션 */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center">
            {/* 메인 브랜드 섹션 - 더 큰 비율 */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-linear-to-br from-orange-50 via-orange-100 to-orange-200 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl border-3 border-orange-300 relative overflow-hidden">
                {/* 장식 요소 */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-orange-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-orange-300/30 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <motion.div
                    className="flex items-center justify-center mb-6 md:mb-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <span className="bg-white text-foreground px-6 md:px-7 py-2 md:py-2.5 rounded-full text-base md:text-lg lg:text-xl font-bold shadow-lg border-2 border-yellow-500">
                      메인 브랜드
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex justify-center mb-6 md:mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <div className="flex justify-center">
                      <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-yellow-500">
                        <Image
                          src="/asset/logo/오므라이스_문구_일자.png"
                          alt="오늘은 오므라이스"
                          width={400}
                          height={200}
                          className="h-32 md:h-40 lg:h-48 w-auto object-contain drop-shadow-lg"
                          quality={90}
                        />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="text-center space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    <p className="text-gray-900 text-base md:text-lg leading-relaxed font-bold">
                      월 매출 5,000만원 돌파 가맹점 다수 배출
                    </p>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                      검증된 레시피 + 탄탄한 브랜딩으로
                      <br />
                      <span className="font-bold text-yellow-500">
                        재방문율 70% 이상, 안정적 수익 구조
                      </span>
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* 플러스 아이콘 */}
            <motion.div
              className="lg:col-span-1 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="relative">
                <motion.div
                  className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <span className="text-white text-4xl md:text-5xl font-bold">+</span>
                </motion.div>
              </div>
            </motion.div>

            {/* 투트랙 브랜드 섹션 - 추가 옵션 느낌 */}
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="relative">
                {/* "추가 가능" 배지 */}
                <motion.div
                  className="absolute -top-4 -right-2 z-20"
                  initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
                  animate={isInView ? { opacity: 1, scale: 1, rotate: 12 } : {}}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <div className="bg-linear-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-xs md:text-sm font-bold shadow-lg border-2 border-white">
                    매출 2배 찬스!
                  </div>
                </motion.div>

                <div className="bg-linear-to-br from-orange-100 via-orange-200 to-orange-300 rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-2xl border-3 border-orange-400 relative overflow-hidden">
                  {/* 장식 요소 */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-orange-200/30 rounded-full blur-2xl" />
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-300/30 rounded-full blur-2xl" />

                  <div className="relative z-10">
                    <motion.div
                      className="flex items-center justify-center mb-4 md:mb-5"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                      <span className="bg-white text-foreground px-4 md:px-5 py-1.5 md:py-2 rounded-full text-sm md:text-base font-bold shadow-lg border-2 border-yellow-500">
                        투트랙 브랜드
                      </span>
                    </motion.div>

                    <motion.div
                      className="flex justify-center mb-4 md:mb-5"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    >
                      <div className="relative w-full max-w-[180px] md:max-w-[200px]">
                        <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 shadow-2xl border-2 border-yellow-500">
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
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.9 }}
                    >
                      <p className="text-gray-900 text-sm md:text-base leading-relaxed font-bold mb-4">
                        같은 주방, 같은 재료로
                        <br />
                        <span className="text-yellow-500 text-base md:text-lg">
                          배달 매출 추가 확보!
                        </span>
                      </p>

                      <motion.div
                        className="bg-white rounded-lg p-3 border-2 border-yellow-400"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 1.0 }}
                      >
                        <p className="text-gray-900 text-xs md:text-sm font-bold mb-1">
                          💡 투트랙이 매출 2배인 이유?
                        </p>
                        <p className="text-gray-700 text-xs leading-relaxed">
                          <span className="font-bold text-yellow-500">추가 비용 0원!</span> 동일
                          재료+조리법으로
                          <br />
                          2개 브랜드 동시 운영 = 배달앱 노출 2배
                          <br />
                          <span className="font-semibold">※ 메인 브랜드 도입 필수</span>
                        </p>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
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
            className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-4 md:px-10 md:py-5 rounded-full text-base md:text-lg lg:text-xl font-bold shadow-2xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 border-4 border-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            💰 수익 브랜드 무료 상담받기
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

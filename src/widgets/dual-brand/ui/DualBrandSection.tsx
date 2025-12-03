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
        {/* ========== 메인 브랜드 섹션 ========== */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 [text-shadow:_2px_2px_0_#fff,_-2px_-2px_0_#fff,_2px_-2px_0_#fff,_-2px_2px_0_#fff,_4px_4px_8px_rgba(255,255,255,0.8)]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            쉬운 레시피로 사랑받는
            <br />
            <span className="text-orange-500">메인 브랜드</span>
          </motion.h2>
        </motion.div>

        {/* 메인 브랜드 카드 */}
        <motion.div
          className="max-w-md mx-auto mb-20 md:mb-28"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
            {/* 배경 이미지 */}
            <div className="relative h-80 md:h-96">
              <Image
                src="/asset/menu/오늘은_오므라이스/메뉴모음컷/메뉴모음컷 7.jpeg"
                alt="오늘은 오므라이스 메뉴"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                quality={90}
              />
              {/* 그라데이션 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            {/* 컨텐츠 */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
              {/* 로고 배경 */}
              {/* <div className="bg-white rounded-2xl p-4 mb-4 inline-block shadow-xl">
                <Image
                  src="/asset/logo/오늘은_오므라이스_풀로고.jpeg"
                  alt="오늘은 오므라이스"
                  width={200}
                  height={200}
                  className="h-20 md:h-24 w-auto object-contain"
                  quality={90}
                />
              </div> */}

              {/* 브랜드명 */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">오늘은 오므라이스</h3>

              {/* 설명 */}
              <div className="space-y-1 text-white/90">
                <p className="text-sm md:text-base font-medium">간편한 조리로 높은 수익성 달성</p>
                <p className="text-sm md:text-base font-bold text-orange-400">
                  1년만에 가맹점 100개 돌파 월매출 1억5천 신화
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========== 투트랙 브랜드 섹션 ========== */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 [text-shadow:_2px_2px_0_#fff,_-2px_-2px_0_#fff,_2px_-2px_0_#fff,_-2px_2px_0_#fff,_4px_4px_8px_rgba(255,255,255,0.8)]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span className="block">동일한 레시피로 하나 더!</span>
            <span className="block mt-1">
              저희의 <span className="text-orange-500">투트랙 브랜드</span>를 소개합니다.
            </span>
          </motion.h2>
          <motion.div
            className="bg-gray-100/90 rounded-2xl px-6 py-4 max-w-3xl mx-auto shadow-lg mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="text-base md:text-lg text-gray-800 leading-relaxed">
              <span className="font-bold">투트랙 브랜드란?</span>
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>
              메인브랜드와 동일한 레시피, 동일한 재료로
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              브랜드만 추가해서 <span className="font-bold text-orange-500">쉽게 추가 매출</span>을
              올릴 수 있습니다.
            </p>
          </motion.div>
        </motion.div>

        {/* 투트랙 브랜드 비교 카드 */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
            {/* 2개 브랜드 로고 */}
            <div className="flex items-center justify-center gap-6 md:gap-8 mb-8">
              <motion.div
                className="flex-1 max-w-[200px]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-gray-50  shadow-lg">
                  <Image
                    src="/asset/logo/오늘은_오므라이스_풀로고.jpeg"
                    alt="오늘은 오므라이스"
                    width={200}
                    height={200}
                    className="w-full h-auto object-contain"
                    quality={90}
                  />
                </div>
              </motion.div>

              <div className="flex-shrink-0">
                <span className="text-orange-500 text-5xl font-bold">+</span>
              </div>

              <motion.div
                className="flex-1 max-w-[200px]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-gray-50 rounded-2xl border-1 border-gray-200 shadow-lg">
                  <div className="relative w-full aspect-square">
                    <Image
                      src="/asset/logo/에그이츠_로고.jpeg"
                      alt="에그이츠"
                      fill
                      className="object-contain rounded-lg"
                      quality={90}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 설명 */}
            <div className="text-center space-y-4">
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                같은 주방, 같은 재료로
                <br />
                <span className="text-orange-500">배달앱 노출 2배 효과!</span>
              </p>

              <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  <span className="font-bold">투트랙이 매출 2배인 이유?</span>
                  <br />
                  <span className="font-bold text-orange-500">추가 비용 0원!</span> 동일
                  재료+조리법으로
                  <br />
                  <span className="text-orange-600">오늘은 오므라이스 + 에그이츠</span> = 배달앱
                  노출 2배
                  <br />
                  <span className="font-semibold text-gray-600 text-sm">
                    ※ 추가 인력, 추가 재료 없이 브랜드만 추가
                  </span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

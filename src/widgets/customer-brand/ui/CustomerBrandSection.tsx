'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const proofItems = [
  {
    label: '배달앱 평점 5점 만점!',
    src: '/new-asset/sec-5/phone-rating.png',
    alt: '오늘은 오므라이스 배달앱 평점 5점 만점 화면',
    width: 1086,
    height: 1449,
  },
  {
    label: '지역 맛집 랭킹 1위!',
    src: '/new-asset/sec-5/phone-ranking.png',
    alt: '오늘은 오므라이스 지역 맛집 랭킹 1위 화면',
    width: 1086,
    height: 1448,
  },
];

export default function CustomerBrandSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px', amount: 0.15 });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-white py-20 md:py-28 lg:py-32"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="shrink-0"
          >
            <h2
              className="text-[2.4rem] font-black leading-[1.15] tracking-tight text-[#1a1a1a] md:text-5xl lg:text-6xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              고객들이
              <br />
              선택한 브랜드
            </h2>
          </motion.div>

          {/* 우: 서브 카피 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-sm md:pt-2"
          >
            <p className="mb-2 text-sm font-bold italic text-[#1a3f9e] md:text-base">
              오늘도 고객이 찾는 오므라이스
            </p>
            <p className="text-sm leading-relaxed text-[#555] md:text-base">
              배달앱 평점 5점 만점! 오늘은 오므라이스를 선택한
              <br className="hidden sm:block" />
              고객님들의 생생한 리뷰를 직접 확인해보세요.
            </p>
          </motion.div>
        </div>

        <div className="grid items-start justify-items-center gap-10 sm:grid-cols-2 sm:gap-8 lg:gap-16">
          {proofItems.map((item, index) => (
            <motion.figure
              key={item.src}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.25 + index * 0.15 }}
              className="flex w-full max-w-[360px] flex-col items-center gap-5 sm:max-w-[390px] lg:max-w-[430px]"
            >
              <figcaption className="text-center text-lg font-black text-[#1a3f9e] md:text-xl">
                {item.label}
              </figcaption>
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 640px) 82vw, (max-width: 1024px) 38vw, 430px"
                className="h-auto w-full"
                unoptimized
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

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

const reviewImages = [
  'KakaoTalk_Photo_2025-11-29-19-50-51 001.jpeg',
  'KakaoTalk_Photo_2025-11-29-19-50-51 002.jpeg',
  'KakaoTalk_Photo_2025-11-29-19-50-51 003.jpeg',
  'KakaoTalk_Photo_2025-11-29-19-50-51 004.jpeg',
  'KakaoTalk_Photo_2025-11-29-19-50-52 005.jpeg',
  'KakaoTalk_Photo_2025-11-29-19-50-52 006.jpeg',
  'KakaoTalk_Photo_2025-11-29-19-50-52 007.jpeg',
  'KakaoTalk_Photo_2025-11-29-19-50-52 008.jpeg',
  'KakaoTalk_Photo_2026-03-18-18-43-37 001.jpeg',
  'KakaoTalk_Photo_2026-03-18-18-43-37 003.jpeg',
  'KakaoTalk_Photo_2026-03-18-18-43-37 004.jpeg',
  'KakaoTalk_Photo_2026-03-18-18-43-37 005.jpeg',
  'KakaoTalk_Photo_2026-03-18-18-43-46.jpeg',
  'KakaoTalk_Photo_2026-03-18-19-03-54 001.jpeg',
  'KakaoTalk_Photo_2026-03-18-19-03-54 002.jpeg',
].map((fileName) => ({
  fileName,
  src: `/new-asset/sec-5/reviews/${fileName}`,
}));

const brandTextMarquee = [
  { text: 'OMURICE MOMENTUM', variant: 'filled' },
  { text: 'FIVE STAR RATING', variant: 'outline' },
  { text: 'CUSTOMER CHOICE', variant: 'filled' },
  { text: 'DELIVERY BRAND CONSULTING', variant: 'outline' },
  { text: 'REVIEW PROOF', variant: 'filled' },
  { text: 'FRANCHISE GROWTH', variant: 'outline' },
];

export default function CustomerBrandSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px', amount: 0.15 });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-white pt-20 md:pt-28 lg:pt-32"
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
              className="text-[2.4rem] font-black leading-[1.15] tracking-normal text-[#1a1a1a] md:text-5xl lg:text-6xl"
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
              한 번 주문한 고객이 다시 찾는 맛
            </p>
            <p className="text-sm leading-relaxed text-[#555] md:text-base">
              배달앱 평점 5점 만점으로 증명된 오늘은 오므라이스.
              <br className="hidden sm:block" />
              실제 고객 리뷰로 브랜드의 만족도를 확인해보세요.
            </p>
          </motion.div>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory items-start gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:justify-items-center sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-16">
          {proofItems.map((item, index) => (
            <motion.figure
              key={item.src}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.25 + index * 0.15 }}
              className="flex w-[72vw] max-w-[310px] shrink-0 snap-center flex-col items-center gap-4 sm:w-full sm:max-w-[390px] sm:gap-5 lg:max-w-[430px]"
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

      <div className="relative z-20 -mt-44 overflow-hidden pb-16 pt-18 sm:-mt-52 sm:pt-20 md:-mt-60 md:pt-22 lg:-mt-[19rem] lg:pt-24">
        <div
          className="reviewCarouselWhiteBase pointer-events-none absolute inset-x-0 top-20 bottom-[3.65rem] bg-white"
          aria-hidden="true"
        />
        <div
          className="reviewOverlayGradient pointer-events-none absolute inset-x-0 -top-6 z-10 h-28 bg-linear-to-b from-white/0 to-white"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-18 z-10 h-16 bg-linear-to-b from-white/0 to-white/80"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-white to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-white to-transparent md:w-24" />

        <motion.div
          className="relative z-20 flex w-max gap-4 px-4 sm:gap-5"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        >
          {[...reviewImages, ...reviewImages].map((review, index) => (
            <figure
              key={`${review.fileName}-${index}`}
              className="relative h-[210px] w-[246px] shrink-0 overflow-hidden rounded-lg border border-[#f0d8b8] bg-white shadow-[0_18px_42px_rgba(94,58,24,0.12)] sm:h-[238px] sm:w-[286px] md:h-[268px] md:w-[320px]"
            >
              <Image
                src={review.src}
                alt=""
                fill
                sizes="(max-width: 640px) 246px, (max-width: 768px) 286px, 320px"
                className="object-cover object-top"
              />
            </figure>
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[3.65rem] overflow-hidden bg-[#2a1608]">
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,248,232,0.055)_1px,transparent_1px)] bg-size-[24px_24px] opacity-35" />
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#f6c644]/75 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-[#2a1608] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-[#2a1608] to-transparent" />
          <motion.div
            className="absolute top-1/2 flex w-max -translate-y-1/2 items-center gap-8"
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
            aria-hidden="true"
          >
            {[...brandTextMarquee, ...brandTextMarquee, ...brandTextMarquee].map((item, index) => (
              <span
                key={`${item.text}-${index}`}
                className={[
                  'text-[1.18rem] font-black uppercase leading-none tracking-normal sm:text-3xl md:text-4xl',
                  item.variant === 'filled'
                    ? 'text-[#f6c644]/72'
                    : 'text-transparent [-webkit-text-stroke:1px_rgba(255,248,232,0.72)]',
                ].join(' ')}
              >
                {item.text}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

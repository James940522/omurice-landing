'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const proofItems = [
  {
    label: '배달앱 평점 5점 만점!',
    src: '/new-asset/sec-5/phone-rating.png',
    alt: '오늘은 오므라이스 배달앱 평점 5점 만점 화면',
    width: 666,
    height: 1387,
  },
  {
    label: '지역 맛집 랭킹 1위!',
    src: '/new-asset/sec-5/phone-ranking.png',
    alt: '오늘은 오므라이스 지역 맛집 랭킹 1위 화면',
    width: 664,
    height: 1381,
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
  { text: 'TODAY OMURICE', variant: 'filled' },
  { text: 'FIVE STAR RATING', variant: 'outline' },
  { text: 'CUSTOMER CHOICE', variant: 'filled' },
  { text: 'DELIVERY FAVORITE', variant: 'outline' },
  { text: 'REVIEW PROOF', variant: 'filled' },
  { text: 'OWNER FIRST', variant: 'outline' },
];

export default function CustomerBrandSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px', amount: 0.15 });

  return (
    <section
      id="customer-brand"
      ref={ref}
      className="relative w-full overflow-hidden bg-[#fff7e8] pt-20 text-[#4e2d14] md:pt-28 lg:pt-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,198,1,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,198,1,0.16) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <div className="pointer-events-none absolute -left-28 top-24 h-24 w-[42vw] rotate-[-7deg] bg-[#fec601]/18" />
      <div className="pointer-events-none absolute -right-24 top-56 h-24 w-[42vw] rotate-[7deg] bg-[#ff6b12]/12" />
      <div
        className="pointer-events-none absolute right-0 top-8 h-12 w-[42vw] opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(45deg, #ff6b12 25%, transparent 25%), linear-gradient(-45deg, #ff6b12 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ff6b12 75%), linear-gradient(-45deg, transparent 75%, #ff6b12 75%)',
          backgroundPosition: '0 0, 0 16px, 16px -16px, -16px 0',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="pointer-events-none absolute left-4 top-80 hidden -rotate-90 font-heading text-7xl font-black text-[#6b4423]/5 lg:block">
        REVIEW PROOF
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="shrink-0"
          >
            <h2
              className="text-[2.4rem] font-black leading-[1.15] tracking-normal text-[#6b4423] drop-shadow-[0_4px_0_rgba(254,198,1,0.22)] md:text-5xl lg:text-6xl"
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
            <p className="mb-2 font-heading text-sm font-black uppercase text-[#ff6b12] md:text-base">
              한 번 주문한 고객이 다시 찾는 맛
            </p>
            <p className="break-keep text-sm font-bold leading-relaxed text-[#6b4423] md:text-base">
              배달앱 평점 5점 만점으로 증명된 오늘은 오므라이스.
              <br className="hidden sm:block" />
              실제 고객 리뷰로 브랜드의 만족도를 확인해보세요.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 items-start justify-items-center gap-1.5 sm:gap-8 lg:gap-16">
          {proofItems.map((item, index) => (
            <motion.figure
              key={item.src}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.25 + index * 0.15 }}
              className="flex w-full min-w-0 max-w-[186px] flex-col items-center gap-2 sm:max-w-[390px] sm:gap-5 lg:max-w-[430px]"
            >
              <figcaption className="rounded-[8px] bg-[#6b4423] px-2 py-1.5 text-center text-[0.68rem] font-black leading-tight text-[#fec601] shadow-[0_12px_26px_rgba(107,68,35,0.14)] sm:px-5 sm:py-2 sm:text-base md:text-lg">
                {item.label}
              </figcaption>
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 640px) calc((100vw - 38px) / 2), (max-width: 1024px) 38vw, 430px"
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
          className="reviewOverlayGradient pointer-events-none absolute inset-x-0 -top-6 z-10 h-28 bg-linear-to-b from-[#fff7e8]/0 to-white"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-18 z-10 h-16 bg-linear-to-b from-[#fff7e8]/0 to-white/80"
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
              className="relative h-[210px] w-[246px] shrink-0 overflow-hidden rounded-[8px] border border-[#ffd68a] bg-white shadow-[0_18px_42px_rgba(107,68,35,0.12)] sm:h-[238px] sm:w-[286px] md:h-[268px] md:w-[320px]"
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

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[3.65rem] overflow-hidden bg-[#6b4423]">
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,248,232,0.055)_1px,transparent_1px)] bg-size-[24px_24px] opacity-35" />
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#fec601]/75 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-[#6b4423] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-[#6b4423] to-transparent" />
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
                    ? 'text-[#fec601]/78'
                    : 'text-transparent [-webkit-text-stroke:1px_rgba(255,247,232,0.78)]',
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

'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// 마키 배너에 반복될 텍스트 아이템
const MARQUEE_ITEMS = [
  'Today Omurice',
  'Best Choice',
  'Cube Steak Omurice',
  'Open Your Store',
  'No.1 Omurice',
  'Franchise Now',
];

const reasons = [
  {
    number: '01',
    title: '안정적인 수익 구조',
    image: '/new-asset/sec-3/why-card-1.webp',
    bullets: [
      '평균 식자재 비용 30% 초반대 안정적인 원가율 유지',
      '타 브랜드 대비 높은 수익성과 운영 안정성 확보',
    ],
    align: 'left' as const,
  },
  {
    number: '02',
    title: '전국 물류 시스템 구축',
    image: '/new-asset/sec-3/why-card-2.webp',
    bullets: [
      '삼성 웰스토리 협업 안정적인 식자재 공급',
      '서울·경기 주 6회 배송, 전국 대부분 지역 신속 대응',
    ],
    align: 'right' as const,
  },
  {
    number: '03',
    title: '1~2인 소형 매장 운영',
    image: '/new-asset/sec-3/why-card-3.webp',
    bullets: [
      '7~10평 소형 매장에서도 높은 매출 실현',
      '조리시간 3분 이내, 빠른 회전율로 매출 극대화',
    ],
    align: 'left' as const,
  },
  {
    number: '04',
    title: '낮은 진입 장벽',
    image: '/new-asset/sec-3/why-card-4.webp',
    bullets: [
      '외식업 경험 없어도 운영 가능한 매뉴얼화 시스템',
      '체계적인 교육과 지속적인 현장 지원',
    ],
    align: 'right' as const,
  },
];

const ROUND_CLASSES = ['rounded-tl-3xl', 'rounded-tr-3xl', 'rounded-bl-3xl', 'rounded-br-3xl'];

export default function WhyChooseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px', amount: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="strength"
      ref={ref}
      className="relative w-full pt-14 pb-10 sm:pt-20 sm:pb-14 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24"
    >
      <Image
        src="/new-asset/sec-3/sec-3-bg.webp"
        alt=""
        fill
        sizes="100vw"
        quality={90}
        className="absolute inset-0 -z-10 object-cover"
        priority={false}
      />

      {/* 우→좌 스크롤 마키 배너 */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-[#d84a00] py-2.5 z-10">
        <motion.div
          className="flex w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        >
          {/* 2벌 복사하여 끊김 없이 루프 */}
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {MARQUEE_ITEMS.map((item, idx) => (
                <span
                  key={idx}
                  className="mx-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white sm:text-sm"
                >
                  {item}
                  <span className="mx-2 text-white/40">·</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <motion.div
          className="mb-5 text-center sm:mb-8 md:mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-1 text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#d84a00] sm:text-xs md:mb-2 md:text-sm">
            Brand Strength
          </p>
          <h2
            className="text-[1.5rem] font-black leading-tight text-[#1a0a00] sm:text-[2rem] md:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            왜! 예비 점주들은
            <span className="mt-1 block">
              <Image
                src="/asset/logo/오므라이스_문구3.png"
                alt="오늘은 오므라이스"
                width={220}
                height={125}
                className="mx-auto h-auto w-28 sm:w-44 md:w-52"
              />
            </span>
            를 선택할까요?
          </h2>
        </motion.div>

        {/* 4분할 그리드 */}
        <motion.div
          className="relative grid grid-cols-2 gap-2 overflow-hidden rounded-3xl bg-[#c09060] shadow-[0_24px_60px_rgba(107,68,35,0.16)] sm:gap-3"
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.15 }}
        >
          {reasons.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={item.number}
                className={[
                  'relative isolate flex min-h-[184px] flex-col justify-between overflow-hidden px-4 py-4 sm:min-h-[250px] sm:p-7 md:min-h-[300px] md:p-9 lg:min-h-[350px] lg:p-11',
                  'transition-colors duration-700',
                  index < 2 ? 'pb-16 sm:pb-10 md:pb-12' : 'pt-16 sm:pt-10 md:pt-12',
                  isActive ? 'text-white' : 'text-[#1a0a00]',
                  item.align === 'right' ? 'items-end text-right' : 'items-start text-left',
                  ROUND_CLASSES[index],
                ].join(' ')}
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 560px"
                  className={[
                    'absolute inset-0 -z-30 scale-105 object-cover blur-[1px] transition-opacity duration-700',
                    isActive ? 'opacity-75' : 'opacity-58',
                  ].join(' ')}
                  quality={85}
                />
                <div
                  className={[
                    'absolute inset-0 -z-20 transition-colors duration-700',
                    isActive ? 'bg-[#1c0800]/66' : 'bg-[#fff8ef]/58',
                  ].join(' ')}
                />
                <div
                  className={[
                    'absolute inset-0 -z-10 transition-opacity duration-700',
                    isActive
                      ? 'bg-linear-to-br from-black/8 via-transparent to-[#d84a00]/10'
                      : 'bg-linear-to-br from-white/20 via-white/5 to-[#fec601]/10',
                  ].join(' ')}
                />

                <div className="relative z-10 drop-shadow-[0_1px_2px_rgba(255,255,255,0.45)]">
                  <span
                    className={[
                      'block text-2xl font-black transition-colors duration-700 sm:text-3xl md:text-4xl',
                      isActive ? 'text-[#ffd21f]' : 'text-[#d84a00]',
                    ].join(' ')}
                  >
                    {item.number}
                  </span>
                  <h3 className="mt-1 text-[0.82rem] font-black leading-tight sm:mt-2 sm:text-base md:text-lg lg:text-xl">
                    {item.title}
                  </h3>
                </div>
                <ul className="relative z-10 mt-2 space-y-1 drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)] sm:mt-4 sm:space-y-1.5">
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className={[
                        'text-[0.58rem] font-semibold leading-[1.28] transition-colors duration-700 sm:text-xs sm:leading-snug md:text-sm',
                        isActive ? 'text-white/78' : 'text-[#6b4423]',
                      ].join(' ')}
                    >
                      · {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* 중앙 회전 원형 이미지 */}
          <div className="absolute left-1/2 top-1/2 z-20 aspect-square w-[45%] max-w-[190px] -translate-x-1/2 -translate-y-1/2 sm:w-[34%] sm:max-w-[230px] md:w-[28%] md:max-w-[270px] lg:w-[24%]">
            {/* 테두리 링 */}
            <div className="absolute inset-0 rounded-full ring-[1.5px] ring-[#ffd21f]" />

            <motion.div
              className="absolute inset-[3px] rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            >
              {/* 주황 링 배경 */}
              <div className="absolute inset-0 rounded-full bg-[#d84a00]" />

              {/* 회전 텍스트 SVG */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="why-text-ring"
                    d="M 50,50 m -42.5,0 a 42.5,42.5 0 1,1 85,0 a 42.5,42.5 0 1,1 -85,0"
                  />
                </defs>
                <text fontSize="4.3" fill="white" fontWeight="800" letterSpacing="0.62">
                  <textPath href="#why-text-ring" startOffset="50%" textAnchor="middle">
                    Today Omurice · Today Omurice · Today Omurice · Today Omurice · Today Omurice ·
                    Today Omurice ·
                  </textPath>
                </text>
              </svg>

              {/* 음식 이미지 */}
              <div className="absolute inset-[12%] overflow-hidden rounded-full">
                <Image
                  src="/new-asset/sec-3/omurice-cutout.webp"
                  alt="큐브스테이크 오므라이스"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 30vw, 20vw"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

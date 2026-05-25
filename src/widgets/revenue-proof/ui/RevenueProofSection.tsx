'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const proofCards = [
  {
    eyebrow: 'A 브랜드',
    title: '1개 상권에서',
    description: '2개 이상 지점이 매출을 나눠먹는 구조',
    tone: 'dark',
  },
  {
    eyebrow: '오늘은 오므라이스',
    title: '배달 구역 보장',
    description: '신규 출점 제한구역을 보장해 상권 충돌을 최소화합니다.',
    tone: 'brand',
  },
] as const;

const verticalWords = ['TERRITORY', 'DELIVERY AREA', 'NO OVERLAP', 'STABLE SALES'];

export default function RevenueProofSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -12% 0px', amount: 0.12 });

  return (
    <section
      id="revenue"
      ref={ref}
      className="relative isolate overflow-hidden bg-pastel-cream px-4 py-20 text-foreground sm:px-6 md:py-28 lg:px-8 lg:py-32"
    >
      <div className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,var(--pastel-ivory)_0%,var(--pastel-cream)_48%,var(--pastel-yellow)_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(rgba(139,69,19,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(254,198,1,0.14)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(254,198,1,0.28)_0%,transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.36)_0%,rgba(255,249,230,0)_100%)]" />

      <div className="pointer-events-none absolute right-3 top-8 hidden h-[88%] flex-col justify-between text-accent-brown/20 lg:flex">
        {verticalWords.map((word) => (
          <span
            key={word}
            className="text-xl font-black uppercase leading-none tracking-[0.18em]"
            style={{ writingMode: 'vertical-rl' }}
          >
            {word}
          </span>
        ))}
      </div>

      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-5xl text-center"
          initial={{ opacity: 0, y: 26 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="mb-5 text-xs font-black uppercase tracking-[0.42em] text-secondary md:text-sm">
            Territory Protection
          </p>
          <h2
            className="text-4xl font-black leading-[1.14] tracking-normal text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            안정적인 매출은
            <br />
            상권보장부터 시작됩니다.
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-base font-semibold leading-relaxed text-accent-brown md:text-lg">
            오늘은 오므라이스는 체계적인 지점관리 시스템을 통해 점주님들의 무리한
            출점을 방지하고, 신규 출점 제한구역을 보장하여 창업 시 안정적인 운영
            가능성을 높입니다.
          </p>
        </motion.div>

        <div className="mt-12 grid items-stretch gap-5 lg:mt-16 lg:grid-cols-[0.88fr_1.32fr]">
          <motion.div
            className="order-2 flex flex-col gap-5 lg:order-1"
            initial={{ opacity: 0, x: -28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
          >
            {proofCards.map((card) => {
              const isBrand = card.tone === 'brand';

              return (
                <div
                  key={card.title}
                  className={[
                    'min-h-[154px] rounded-lg border p-6 sm:p-7 md:min-h-[190px] md:p-8',
                    isBrand
                      ? 'border-secondary bg-primary/20 shadow-[0_0_0_1px_rgba(254,198,1,0.3)_inset,0_18px_44px_rgba(139,69,19,0.12)]'
                      : 'border-accent-brown/15 bg-white/75 shadow-[0_14px_38px_rgba(139,69,19,0.08)]',
                  ].join(' ')}
                >
                  <p
                    className={[
                      'mb-4 text-xs font-black tracking-[0.14em]',
                      isBrand ? 'text-secondary' : 'text-accent-brown',
                    ].join(' ')}
                  >
                    {card.eyebrow}
                  </p>
                  <h3
                    className="text-3xl font-black leading-tight text-foreground md:text-4xl"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {card.title}
                  </h3>
                  <p className="mt-5 text-sm font-bold leading-relaxed text-accent-brown md:text-base">
                    {card.description}
                  </p>
                </div>
              );
            })}

            <p className="text-xs font-medium leading-relaxed text-accent-brown/75">
              * 상권 및 배달 구역은 지역, 계약 조건, 배달 플랫폼 운영 환경에 따라 세부
              기준이 달라질 수 있습니다.
            </p>
          </motion.div>

          <motion.div
            className="relative order-1 overflow-hidden rounded-lg border border-primary/70 bg-white shadow-[0_24px_70px_rgba(139,69,19,0.18)] lg:order-2"
            initial={{ opacity: 0, x: 28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="relative aspect-4/3 bg-pastel-ivory">
              <Image
                src="/new-asset/sec-4/territory-protection-map-mobile.webp"
                alt="동대문구 상권 보호 비교 지도"
                fill
                sizes="100vw"
                className="object-cover sm:hidden"
                quality={90}
              />
              <Image
                src="/new-asset/sec-4/territory-protection-map.webp"
                alt="동대문구 상권 보호 비교 지도"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="hidden object-cover sm:block"
                quality={90}
              />
              <div className="absolute left-1/2 top-1/2 hidden h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-secondary bg-primary text-2xl font-black text-foreground shadow-[0_10px_32px_rgba(139,69,19,0.26)] sm:flex">
                VS
              </div>
            </div>

            <div className="grid grid-cols-2 text-center text-xs font-black leading-tight sm:text-sm md:text-base">
              <div className="bg-accent-brown px-3 py-4 text-white">
                일반 브랜드: 복수 지점 경쟁
              </div>
              <div className="bg-primary px-3 py-4 text-foreground">
                오늘은 오므라이스: 배달 구역 보장
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

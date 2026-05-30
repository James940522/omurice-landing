'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const storeDesigns = [
  {
    id: 'design-a',
    label: 'DESIGN A',
    title: '디자인 A',
    description: '밝고 정돈된 무드의 오늘은 오므라이스 매장 디자인입니다.',
    image: '/new-asset/store-interior/design-b.webp',
  },
  {
    id: 'design-b',
    label: 'DESIGN B',
    title: '디자인 B',
    description: '브랜드 컬러가 또렷하게 드러나는 오늘은 오므라이스 매장 디자인입니다.',
    image: '/new-asset/store-interior/design-a.webp',
  },
];

export function StorePresetSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="store-preset" ref={ref} className="relative isolate overflow-hidden bg-[#fff8ef] py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-[0.13] [background-image:linear-gradient(90deg,rgba(85,58,31,0.16)_1px,transparent_1px),linear-gradient(0deg,rgba(85,58,31,0.1)_1px,transparent_1px)] [background-size:10px_10px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-linear-to-r from-transparent via-[#ff6b12]/60 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-16 -z-10 hidden -translate-x-1/2 select-none whitespace-nowrap text-[clamp(4rem,12vw,11rem)] font-black leading-none tracking-[0.08em] text-[#ff6b12]/[0.055] md:block">
        STORE DESIGN
      </div>
      <div className="pointer-events-none absolute inset-x-[-12%] bottom-[-9rem] -z-10 h-72 rounded-t-[100%] bg-white/68 md:h-96" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center md:mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-lg font-black text-[#8B4513]" style={{ fontFamily: 'Georgia, serif' }}>
            Store Interior
          </p>
          <h2
            className="mb-5 text-4xl font-black leading-tight text-[#FEC601] md:text-6xl"
            style={{
              fontFamily: 'var(--font-heading)',
              WebkitTextStroke: '1px #8B4513',
              textShadow:
                '-2px -2px 0 #8B4513, 2px -2px 0 #8B4513, -2px 2px 0 #8B4513, 2px 2px 0 #8B4513, 4px 5px 0 rgba(139,69,19,0.34), 7px 9px 13px rgba(0,0,0,0.18)',
            }}
          >
            매장 인테리어
          </h2>
          <p className="mx-auto max-w-2xl text-base font-bold leading-relaxed text-[#5a2c12] md:text-lg">
            오늘은 오므라이스의 브랜드 컬러를 담은 두 가지 매장 디자인을 만나보세요.
            공간과 운영 방식에 맞춰 A/B 타입으로 적용할 수 있습니다.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {storeDesigns.map((design, index) => (
            <motion.article
              key={design.id}
              className="group overflow-hidden rounded-[8px] border border-[#f4c47d]/85 bg-white shadow-[0_26px_70px_rgba(84,45,10,0.14)]"
              initial={{ opacity: 0, y: 34 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.12 + index * 0.12 }}
              whileHover={{ y: -6 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#fff2dc]">
                <Image
                  src={design.image}
                  alt={`오늘은 오므라이스 ${design.label} 매장 인테리어`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.035]"
                  quality={90}
                />
                <div className="absolute left-4 top-4 border border-[#fff2c6] bg-[#ff6b12] px-3 py-1.5 text-xs font-black tracking-[0.08em] text-white shadow-[0_8px_18px_rgba(255,107,18,0.24)]">
                  {design.label}
                </div>
              </div>

              <div className="border-t border-[#f4c47d]/70 bg-[#fffef8] p-5 md:p-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-[#32190b] md:text-3xl">
                      {design.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm font-semibold leading-relaxed text-[#6b4222] md:text-base">
                      {design.description}
                    </p>
                  </div>
                  <span className="shrink-0 text-4xl font-black leading-none text-[#ff6b12]/25 md:text-5xl">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          className="mx-auto mt-10 max-w-3xl rounded-[8px] border border-[#f4c47d]/70 bg-white/86 px-5 py-4 text-center text-sm font-bold leading-relaxed text-[#6b4222] shadow-[0_14px_36px_rgba(84,45,10,0.1)] md:text-base"
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.42 }}
        >
          실제 시공 사양은 매장 면적, 입지, 건물 조건에 따라 조정될 수 있으며 상담 시 최적의 타입을 안내드립니다.
        </motion.p>
      </div>
    </section>
  );
}

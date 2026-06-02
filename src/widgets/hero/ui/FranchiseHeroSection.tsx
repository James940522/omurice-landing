'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useStoreCount } from '@/lib/use-store-count';

const heroImages = {
  top: '/new-asset/menu/모음컷/1.jpeg',
  lowerLeft: '/new-asset/menu/모음컷/2.jpeg',
  lowerRight: '/new-asset/menu/둘이서 오므라이스 세트.jpeg',
  logo: '/asset/logo/오므라이스_문구3.png',
};

const marqueeWords = [
  'TODAY OMURICE',
  'FRANCHISE POWER',
  'BEST MENU',
  'START SIMPLE',
  'NO.1 OMURICE',
  'OWNER FIRST',
];

const ribbonWords = [
  'TODAY OMURICE',
  'FRESH OMELET RICE',
  'NO.1 OMURICE BRAND',
  'START SMALL',
  'GROW STRONG',
  'OWNER FIRST',
];

export default function FranchiseHeroSection() {
  const storeCount = useStoreCount();
  const storeCountLabel = storeCount?.toLocaleString('ko-KR') ?? null;

  return (
    <section className="relative mt-14 overflow-hidden bg-[#2b160a] text-white md:mt-16">
      <style jsx global>{`
        @keyframes franchise-hero-ribbon {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes franchise-hero-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .franchise-hero-marquee-track {
          animation: franchise-hero-marquee 26s linear infinite;
        }

        .franchise-hero-ribbon-track {
          animation: franchise-hero-ribbon 22s linear infinite;
        }
      `}</style>

      <div className="relative h-[310px] overflow-hidden md:h-[365px] lg:h-[390px]">
        <Image
          src={heroImages.top}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-[#2b160a]/48" />
        <div className="absolute inset-0 bg-linear-to-b from-black/22 via-black/10 to-[#2b160a]/74" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-5 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-heading text-sm font-black uppercase tracking-[0.24em] text-[#fec601]"
          >
            Omurice Franchise No.1
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="mt-4 font-heading text-5xl font-black leading-none text-white drop-shadow-[0_5px_18px_rgba(0,0,0,0.34)] md:text-7xl"
          >
            <span className="block sm:inline">오므라이스</span>
            <span className="block sm:ml-3 sm:inline">창업의 기준</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.34 }}
            className="mt-4 break-keep text-lg font-bold text-white/90 md:text-2xl"
          >
            {storeCountLabel
              ? `${storeCountLabel}개 점포가 증명한 오늘은 오므라이스의 힘`
              : '전국 점포가 증명한 오늘은 오므라이스의 힘'}
          </motion.p>
        </div>
      </div>

      <div className="pointer-events-none relative z-20 mx-auto -mt-8 flex h-20 w-full max-w-6xl items-center justify-center px-5">
        <motion.span
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.42 }}
          className="absolute left-5 right-5 top-1/2 h-px origin-center bg-linear-to-r from-transparent via-[#fec601]/80 to-transparent"
        />
        <div
          className="absolute left-5 right-5 top-[calc(50%+12px)] hidden overflow-hidden md:block"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.56 }}
            className="franchise-hero-ribbon-track flex w-max gap-8 whitespace-nowrap font-heading text-[10px] font-black uppercase tracking-[0.18em] text-[#fec601]/85"
          >
            {[...ribbonWords, ...ribbonWords, ...ribbonWords].map((word, index) => (
              <span key={`${word}-${index}`} className="flex items-center gap-8">
                {word}
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b12]" />
              </span>
            ))}
          </motion.div>
        </div>
        <motion.span
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.72 }}
          className="absolute left-[32%] top-[calc(50%-3px)] hidden h-1.5 w-1.5 rounded-full bg-[#fec601] md:block"
        />
        <motion.span
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.78 }}
          className="absolute right-[32%] top-[calc(50%-3px)] hidden h-1.5 w-1.5 rounded-full bg-[#ff6b12] md:block"
        />
        <motion.span
          initial={{ opacity: 0, rotate: -11, x: -24 }}
          animate={{ opacity: 1, rotate: -11, x: 0 }}
          transition={{ duration: 0.7, delay: 0.62 }}
          className="absolute left-[14%] top-6 hidden h-3 w-28 bg-[#ff6b12] shadow-[0_0_18px_rgba(255,107,18,0.36)] md:block"
        />
        <motion.span
          initial={{ opacity: 0, rotate: 11, x: 24 }}
          animate={{ opacity: 1, rotate: 11, x: 0 }}
          transition={{ duration: 0.7, delay: 0.68 }}
          className="absolute right-[14%] top-11 hidden h-3 w-28 bg-[#fec601] shadow-[0_0_18px_rgba(254,198,1,0.36)] md:block"
        />
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.55 }}
          className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#fec601] bg-[#ff6b12] shadow-[0_16px_34px_rgba(43,22,10,0.28)]"
        >
          <span className="flex flex-col items-center justify-center text-center font-heading text-xs font-black uppercase leading-none text-white">
            <span>Since</span>
            <span className="mt-1">2024</span>
          </span>
        </motion.div>
      </div>

      <div className="relative -mt-12 min-h-[700px] overflow-hidden pb-20 pt-28 md:min-h-[720px] md:pb-24 md:pt-32 lg:min-h-[750px] lg:pb-28">
        <div className="absolute inset-0">
          <Image
            src={heroImages.lowerLeft}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-80"
            quality={88}
          />
          <motion.div
            initial={{ opacity: 0, x: 46 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.5 }}
            className="absolute -right-24 bottom-4 hidden w-[38vw] max-w-[520px] lg:block"
          >
            <Image
              src={heroImages.lowerRight}
              alt=""
              width={560}
              height={405}
              className="w-full opacity-72"
              quality={88}
            />
          </motion.div>
        </div>

        <div className="absolute inset-0 bg-[#2b160a]/76" />
        <div className="absolute inset-0 bg-linear-to-b from-[#2b160a]/46 via-[#3d210f]/64 to-[#2b160a]/86" />
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <div className="absolute left-[-12vw] top-[180px] h-32 w-[58vw] rotate-[-9deg] bg-[#fec601]/25" />
        <div className="absolute right-[-16vw] top-[90px] h-36 w-[55vw] rotate-[9deg] bg-[#ff6b12]/20" />

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 15, delay: 0.7 }}
            className="relative mb-9 flex w-[210px] items-center justify-center drop-shadow-[0_14px_26px_rgba(0,0,0,0.32)] md:w-[260px]"
          >
            <Image
              src={heroImages.logo}
              alt="오늘은 오므라이스"
              width={240}
              height={120}
              className="h-auto w-full object-contain"
              quality={90}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.82 }}
            className="mb-8 flex w-full max-w-[520px] items-center gap-4 text-sm font-black text-white/86 md:text-base"
          >
            <span className="h-px flex-1 bg-white/35" />
            <span>작게 시작해,</span>
            <span className="h-px flex-1 bg-white/35" />
            <span>크게 증명하다.</span>
            <span className="h-px flex-1 bg-white/35" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.94 }}
            className="break-keep text-xl font-black text-white md:text-2xl"
          >
            유행이 아닌, 시장을 만드는 브랜드의 저력.
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 1.04 }}
            className="mt-5 break-keep font-heading text-4xl font-black leading-tight text-white drop-shadow-[0_5px_18px_rgba(0,0,0,0.34)] md:text-6xl"
          >
            처음부터 만들었고,
            <br />
            지금도 <span className="text-[#ff6b12]">가장 잘합니다.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.18 }}
            className="mt-12 grid w-full max-w-[560px] grid-cols-2 divide-x divide-white/45"
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 240, damping: 18 }}
              className="px-5"
            >
              <p className="mx-auto mb-3 w-fit rounded-full bg-[#fec601] px-4 py-1.5 font-heading text-sm font-black text-[#4e2d14]">
                Since
              </p>
              <p className="font-heading text-5xl font-black leading-none text-white md:text-6xl">
                2024
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 240, damping: 18 }}
              className="px-5"
            >
              <p className="mx-auto mb-3 w-fit rounded-full bg-[#fec601] px-4 py-1.5 font-heading text-sm font-black text-[#4e2d14]">
                전국 매장수
              </p>
              <p className="font-heading text-5xl font-black leading-none text-white md:text-6xl">
                {storeCountLabel ?? '-'}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-20 overflow-hidden bg-[#ff6b12] py-3 text-white">
        <div className="franchise-hero-marquee-track flex w-max gap-10 whitespace-nowrap font-heading text-lg font-black uppercase sm:text-xl">
          {[...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords].map(
            (word, index) => (
              <span key={`${word}-${index}`} className="flex items-center gap-10">
                {word}
                <span className="h-2 w-2 rounded-full bg-[#fec601]" />
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 md:pt-24 pb-8 md:pb-12 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-500">
      {/* 부드러운 배경 효과 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-400/50 via-transparent to-orange-400/30" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-3xl" />
      </div>

      {/* 반복되는 텍스트 배경 - 상단 */}
      <motion.div
        className="absolute top-1/4 left-0 w-[200%] z-0"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <div className="text-[3rem] md:text-[5rem] lg:text-[6rem] font-black text-white/20 whitespace-nowrap">
          맛있는 · 프리미엄 · 신선한 · 오므라이스 · 맛있는 · 프리미엄 · 신선한 · 오므라이스 · 맛있는 · 프리미엄 · 신선한 · 오므라이스 · 맛있는 · 프리미엄 · 신선한 · 오므라이스 맛있는 · 프리미엄 · 신선한 · 오므라이스 · 맛있는 · 프리미엄 · 신선한 · 오므라이스 · 맛있는 · 프리미엄 · 신선한 · 오므라이스 · 맛있는 · 프리미엄 · 신선한 · 오므라이스
        </div>
      </motion.div>

      {/* 반복되는 텍스트 배경 - 중단 */}
      <motion.div
        className="absolute top-1/2 left-0 w-[200%] z-0 -translate-y-1/2"
        animate={{ x: ['-50%', '0%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        <div className="text-[3rem] md:text-[5rem] lg:text-[6rem] font-black text-white/20 whitespace-nowrap">
          창업 · 성공 · 수익 · 가맹점 · 창업 · 성공 · 수익 · 가맹점 · 창업 · 성공 · 수익 · 가맹점 · 창업 · 성공 · 수익 · 가맹점 · 창업 · 성공 · 수익 · 가맹점 · 창업 · 성공 · 수익 · 가맹점 · 창업 · 성공 · 수익 · 가맹점
        </div>
      </motion.div>

      {/* 반복되는 텍스트 배경 - 하단 */}
      <motion.div
        className="absolute bottom-1/4 left-0 w-[200%] z-0"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <div className="text-[3rem] md:text-[5rem] lg:text-[6rem] font-black text-white/20 whitespace-nowrap">
          100호점 · 1위 · 프랜차이즈 · OMURICE · 100호점 · 1위 · 프랜차이즈 · OMURICE · 100호점 · 1위 · 프랜차이즈 · OMURICE · 100호점 · 1위 · 프랜차이즈 · OMURICE · 100호점 · 1위 · 프랜차이즈 · OMURICE · 100호점 · 1위 · 프랜차이즈 · OMURICE · 100호점 · 1위 · 프랜차이즈 · OMURICE
        </div>
      </motion.div>
      
      {/* 중앙 컨텐츠 그룹 */}
      <div className="relative z-20 flex flex-col items-center w-full">
        {/* 떠다니는 메뉴 이미지들 - 좌측 상단 (왼쪽 끝, 크게) */}
        <motion.div
          className="absolute left-0 md:left-2 lg:left-4 top-[10%] w-44 md:w-60 lg:w-80 hidden lg:block"
          initial={{ opacity: 0, x: -120, rotate: -20 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            y: [0, -25, 0],
            rotate: [-8, 3, -8]
          }}
          transition={{ 
            opacity: { duration: 1, delay: 0.5 },
            x: { duration: 1, delay: 0.5 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/40">
            <Image
              src="/asset/menu/메뉴모음컷/화이트 메뉴모음1.jpg"
              alt="화이트 오므라이스"
              fill
              className="object-cover"
              quality={75}
            />
          </div>
        </motion.div>

        {/* 떠다니는 메뉴 이미지들 - 좌측 하단 (오른쪽으로, 작게) */}
        <motion.div
          className="absolute left-[10%] md:left-[12%] lg:left-[15%] bottom-[15%] w-28 md:w-40 lg:w-52 hidden lg:block"
          initial={{ opacity: 0, x: -80, rotate: 15 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            y: [0, 20, 0],
            rotate: [10, -6, 10]
          }}
          transition={{ 
            opacity: { duration: 1, delay: 0.9 },
            x: { duration: 1, delay: 0.9 },
            y: { duration: 6.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 8.5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/40">
            <Image
              src="/asset/menu/메뉴모음컷/메뉴모음컷 1.jpg"
              alt="오므라이스 메뉴"
              fill
              className="object-cover"
              quality={75}
            />
          </div>
        </motion.div>

        {/* 떠다니는 메뉴 이미지들 - 우측 상단 (오른쪽 끝, 크게) */}
        <motion.div
          className="absolute right-0 md:right-2 lg:right-4 top-[8%] w-42 md:w-56 lg:w-72 hidden lg:block"
          initial={{ opacity: 0, x: 120, rotate: 18 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            y: [0, 28, 0],
            rotate: [8, -10, 8]
          }}
          transition={{ 
            opacity: { duration: 1, delay: 0.7 },
            x: { duration: 1, delay: 0.7 },
            y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 7.8, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/40">
            <Image
              src="/asset/menu/메뉴모음컷/블랙 앤 투움바 오므라이스.jpg"
              alt="블랙 앤 투움바 오므라이스"
              fill
              className="object-cover"
              quality={75}
            />
          </div>
        </motion.div>

        {/* 떠다니는 메뉴 이미지들 - 우측 하단 (왼쪽으로, 작게) */}
        <motion.div
          className="absolute right-[10%] md:right-[12%] lg:right-[15%] bottom-[18%] w-32 md:w-44 lg:w-56 hidden lg:block"
          initial={{ opacity: 0, x: 100, rotate: -15 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            y: [0, -22, 0],
            rotate: [-12, 5, -12]
          }}
          transition={{ 
            opacity: { duration: 1, delay: 1.1 },
            x: { duration: 1, delay: 1.1 },
            y: { duration: 6.2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 8.2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/40">
            <Image
              src="/asset/menu/메뉴모음컷/화이트 메뉴모음 2.jpg"
              alt="화이트 메뉴모음"
              fill
              className="object-cover"
              quality={75}
            />
          </div>
        </motion.div>

        {/* 1. 브랜드 로고 문구 - 최상단 */}
        <motion.div
          className="mb-4 md:mb-6 relative z-30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="relative w-48 md:w-64 lg:w-72 xl:w-80 h-auto"
            animate={{ 
              y: [0, -8, 0],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Image
              src="/asset/logo/오므라이스_문구.png"
              alt="오늘은 오므라이스"
              width={512}
              height={256}
              className="w-full h-auto drop-shadow-2xl"
              priority
              quality={75}
            />
          </motion.div>
        </motion.div>

        {/* 2. 모바일 캐러셀 - lg 미만에서만 표시 */}
        <div className="lg:hidden w-full max-w-lg mb-6 px-4 relative z-30">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            className="hero-swiper rounded-3xl"
          >
            <SwiperSlide>
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/40">
                <Image
                  src="/asset/menu/메뉴모음컷/화이트 메뉴모음1.jpg"
                  alt="화이트 오므라이스"
                  fill
                  className="object-cover"
                  quality={75}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/40">
                <Image
                  src="/asset/menu/메뉴모음컷/블랙 앤 투움바 오므라이스.jpg"
                  alt="블랙 앤 투움바 오므라이스"
                  fill
                  className="object-cover"
                  quality={75}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/40">
                <Image
                  src="/asset/menu/메뉴모음컷/메뉴모음컷 1.jpg"
                  alt="오므라이스 메뉴"
                  fill
                  className="object-cover"
                  quality={75}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/40">
                <Image
                  src="/asset/menu/메뉴모음컷/화이트 메뉴모음 2.jpg"
                  alt="화이트 메뉴모음"
                  fill
                  className="object-cover"
                  quality={75}
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        
        {/* 2. 중앙 메인 이미지 - 태블릿/데스크톱에서만 표시 */}
        <motion.div
          className="hidden lg:block w-full max-w-xs md:max-w-sm lg:max-w-lg px-4 relative z-30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            className="relative w-full aspect-[4/3]"
            animate={{ 
              y: [0, -15, 0],
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/asset/menu/메뉴모음컷/메뉴모음컷 3 작은사이즈.jpg"
                alt="오늘은 오므라이스 메뉴"
                fill
                className="object-cover"
                priority
                quality={75}
              />
            </div>

 
          </motion.div>
        </motion.div>

        {/* 하단 CTA 버튼 */}
        <motion.div
          className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-4 md:mt-6 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.a
            href="#contact"
            className="bg-foreground text-white px-5 py-2.5 md:px-8 md:py-3 rounded-full text-sm md:text-base lg:text-lg font-bold shadow-strong-hover hover:bg-white hover:text-foreground transition-all duration-300 text-center border-2 md:border-3 border-foreground"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            창업 문의하기
          </motion.a>
          <motion.a
            href="#menu"
            className="bg-white text-foreground border-2 md:border-3 border-foreground px-5 py-2.5 md:px-8 md:py-3 rounded-full text-sm md:text-base lg:text-lg font-bold hover:bg-foreground hover:text-white transition-all duration-300 text-center shadow-strong"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            메뉴 보기
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

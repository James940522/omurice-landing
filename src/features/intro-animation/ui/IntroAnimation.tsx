'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';

interface IntroAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
}

export default function IntroAnimation({ isVisible, onComplete }: IntroAnimationProps) {
  // 인트로 애니메이션 재생 중 스크롤 방지
  useEffect(() => {
    if (isVisible) {
      // 스크롤 막기
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // 스크롤 복원
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
    }

    // 클린업: 컴포넌트 언마운트 시 스크롤 복원
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] overflow-hidden" style={{ height: '100dvh' }}>
          {/* 상단 절반 (위로 올라감) */}
          <motion.div
            className="absolute top-0 left-0 right-0 overflow-hidden"
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{ delay: 2.5, duration: 1, ease: 'easeInOut' }}
            onAnimationComplete={onComplete}
            style={{ clipPath: 'inset(0 0 0 0)', height: '50dvh' }}
          >
            {/* 배경 이미지 */}
            <div className="absolute inset-0 w-screen" style={{ height: '100dvh' }}>
              <Image
                src="/asset/bg/sec1-bg.jpg"
                alt="배경"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* 흐르는 텍스트 배경들 */}
            {/* 상단 */}
            <motion.div
              className="absolute top-[15%] left-0 w-[200%] z-0"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div className="text-[2rem] sm:text-[3rem] md:text-[4rem] font-black text-white/15 whitespace-nowrap">
                맛있는 · 프리미엄 · 신선한 · 오므라이스 · 맛있는 · 프리미엄 · 신선한 · 오므라이스 ·
                맛있는 · 프리미엄 · 신선한 · 오므라이스 · 맛있는 · 프리미엄 · 신선한 · 오므라이스
              </div>
            </motion.div>

            {/* 중단 */}
            <motion.div
              className="absolute top-1/2 left-0 w-[200%] z-0 -translate-y-1/2"
              animate={{ x: ['-50%', '0%'] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            >
              <div className="text-[2rem] sm:text-[3rem] md:text-[4rem] font-black text-white/15 whitespace-nowrap">
                창업 · 성공 · 수익 · 가맹점 · 창업 · 성공 · 수익 · 가맹점 · 창업 · 성공 · 수익 ·
                가맹점 · 창업 · 성공 · 수익 · 가맹점
              </div>
            </motion.div>

            {/* 하단 */}
            <motion.div
              className="absolute bottom-[15%] left-0 w-[200%] z-0"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              <div className="text-[2rem] sm:text-[3rem] md:text-[4rem] font-black text-white/15 whitespace-nowrap">
                100호점 · 1위 · 프랜차이즈 · OMURICE · 100호점 · 1위 · 프랜차이즈 · OMURICE · 오늘은
                오므라이스 · 100호점 · 1위 · 프랜차이즈 · OMURICE · 오므라이스 · 100호점 · 1위 ·
              </div>
            </motion.div>

            {/* 중앙 컨텐츠 */}
            <div
              className="absolute inset-0 w-screen flex items-center justify-center"
              style={{ height: '100dvh' }}
            >
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                {/* 오므라이스 이미지 - 데코레이션 */}
                <motion.div
                  className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px]"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {/* 반짝이는 테두리 효과 */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        'linear-gradient(45deg, #FFD700, #FFA500, #FF6347, #FFD700, #FFA500)',
                      backgroundSize: '400% 400%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <div className="absolute inset-[6px] bg-white rounded-full" />
                  </motion.div>

                  {/* 그림자 효과 */}
                  <motion.div
                    className="absolute inset-[8px] rounded-full shadow-2xl"
                    animate={{
                      boxShadow: [
                        '0 0 40px rgba(255, 140, 0, 0.6)',
                        '0 0 60px rgba(255, 140, 0, 0.8)',
                        '0 0 40px rgba(255, 140, 0, 0.6)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* 오므라이스 이미지 */}
                  <div className="absolute inset-[10px] rounded-full overflow-hidden">
                    <Image
                      src="/asset/etc/큐브스테이크 오므라이스 누끼.png"
                      alt="오늘은 오므라이스"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </motion.div>

                {/* 로고 문구 */}
                <motion.div
                  className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[360px] h-[80px] sm:h-[120px] z-[20]"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <Image
                    src="/asset/logo/오므라이스_문구.png"
                    alt="오늘은 오므라이스"
                    fill
                    className="object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.5)]"
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* 하단 절반 (아래로 내려감) */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 overflow-hidden"
            initial={{ y: 0 }}
            animate={{ y: '100%' }}
            transition={{ delay: 2.5, duration: 1, ease: 'easeInOut' }}
            style={{ clipPath: 'inset(0 0 0 0)', height: '50dvh' }}
          >
            {/* 배경 이미지 */}
            <div
              className="absolute inset-0 w-screen -translate-y-1/2"
              style={{ height: '100dvh' }}
            >
              <Image
                src="/asset/bg/sec1-bg.jpg"
                alt="배경"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* 흐르는 텍스트 배경들 */}
            {/* 상단 */}
            <motion.div
              className="absolute top-[15%] left-0 w-[200%] z-0 -translate-y-1/2"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div className="text-[2rem] sm:text-[3rem] md:text-[4rem] font-black text-white/15 whitespace-nowrap">
                맛있는 · 프리미엄 · 신선한 · 오므라이스 · 맛있는 · 프리미엄 · 신선한 · 오므라이스 ·
                맛있는 · 프리미엄 · 신선한 · 오므라이스 · 맛있는 · 프리미엄 · 신선한 · 오므라이스
              </div>
            </motion.div>

            {/* 중단 */}
            <motion.div
              className="absolute top-1/2 left-0 w-[200%] z-0 -translate-y-1/2"
              animate={{ x: ['-50%', '0%'] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            >
              <div className="text-[2rem] sm:text-[3rem] md:text-[4rem] font-black text-white/15 whitespace-nowrap">
                창업 · 성공 · 수익 · 가맹점 · 창업 · 성공 · 수익 · 가맹점 · 창업 · 성공 · 수익 ·
                가맹점 · 창업 · 성공 · 수익 · 가맹점
              </div>
            </motion.div>

            {/* 하단 */}
            <motion.div
              className="absolute bottom-[15%] left-0 w-[200%] z-0 -translate-y-1/2"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              <div className="text-[2rem] sm:text-[3rem] md:text-[4rem] font-black text-white/15 whitespace-nowrap">
                100호점 · 1위 · 프랜차이즈 · OMURICE · 100호점 · 1위 · 프랜차이즈 · OMURICE ·
                100호점 · 1위 · 프랜차이즈 · OMURICE
              </div>
            </motion.div>

            {/* 중앙 컨텐츠 */}
            <div
              className="absolute inset-0 w-screen -translate-y-1/2 flex items-center justify-center"
              style={{ height: '100dvh' }}
            >
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                {/* 오므라이스 이미지 - 데코레이션 */}
                <motion.div
                  className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px]"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {/* 반짝이는 테두리 효과 */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        'linear-gradient(45deg, #FFD700, #FFA500, #FF6347, #FFD700, #FFA500)',
                      backgroundSize: '400% 400%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <div className="absolute inset-[6px] bg-white rounded-full" />
                  </motion.div>

                  {/* 그림자 효과 */}
                  <motion.div
                    className="absolute inset-[8px] rounded-full shadow-2xl"
                    animate={{
                      boxShadow: [
                        '0 0 40px rgba(255, 140, 0, 0.6)',
                        '0 0 60px rgba(255, 140, 0, 0.8)',
                        '0 0 40px rgba(255, 140, 0, 0.6)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* 오므라이스 이미지 */}
                  <div className="absolute inset-[10px] rounded-full overflow-hidden">
                    <Image
                      src="/asset/etc/큐브스테이크 오므라이스 누끼.png"
                      alt="오늘은 오므라이스"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </motion.div>

                {/* 로고 문구 */}
                <motion.div
                  className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[360px] h-[80px] sm:h-[120px] z-[20]"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <Image
                    src="/asset/logo/오므라이스_문구.png"
                    alt="오늘은 오므라이스"
                    fill
                    className="object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.5)]"
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

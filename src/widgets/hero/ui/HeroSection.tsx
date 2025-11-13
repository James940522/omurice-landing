'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-primary">
      {/* 메인 콘텐츠 */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 왼쪽: 텍스트 콘텐츠 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            {/* 메인 타이틀 */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                textShadow: '4px 4px 0px rgba(255, 255, 255, 0.3)',
              }}
            >
              계란덮밥의 원조
              <br />
              <span className="text-white">
                오늘은 오므라이스
              </span>
            </motion.h1>

            {/* 서브 텍스트 */}
            <motion.p
              className="text-2xl md:text-3xl lg:text-4xl text-foreground font-bold mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              몽글몽글 시그니처 계란과
              <br />
              수제토핑의 환상적인 만남!
            </motion.p>

            {/* CTA 버튼 */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.a
                href="#contact"
                className="bg-foreground text-white px-12 py-5 rounded-full text-xl md:text-2xl font-bold shadow-strong-hover hover:bg-white hover:text-foreground transition-all duration-300 text-center border-4 border-foreground"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                창업 문의하기
              </motion.a>
              <motion.a
                href="#menu"
                className="bg-white text-foreground border-4 border-foreground px-12 py-5 rounded-full text-xl md:text-2xl font-bold hover:bg-foreground hover:text-white transition-all duration-300 text-center shadow-strong"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                메뉴 보기
              </motion.a>
            </motion.div>
          </motion.div>

          {/* 오른쪽: 이미지 영역 */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* 메인 이미지 - 실제 음식 사진처럼 */}
            <div className="relative w-full max-w-2xl">
              <motion.div
                className="relative aspect-square"
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 rounded-full shadow-2xl flex items-center justify-center">
                  <span className="text-9xl font-bold text-primary">IMG</span>
                </div>
                
                {/* 반짝이는 효과 */}
                <motion.div
                  className="absolute top-1/4 left-1/4 w-8 h-8 text-white text-4xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                  }}
                >
                  ✨
                </motion.div>
              </motion.div>

              {/* 오른쪽 하단 강조 라벨 */}
              <motion.div
                className="absolute -bottom-4 -right-4 bg-white rounded-full shadow-2xl p-8 border-4 border-foreground"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="text-sm text-foreground/60 mb-1 text-center font-bold">참맛동의</div>
                <div className="text-4xl font-black text-foreground text-center">1위</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 하단 스크롤 힌트 */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-3xl text-foreground/50 font-bold">↓</div>
      </motion.div>
    </section>
  );
}

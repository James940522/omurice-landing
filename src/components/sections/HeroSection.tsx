'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-accent-pink/20">
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 right-10 w-40 h-40 bg-accent-pink rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 left-1/4 w-36 h-36 bg-accent-blue rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 이미지 플레이스홀더 */}
          <motion.div
            className="mx-auto mb-8 w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-primary to-secondary rounded-full shadow-strong flex items-center justify-center"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="text-4xl md:text-5xl font-bold text-white">IMG</span>
          </motion.div>

          {/* 메인 타이틀 */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground"
            style={{ fontFamily: "'Jua', sans-serif" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="text-primary">오늘은</span>{' '}
            <span className="text-secondary">오므라이스</span>
          </motion.h1>

          {/* 서브 타이틀 */}
          <motion.p
            className="text-2xl md:text-3xl lg:text-4xl mb-4 text-foreground/80 font-bold"
            style={{ fontFamily: "'Jua', sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            국내 1위 오므라이스 프랜차이즈
          </motion.p>
          <motion.p
            className="text-xl md:text-2xl mb-12 text-foreground/70"
            style={{ fontFamily: "'Gaegu', sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            1년만에 가맹점 100호점 돌파의 신화
          </motion.p>

          {/* CTA 버튼 */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.button
              onClick={scrollToContact}
              className="bg-primary text-white px-10 py-4 rounded-full text-xl md:text-2xl font-bold shadow-strong-hover hover:bg-secondary transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              창업 문의하기
            </motion.button>
            <motion.button
              onClick={() => {
                const element = document.querySelector('#menu');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-foreground px-10 py-4 rounded-full text-xl md:text-2xl font-bold shadow-strong-hover hover:bg-accent-pink hover:text-white transition-all duration-300 border-4 border-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              메뉴 보기
            </motion.button>
          </motion.div>
        </motion.div>

        {/* 스크롤 다운 인디케이터 */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-2xl text-primary font-bold">↓</div>
        </motion.div>
      </div>
    </section>
  );
}


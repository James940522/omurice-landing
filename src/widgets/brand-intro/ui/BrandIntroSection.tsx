'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function BrandIntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="brand" className="relative overflow-hidden bg-white py-32 md:py-40" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 상단 타이틀 */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block mb-6">
            <span className="text-lg md:text-xl text-primary font-bold tracking-wider">BENEFIT</span>
            <div className="h-1 w-full bg-primary mt-2" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            점주님들의 수익이
            <br />
            <span className="text-primary">첫번째 목표</span>입니다.
          </h2>
        </motion.div>

        {/* 메인 콘텐츠 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* 왼쪽: 텍스트 */}
          <div className="space-y-6">
            <motion.p
              className="text-xl md:text-2xl text-foreground leading-relaxed"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="font-bold text-primary">【 오늘은 오므라이스 】</span>의 모든 매장은 단 한 곳도 빠짐없이 잘 되어야만 합니다.
            </motion.p>
            
            <motion.p
              className="text-lg md:text-xl text-foreground/80 leading-relaxed"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              그것이 오늘은 오므라이스 점주님들의 <span className="font-bold text-secondary">'성공'</span>이기도 하지만 저희의 <span className="font-bold text-secondary">'성공'</span>이기 때문입니다.
            </motion.p>
            
            <motion.p
              className="text-lg md:text-xl text-foreground/80 leading-relaxed"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              그래서 꼭 잘 되어야 하며, 반드시 그렇게 만들 것입니다.
            </motion.p>
            
            <motion.div
              className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <p className="text-base md:text-lg text-foreground leading-relaxed">
                물론 무조건적인 성공을 보장할 수는 없지만 저희들은 점주님과의 <span className="font-bold">상생을 위해 누구보다도 깊이 고민하고, 시장을 분석하며, 빠르게 실행에 옮긴다는 점</span>에서 저희와 한 배를 타는 것은 꽤나 매력적인 선택지가 될 수 있다고 생각합니다.
              </p>
            </motion.div>
            
            <motion.p
              className="text-xl md:text-2xl text-primary font-bold leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              저희 본사는 진정으로 모든 매장이 성업하는 것을 가장 첫 번째로 생각합니다.
            </motion.p>
          </div>

          {/* 오른쪽: 통계/이미지 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* 메인 이미지 */}
            <motion.div
              className="relative aspect-square bg-gradient-to-br from-primary to-secondary rounded-3xl shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  className="text-8xl md:text-9xl font-bold text-white"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  IMG
                </motion.span>
              </div>
            </motion.div>

            {/* 플로팅 통계 카드들 */}
            <motion.div
              className="absolute -top-8 -right-8 bg-white rounded-2xl shadow-2xl p-6 border-4 border-primary cursor-pointer"
              initial={{ scale: 0, rotate: -10 }}
              animate={isInView ? { 
                scale: 1, 
                rotate: 0,
                y: [0, -10, 0] 
              } : {}}
              transition={{ 
                scale: { duration: 0.5, delay: 0.6 },
                rotate: { duration: 0.5, delay: 0.6 },
                y: { duration: 3, repeat: Infinity, delay: 0.8 }
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <div className="text-sm text-foreground/60 mb-1 font-medium">평균 월매출</div>
              <div className="text-3xl font-bold text-primary">1억+</div>
            </motion.div>

            <motion.div
              className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-2xl p-6 border-4 border-secondary cursor-pointer"
              initial={{ scale: 0, rotate: 10 }}
              animate={isInView ? { 
                scale: 1, 
                rotate: 0,
                y: [0, 10, 0] 
              } : {}}
              transition={{ 
                scale: { duration: 0.5, delay: 0.8 },
                rotate: { duration: 0.5, delay: 0.8 },
                y: { duration: 3, repeat: Infinity, delay: 2.3 }
              }}
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <div className="text-sm text-foreground/60 mb-1 font-medium">재가맹률</div>
              <div className="text-3xl font-bold text-secondary">95%</div>
            </motion.div>
          </motion.div>
        </div>

        {/* 하단 CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.a
            href="#startup-guide"
            className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-12 py-5 rounded-full text-lg md:text-xl font-bold shadow-strong-hover"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            창업 안내 자세히 보기 →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

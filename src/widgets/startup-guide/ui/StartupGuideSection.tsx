'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function StartupGuideSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const benefits = [
    {
      id: 1,
      title: '이름 부문 맛집 랭킹 1위, 주문수 1위',
      subtitle: '대박 행진',
      description: '배달앱에서 검증된 인기와 신뢰도로 높은 주문율을 자랑합니다.',
      imageType: 'app-ui',
    },
    {
      id: 2,
      title: '호불호 없는 최고의 맛과 부담 없는 가격, 최상의 품질 제공',
      subtitle: '',
      description: '누구나 좋아하는 맛과 합리적인 가격으로 높은 재구매율을 보장합니다.',
      imageType: 'food',
    },
    {
      id: 3,
      title: '매출 극대화를 위한 다양한 마케팅 컨설팅 지원',
      subtitle: '',
      description: '본사의 전문 마케팅 팀이 매장 성공을 위해 함께합니다.',
      imageType: 'training',
    },
  ];

  return (
    <section id="startup-guide" className="relative overflow-hidden bg-pastel-peach py-32 md:py-40" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 상단 배지 */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <motion.div
            className="bg-foreground text-white px-8 py-3 rounded-full text-lg md:text-xl font-bold cursor-pointer"
            initial={{ opacity: 0, x: -30, scale: 0.8 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            👑 맛집 랭킹 1위
          </motion.div>
          <motion.div
            className="bg-foreground text-white px-8 py-3 rounded-full text-lg md:text-xl font-bold cursor-pointer"
            initial={{ opacity: 0, x: 30, scale: 0.8 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            👑 주문수 1위
          </motion.div>
        </div>

        {/* 타이틀 */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
          >
            배달어플 부문{' '}
            <span className="text-primary" style={{ color: '#8B7355' }}>1위 -</span>
          </h2>
          <p
            className="text-xl md:text-2xl text-foreground/80 mt-6"
          >
            창업하시는 가맹점마다 본사 측의 적극적인 케어로 확실하게 자리 잡을 수 있도록 도와드립니다.
          </p>
        </motion.div>

        {/* 3개 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
            >
              {/* 이미지 카드 */}
              <div className="mb-8 relative group">
                <motion.div
                  className="aspect-[4/3] bg-gradient-to-br from-secondary to-primary rounded-3xl shadow-xl overflow-hidden"
                  whileHover={{ 
                    scale: 1.08, 
                    rotate: index % 2 === 0 ? 3 : -3,
                    y: -10
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <motion.span
                      className="text-6xl md:text-7xl font-bold text-white"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
                    >
                      IMG
                    </motion.span>
                  </div>
                </motion.div>
                
                {/* 아이콘 표시 */}
                <motion.div
                  className="absolute bottom-4 right-4 bg-white rounded-full p-3 shadow-lg"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    y: [0, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                >
                  <div className="text-2xl">
                    {benefit.imageType === 'app-ui' && '📱'}
                    {benefit.imageType === 'food' && '🍽️'}
                    {benefit.imageType === 'training' && '📊'}
                  </div>
                </motion.div>
              </div>

              {/* 화살표 */}
              <motion.div
                className="flex justify-center mb-6"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              >
                <div className="text-3xl text-foreground/30">↓</div>
              </motion.div>

              {/* 텍스트 */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
              >
                <motion.h3
                  className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-relaxed"
                  whileHover={{ scale: 1.05, color: '#FEC601' }}
                  transition={{ duration: 0.2 }}
                >
                  {benefit.title}
                </motion.h3>
                {benefit.subtitle && (
                  <p
                    className="text-lg text-foreground/70 mb-3"
                  >
                    {benefit.subtitle}
                  </p>
                )}
                <p
                  className="text-base md:text-lg text-foreground/60"
                >
                  {benefit.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

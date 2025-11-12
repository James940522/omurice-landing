'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function BrandIntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="brand" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-pink/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl md:text-6xl font-bold mb-6 text-foreground"
            style={{ fontFamily: "'Jua', sans-serif" }}
          >
            브랜드 소개
          </h2>
          <div className="w-24 h-2 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 이미지 영역 */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="aspect-square bg-gradient-to-br from-secondary to-primary rounded-3xl shadow-strong-hover overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-6xl md:text-7xl font-bold text-white">IMG</span>
              </div>
            </div>
            {/* 장식 요소 */}
            <motion.div
              className="absolute -top-8 -right-8 w-32 h-32 bg-accent-green rounded-full shadow-strong"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute -bottom-8 -left-8 w-24 h-24 bg-accent-pink rounded-full shadow-strong"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* 텍스트 영역 */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="bg-accent-pink/10 p-8 rounded-3xl shadow-strong-hover"
              whileHover={{ scale: 1.02 }}
            >
              <h3
                className="text-3xl md:text-4xl font-bold mb-4 text-accent-pink"
                style={{ fontFamily: "'Jua', sans-serif" }}
              >
                브랜드 핵심 가치
              </h3>
              <p
                className="text-xl md:text-2xl text-foreground/80 leading-relaxed"
                style={{ fontFamily: "'Gaegu', sans-serif" }}
              >
                신선한 재료와 정성으로 만드는
                <br />
                <strong className="text-accent-pink">최고의 오므라이스</strong>를
                고객님께 선보입니다
              </p>
            </motion.div>

            <motion.div
              className="bg-accent-blue/10 p-8 rounded-3xl shadow-strong-hover"
              whileHover={{ scale: 1.02 }}
            >
              <h3
                className="text-3xl md:text-4xl font-bold mb-4 text-accent-blue"
                style={{ fontFamily: "'Jua', sans-serif" }}
              >
                창업 지원 시스템
              </h3>
              <p
                className="text-xl md:text-2xl text-foreground/80 leading-relaxed"
                style={{ fontFamily: "'Gaegu', sans-serif" }}
              >
                초보 창업자도 걱정 없는
                <br />
                <strong className="text-accent-blue">체계적인 교육</strong>과 운영
                지원
              </p>
            </motion.div>

            <motion.div
              className="bg-accent-green/10 p-8 rounded-3xl shadow-strong-hover"
              whileHover={{ scale: 1.02 }}
            >
              <h3
                className="text-3xl md:text-4xl font-bold mb-4 text-accent-green"
                style={{ fontFamily: "'Jua', sans-serif" }}
              >
                성장하는 브랜드
              </h3>
              <p
                className="text-xl md:text-2xl text-foreground/80 leading-relaxed"
                style={{ fontFamily: "'Gaegu', sans-serif" }}
              >
                전국 <strong className="text-accent-green">100+</strong> 매장
                운영 중
                <br />
                지속적인 성장을 함께 합니다
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


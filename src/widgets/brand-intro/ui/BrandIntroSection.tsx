'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function BrandIntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="brand" className="py-20 md:py-32 bg-white relative overflow-hidden" ref={ref}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-accent rounded-full shadow-strong" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-secondary rounded-full shadow-strong" />
          </motion.div>

          {/* 텍스트 영역 */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="bg-secondary/10 p-8 rounded-3xl shadow-strong-hover"
              whileHover={{ scale: 1.02 }}
            >
              <h3
                className="text-3xl md:text-4xl font-bold mb-4 text-secondary"
                style={{ fontFamily: "'Jua', sans-serif" }}
              >
                검증된 브랜드 파워
              </h3>
              <p
                className="text-xl md:text-2xl text-foreground/80 leading-relaxed"
                style={{ fontFamily: "'Gaegu', sans-serif" }}
              >
                배달형 오므라이스 시장을 개척한
                <br />
                <strong className="text-secondary">1세대 브랜드</strong>
                <br />
                수많은 운영 경험과 노하우로 검증된 시스템
              </p>
            </motion.div>

            <motion.div
              className="bg-primary/10 p-8 rounded-3xl shadow-strong-hover"
              whileHover={{ scale: 1.02 }}
            >
              <h3
                className="text-3xl md:text-4xl font-bold mb-4 text-primary"
                style={{ fontFamily: "'Jua', sans-serif" }}
              >
                안정적인 수익 구조
              </h3>
              <p
                className="text-xl md:text-2xl text-foreground/80 leading-relaxed"
                style={{ fontFamily: "'Gaegu', sans-serif" }}
              >
                <strong className="text-primary">낮은 재료비 30%대</strong>
                <br />
                높은 마진율로 안정적인 수익 실현
                <br />
                초보 창업자도 운영 가능한 시스템
              </p>
            </motion.div>

            <motion.div
              className="bg-accent/10 p-8 rounded-3xl shadow-strong-hover"
              whileHover={{ scale: 1.02 }}
            >
              <h3
                className="text-3xl md:text-4xl font-bold mb-4 text-accent"
                style={{ fontFamily: "'Jua', sans-serif" }}
              >
                본사의 전폭적인 지원
              </h3>
              <p
                className="text-xl md:text-2xl text-foreground/80 leading-relaxed"
                style={{ fontFamily: "'Gaegu', sans-serif" }}
              >
                <strong className="text-accent">점포 개발부터 오픈까지</strong>
                <br />
                전담 매니저가 1:1 밀착 관리
                <br />
                마케팅, 운영 교육 전면 지원
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

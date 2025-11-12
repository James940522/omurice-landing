'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/shared/lib/utils';

export default function StartupCostSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const costs = [
    {
      category: '가맹비',
      amount: '500만원',
      description: '브랜드 사용권 및 운영 노하우',
      color: 'bg-primary',
    },
    {
      category: '교육비',
      amount: '200만원',
      description: '본사 직영점 실습 교육',
      color: 'bg-secondary',
    },
    {
      category: '인테리어',
      amount: '2,000만원',
      description: '15평 기준 (평수에 따라 변동)',
      color: 'bg-accent',
    },
    {
      category: '집기/설비',
      amount: '1,500만원',
      description: '주방 설비 및 매장 집기',
      color: 'bg-accent',
    },
    {
      category: '초도 물품',
      amount: '300만원',
      description: '식자재 및 소모품',
      color: 'bg-secondary',
    },
    {
      category: '보증금',
      amount: '별도',
      description: '지역 및 평수에 따라 상이',
      color: 'bg-primary',
    },
  ];

  const supports = [
    '인테리어 시공 본사 직접 관리',
    '주방 설비 일괄 구매로 비용 절감',
    '초도 물품 본사 지원',
    '마케팅 비용 본사 부담',
    '배달앱 수수료 협상 지원',
    'POS 시스템 무상 지원',
  ];

  return (
    <section id="startup-cost" className="py-20 md:py-32 bg-white relative overflow-hidden" ref={ref}>

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
            창업 비용 안내
          </h2>
          <p
            className="text-xl md:text-2xl text-foreground/70 mb-6"
            style={{ fontFamily: "'Gaegu', sans-serif" }}
          >
            투명한 비용 공개, 숨은 비용 없음
          </p>
          <div className="w-24 h-2 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* 비용 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {costs.map((cost, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 shadow-strong-hover border-2 border-primary/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.03 }}
            >
              {/* 카테고리 */}
              <div className={cn(cost.color, "text-white px-4 py-2 rounded-full inline-block mb-4")}>
                <span
                  className="text-lg md:text-xl font-bold"
                  style={{ fontFamily: "'Jua', sans-serif" }}
                >
                  {cost.category}
                </span>
              </div>

              {/* 금액 */}
              <h3
                className="text-4xl md:text-5xl font-bold mb-4 text-foreground"
                style={{ fontFamily: "'Jua', sans-serif" }}
              >
                {cost.amount}
              </h3>

              {/* 설명 */}
              <p
                className="text-lg md:text-xl text-foreground/70"
                style={{ fontFamily: "'Gaegu', sans-serif" }}
              >
                {cost.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 총 예상 비용 */}
        <motion.div
          className="bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl p-10 md:p-12 mb-16 shadow-strong text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p
            className="text-xl md:text-2xl mb-4 opacity-90"
            style={{ fontFamily: "'Gaegu', sans-serif" }}
          >
            총 예상 창업 비용 (보증금 제외)
          </p>
          <h3
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ fontFamily: "'Jua', sans-serif" }}
          >
            약 4,500만원
          </h3>
          <p
            className="text-lg md:text-xl opacity-90"
            style={{ fontFamily: "'Gaegu', sans-serif" }}
          >
            * 15평 기준이며, 매장 상황에 따라 변동될 수 있습니다
          </p>
        </motion.div>

        {/* 본사 지원 사항 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3
            className="text-3xl md:text-4xl font-bold mb-8 text-center text-foreground"
            style={{ fontFamily: "'Jua', sans-serif" }}
          >
            본사 지원 사항
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {supports.map((support, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 bg-secondary/5 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-secondary/20"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.2 + 0.1 * index }}
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-xl">✓</span>
                </div>
                <p
                  className="text-lg md:text-xl text-foreground font-medium"
                  style={{ fontFamily: "'Gaegu', sans-serif" }}
                >
                  {support}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

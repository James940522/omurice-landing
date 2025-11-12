'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function StartupGuideSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const sections = [
    {
      id: 1,
      emoji: 'IMG',
      title: '월매출 1억 5천\n실제 달성 매장 다수',
      description: '검증된 수익 모델로 안정적인 매출 보장',
      bgColor: 'bg-gradient-to-br from-primary to-secondary',
      stats: '평균 월매출 7,500만원',
      detail: '체계적인 운영 시스템과 본사의 전폭적인 지원으로\n첫 달부터 안정적인 매출 실현',
    },
    {
      id: 2,
      emoji: 'IMG',
      title: '1년만에\n가맹점 100호점 돌파',
      description: '폭발적인 성장세, 믿을 수 있는 브랜드',
      bgColor: 'bg-gradient-to-br from-accent-pink to-accent-blue',
      stats: '월평균 8개점 오픈',
      detail: '검증된 창업 시스템과 높은 가맹점 만족도로\n빠르게 성장하는 대한민국 대표 브랜드',
    },
    {
      id: 3,
      emoji: 'IMG',
      title: '배달앱 주문 1위\n압도적 점유율',
      description: '고객이 먼저 찾는 오므라이스 맛집',
      bgColor: 'bg-gradient-to-br from-accent-green to-primary',
      stats: '일평균 주문 200건 이상',
      detail: '배달의민족, 요기요, 쿠팡이츠 전 플랫폼\n오므라이스 카테고리 상위 랭킹 유지',
    },
  ];

  return (
    <section id="startup-guide" className="py-20 md:py-32 bg-white relative overflow-hidden">
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
          <motion.div
            className="inline-block mb-6"
          >
            <span className="text-4xl md:text-5xl font-bold text-primary">IMG</span>
          </motion.div>
          <h2
            className="text-4xl md:text-6xl font-bold mb-6 text-foreground"
            style={{ fontFamily: "'Jua', sans-serif" }}
          >
            창업 안내
          </h2>
          <p
            className="text-xl md:text-2xl text-foreground/70 mb-6"
            style={{ fontFamily: "'Gaegu', sans-serif" }}
          >
            숫자로 증명하는 확실한 성공
          </p>
          <div className="w-24 h-2 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* 3개 섹션 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-16">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              whileHover={{ scale: 1.03, y: -10 }}
              className="relative group"
            >
              {/* 메인 카드 */}
              <div className={`${section.bgColor} rounded-3xl p-8 md:p-10 shadow-strong-hover text-white relative overflow-hidden`}>
                {/* 배경 장식 */}
                <motion.div
                  className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"
                  animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* 이미지 플레이스홀더 */}
                <motion.div
                  className="text-5xl md:text-6xl font-bold mb-6 relative z-10 text-white"
                  style={{ fontFamily: "'Jua', sans-serif" }}
                >
                  {section.emoji}
                </motion.div>

                {/* 타이틀 */}
                <h3
                  className="text-3xl md:text-4xl font-bold mb-4 leading-tight relative z-10 whitespace-pre-line"
                  style={{ fontFamily: "'Jua', sans-serif" }}
                >
                  {section.title}
                </h3>

                {/* 설명 */}
                <p
                  className="text-lg md:text-xl mb-6 opacity-90 relative z-10"
                  style={{ fontFamily: "'Gaegu', sans-serif" }}
                >
                  {section.description}
                </p>

                {/* 통계 */}
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-6 relative z-10">
                  <p
                    className="text-2xl md:text-3xl font-bold"
                    style={{ fontFamily: "'Jua', sans-serif" }}
                  >
                    {section.stats}
                  </p>
                </div>

                {/* 상세 설명 */}
                <p
                  className="text-base md:text-lg opacity-80 leading-relaxed relative z-10 whitespace-pre-line"
                  style={{ fontFamily: "'Gaegu', sans-serif" }}
                >
                  {section.detail}
                </p>

                {/* 번호 표시 */}
                <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span
                    className="text-2xl font-bold"
                    style={{ fontFamily: "'Jua', sans-serif" }}
                  >
                    {section.id}
                  </span>
                </div>
              </div>

              {/* 호버 시 추가 효과 */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              />
            </motion.div>
          ))}
        </div>

        {/* 하단 CTA */}
        <motion.div
          className="text-center bg-gradient-to-r from-primary via-secondary to-accent-pink rounded-3xl p-12 md:p-16 shadow-strong text-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6"
          >
            <span className="text-4xl md:text-5xl font-bold text-white">IMG</span>
          </motion.div>
          <h3
            className="text-3xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "'Jua', sans-serif" }}
          >
            지금 바로 시작하세요!
          </h3>
          <p
            className="text-xl md:text-2xl mb-8 opacity-90"
            style={{ fontFamily: "'Gaegu', sans-serif" }}
          >
            성공을 향한 첫 걸음, 오늘은 오므라이스와 함께하세요
          </p>
          <motion.button
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white text-primary px-12 py-5 rounded-full text-xl md:text-2xl font-bold shadow-strong-hover hover:bg-foreground hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ fontFamily: "'Jua', sans-serif" }}
          >
            창업 상담 신청하기 →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}


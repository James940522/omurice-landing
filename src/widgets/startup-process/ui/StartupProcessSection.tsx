'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/shared/lib/utils';

export default function StartupProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const processes = [
    {
      step: 'STEP 1',
      title: '창업 상담',
      description: '전담 상담사와 1:1 맞춤 상담\n입지 분석 및 예상 수익 분석',
      icon: 'IMG',
      color: 'from-primary to-secondary',
    },
    {
      step: 'STEP 2',
      title: '계약 체결',
      description: '투명한 계약 조건 안내\n가맹 계약 및 교육 일정 확정',
      icon: 'IMG',
      color: 'from-secondary to-accent',
    },
    {
      step: 'STEP 3',
      title: '매장 준비',
      description: '인테리어 시공 지원\n주방 설비 및 집기 설치',
      icon: 'IMG',
      color: 'from-accent to-primary',
    },
    {
      step: 'STEP 4',
      title: '오픈 교육',
      description: '본사 직영점 실습 교육\n조리, 서빙, 운영 관리 전반',
      icon: 'IMG',
      color: 'from-primary to-accent',
    },
    {
      step: 'STEP 5',
      title: '그랜드 오픈',
      description: '오픈 마케팅 전폭 지원\nSNS 광고 및 전단지 배포',
      icon: 'IMG',
      color: 'from-secondary to-primary',
    },
    {
      step: 'STEP 6',
      title: '사후 관리',
      description: '정기 방문 및 컨설팅\n신메뉴 개발 및 교육 지속',
      icon: 'IMG',
      color: 'from-accent to-secondary',
    },
  ];

  return (
    <section id="startup-process" className="py-20 md:py-32 bg-white relative overflow-hidden" ref={ref}>

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
            창업 프로세스
          </h2>
          <p
            className="text-xl md:text-2xl text-foreground/70 mb-6"
            style={{ fontFamily: "'Gaegu', sans-serif" }}
          >
            상담부터 오픈까지, 체계적인 6단계 시스템
          </p>
          <div className="w-24 h-2 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* 프로세스 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {processes.map((process, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              {/* 카드 */}
              <div className="bg-primary/5 backdrop-blur-sm rounded-3xl p-8 shadow-strong-hover h-full relative overflow-hidden border-2 border-primary/20">
                {/* 배경 장식 */}
                <div className={cn("absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-full -mr-10 -mt-10", process.color)} />

                {/* STEP 번호 */}
                <div className="mb-4">
                  <span
                    className="text-primary text-lg md:text-xl font-bold"
                    style={{ fontFamily: "'Jua', sans-serif" }}
                  >
                    {process.step}
                  </span>
                </div>

                {/* 아이콘 */}
                <div className={cn("w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br rounded-2xl flex items-center justify-center mb-6 shadow-strong", process.color)}>
                  <span
                    className="text-3xl md:text-4xl font-bold text-white"
                    style={{ fontFamily: "'Jua', sans-serif" }}
                  >
                    {process.icon}
                  </span>
                </div>

                {/* 제목 */}
                <h3
                  className="text-2xl md:text-3xl font-bold mb-4 text-foreground"
                  style={{ fontFamily: "'Jua', sans-serif" }}
                >
                  {process.title}
                </h3>

                {/* 설명 */}
                <p
                  className="text-lg md:text-xl text-foreground/70 leading-relaxed whitespace-pre-line"
                  style={{ fontFamily: "'Gaegu', sans-serif" }}
                >
                  {process.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 하단 안내 */}
        <motion.div
          className="mt-16 text-center bg-gradient-to-r from-primary to-secondary rounded-3xl p-10 md:p-12 shadow-strong text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3
            className="text-2xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Jua', sans-serif" }}
          >
            상담부터 오픈까지 평균 2~3개월
          </h3>
          <p
            className="text-lg md:text-xl opacity-90 mb-6"
            style={{ fontFamily: "'Gaegu', sans-serif" }}
          >
            전담 매니저가 처음부터 끝까지 함께합니다
          </p>
          <a
            href="#contact"
            className="inline-block bg-white text-primary px-10 py-4 rounded-full text-lg md:text-xl font-bold shadow-strong-hover hover:bg-foreground hover:text-white transition-all duration-300"
            style={{ fontFamily: "'Jua', sans-serif" }}
          >
            무료 상담 신청하기
          </a>
        </motion.div>
      </div>
    </section>
  );
}

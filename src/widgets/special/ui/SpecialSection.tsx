'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function SpecialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      id: 1,
      icon: '🏪',
      title: '직영점 운영',
      subtitle: 'Directly Management',
      description: '오늘은 오므라이스는 직영점 운영을 통해 1년 이상 시장을 테스트하며 브랜드를 최적화 해왔습니다. 또한 다양한 상권의 점주님들의 고민을 해결해온 풍부한 경험을 토대로 변수가 찾아와도 원활한 대처가 가능하다는 점을 알려드립니다.',
      color: 'from-primary to-secondary',
    },
    {
      id: 2,
      icon: '⚡',
      title: '기술력',
      subtitle: 'Competitiveness',
      description: '운영 경험 상 음식은 조리하는 사람에 따라 맛에 큰 차이가 있습니다. 따라서 저희는 타 브랜드와 달리 누구나 쉽고 빠르게 맛있는 오므라이스를 만들 수 있도록 체계화된 조리 시스템을 구축했습니다.',
      color: 'from-secondary to-accent',
    },
    {
      id: 3,
      icon: '📈',
      title: '마케팅 지원',
      subtitle: 'Marketing Support',
      description: '본사의 전문 마케팅 팀이 오픈 전후로 SNS 광고, 배달앱 최적화, 전단지 배포 등 매출 극대화를 위한 다양한 마케팅 활동을 전폭 지원합니다. 점주님은 운영에만 집중하세요.',
      color: 'from-accent to-primary',
    },
    {
      id: 4,
      icon: '🎓',
      title: '체계적인 교육',
      subtitle: 'Systematic Training',
      description: '본사 직영점에서 진행되는 실전 교육을 통해 조리, 서빙, 운영 관리 전반을 익힐 수 있습니다. 초보 창업자도 걱정 없이 시작할 수 있도록 1:1 맞춤 교육을 제공합니다.',
      color: 'from-primary to-accent',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-32 md:py-40" ref={ref}>
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 상단 타이틀 */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block mb-6">
            <span className="text-lg md:text-xl text-primary font-bold tracking-wider">SPECIAL</span>
            <div className="h-1 w-full bg-primary mt-2" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            오늘은 오므라이스는
            <br />
            <span className="text-primary">가맹점의 성장</span>을 최우선 과제로 삼습니다.
          </h2>
          <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto">
            가맹점이 성공해야 본사가 성공하는 구조이기 때문입니다.
          </p>
        </motion.div>

        {/* 특징 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <div className="bg-white border-2 border-foreground/10 rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
                {/* 아이콘 */}
                <div className={`inline-block bg-gradient-to-br ${feature.color} p-6 rounded-2xl mb-6 shadow-strong`}>
                  <span className="text-5xl">{feature.icon}</span>
                </div>

                {/* 타이틀 */}
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-primary font-medium mb-4 tracking-wider">
                  {feature.subtitle}
                </p>

                {/* 설명 */}
                <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                  {feature.description}
                </p>

                {/* 호버 효과 */}
                <div className="absolute bottom-6 right-6 text-4xl text-primary/20 group-hover:text-primary/50 group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-300">
                  →
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 하단 강조 섹션 */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl p-10 md:p-16 shadow-2xl text-white text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            여러분의 성공이 곧 우리의 성공입니다
          </h3>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed">
            오늘은 오므라이스는 단순히 브랜드를 판매하는 것이 아니라,
            <br />
            점주님과 함께 성장하는 진정한 파트너가 되고자 합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#startup-cost"
              className="bg-white text-foreground px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transition-all duration-300 shadow-strong"
            >
              창업 비용 확인하기
            </a>
            <a
              href="#contact"
              className="bg-foreground text-white px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transition-all duration-300 border-2 border-white"
            >
              무료 상담 신청
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


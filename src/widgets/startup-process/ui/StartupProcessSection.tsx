'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';

export default function StartupProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const processes = [
    {
      step: 'STEP 1',
      title: '창업 상담',
      description: '전담 상담사와 1:1 맞춤 상담\n입지 분석 및 예상 수익 분석',
      image: '/asset/etc/process-1.png',
      color: 'from-orange-400 to-orange-500',
    },
    {
      step: 'STEP 2',
      title: '계약 체결',
      description: '투명한 계약 조건 안내\n가맹 계약 및 교육 일정 확정',
      image: '/asset/etc/process-2.png',
      color: 'from-yellow-400 to-yellow-500',
    },
    {
      step: 'STEP 3',
      title: '오픈 교육',
      description: '본사 직영점 실습 교육\n조리, 운영 관리 전반',
      image: '/asset/etc/process-3.png',
      color: 'from-orange-500 to-red-500',
    },
    {
      step: 'STEP 4',
      title: '사후 관리',
      description: '정기 방문 및 컨설팅\n신메뉴 개발 및 교육 지속',
      image: '/asset/etc/process-4.png',
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <section id="startup-process" className="py-20 md:py-32 relative overflow-hidden" ref={ref}>
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image src="/asset/bg/sec5-bg.jpg" alt="배경" fill className="object-cover" quality={90} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            창업 프로세스
          </h2>
          <p className="text-xl md:text-2xl text-white mb-6 drop-shadow-md">
            상담부터 오픈까지, 체계적인 4단계 시스템
          </p>
          <div className="w-24 h-2 bg-yellow-300 mx-auto rounded-full" />
        </motion.div>

        {/* 프로세스 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-6xl mx-auto">
          {processes.map((process, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * index }}
              whileHover={{ scale: 1.02, y: -8 }}
            >
              {/* 카드 */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 h-full">
                {/* 이미지 섹션 */}
                <div className="relative h-64 md:h-72 overflow-hidden">
                  <Image
                    src={process.image}
                    alt={process.title}
                    fill
                    className="object-cover"
                    quality={90}
                  />
                  {/* 그라데이션 오버레이 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* STEP 번호 배지 */}
                  <div className="absolute top-4 left-4">
                    <div
                      className={cn(
                        'px-4 py-2 rounded-full font-bold text-white text-sm md:text-base shadow-lg bg-gradient-to-r',
                        process.color
                      )}
                    >
                      {process.step}
                    </div>
                  </div>
                </div>

                {/* 컨텐츠 섹션 */}
                <div className="p-6 md:p-8">
                  {/* 제목 */}
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                    {process.title}
                  </h3>

                  {/* 설명 */}
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                    {process.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

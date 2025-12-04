'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

// 개별 강점 아이템 컴포넌트
interface StrengthItemProps {
  strength: {
    number: string;
    title: string;
    desc: string;
    image: string;
  };
  index: number;
}

const StrengthItem = ({ strength, index }: StrengthItemProps) => {
  const itemRef = useRef(null);
  const isItemInView = useInView(itemRef, {
    once: true,
    margin: '-100px',
    amount: 0.3, // 항목의 30%가 보일 때 트리거
  });
  const isEven = index % 2 === 1;

  return (
    <motion.div
      ref={itemRef}
      className="relative"
      initial={{
        opacity: 0,
        x: isEven ? 100 : -100,
      }}
      animate={
        isItemInView
          ? {
              opacity: 1,
              x: 0,
            }
          : {}
      }
      transition={{
        duration: 0.8,
        ease: 'easeOut',
      }}
    >
      <div
        className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center`}
      >
        {/* 이미지 영역 */}
        <motion.div
          className="w-full md:w-1/2"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-strong bg-linear-to-br from-gray-50 to-gray-100">
            <Image
              src={strength.image}
              alt={strength.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* 넘버 오버레이 */}
            <div className="absolute top-6 left-6 z-10">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white flex items-center justify-center shadow-lg">
                <span className="text-2xl md:text-3xl font-bold text-yellow-500">
                  {strength.number}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 텍스트 영역 */}
        <div className="w-full md:w-1/2">
          <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-8">
            {strength.title}
          </h4>
          <div className="w-12 h-1 bg-yellow-600 mb-6 md:mb-8"></div>
          <p className="text-base md:text-lg text-gray-800 leading-relaxed">{strength.desc}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function RevenueProofSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="revenue" className="relative overflow-hidden py-24 md:py-20 lg:py-24" ref={ref}>
      {/* 배경 이미지 - 반복 */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/asset/bg/sec4-bg.jpg)',
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
          backgroundPosition: 'center',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 상단 타이틀 */}
        <motion.div
          className="text-center mb-20 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6 md:mb-8"
            initial={{ scale: 0.8 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-yellow-500 text-white px-6 py-2 md:px-8 md:py-3 rounded-full">
              <span className="text-sm md:text-base lg:text-lg font-bold tracking-wider">
                PROOF OF SUCCESS
              </span>
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
            <span className="text-yellow-600">의심 마세요.</span> 확인하세요.
          </h2>

          <p className="text-lg md:text-xl text-gray-800 max-w-2xl mx-auto leading-relaxed">
            실제 가맹점 데이터를 기반으로 설계된
            <br className="hidden md:block" />
            수익 중심의 창업 모델입니다.
          </p>
        </motion.div>

        {/* 핵심 수익 지표 */}
        <motion.div
          className="mb-32 md:mb-24 lg:mb-28"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                label: '평균 순이익률',
                value: '35%',
                unit: '이상',
              },
              {
                label: '평균 조리시간',
                value: '3분',
                unit: '이내',
              },
              {
                label: '운영 인원',
                value: '1~2인',
                unit: '',
              },
              {
                label: '평균 회수기간',
                value: '12개월',
                unit: '',
              },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-600 mb-3 md:mb-4">
                  {metric.value}
                  {metric.unit && (
                    <span className="text-2xl md:text-3xl lg:text-4xl text-gray-700 ml-1">
                      {metric.unit}
                    </span>
                  )}
                </div>
                <div className="text-sm md:text-base lg:text-lg text-gray-800 font-medium">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 손익구조 강점 - 지그재그 레이아웃 */}
        <motion.div
          className="mb-0"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-16 md:mb-12 lg:mb-16">
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              수익구조를 <span className="text-yellow-600">최적화</span>했습니다
            </h3>
            <p className="text-base md:text-lg text-gray-800 max-w-2xl mx-auto">
              실제 가맹점 손익 데이터를 분석하여
              <br />
              가장 수익성 높은 구조로 설계했습니다
            </p>
          </div>

          <div className="space-y-16 md:space-y-20 lg:space-y-24 max-w-6xl mx-auto">
            {[
              {
                number: '01',
                title: '원가 안정성',
                desc: '매출 대비 식자재 비용 28%로 안정적인 원가율을 유지합니다. 삼성 웰스토리 대기업과 함께하는 안정감 있는 주6회 전국배송 시스템으로, 신선한 식자재를 합리적인 가격에 공급받을 수 있습니다.',
                image: '/asset/etc/1.jpg',
              },
              {
                number: '02',
                title: '빠른 회전율',
                desc: '평균 조리시간 3분 이내로 주문부터 완성까지 빠르게 처리합니다. 빠른 회전율은 곧 높은 매출로 연결되며, 배달 최적화로 시간당 처리량을 극대화했습니다. 우리는 항상 신선한 재료를 사용하여 최상의 맛과 영양을 제공합니다.',
                image: '/asset/etc/2.png',
              },
              {
                number: '03',
                title: '낮은 인건비',
                desc: '1~2인 운영이 가능하도록 매뉴얼화된 시스템입니다. 조리 과정이 단순하여 초보자도 빠르게 습득할 수 있으며, 직원 의존도를 최소화했습니다. 더불어, 다양한 재료와 토핑 옵션을 제공하여 고객들이 자신만의 맞춤식을 만들 수 있도록 돕고 있습니다.',
                image: '/asset/etc/3.png',
              },
              {
                number: '04',
                title: '소형 매장 최적화',
                desc: '7~10평 소형 매장에서도 높은 매출을 실현합니다. 불필요한 공간을 제거하고 조리와 배달에 최적화된 동선으로 설계하여 임대료 부담을 줄였습니다. 지속 가능한 비즈니스 모델을 추구하며 환경에 부담을 주지 않으면서도 사회적 가치를 실현합니다.',
                image: '/asset/etc/4.png',
              },
              {
                number: '05',
                title: '배달 특화 설계',
                desc: '배달과 포장에 최적화된 메뉴 구성으로 배달 앱 광고비 대비 매출 효율을 극대화했습니다. 포장 품질과 배달 시간을 모두 고려한 레시피입니다. 우리는 항상 고객들의 만족을 최우선으로 생각하며, 편안하고 즐거운 식사 경험을 제공하기 위해 최선을 다하고 있습니다.',
                image: '/asset/etc/5.png',
              },
              {
                number: '06',
                title: '낮은 운영 난이도',
                desc: '레시피가 자동화되어 있어 외식업 경험이 없어도 운영 가능합니다. 본사의 체계적인 교육과 지속적인 관리로 안정적인 운영을 지원합니다. 소비자들과의 소통을 통해 브랜드의 가치를 공유하고, 그들의 참여를 통해 브랜드의 발전을 이루고자 합니다.',
                image: '/asset/etc/6.png',
              },
              {
                number: '07',
                title: '불황 대응력',
                desc: '고정비를 최소화한 구조로 경기 변동에도 안정적입니다. 작은 매장, 적은 인원, 단순한 재고로 리스크를 낮추고 수익성을 유지합니다. 우리는 지속 가능한 재료 선택과 생산 방법을 채택하여 환경에 친화적인 사업 운영을 추구하며, 브랜드와 소비자 간의 긴밀한 유대감을 형성합니다.',
                image: '/asset/etc/7.png',
              },
            ].map((strength, index) => (
              <StrengthItem key={strength.number} strength={strength} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

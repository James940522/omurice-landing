'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function RevenueProofSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const topStores = [
    {
      id: 1,
      storeName: '강남점',
      monthlyRevenue: '1억 5천만원',
      highlight: true,
    },
    {
      id: 2,
      storeName: '홍대점',
      monthlyRevenue: '1억 3천만원',
      highlight: false,
    },
    {
      id: 3,
      storeName: '잠실점',
      monthlyRevenue: '1억 2천만원',
      highlight: false,
    },
    {
      id: 4,
      storeName: '건대점',
      monthlyRevenue: '1억 1천만원',
      highlight: false,
    },
    {
      id: 5,
      storeName: '신촌점',
      monthlyRevenue: '9천 5백만원',
      highlight: false,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-pastel-yellow py-32 md:py-40" ref={ref}>
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-20 w-64 h-64 bg-primary/20 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-secondary/20 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 상단 타이틀 */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0.8 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white border-4 border-foreground px-8 py-3 rounded-full">
              <span className="text-foreground text-xl md:text-2xl font-bold">PROOF OF SUCCESS</span>
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            <span className="text-secondary">매출로</span> 증명하겠습니다.
          </h2>
          
          <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            말이 아닌 숫자로 보여드립니다.
            <br />
            실제 가맹점들의 성공 스토리를 확인하세요.
          </p>
        </motion.div>

        {/* 가맹점 월매출 TOP 5 */}
        <div className="mb-16">
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            가맹점 월매출 TOP 5
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {topStores.map((store, index) => (
              <motion.div
                key={store.id}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                {/* 순위 배지 */}
                <div className="absolute -top-4 -left-4 z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-strong ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                    index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                    index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                    'bg-primary'
                  }`}>
                    {index + 1}
                  </div>
                </div>

                {/* 카드 */}
                <motion.div
                  className={`relative bg-white rounded-2xl p-6 shadow-strong-hover ${
                    store.highlight ? 'border-4 border-primary' : ''
                  }`}
                  whileHover={{ 
                    scale: 1.08, 
                    rotate: index % 2 === 0 ? 2 : -2,
                    y: -10
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* 이미지 플레이스홀더 */}
                  <motion.div
                    className="aspect-square bg-gradient-to-br from-primary to-secondary rounded-xl mb-4 flex items-center justify-center overflow-hidden"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-5xl font-bold text-white">IMG</span>
                  </motion.div>

                  {/* 매장 정보 */}
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-foreground mb-2">{store.storeName}</h4>
                    <div className="text-sm text-foreground/60 mb-2">월 매출</div>
                    <motion.div
                      className={`text-2xl font-bold ${store.highlight ? 'text-primary' : 'text-secondary'}`}
                      animate={{ scale: store.highlight ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {store.monthlyRevenue}
                    </motion.div>
                  </div>

                  {/* 강조 표시 */}
                  {store.highlight && (
                    <motion.div
                      className="absolute -bottom-3 left-1/2 transform -translate-x-1/2"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-bold whitespace-nowrap">
                        최고 매출
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 하단 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: '가맹점 수', value: '100+', delay: 1.2 },
            { label: '재가맹률', value: '95%', delay: 1.3 },
            { label: '평균 월매출', value: '1억+', delay: 1.4 },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white border-4 border-foreground rounded-2xl p-8 text-center shadow-strong cursor-pointer"
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: stat.delay }}
              whileHover={{ 
                scale: 1.1, 
                rotate: index === 1 ? 0 : (index === 0 ? -3 : 3),
                y: -10
              }}
            >
              <motion.div
                className="text-4xl md:text-5xl font-bold text-primary mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-lg text-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* 하단 CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <motion.p
            className="text-xl text-foreground/70 mb-6"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            이 숫자들이 여러분의 미래가 될 수 있습니다
          </motion.p>
          <motion.a
            href="#contact"
            className="inline-block bg-foreground text-white border-4 border-foreground px-12 py-5 rounded-full text-lg md:text-xl font-bold shadow-strong-hover"
            whileHover={{ scale: 1.08, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            무료 상담 신청하기 →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}


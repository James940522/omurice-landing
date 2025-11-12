'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { formatNumber } from '@/lib/utils';
import type { BaeminOrder } from '@/types';

const baeminOrders: BaeminOrder[] = [
  {
    id: '1',
    storeName: '강남점',
    orderCount: 1234,
    period: '최근 1개월',
    bgColor: 'bg-accent-pink',
  },
  {
    id: '2',
    storeName: '홍대점',
    orderCount: 1567,
    period: '최근 1개월',
    bgColor: 'bg-primary',
  },
  {
    id: '3',
    storeName: '신촌점',
    orderCount: 998,
    period: '최근 1개월',
    bgColor: 'bg-accent-blue',
  },
  {
    id: '4',
    storeName: '잠실점',
    orderCount: 1445,
    period: '최근 1개월',
    bgColor: 'bg-accent-green',
  },
  {
    id: '5',
    storeName: '건대점',
    orderCount: 1123,
    period: '최근 1개월',
    bgColor: 'bg-secondary',
  },
  {
    id: '6',
    storeName: '신림점',
    orderCount: 876,
    period: '최근 1개월',
    bgColor: 'bg-accent-pink',
  },
];

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return <span ref={ref}>{formatNumber(count)}</span>;
}

export default function BaeminOrdersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(baeminOrders.length / 3));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getVisibleItems = () => {
    const itemsPerView = 3;
    const startIndex = currentIndex * itemsPerView;
    const items = [...baeminOrders, ...baeminOrders, ...baeminOrders];
    return items.slice(startIndex, startIndex + itemsPerView);
  };

  return (
    <section id="baemin" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-pink/10 rounded-full blur-3xl" />

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
            배달의민족 최근 주문수
          </h2>
          <p
            className="text-xl md:text-2xl text-foreground/70 mb-6"
            style={{ fontFamily: "'Gaegu', sans-serif" }}
          >
            실시간으로 확인하는 매장별 주문 현황
          </p>
          <div className="w-24 h-2 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* 주문 수 카드 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {getVisibleItems().map((order, index) => (
            <motion.div
              key={`${order.id}-${currentIndex}-${index}`}
              className={`${order.bgColor} text-white rounded-3xl p-8 shadow-strong-hover`}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <div className="text-center">
                <motion.div
                  className="text-3xl font-bold mb-4 text-white"
                  style={{ fontFamily: "'Jua', sans-serif" }}
                >
                  IMG
                </motion.div>
                <h3
                  className="text-2xl md:text-3xl font-bold mb-4"
                  style={{ fontFamily: "'Jua', sans-serif" }}
                >
                  {order.storeName}
                </h3>
                <div className="mb-4">
                  <p
                    className="text-5xl md:text-6xl font-bold mb-2"
                    style={{ fontFamily: "'Jua', sans-serif" }}
                  >
                    <CountUp end={order.orderCount} />
                  </p>
                  <p
                    className="text-xl opacity-90"
                    style={{ fontFamily: "'Gaegu', sans-serif" }}
                  >
                    건
                  </p>
                </div>
                <p
                  className="text-lg opacity-80"
                  style={{ fontFamily: "'Gaegu', sans-serif" }}
                >
                  {order.period}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 인디케이터 */}
        <motion.div
          className="flex justify-center items-center gap-3 mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {Array.from({ length: Math.ceil(baeminOrders.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-primary w-8' : 'bg-foreground/30'
              }`}
            />
          ))}
        </motion.div>

        {/* 추가 정보 */}
        <motion.div
          className="mt-16 text-center bg-gradient-to-r from-primary/20 to-accent-pink/20 rounded-3xl p-8 shadow-strong"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p
            className="text-2xl md:text-3xl text-foreground font-bold"
            style={{ fontFamily: "'Jua', sans-serif" }}
          >
            배달 주문 1위 브랜드로 성장하세요!
          </p>
        </motion.div>
      </div>
    </section>
  );
}


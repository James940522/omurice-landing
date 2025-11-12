'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import type { BaeminOrder } from '@/shared/types';
import { cn } from '@/shared/lib/utils';

// 배민 주문건 데이터 (이미지는 추후 제공)
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

export default function BaeminOrdersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <section id="baemin" className="py-20 md:py-32 bg-gradient-to-br from-accent-pink/10 via-secondary/10 to-primary/10 relative overflow-hidden" ref={ref}>
      {/* 배경 장식 */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent-blue/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-green/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-6">
            <span className="text-4xl md:text-5xl font-bold text-primary">IMG</span>
          </div>
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
            실제 매장의 생생한 주문 현황
          </p>
          <div className="w-24 h-2 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* 배민 주문 현황 캐러셀 */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="baemin-swiper !pb-16"
          >
            {baeminOrders.map((order) => (
              <SwiperSlide key={order.id}>
                <div className={cn(order.bgColor, "rounded-3xl p-8 md:p-10 shadow-strong-hover text-white relative overflow-hidden h-full")}>
                  {/* 배경 장식 */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full" />

                  {/* 이미지 영역 (추후 실제 이미지로 대체) */}
                  <div className="relative z-10 mb-6">
                    <div className="aspect-[4/3] bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                      <span className="text-6xl md:text-7xl font-bold text-white/50">IMG</span>
                    </div>
                  </div>

                  {/* 매장명 */}
                  <h3
                    className="text-3xl md:text-4xl font-bold mb-4 relative z-10"
                    style={{ fontFamily: "'Jua', sans-serif" }}
                  >
                    {order.storeName}
                  </h3>

                  {/* 주문수 */}
                  <div className="relative z-10 mb-4">
                    <p
                      className="text-lg md:text-xl opacity-90 mb-2"
                      style={{ fontFamily: "'Gaegu', sans-serif" }}
                    >
                      {order.period} 주문수
                    </p>
                    <p
                      className="text-5xl md:text-6xl font-bold"
                      style={{ fontFamily: "'Jua', sans-serif" }}
                    >
                      {order.orderCount.toLocaleString()}건
                    </p>
                  </div>

                  {/* 강조 메시지 */}
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 relative z-10">
                    <p
                      className="text-lg md:text-xl font-bold"
                      style={{ fontFamily: "'Gaegu', sans-serif" }}
                    >
                      실제 검증된 매출!
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* 하단 안내 */}
        <motion.div
          className="mt-16 text-center bg-white rounded-3xl p-8 md:p-10 shadow-strong"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="inline-block mb-4">
            <span className="text-3xl md:text-4xl font-bold text-primary">IMG</span>
          </div>
          <p
            className="text-2xl md:text-3xl text-foreground font-bold mb-2"
            style={{ fontFamily: "'Jua', sans-serif" }}
          >
            모든 수치는 실제 배민 주문 데이터!
          </p>
          <p
            className="text-lg md:text-xl text-foreground/70"
            style={{ fontFamily: "'Gaegu', sans-serif" }}
          >
            믿을 수 있는 검증된 브랜드입니다
          </p>
        </motion.div>
      </div>
    </section>
  );
}

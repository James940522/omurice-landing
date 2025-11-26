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
import Image from 'next/image';

// 배민 주문건 데이터 (이미지는 추후 제공)
const baeminOrders: BaeminOrder[] = [
  {
    id: '1',
    storeName: '강남점',
    orderCount: 1234,
    period: '최근 1개월',
    bgColor: 'bg-yellow-400',
  },
  {
    id: '2',
    storeName: '홍대점',
    orderCount: 1567,
    period: '최근 1개월',
    bgColor: 'bg-yellow-500',
  },
  {
    id: '3',
    storeName: '신촌점',
    orderCount: 998,
    period: '최근 1개월',
    bgColor: 'bg-yellow-500',
  },
  {
    id: '4',
    storeName: '잠실점',
    orderCount: 1445,
    period: '최근 1개월',
    bgColor: 'bg-yellow-600',
  },
  {
    id: '5',
    storeName: '건대점',
    orderCount: 1123,
    period: '최근 1개월',
    bgColor: 'bg-yellow-400',
  },
  {
    id: '6',
    storeName: '신림점',
    orderCount: 876,
    period: '최근 1개월',
    bgColor: 'bg-yellow-400',
  },
];

export default function BaeminOrdersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="baemin"
      className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black"
      ref={ref}
    >
      {/* 메인 배경 이미지 - baemin.jpg */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/asset/etc/baemin.jpg"
          alt="배경"
          fill
          className="object-contain opacity-40"
          quality={90}
        />
      </div>

      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* 배민 로고 */}
          <div className="inline-block mb-6">
            <Image
              src="/asset/etc/baemin-logo.png"
              alt="배달의민족"
              width={200}
              height={60}
              className="mx-auto drop-shadow-2xl"
            />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            배달의민족 최근 주문수
          </h2>
          <p className="text-xl md:text-2xl text-white mb-6 drop-shadow-md">
            실제 매장의 생생한 주문 현황
          </p>
          <div className="w-24 h-2 bg-yellow-300 mx-auto rounded-full" />
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
                <div
                  className={cn(
                    order.bgColor,
                    'rounded-3xl p-8 md:p-10 shadow-strong-hover text-white relative overflow-hidden h-full'
                  )}
                >
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
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">
                    {order.storeName}
                  </h3>

                  {/* 주문수 */}
                  <div className="relative z-10 mb-4">
                    <p className="text-lg md:text-xl opacity-90 mb-2">{order.period} 주문수</p>
                    <p className="text-5xl md:text-6xl font-bold">
                      {order.orderCount.toLocaleString()}건
                    </p>
                  </div>

                  {/* 강조 메시지 */}
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 relative z-10">
                    <p className="text-lg md:text-xl font-bold">실제 검증된 매출!</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* 하단 안내 */}
        <motion.div
          className="mt-16 text-center bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-strong relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* 배경 장식 - 계란 이미지 */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 opacity-10">
            <Image src="/asset/etc/egg.jpg" alt="계란" fill className="object-cover rounded-full" />
          </div>
          <div className="absolute -left-10 -top-10 w-32 h-32 opacity-10">
            <Image src="/asset/etc/egg.jpg" alt="계란" fill className="object-cover rounded-full" />
          </div>

          <div className="relative z-10">
            <p className="text-2xl md:text-3xl text-gray-900 font-bold mb-2">
              모든 수치는 실제 배민 주문 데이터!
            </p>
            <p className="text-lg md:text-xl text-gray-700">믿을 수 있는 검증된 브랜드입니다</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

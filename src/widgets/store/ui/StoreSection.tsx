'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { Store } from '@/shared/types';
import { cn } from '@/shared/lib/utils';

const stores: Store[] = [
  {
    id: '1',
    name: '강남점',
    address: '서울 강남구 테헤란로 123',
    phone: '02-1234-5678',
    openingDate: '2024.01',
  },
  {
    id: '2',
    name: '홍대점',
    address: '서울 마포구 홍익로 456',
    phone: '02-2345-6789',
    openingDate: '2024.02',
  },
  {
    id: '3',
    name: '신촌점',
    address: '서울 서대문구 신촌로 789',
    phone: '02-3456-7890',
    openingDate: '2024.03',
  },
  {
    id: '4',
    name: '잠실점',
    address: '서울 송파구 올림픽로 321',
    phone: '02-4567-8901',
    openingDate: '2024.04',
  },
  {
    id: '5',
    name: '건대점',
    address: '서울 광진구 능동로 654',
    phone: '02-5678-9012',
    openingDate: '2024.05',
  },
  {
    id: '6',
    name: '신림점',
    address: '서울 관악구 신림로 987',
    phone: '02-6789-0123',
    openingDate: '2024.06',
  },
];

const colors = [
  'bg-secondary',
  'bg-primary',
  'bg-accent',
  'bg-accent',
  'bg-secondary',
  'bg-primary/80',
];

export default function StoreSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  // 검색 기능은 추후 Client Component로 features에 추가 예정

  return (
    <section id="store" className="py-20 md:py-32 bg-white relative overflow-hidden" ref={ref}>

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
            매장 안내
          </h2>
          <p
            className="text-xl md:text-2xl text-foreground/70 mb-6"
            style={{ fontFamily: "'Gaegu', sans-serif" }}
          >
            전국 각지에서 성공적으로 운영 중
          </p>
          <div className="w-24 h-2 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* 검색 박스 (추후 동적 기능 추가) */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="bg-white rounded-full shadow-strong p-2 flex items-center gap-4">
            <div className="pl-4">
              <span className="text-2xl">🔍</span>
            </div>
            <input
              type="text"
              placeholder="지역 또는 매장명으로 검색"
              className="flex-1 py-3 px-2 text-lg outline-none"
              style={{ fontFamily: "'Gaegu', sans-serif" }}
              disabled
            />
          </div>
        </div>

        {/* 매장 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {stores.map((store, index) => (
            <motion.div
              key={store.id}
              className="bg-white rounded-3xl overflow-hidden shadow-strong-hover"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.03 }}
            >
              {/* 헤더 */}
              <div className={cn(colors[index % colors.length], "p-6 text-white relative overflow-hidden")}>
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
                <div className="inline-block mb-4">
                  <span className="text-3xl md:text-4xl font-bold text-white">IMG</span>
                </div>
                <h3
                  className="text-3xl md:text-4xl font-bold relative z-10"
                  style={{ fontFamily: "'Jua', sans-serif" }}
                >
                  {store.name}
                </h3>
              </div>

              {/* 정보 */}
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                    📍
                  </div>
                  <div>
                    <p
                      className="text-sm text-foreground/60 mb-1"
                      style={{ fontFamily: "'Gaegu', sans-serif" }}
                    >
                      주소
                    </p>
                    <p
                      className="text-lg font-medium text-foreground"
                      style={{ fontFamily: "'Gaegu', sans-serif" }}
                    >
                      {store.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    📞
                  </div>
                  <div>
                    <p
                      className="text-sm text-foreground/60 mb-1"
                      style={{ fontFamily: "'Gaegu', sans-serif" }}
                    >
                      전화번호
                    </p>
                    <p
                      className="text-lg font-medium text-foreground"
                      style={{ fontFamily: "'Jua', sans-serif" }}
                    >
                      {store.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold">
                    📅
                  </div>
                  <div>
                    <p
                      className="text-sm text-foreground/60 mb-1"
                      style={{ fontFamily: "'Gaegu', sans-serif" }}
                    >
                      오픈일
                    </p>
                    <p
                      className="text-lg font-medium text-foreground"
                      style={{ fontFamily: "'Jua', sans-serif" }}
                    >
                      {store.openingDate}
                    </p>
                  </div>
                </div>
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
          <div className="inline-block mb-6">
            <span className="text-4xl md:text-5xl font-bold text-white">IMG</span>
          </div>
          <h3
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Jua', sans-serif" }}
          >
            100개 이상의 가맹점이 성공 중!
          </h3>
          <p
            className="text-lg md:text-xl opacity-90 mb-6"
            style={{ fontFamily: "'Gaegu', sans-serif" }}
          >
            당신도 오늘은 오므라이스 가족이 되어보세요
          </p>
          <a
            href="#contact"
            className="inline-block bg-white text-primary px-10 py-4 rounded-full text-xl md:text-2xl font-bold shadow-strong-hover hover:bg-foreground hover:text-white transition-all duration-300"
            style={{ fontFamily: "'Jua', sans-serif" }}
          >
            창업 문의하기
          </a>
        </motion.div>
      </div>
    </section>
  );
}

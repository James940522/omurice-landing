'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { HiLocationMarker, HiPhone, HiCalendar } from 'react-icons/hi';
import type { Store } from '@/types';

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
  'bg-accent-pink',
  'bg-primary',
  'bg-accent-blue',
  'bg-accent-green',
  'bg-secondary',
  'bg-accent-pink/80',
];

export default function StoreSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="store" className="py-20 md:py-32 bg-gradient-to-br from-accent-blue/10 to-accent-green/10 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-pink/10 rounded-full blur-3xl" />

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
            매장 안내
          </h2>
          <p
            className="text-xl md:text-2xl text-foreground/70 mb-6"
            style={{ fontFamily: "'Gaegu', sans-serif" }}
          >
            전국 각지에서 만나보세요
          </p>
          <div className="w-24 h-2 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* 검색 바 */}
        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <input
              type="text"
                placeholder="지역명 또는 매장명으로 검색하세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-full border-4 border-primary text-lg md:text-xl focus:outline-none focus:border-secondary transition-colors shadow-strong"
              style={{ fontFamily: "'Gaegu', sans-serif" }}
            />
          </div>
        </motion.div>

        {/* 매장 그리드 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {filteredStores.map((store, index) => (
            <motion.div
              key={store.id}
              className="bg-white rounded-3xl overflow-hidden shadow-strong-hover"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.03, rotate: 1 }}
            >
              {/* 상단 색상 바 */}
              <div className={`${colors[index % colors.length]} h-3`} />

              {/* 매장 정보 */}
              <div className="p-6 md:p-8">
                <h3
                  className="text-2xl md:text-3xl font-bold mb-6 text-foreground"
                  style={{ fontFamily: "'Jua', sans-serif" }}
                >
                  {store.name}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <HiLocationMarker className="text-2xl text-accent-pink flex-shrink-0 mt-1" />
                    <p
                      className="text-lg text-foreground/80"
                      style={{ fontFamily: "'Gaegu', sans-serif" }}
                    >
                      {store.address}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <HiPhone className="text-2xl text-accent-blue flex-shrink-0" />
                    <p
                      className="text-lg text-foreground/80"
                      style={{ fontFamily: "'Gaegu', sans-serif" }}
                    >
                      {store.phone}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <HiCalendar className="text-2xl text-accent-green flex-shrink-0" />
                    <p
                      className="text-lg text-foreground/80"
                      style={{ fontFamily: "'Gaegu', sans-serif" }}
                    >
                      OPEN {store.openingDate}
                    </p>
                  </div>
                </div>

                {/* 방문하기 버튼 */}
                <motion.button
                  className="mt-6 w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-full font-bold text-lg shadow-strong-hover"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  매장 자세히 보기 →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 검색 결과 없음 */}
        {filteredStores.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="text-2xl md:text-3xl text-foreground/60"
              style={{ fontFamily: "'Gaegu', sans-serif" }}
            >
              검색 결과가 없습니다
            </p>
          </motion.div>
        )}

        {/* 더 많은 매장 오픈 예정 */}
        <motion.div
          className="mt-16 text-center bg-white rounded-3xl p-8 md:p-12 shadow-strong"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            className="inline-block mb-4"
          >
            <span className="text-3xl md:text-4xl font-bold text-primary">IMG</span>
          </motion.div>
          <p
            className="text-2xl md:text-3xl text-foreground font-bold mb-4"
            style={{ fontFamily: "'Jua', sans-serif" }}
          >
            더 많은 매장이 준비 중입니다!
          </p>
          <p
            className="text-xl md:text-2xl text-foreground/70"
            style={{ fontFamily: "'Gaegu', sans-serif" }}
          >
            당신의 지역에서도 곧 만나요
          </p>
        </motion.div>
      </div>
    </section>
  );
}


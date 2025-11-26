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
  'bg-yellow-400',
  'bg-yellow-500',
  'bg-yellow-600',
  'bg-yellow-600',
  'bg-yellow-400',
  'bg-yellow-500',
];

export default function StoreSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // 검색 기능은 추후 Client Component로 features에 추가 예정

  return (
    <section
      id="store"
      className="py-20 md:py-32 relative overflow-hidden"
      ref={ref}
      style={{
        backgroundImage: 'url(/asset/bg/sec7-bg.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-6">
            <span className="text-4xl md:text-5xl font-bold text-yellow-300 drop-shadow-lg">
              IMG
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            매장 안내
          </h2>
          <p className="text-xl md:text-2xl text-white mb-6 drop-shadow-md">
            전국 각지에서 성공적으로 운영 중
          </p>
          <div className="w-24 h-2 bg-yellow-300 mx-auto rounded-full" />
        </motion.div>

        {/* 지도 + 매장 목록 레이아웃 */}
        <motion.div
          className="bg-foreground rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] min-h-[900px] lg:h-[700px]">
            {/* 왼쪽: 매장 목록 */}
            <div className="bg-white p-6 overflow-y-auto max-h-[400px] lg:max-h-none">
              {/* 검색 박스 */}
              <div className="mb-6">
                <div className="flex items-center gap-2 border-2 border-foreground/20 rounded-lg p-3">
                  <span className="text-xl">🔍</span>
                  <input
                    type="text"
                    placeholder="구.동.역.단지 매장찾기"
                    className="flex-1 outline-none text-base"
                    disabled
                  />
                </div>
              </div>

              {/* 필터 버튼 */}
              <div className="mb-4">
                <button className="w-full text-left px-4 py-3 bg-white border-2 border-foreground/20 rounded-lg font-medium text-foreground flex items-center justify-between">
                  전체
                  <span>▼</span>
                </button>
              </div>

              {/* 매장 목록 */}
              <div className="space-y-4">
                {stores.map((store, index) => (
                  <motion.div
                    key={store.id}
                    className="border-2 border-gray-200 rounded-xl p-4 hover:border-yellow-400 hover:bg-yellow-50 transition-all cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    {/* 지역 뱃지 */}
                    <div className="mb-2">
                      <span
                        className={cn(
                          'inline-block px-3 py-1 rounded-full text-xs font-bold text-white',
                          index === 0 ? 'bg-yellow-500' : 'bg-yellow-400'
                        )}
                      >
                        {index === 0 ? '광주' : index === 1 ? '서울' : '대전'}
                      </span>
                    </div>

                    {/* 매장명 */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{store.name}</h3>

                    {/* 전화번호 */}
                    <p className="text-base text-yellow-600 font-semibold mb-2">{store.phone}</p>

                    {/* 주소 */}
                    <p className="text-sm text-gray-600 leading-relaxed">{store.address}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 오른쪽: 지도 영역 (임시 플레이스홀더) */}
            <motion.div
              className="bg-gray-200 relative flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* 지도 플레이스홀더 */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300">
                {/* 가짜 지도 그리드 */}
                <div className="absolute inset-0 opacity-20">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute border-t border-gray-400"
                      style={{ top: `${i * 5}%`, left: 0, right: 0 }}
                    />
                  ))}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute border-l border-gray-400"
                      style={{ left: `${i * 5}%`, top: 0, bottom: 0 }}
                    />
                  ))}
                </div>

                {/* 지도 컨트롤 버튼들 (우측 상단) */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <div className="bg-white rounded-lg shadow-lg p-3 flex flex-col gap-2">
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-xl font-bold">
                      +
                    </button>
                    <div className="h-px bg-gray-300" />
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-xl font-bold">
                      -
                    </button>
                  </div>
                </div>

                {/* Kakao 로고 (우측 하단) */}
                <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded shadow-lg">
                  <span className="text-sm font-bold text-foreground">kakao</span>
                </div>

                {/* 가짜 마커들 */}
                <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-primary rounded-full shadow-lg flex items-center justify-center text-white font-bold text-sm animate-pulse">
                  📍
                </div>
                <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-secondary rounded-full shadow-lg flex items-center justify-center text-white font-bold text-sm animate-pulse">
                  📍
                </div>
                <div className="absolute top-2/3 left-2/3 w-8 h-8 bg-accent rounded-full shadow-lg flex items-center justify-center text-white font-bold text-sm animate-pulse">
                  📍
                </div>
              </div>

              {/* 중앙 텍스트 */}
              <div className="relative z-10 text-center">
                <div className="bg-white/90 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-xl">
                  <p className="text-2xl font-bold text-foreground mb-2">🗺️ 지도 영역</p>
                  <p className="text-base text-foreground/60">카카오맵 API 연동 예정</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 하단 안내 */}
        <motion.div
          className="mt-16 text-center bg-linear-to-r from-yellow-400 to-yellow-500 rounded-3xl p-10 md:p-12 shadow-strong text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="inline-block mb-6">
            <span className="text-4xl md:text-5xl font-bold text-white">IMG</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">100개 이상의 가맹점이 성공 중!</h3>
          <p className="text-lg md:text-xl opacity-90 mb-6">
            당신도 오늘은 오므라이스 가족이 되어보세요
          </p>
          <a
            href="#contact"
            className="inline-block bg-white text-yellow-600 px-10 py-4 rounded-full text-xl md:text-2xl font-bold shadow-strong-hover hover:bg-gray-100 transition-all duration-300"
          >
            창업 문의하기
          </a>
        </motion.div>
      </div>
    </section>
  );
}

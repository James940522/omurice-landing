'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { Season, BrandData } from '@/shared/types/season';
import { getSeasonLabel, SEASONS } from '@/shared/lib/season-utils';

interface BrandCardProps {
  brand: BrandData;
}

export default function BrandCard({ brand }: BrandCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 자동 캐러셀
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SEASONS.length);
    }, 3000); // 3초마다 전환

    return () => clearInterval(interval);
  }, [isPaused]);

  const currentSeason = SEASONS[currentIndex];

  return (
    <div
      className="group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 브랜드명 */}
      <div className="mb-6 text-center">
        <h3
          className="text-2xl md:text-3xl font-bold text-gray-900"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {brand.nameKo}
        </h3>
      </div>

      {/* 이미지 영역 */}
      <div className="relative" style={{ height: '350px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSeason}
            className="absolute inset-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <Image
              src={brand.seasons[currentSeason]}
              alt={`${brand.nameKo} ${getSeasonLabel(currentSeason)} 로고`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 시즌 라벨 + 페이지네이션 */}
      <div className="mt-6 flex flex-col items-center gap-4">
        {/* 시즌 라벨 */}
        <div className="text-center">
          <span
            className="text-xl font-bold text-gray-700"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {getSeasonLabel(currentSeason)}
          </span>
        </div>

        {/* 페이지네이션 dots */}
        <div className="flex justify-center gap-2">
          {SEASONS.map((season, index) => (
            <button
              key={season}
              onClick={() => setCurrentIndex(index)}
              aria-label={`${getSeasonLabel(season)} 보기`}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-10 h-2 bg-amber-500'
                  : 'w-2 h-2 bg-gray-300 hover:bg-amber-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

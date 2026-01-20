'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { BrandData } from '@/shared/types/season';
import BrandCard from './BrandCard';

const BRANDS: BrandData[] = [
  {
    id: 'todayomurice',
    nameKo: '오늘은 오므라이스',
    nameEn: 'Today Omurice',
    description: 'Seasonal logo set',
    seasons: {
      spring: '/asset/season-logo/오므라이스_봄.jpeg',
      summer: '/asset/season-logo/오므라이스_여름.jpeg',
      autumn: '/asset/season-logo/오므라이스_가을.jpeg',
      winter: '/asset/season-logo/오므라이스_겨울.jpeg',
    },
  },
  {
    id: 'eggeats',
    nameKo: 'EGG EATS',
    nameEn: 'EGG EATS',
    description: 'Seasonal logo set',
    seasons: {
      spring: '/asset/season-logo/에그이츠_봄.jpeg',
      summer: '/asset/season-logo/에그이츠_여름.jpeg',
      autumn: '/asset/season-logo/에그이츠_가을.jpeg',
      winter: '/asset/season-logo/에그이츠_겨울.jpeg',
    },
  },
];

export default function BrandUniverseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* 섹션 헤더 */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Brand Universe
          </h2>
          <p
            className="text-xl md:text-2xl text-gray-600"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            사계절을 담은 브랜드 아이덴티티
          </p>
        </motion.div>

        {/* 브랜드 카드 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          {BRANDS.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <BrandCard brand={brand} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

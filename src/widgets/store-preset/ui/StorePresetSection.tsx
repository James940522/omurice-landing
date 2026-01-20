'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';

interface PresetOption {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface BrandPreset {
  id: string;
  name: string;
  logo: string;
  options: PresetOption[];
}

const brandPresets: BrandPreset[] = [
  {
    id: 'omurice',
    name: '오늘은 오므라이스',
    logo: '/asset/logo/오늘은_오므라이스_풀로고.jpeg',
    options: [
      {
        id: 'omu_a',
        title: 'A',
        description: '밝고 활기찬\n모던한 분위기',
        image: '/asset/store/omu_a.jpeg',
      },
      {
        id: 'omu_b',
        title: 'B',
        description: '따뜻하고\n아늑한 분위기',
        image: '/asset/store/omu_b.jpeg',
      },
    ],
  },
  {
    id: 'egg',
    name: '에그이츠',
    logo: '/asset/logo/에그이츠_로고.jpeg',
    options: [
      {
        id: 'egg_a',
        title: 'A',
        description: '세련된\n모던 인테리어',
        image: '/asset/store/egg_a.jpeg',
      },
      {
        id: 'egg_b',
        title: 'B',
        description: '포근한\n클래식 인테리어',
        image: '/asset/store/egg_b.jpeg',
      },
    ],
  },
];

// 계절별 로고 캐러셀 컴포넌트
function SeasonalLogoCarousel({
  images,
  currentIndex,
  onIndexChange,
}: {
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}) {
  const seasons = ['봄', '여름', '가을', '겨울'];

  return (
    <div className="relative">
      {/* 이미지 캐러셀 */}
      <div className="relative" style={{ height: '280px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={images[currentIndex]}
              alt={`계절별 로고 ${seasons[currentIndex]}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 페이지네이션 dots */}
      <div className="flex justify-center gap-2 mt-6">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => onIndexChange(index)}
            aria-label={`${seasons[index]} 보기`}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex ? 'w-10 h-2 bg-amber-500' : 'w-2 h-2 bg-gray-300 hover:bg-amber-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function StorePresetSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // 싱크된 캐러셀 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const omuriceLogo = [
    '/asset/season-logo/오므라이스_봄.jpeg',
    '/asset/season-logo/오므라이스_여름.jpeg',
    '/asset/season-logo/오므라이스_가을.jpeg',
    '/asset/season-logo/오므라이스_겨울.jpeg',
  ];

  const eggEatsLogo = [
    '/asset/season-logo/에그이츠_봄.jpeg',
    '/asset/season-logo/에그이츠_여름.jpeg',
    '/asset/season-logo/에그이츠_가을.jpeg',
    '/asset/season-logo/에그이츠_겨울.jpeg',
  ];

  // 자동 회전 (싱크)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      id="store-preset"
      className="py-20 md:py-32 relative overflow-hidden"
      ref={ref}
      style={{
        background: 'linear-gradient(180deg, #FFFBF0 0%, #FFF9E6 100%)',
      }}
    >
      {/* 배경 장식 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-400 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 섹션 헤더 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="typo-h1 text-gray-900 mb-6"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            매장 인테리어
          </h2>
          <p
            className="typo-body text-gray-800 bg-white/80 px-6 py-3 rounded-2xl inline-block font-bold shadow-xl"
            style={{
              textShadow: '1px 1px 2px rgba(0,0,0,0.05)',
            }}
          >
            브랜드별로 선택 가능한 2가지 디자인
          </p>
        </motion.div>

        {/* 모바일 레이아웃 (브랜드별 세로 배치) */}
        <div className="md:hidden space-y-12">
          {brandPresets.map((brand, brandIndex) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: brandIndex * 0.2 }}
            >
              {/* 브랜드 로고 */}
              <div className="flex justify-center mb-6">
                <div className="relative h-16 w-auto">
                  <Image
                    src={
                      brand.id === 'omurice'
                        ? '/asset/logo/오므라이스_문구3.png'
                        : '/asset/logo/에그이츠_문구2.png'
                    }
                    alt={brand.name}
                    width={200}
                    height={64}
                    className="h-full w-auto object-contain"
                    style={{
                      filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))',
                    }}
                  />
                </div>
              </div>

              {/* 프리셋 옵션들 (2열) */}
              <div className="grid grid-cols-2 gap-4">
                {brand.options.map((option, optionIndex) => (
                  <motion.div
                    key={option.id}
                    className="group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: brandIndex * 0.2 + optionIndex * 0.1 + 0.3,
                    }}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-3 border-yellow-200">
                      {/* 이미지 */}
                      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                        <Image
                          src={option.image}
                          alt={`${brand.name} - ${option.title}`}
                          fill
                          className="object-contain"
                        />
                        {/* 오버레이 배지 */}
                        <div className="absolute top-2 left-2 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-bold shadow-lg text-sm">
                          <span style={{ fontFamily: 'var(--font-heading)' }}>{option.title}</span>
                        </div>
                      </div>

                      {/* 설명 */}
                      <div className="p-3 text-center">
                        <p
                          className="text-xs font-bold text-gray-800 whitespace-pre-line leading-snug"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 데스크탑 레이아웃 (브랜드별 그룹) */}
        <div className="hidden md:grid md:grid-cols-2 gap-12 lg:gap-16">
          {brandPresets.map((brand, brandIndex) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: brandIndex * 0.2 }}
            >
              {/* 브랜드 로고 */}
              <div className="flex justify-center mb-8">
                <div className="relative h-20 lg:h-24 w-auto">
                  <Image
                    src={
                      brand.id === 'omurice'
                        ? '/asset/logo/오므라이스_문구3.png'
                        : '/asset/logo/에그이츠_문구2.png'
                    }
                    alt={brand.name}
                    width={300}
                    height={96}
                    className="h-full w-auto object-contain"
                    style={{
                      filter: 'drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.3))',
                    }}
                  />
                </div>
              </div>

              {/* 이미지 2개 (A, B) */}
              <div className="grid grid-cols-2 gap-6 lg:gap-8">
                {brand.options.map((option, optionIndex) => (
                  <motion.div
                    key={option.id}
                    className="group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: brandIndex * 0.2 + optionIndex * 0.1 + 0.3,
                    }}
                    whileHover={{ y: -8 }}
                  >
                    <div className="bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-3 border-yellow-200">
                      {/* 이미지 */}
                      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                        <Image
                          src={option.image}
                          alt={`${brand.name} - ${option.title}`}
                          fill
                          className="object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* 오버레이 배지 */}
                        <div className="absolute top-3 left-3 bg-yellow-400 text-gray-900 px-3 py-1.5 rounded-full font-bold shadow-lg text-sm">
                          <span style={{ fontFamily: 'var(--font-heading)' }}>{option.title}</span>
                        </div>
                      </div>

                      {/* 설명 */}
                      <div className="p-4 lg:p-5 text-center">
                        <p
                          className="text-sm lg:text-base font-bold text-gray-800 whitespace-pre-line leading-snug"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 하단 안내 문구 */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p
            className="typo-body text-gray-700 bg-gradient-to-r from-yellow-50 to-orange-50 px-8 py-4 rounded-2xl inline-block shadow-md border-2 border-yellow-200"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            💡 창업 시 선택 가능한 인테리어 디자인입니다
            <br />
            <span className="text-sm text-gray-600">
              실제 매장 상황에 따라 일부 조정될 수 있습니다
            </span>
          </p>
        </motion.div>

        {/* 계절별 로고 캐러셀 섹션 */}
        <motion.div
          className="mt-20 pt-16 border-t border-yellow-200"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="text-center mb-12">
            <h3
              className="text-2xl md:text-3xl font-bold text-gray-800 mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              계절별 브랜드 로고
            </h3>
            <p
              className="text-base text-gray-600"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              사계절을 담은 브랜드 아이덴티티
            </p>
          </div>

          {/* 캐러셀 그리드 */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-5xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <SeasonalLogoCarousel
                images={omuriceLogo}
                currentIndex={currentIndex}
                onIndexChange={setCurrentIndex}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <SeasonalLogoCarousel
                images={eggEatsLogo}
                currentIndex={currentIndex}
                onIndexChange={setCurrentIndex}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

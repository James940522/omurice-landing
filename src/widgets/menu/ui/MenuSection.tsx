'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';

// 추후 탭 기능은 Client Component로 features에서 추가 예정
// 현재는 첫 번째 카테고리만 표시

interface MenuItem {
  name: string;
  image: string;
}

interface MenuCategory {
  id: string;
  name: string;
  emoji: string;
  items: MenuItem[];
  color: string;
}

const menuCategories: MenuCategory[] = [
  {
    id: 'omurice',
    name: '오므라이스',
    emoji: 'IMG',
    color: 'from-primary to-secondary',
    items: [
      {
        name: '큐브스테이크 오므라이스',
        image: '/asset/menu/오므라이스/큐브스테이크 오므라이스.jpg',
      },
      { name: '돈까스 오므라이스', image: '/asset/menu/오므라이스/돈까스 오므라이스.jpg' },
      { name: '떡갈비 오므라이스', image: '/asset/menu/오므라이스/떡갈비 오므라이스.jpg' },
      { name: '가라아게 오므라이스', image: '/asset/menu/오므라이스/가라아게 오므라이스.jpg' },
      { name: '새우까스 오므라이스', image: '/asset/menu/오므라이스/새우까스 오므라이스.jpg' },
      { name: '삼겹 오므라이스', image: '/asset/menu/오므라이스/삼겹 오므라이스.jpg' },
      { name: '우삼겹 오므라이스', image: '/asset/menu/오므라이스/우삼겹 오므라이스.jpg' },
      { name: '스팸 오므라이스', image: '/asset/menu/오므라이스/스팸 오므라이스.jpg' },
      { name: '소세지 오므라이스', image: '/asset/menu/오므라이스/소세지 오므라이스.jpg' },
    ],
  },
  {
    id: 'white',
    name: '화이트 오므라이스',
    emoji: 'IMG',
    color: 'from-accent to-primary',
    items: [
      {
        name: '큐브스테이크 화이트 오므라이스',
        image: '/asset/menu/화이트오므라이스/큐브 스테이크 화이트 오므라이스.jpg',
      },
      {
        name: '돈까스 화이트 오므라이스',
        image: '/asset/menu/화이트오므라이스/돈까스 화이트 오므라이스.jpg',
      },
      {
        name: '떡갈비 화이트 오므라이스',
        image: '/asset/menu/화이트오므라이스/떡갈비 화이트 오므라이스.jpg',
      },
      {
        name: '가라아게 화이트 오므라이스',
        image: '/asset/menu/화이트오므라이스/가라아게 화이트 오므라이스.jpg',
      },
      {
        name: '새우까스 화이트 오므라이스',
        image: '/asset/menu/화이트오므라이스/새우까스 화이트 오므라이스.jpg',
      },
      {
        name: '삼겹 화이트 오므라이스',
        image: '/asset/menu/화이트오므라이스/삼겹 화이트 오므라이스.jpg',
      },
      {
        name: '우삼겹 화이트 오므라이스',
        image: '/asset/menu/화이트오므라이스/우삼겹 화이트 오므라이스.jpg',
      },
      {
        name: '스팸 화이트 오므라이스',
        image: '/asset/menu/화이트오므라이스/스팸 화이트 오므라이스.jpg',
      },
      {
        name: '소세지 화이트 오므라이스',
        image: '/asset/menu/화이트오므라이스/소세지 화이트 오므라이스.jpg',
      },
    ],
  },
  {
    id: 'kimchi',
    name: '김치 오므라이스',
    emoji: 'IMG',
    color: 'from-secondary to-primary',
    items: [
      {
        name: '큐브스테이크 김치 오므라이스',
        image: '/asset/menu/김치오므라이스/큐브스테이크 김치 오므라이스.jpg',
      },
      {
        name: '돈까스 김치 오므라이스',
        image: '/asset/menu/김치오므라이스/돈까스 김치 오므라이스.jpg',
      },
      {
        name: '떡갈비 김치 오므라이스',
        image: '/asset/menu/김치오므라이스/떡갈비 김치 오므라이스.jpg',
      },
      {
        name: '가라아게 김치 오므라이스',
        image: '/asset/menu/김치오므라이스/가라아게 김치 오므라이스.jpg',
      },
      {
        name: '새우까스 김치 오므라이스',
        image: '/asset/menu/김치오므라이스/새우까스 김치 오므라이스.jpg',
      },
      {
        name: '삼겹 김치 오므라이스',
        image: '/asset/menu/김치오므라이스/삼겹 김치 오므라이스.jpg',
      },
      {
        name: '우삼겹 김치 오므라이스',
        image: '/asset/menu/김치오므라이스/우삼겹 김치 오므라이스.jpg',
      },
      {
        name: '스팸 김치 오므라이스',
        image: '/asset/menu/김치오므라이스/스팸 김치 오므라이스.jpg',
      },
      {
        name: '소세지 김치 오므라이스',
        image: '/asset/menu/김치오므라이스/소세지 김치 오므라이스.jpg',
      },
    ],
  },
  {
    id: 'kimchi-white',
    name: '김치 화이트 오므라이스',
    emoji: 'IMG',
    color: 'from-accent to-secondary',
    items: [
      {
        name: '큐브스테이크 화이트 김치 오므라이스',
        image: '/asset/menu/화이트김치오므라이스/큐브스테이크 화이트 김치 오므라이스.jpg',
      },
      {
        name: '돈까스 화이트 김치 오므라이스',
        image: '/asset/menu/화이트김치오므라이스/돈까스 화이트 김치 오므라이스.jpg',
      },
      {
        name: '떡갈비 화이트 김치 오므라이스',
        image: '/asset/menu/화이트김치오므라이스/떡갈비 화이트 김치 오므라이스.jpg',
      },
      {
        name: '가라아게 화이트 김치 오므라이스',
        image: '/asset/menu/화이트김치오므라이스/가라아게 화이트 김치 오므라이스.jpg',
      },
      {
        name: '새우까스 화이트 김치 오므라이스',
        image: '/asset/menu/화이트김치오므라이스/새우까스 화이트 김치 오므라이스.jpg',
      },
      {
        name: '삼겹 화이트 김치 오므라이스',
        image: '/asset/menu/화이트김치오므라이스/삼겹 화이트 김치 오므라이스.jpg',
      },
      {
        name: '우삼겹 화이트 김치 오므라이스',
        image: '/asset/menu/화이트김치오므라이스/우삼겹 화이트 김치 오므라이스.jpg',
      },
      {
        name: '스팸 화이트 김치 오므라이스',
        image: '/asset/menu/화이트김치오므라이스/스팸 화이트 김치 오므라이스.jpg',
      },
      {
        name: '소세지 화이트 김치 오므라이스',
        image: '/asset/menu/화이트김치오므라이스/소세지 화이트 김치 오므라이스.jpg',
      },
    ],
  },
  {
    id: 'bokkeumbap',
    name: '김치 볶음밥',
    emoji: 'IMG',
    color: 'from-secondary to-accent',
    items: [
      {
        name: '큐브스테이크 김치볶음밥',
        image: '/asset/menu/김치볶음밥/큐브스테이크 김치볶음밥.jpg',
      },
      { name: '돈까스 김치볶음밥', image: '/asset/menu/김치볶음밥/돈까스 김치볶음밥.jpg' },
      { name: '떡갈비 김치볶음밥', image: '/asset/menu/김치볶음밥/떡갈비 김치볶음밥.jpg' },
      { name: '가라아게 김치볶음밥', image: '/asset/menu/김치볶음밥/가라아게 김치볶음밥.jpg' },
      { name: '새우까스 김치볶음밥', image: '/asset/menu/김치볶음밥/새우까스 김치볶음밥.jpg' },
      { name: '삼겹 김치볶음밥', image: '/asset/menu/김치볶음밥/삼겹 김치볶음밥.jpg' },
      {
        name: '우삼겹 김치볶음밥',
        image: '/asset/menu/김치볶음밥/우삼겹 김치볶음밥.jpg',
      },
      { name: '스팸 김치볶음밥', image: '/asset/menu/김치볶음밥/스팸 김치볶음밥.jpg' },
      { name: '소세지 김치볶음밥', image: '/asset/menu/김치볶음밥/소세지 김치볶음밥.jpg' },
    ],
  },
  {
    id: 'side',
    name: '사이드',
    emoji: 'IMG',
    color: 'from-primary to-secondary',
    items: [
      { name: '감자튀김', image: '/asset/menu/사이드/감자튀김.jpg' },
      { name: '가라아게', image: '/asset/menu/사이드/가라아게.jpg' },
      { name: '버팔로윙', image: '/asset/menu/사이드/버팔로윙.jpg' },
      { name: '버팔로봉', image: '/asset/menu/사이드/버팔로봉.jpg' },
      { name: '짜장만두', image: '/asset/menu/사이드/짜장만두.jpg' },
      { name: '짬뽕만두', image: '/asset/menu/사이드/짬뽕만두.jpg' },
      { name: '대왕소세지', image: '/asset/menu/사이드/대왕소세지.jpg' },
      { name: '크림치즈볼', image: '/asset/menu/사이드/치즈볼.jpg' },
    ],
  },
];

const colorClasses = [
  'bg-yellow-400',
  'bg-yellow-500',
  'bg-yellow-600',
  'bg-yellow-500',
  'bg-yellow-600',
  'bg-yellow-400',
  'bg-yellow-600',
];

export default function MenuSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState(0);

  const activeCategoryData = menuCategories[activeCategory];

  return (
    <section id="menu" className="py-20 md:py-32 relative overflow-hidden" ref={ref}>
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image src="/asset/bg/sec6-bg.jpg" alt="배경" fill className="object-cover" quality={90} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 [text-shadow:_2px_2px_0_#fff,_-2px_-2px_0_#fff,_2px_-2px_0_#fff,_-2px_2px_0_#fff,_4px_4px_8px_rgba(255,255,255,0.8)]">
            메뉴 소개
          </h2>
          <p className="text-xl md:text-2xl text-gray-900 bg-white/80 px-6 py-3 rounded-2xl inline-block mb-6 font-bold shadow-xl">
            다양한 메뉴로 고객의 입맛을 사로잡습니다
          </p>
          <div className="w-24 h-2 bg-yellow-500 mx-auto rounded-full shadow-xl" />
        </motion.div>

        {/* 카테고리 탭 */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {menuCategories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(index)}
              className={cn(
                'px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 border-3',
                activeCategory === index
                  ? cn(colorClasses[index], 'text-white scale-105 shadow-2xl border-white')
                  : 'bg-white text-gray-900 hover:scale-105 hover:bg-yellow-50 shadow-xl border-yellow-400'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* 메뉴 그리드 */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
          key={activeCategory}
        >
          {activeCategoryData.items.map((item, index) => (
            <motion.div
              key={item.name}
              className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border-3 border-yellow-400 hover:border-yellow-500 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              {/* 실제 메뉴 이미지 */}
              <div className="aspect-square relative overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  loading={index < 4 ? 'eager' : 'lazy'}
                  quality={90}
                />
              </div>

              {/* 메뉴 이름 */}
              <div className="p-3 md:p-4 lg:p-5">
                <h3 className="text-sm md:text-base lg:text-lg font-bold text-foreground text-center leading-tight">
                  {item.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';

interface MenuItem {
  name: string;
  image: string;
}

interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

interface Brand {
  id: string;
  name: string;
  logo: string;
  bgColor: string;
  accentColor: string;
  categories: MenuCategory[];
}

const brands: Brand[] = [
  {
    id: 'omurice',
    name: '오늘은 오므라이스',
    logo: '/asset/logo/오늘은_오므라이스_풀로고.jpeg',
    bgColor: 'bg-yellow-400',
    accentColor: 'yellow',
    categories: [
      {
        id: 'omurice',
        name: '오므라이스',
        items: [
          {
            name: '큐브스테이크 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/오므라이스/큐브스테이크 오므라이스.jpg',
          },
          {
            name: '돈까스 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/오므라이스/돈까스 오므라이스.jpg',
          },
          {
            name: '떡갈비 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/오므라이스/떡갈비 오므라이스.jpg',
          },
          {
            name: '가라아게 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/오므라이스/가라아게 오므라이스.jpg',
          },
          {
            name: '새우까스 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/오므라이스/새우까스 오므라이스.jpg',
          },
          {
            name: '삼겹 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/오므라이스/삼겹 오므라이스.jpg',
          },
          {
            name: '우삼겹 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/오므라이스/우삼겹 오므라이스.jpg',
          },
          {
            name: '스팸 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/오므라이스/스팸 오므라이스.jpg',
          },
          {
            name: '소세지 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/오므라이스/소세지 오므라이스.jpg',
          },
        ],
      },
      {
        id: 'white',
        name: '화이트 오므라이스',
        items: [
          {
            name: '큐브스테이크 화이트 오므라이스',
            image:
              '/asset/menu/오늘은_오므라이스/화이트오므라이스/큐브 스테이크 화이트 오므라이스.jpg',
          },
          {
            name: '돈까스 화이트 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/화이트오므라이스/돈까스 화이트 오므라이스.jpg',
          },
          {
            name: '떡갈비 화이트 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/화이트오므라이스/떡갈비 화이트 오므라이스.jpg',
          },
          {
            name: '가라아게 화이트 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/화이트오므라이스/가라아게 화이트 오므라이스.jpg',
          },
          {
            name: '새우까스 화이트 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/화이트오므라이스/새우까스 화이트 오므라이스.jpg',
          },
          {
            name: '삼겹 화이트 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/화이트오므라이스/삼겹 화이트 오므라이스.jpg',
          },
          {
            name: '우삼겹 화이트 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/화이트오므라이스/우삼겹 화이트 오므라이스.jpg',
          },
          {
            name: '스팸 화이트 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/화이트오므라이스/스팸 화이트 오므라이스.jpg',
          },
          {
            name: '소세지 화이트 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/화이트오므라이스/소세지 화이트 오므라이스.jpg',
          },
        ],
      },
      {
        id: 'kimchi',
        name: '김치 오므라이스',
        items: [
          {
            name: '큐브스테이크 김치 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/김치오므라이스/큐브스테이크 김치 오므라이스.jpg',
          },
          {
            name: '돈까스 김치 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/김치오므라이스/돈까스 김치 오므라이스.jpg',
          },
          {
            name: '떡갈비 김치 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/김치오므라이스/떡갈비 김치 오므라이스.jpg',
          },
          {
            name: '가라아게 김치 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/김치오므라이스/가라아게 김치 오므라이스.jpg',
          },
          {
            name: '새우까스 김치 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/김치오므라이스/새우까스 김치 오므라이스.jpg',
          },
          {
            name: '삼겹 김치 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/김치오므라이스/삼겹 김치 오므라이스.jpg',
          },
          {
            name: '우삼겹 김치 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/김치오므라이스/우삼겹 김치 오므라이스.jpg',
          },
          {
            name: '스팸 김치 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/김치오므라이스/스팸 김치 오므라이스.jpg',
          },
          {
            name: '소세지 김치 오므라이스',
            image: '/asset/menu/오늘은_오므라이스/김치오므라이스/소세지 김치 오므라이스.jpg',
          },
        ],
      },
      {
        id: 'kimchi-white',
        name: '화이트 김치 오므라이스',
        items: [
          {
            name: '큐브스테이크 화이트 김치 오므라이스',
            image:
              '/asset/menu/오늘은_오므라이스/화이트김치오므라이스/큐브스테이크 화이트 김치 오므라이스.jpg',
          },
          {
            name: '돈까스 화이트 김치 오므라이스',
            image:
              '/asset/menu/오늘은_오므라이스/화이트김치오므라이스/돈까스 화이트 김치 오므라이스.jpg',
          },
          {
            name: '떡갈비 화이트 김치 오므라이스',
            image:
              '/asset/menu/오늘은_오므라이스/화이트김치오므라이스/떡갈비 화이트 김치 오므라이스.jpg',
          },
          {
            name: '가라아게 화이트 김치 오므라이스',
            image:
              '/asset/menu/오늘은_오므라이스/화이트김치오므라이스/가라아게 화이트 김치 오므라이스.jpg',
          },
          {
            name: '새우까스 화이트 김치 오므라이스',
            image:
              '/asset/menu/오늘은_오므라이스/화이트김치오므라이스/새우까스 화이트 김치 오므라이스.jpg',
          },
          {
            name: '삼겹 화이트 김치 오므라이스',
            image:
              '/asset/menu/오늘은_오므라이스/화이트김치오므라이스/삼겹 화이트 김치 오므라이스.jpg',
          },
          {
            name: '우삼겹 화이트 김치 오므라이스',
            image:
              '/asset/menu/오늘은_오므라이스/화이트김치오므라이스/우삼겹 화이트 김치 오므라이스.jpg',
          },
          {
            name: '스팸 화이트 김치 오므라이스',
            image:
              '/asset/menu/오늘은_오므라이스/화이트김치오므라이스/스팸 화이트 김치 오므라이스.jpg',
          },
          {
            name: '소세지 화이트 김치 오므라이스',
            image:
              '/asset/menu/오늘은_오므라이스/화이트김치오므라이스/소세지 화이트 김치 오므라이스.jpg',
          },
        ],
      },
      {
        id: 'bokkeumbap',
        name: '김치 볶음밥',
        items: [
          {
            name: '큐브스테이크 김치볶음밥',
            image: '/asset/menu/오늘은_오므라이스/김치볶음밥/큐브스테이크 김치볶음밥.jpg',
          },
          {
            name: '돈까스 김치볶음밥',
            image: '/asset/menu/오늘은_오므라이스/김치볶음밥/돈까스 김치볶음밥.jpg',
          },
          {
            name: '떡갈비 김치볶음밥',
            image: '/asset/menu/오늘은_오므라이스/김치볶음밥/떡갈비 김치볶음밥.jpg',
          },
          {
            name: '가라아게 김치볶음밥',
            image: '/asset/menu/오늘은_오므라이스/김치볶음밥/가라아게 김치볶음밥.jpg',
          },
          {
            name: '새우까스 김치볶음밥',
            image: '/asset/menu/오늘은_오므라이스/김치볶음밥/새우까스 김치볶음밥.jpg',
          },
          {
            name: '삼겹 김치볶음밥',
            image: '/asset/menu/오늘은_오므라이스/김치볶음밥/삼겹 김치볶음밥.jpg',
          },
          {
            name: '우삼겹 김치볶음밥',
            image: '/asset/menu/오늘은_오므라이스/김치볶음밥/우삼겹 김치볶음밥.jpg',
          },
          {
            name: '스팸 김치볶음밥',
            image: '/asset/menu/오늘은_오므라이스/김치볶음밥/스팸 김치볶음밥.jpg',
          },
          {
            name: '소세지 김치볶음밥',
            image: '/asset/menu/오늘은_오므라이스/김치볶음밥/소세지 김치볶음밥.jpg',
          },
        ],
      },
      {
        id: 'side',
        name: '사이드',
        items: [
          { name: '감자튀김', image: '/asset/menu/오늘은_오므라이스/사이드/감자튀김.jpg' },
          { name: '가라아게', image: '/asset/menu/오늘은_오므라이스/사이드/가라아게.jpg' },
          { name: '버팔로윙', image: '/asset/menu/오늘은_오므라이스/사이드/버팔로윙.jpg' },
          { name: '버팔로봉', image: '/asset/menu/오늘은_오므라이스/사이드/버팔로봉.jpg' },
          { name: '짜장만두', image: '/asset/menu/오늘은_오므라이스/사이드/짜장만두.jpg' },
          { name: '짬뽕만두', image: '/asset/menu/오늘은_오므라이스/사이드/짬뽕만두.jpg' },
          { name: '대왕소세지', image: '/asset/menu/오늘은_오므라이스/사이드/대왕소세지.jpg' },
          { name: '크림치즈볼', image: '/asset/menu/오늘은_오므라이스/사이드/치즈볼.jpg' },
        ],
      },
    ],
  },
  {
    id: 'eggeats',
    name: '에그이츠',
    logo: '/asset/logo/에그이츠_로고.jpeg',
    bgColor: 'bg-orange-500',
    accentColor: 'orange',
    categories: [
      {
        id: 'eggdeopbap',
        name: '에그덮밥',
        items: [
          {
            name: '도쿄스테이크 에그덮밥',
            image: '/asset/menu/에그이츠/에그덮밥/도쿄스테이크 에그덮밥.jpg',
          },
          { name: '돈까스 에그덮밥', image: '/asset/menu/에그이츠/에그덮밥/돈까스 에그덮밥.jpg' },
          { name: '떡갈비 에그덮밥', image: '/asset/menu/에그이츠/에그덮밥/떡갈비 에그덮밥.jpg' },
          {
            name: '가라아게 에그덮밥',
            image: '/asset/menu/에그이츠/에그덮밥/가라아게 에그덮밥.jpg',
          },
          {
            name: '새우까스 에그덮밥',
            image: '/asset/menu/에그이츠/에그덮밥/새우까스 에그덮밥.jpg',
          },
          { name: '목살 에그덮밥', image: '/asset/menu/에그이츠/에그덮밥/목살 에그덮밥.jpg' },
          {
            name: '목살 김치 에그덮밥',
            image: '/asset/menu/에그이츠/에그덮밥/목살 김치 에그덮밥.jpg',
          },
          { name: '삼겹 에그덮밥', image: '/asset/menu/에그이츠/에그덮밥/삼겹 에그덮밥.jpg' },
          {
            name: '삼겹 김치 에그덮밥',
            image: '/asset/menu/에그이츠/에그덮밥/삼겹 김치 에그덮밥.jpg',
          },
          { name: '우삼겹 에그덮밥', image: '/asset/menu/에그이츠/에그덮밥/우삼겹 에그덮밥.jpg' },
          {
            name: '우삼겹 김치 에그덮밥',
            image: '/asset/menu/에그이츠/에그덮밥/우삼겹 김치 에그덮밥.jpg',
          },
          { name: '스팸 에그덮밥', image: '/asset/menu/에그이츠/에그덮밥/스팸 에그덮밥.jpg' },
          {
            name: '소세지 김치 에그덮밥',
            image: '/asset/menu/에그이츠/에그덮밥/소세지 김치 에그덮밥.jpg',
          },
          {
            name: '치킨까스 에그덮밥',
            image: '/asset/menu/에그이츠/에그덮밥/치킨까스 에그덮밥.jpg',
          },
        ],
      },
      {
        id: 'kimchi-pilaf',
        name: '김치 베이컨 필라프',
        items: [
          {
            name: '큐브스테이크 김치 베이컨 필라프',
            image: '/asset/menu/에그이츠/김치 베이컨 필라프/큐브스테이크 김치 베이컨 필라프.jpg',
          },
          {
            name: '돈까스 김치 베이컨 필라프',
            image: '/asset/menu/에그이츠/김치 베이컨 필라프/돈까스 김치 베이컨 필라프.jpg',
          },
          {
            name: '떡갈비 김치 베이컨 필라프',
            image: '/asset/menu/에그이츠/김치 베이컨 필라프/떡갈비 김치 베이컨 필라프.jpg',
          },
          {
            name: '가라아게 김치 베이컨 필라프',
            image: '/asset/menu/에그이츠/김치 베이컨 필라프/가라아게 김치 베이컨 필라프.jpg',
          },
          {
            name: '새우까스 김치 베이컨 필라프',
            image: '/asset/menu/에그이츠/김치 베이컨 필라프/새우까스 김치  베이컨 필라프.jpg',
          },
          {
            name: '목살 김치 베이컨 필라프',
            image: '/asset/menu/에그이츠/김치 베이컨 필라프/목살 김치 베이컨 필라프.jpg',
          },
          {
            name: '삼겹 김치 베이컨 필라프',
            image: '/asset/menu/에그이츠/김치 베이컨 필라프/삼겹 김치 베이컨 필라프.jpg',
          },
          {
            name: '우삼겹 김치 베이컨 필라프',
            image: '/asset/menu/에그이츠/김치 베이컨 필라프/우삼겹 김치 베이컨 필라프.jpg',
          },
          {
            name: '스팸 김치 베이컨 필라프',
            image: '/asset/menu/에그이츠/김치 베이컨 필라프/스팸 김치 베이컨 필라프.jpg',
          },
          {
            name: '대왕소세지 김치 베이컨 필라프',
            image: '/asset/menu/에그이츠/김치 베이컨 필라프/대왕소세지 김치 베이컨 필라프.jpg',
          },
        ],
      },
      {
        id: 'baek-pilaf',
        name: '백김치 필라프',
        items: [
          {
            name: '큐브스테이크 백김치 필라프',
            image: '/asset/menu/에그이츠/백김치 필라프/큐브스테이크 백김치 필라프.jpg',
          },
          {
            name: '돈까스 백김치 필라프',
            image: '/asset/menu/에그이츠/백김치 필라프/돈까스 백김치 필라프.jpg',
          },
          {
            name: '떡갈비 백김치 필라프',
            image: '/asset/menu/에그이츠/백김치 필라프/떡갈비 백김치 필라프.jpg',
          },
          {
            name: '가라아게 백김치 필라프',
            image: '/asset/menu/에그이츠/백김치 필라프/가라아게 백김치 필라프.jpg',
          },
          {
            name: '새우까스 백김치 필라프',
            image: '/asset/menu/에그이츠/백김치 필라프/새우까스 백김치 필라프.jpg',
          },
          {
            name: '목살 백김치 필라프',
            image: '/asset/menu/에그이츠/백김치 필라프/목살 백김치 필라프.jpg',
          },
          {
            name: '삼겹 백김치 필라프',
            image: '/asset/menu/에그이츠/백김치 필라프/삼겹 백김치 필라프.jpg',
          },
          {
            name: '우삼겹 백김치 필라프',
            image: '/asset/menu/에그이츠/백김치 필라프/우삼겹 백김치 필라프.jpg',
          },
          {
            name: '스팸 백김치 필라프',
            image: '/asset/menu/에그이츠/백김치 필라프/스팸 백김치 필라프.jpg',
          },
          {
            name: '대왕소세지 백김치 필라프',
            image: '/asset/menu/에그이츠/백김치 필라프/대왕소세지 백김치 필라프.jpg',
          },
        ],
      },
      {
        id: 'omurice',
        name: '오므라이스',
        items: [
          {
            name: '큐브스테이크 오므라이스',
            image: '/asset/menu/에그이츠/오므라이스/큐브스테이크 오므라이스.jpg',
          },
          {
            name: '돈까스 오므라이스',
            image: '/asset/menu/에그이츠/오므라이스/돈까스 오므라이스.jpg',
          },
          {
            name: '떡갈비 오므라이스',
            image: '/asset/menu/에그이츠/오므라이스/떡갈비 오므라이스jpg.jpg',
          },
          {
            name: '가라아게 오므라이스',
            image: '/asset/menu/에그이츠/오므라이스/가라아게 오므라이스.jpg',
          },
          {
            name: '새우까스 오므라이스',
            image: '/asset/menu/에그이츠/오므라이스/새우까스 오므라이스.jpg',
          },
          { name: '삼겹 오므라이스', image: '/asset/menu/에그이츠/오므라이스/삼겹 오므라이스.jpg' },
          {
            name: '우삼겹 오므라이스',
            image: '/asset/menu/에그이츠/오므라이스/우삼겹 오므라이스.jpg',
          },
          { name: '스팸 오므라이스', image: '/asset/menu/에그이츠/오므라이스/스팸 오므라이스.jpg' },
          {
            name: '소세지 오므라이스',
            image: '/asset/menu/에그이츠/오므라이스/소세지 오므라이스.jpg',
          },
          {
            name: '치킨치즈까스 오므라이스',
            image: '/asset/menu/에그이츠/오므라이스/치킨치즈까스 오므라이스.jpg',
          },
        ],
      },
      {
        id: 'side',
        name: '사이드',
        items: [
          { name: '감자튀김', image: '/asset/menu/에그이츠/사이드/감자튀김.jpg' },
          { name: '가라아게', image: '/asset/menu/에그이츠/사이드/가라아게.jpg' },
          { name: '돈까스', image: '/asset/menu/에그이츠/사이드/돈까스.jpg' },
          { name: '떡갈비', image: '/asset/menu/에그이츠/사이드/떡갈비.jpg' },
          { name: '새우까스', image: '/asset/menu/에그이츠/사이드/새우까스.jpg' },
          { name: '버팔로윙', image: '/asset/menu/에그이츠/사이드/버팔로윙.jpg' },
          { name: '버팔로봉', image: '/asset/menu/에그이츠/사이드/버팔로봉.jpg' },
          { name: '팝콘치킨', image: '/asset/menu/에그이츠/사이드/팝콘치킨.jpg' },
          { name: '치킨치즈까스', image: '/asset/menu/에그이츠/사이드/치킨치즈까스.jpg' },
          { name: '짜장만두', image: '/asset/menu/에그이츠/사이드/짜장만두.jpg' },
          { name: '짬뽕만두', image: '/asset/menu/에그이츠/사이드/짬뽕만두.jpg' },
          { name: '치즈볼', image: '/asset/menu/에그이츠/사이드/치즈볼.jpg' },
        ],
      },
    ],
  },
];

export default function MenuSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeBrand, setActiveBrand] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);

  const currentBrand = brands[activeBrand];
  const currentCategory = currentBrand.categories[activeCategory];

  const scrollToTop = () => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const handleBrandChange = (index: number) => {
    setActiveBrand(index);
    setActiveCategory(0);
    // 브랜드 변경 시 섹션 상단으로 스크롤
    setTimeout(scrollToTop, 50);
  };

  const handleCategoryChange = (index: number) => {
    setActiveCategory(index);
    // 카테고리 변경 시 섹션 상단으로 스크롤
    setTimeout(scrollToTop, 50);
  };

  return (
    <section id="menu" className="py-20 md:py-32 relative overflow-hidden" ref={ref}>
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image src="/asset/bg/sec6-bg.jpg" alt="배경" fill className="object-cover" quality={90} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 타이틀 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 [text-shadow:2px_2px_0_#fff,-2px_-2px_0_#fff,2px_-2px_0_#fff,-2px_2px_0_#fff,4px_4px_8px_rgba(255,255,255,0.8)]">
            메뉴 소개
          </h2>
          <p className="text-xl md:text-2xl text-gray-900 bg-white/80 px-6 py-3 rounded-2xl inline-block mb-6 font-bold shadow-xl">
            브랜드를 선택하고 다양한 메뉴를 확인하세요
          </p>
        </motion.div>

        {/* 브랜드 선택 */}
        <motion.div
          className="flex justify-center items-center gap-6 sm:gap-12 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {brands.map((brand, index) => (
            <motion.button
              key={brand.id}
              onClick={() => handleBrandChange(index)}
              className={cn(
                'relative transition-all duration-300 overflow-hidden',
                // 에그이츠만 rounded 배경 적용
                brand.id === 'eggeats' && 'rounded-2xl',
                activeBrand === index ? 'scale-110' : 'opacity-50 hover:opacity-80 hover:scale-105'
              )}
              whileHover={{ scale: activeBrand === index ? 1.1 : 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* 로고 */}
              <div className="relative flex items-center justify-center h-20 sm:h-28">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={220}
                  height={100}
                  className={cn(
                    'h-full w-auto object-contain',
                    // 에그이츠만 rounded
                    brand.id === 'eggeats' && 'rounded-2xl'
                  )}
                  quality={90}
                />
              </div>

              {/* 선택 표시 - 하단 인디케이터 */}
              {activeBrand === index && (
                <motion.div
                  className={cn(
                    'absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full',
                    brand.accentColor === 'yellow' ? 'bg-yellow-500' : 'bg-orange-500'
                  )}
                  layoutId="brandIndicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* 카테고리 탭 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBrand}
            className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentBrand.categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => handleCategoryChange(index)}
                className={cn(
                  'px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 border-2',
                  activeCategory === index
                    ? cn(
                        currentBrand.accentColor === 'yellow'
                          ? 'bg-yellow-500 border-yellow-600'
                          : 'bg-orange-500 border-orange-600',
                        'text-white scale-105 shadow-xl'
                      )
                    : cn(
                        'bg-white shadow-lg',
                        currentBrand.accentColor === 'yellow'
                          ? 'text-yellow-700 border-yellow-400 hover:bg-yellow-50'
                          : 'text-orange-700 border-orange-400 hover:bg-orange-50'
                      )
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* 메뉴 그리드 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeBrand}-${activeCategory}`}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
          >
            {currentCategory.items.map((item, index) => (
              <motion.div
                key={item.name}
                className={cn(
                  'bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border-3 transition-all duration-300',
                  currentBrand.accentColor === 'yellow'
                    ? 'border-yellow-400 hover:border-yellow-500'
                    : 'border-orange-400 hover:border-orange-500'
                )}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                {/* 메뉴 이미지 */}
                <div className="aspect-square relative overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    loading={index < 5 ? 'eager' : 'lazy'}
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
        </AnimatePresence>
      </div>
    </section>
  );
}

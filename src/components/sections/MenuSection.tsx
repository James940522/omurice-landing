'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface MenuCategory {
  id: string;
  name: string;
  emoji: string;
  items: string[];
  color: string;
}

const menuCategories: MenuCategory[] = [
  {
    id: 'omurice',
    name: '오므라이스',
    emoji: 'IMG',
    color: 'from-primary to-secondary',
    items: [
      '큐브 스테이크 오므라이스',
      '돈까스 오므라이스',
      '떡갈비 오므라이스',
      '가라아게 오므라이스',
      '새우까스 오므라이스',
      '삼겹 오므라이스',
      '우삼겹 오므라이스',
      '스팸 오므라이스',
      '소세지 오므라이스',
    ],
  },
  {
    id: 'white',
    name: '화이트 오므라이스',
    emoji: 'IMG',
    color: 'from-accent-blue to-primary',
    items: [
      '큐브 스테이크 화이트 오므라이스',
      '돈까스 화이트 오므라이스',
      '떡갈비 화이트 오므라이스',
      '가라아게 화이트 오므라이스',
      '새우까스 화이트 오므라이스',
      '삼겹 화이트 오므라이스',
      '우삼겹 화이트 오므라이스',
      '스팸 화이트 오므라이스',
      '소세지 화이트 오므라이스',
    ],
  },
  {
    id: 'kimchi',
    name: '김치 오므라이스',
    emoji: 'IMG',
    color: 'from-accent-pink to-secondary',
    items: [
      '큐브 스테이크 김치 오므라이스',
      '돈까스 김치 오므라이스',
      '떡갈비 김치 오므라이스',
      '가라아게 김치 오므라이스',
      '새우까스 김치 오므라이스',
      '삼겹 김치 오므라이스',
      '우삼겹 김치 오므라이스',
      '스팸 김치 오므라이스',
      '소세지 김치 오므라이스',
    ],
  },
  {
    id: 'kimchi-white',
    name: '김치 화이트 오므라이스',
    emoji: 'IMG',
    color: 'from-accent-green to-accent-pink',
    items: [
      '큐브 스테이크 김치 화이트 오므라이스',
      '돈까스 김치 화이트 오므라이스',
      '떡갈비 김치 화이트 오므라이스',
      '가라아게 김치 화이트 오므라이스',
      '새우까스 김치 화이트 오므라이스',
      '삼겹 김치 화이트 오므라이스',
      '우삼겹 김치 화이트 오므라이스',
      '스팸 김치 화이트 오므라이스',
      '소세지 김치 화이트 오므라이스',
    ],
  },
  {
    id: 'bokkeumbap',
    name: '베이컨 김치 볶음밥',
    emoji: 'IMG',
    color: 'from-secondary to-accent-green',
    items: [
      '스테이크 베이컨 김치볶음밥',
      '떡갈비 베이컨 김치볶음밥',
      '가라아게 베이컨 김치볶음밥',
      '새우까스 베이컨 김치볶음밥',
      '우삼겹 베이컨 김치볶음밥',
      '스팸 베이컨 김치볶음밥',
      '삼겹 베이컨 김치볶음밥',
      '소세지 베이컨 김치볶음밥',
    ],
  },
  {
    id: 'set',
    name: '세트메뉴',
    emoji: 'IMG',
    color: 'from-accent-pink to-accent-blue',
    items: [
      '나홀로 오므라이스 세트 (메인1+사이드1+음료1)',
      '둘이서 오므라이스 세트 (메인2)',
      '강호동 세트 (메인2+사이드1+음료2)',
    ],
  },
  {
    id: 'side',
    name: '사이드',
    emoji: 'IMG',
    color: 'from-primary to-accent-pink',
    items: [
      '감자튀김',
      '가라아게',
      '버팔로윙',
      '버팔로봉',
      '짜장만두',
      '짬뽕만두',
      '대왕소세지',
      '돈까스',
      '떡갈비',
      '팝콘치킨',
      '크림치즈볼',
    ],
  },
];

const colorClasses = [
  'bg-primary',
  'bg-accent-blue',
  'bg-accent-pink',
  'bg-accent-green',
  'bg-secondary',
  'bg-primary',
  'bg-accent-pink',
];

export default function MenuSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('omurice');

  const activeCategoryData = menuCategories.find((cat) => cat.id === activeCategory)!;

  return (
    <section id="menu" className="py-20 md:py-32 bg-gradient-to-br from-primary/10 to-accent-pink/10 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-accent-blue/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent-green/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl md:text-6xl font-bold mb-6 text-foreground"
            style={{ fontFamily: "'Jua', sans-serif" }}
          >
            메뉴 소개
          </h2>
          <p
            className="text-xl md:text-2xl text-foreground/70 mb-6"
            style={{ fontFamily: "'Gaegu', sans-serif" }}
          >
            다양한 메뉴로 고객의 입맛을 사로잡습니다
          </p>
          <div className="w-24 h-2 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* 카테고리 탭 */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {menuCategories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg transition-all duration-300 shadow-strong-hover ${
                activeCategory === category.id
                  ? `${colorClasses[index]} text-white scale-110`
                  : 'bg-white text-foreground'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ fontFamily: "'Jua', sans-serif" }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* 메뉴 그리드 */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {activeCategoryData.items.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-strong-hover"
            >
              {/* 이미지 플레이스홀더 */}
              <div className={`aspect-square bg-gradient-to-br ${activeCategoryData.color} flex items-center justify-center relative overflow-hidden`}>
                <motion.span
                  className="text-5xl md:text-6xl font-bold text-white"
                  style={{ fontFamily: "'Jua', sans-serif" }}
                >
                  IMG
                </motion.span>
                {/* 귀여운 장식 */}
                <motion.div
                  className="absolute top-4 right-4 w-12 h-12 bg-white/30 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 w-8 h-8 bg-white/30 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                />
              </div>

              {/* 메뉴 이름 */}
              <div className="p-6 md:p-8">
                <h3
                  className="text-xl md:text-2xl font-bold text-foreground text-center leading-relaxed"
                  style={{ fontFamily: "'Jua', sans-serif" }}
                >
                  {item}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 하단 안내 */}
        <motion.div
          className="mt-16 text-center bg-white rounded-3xl p-8 shadow-strong"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.span
            className="text-3xl md:text-4xl font-bold text-primary inline-block mb-4"
          >
            IMG
          </motion.span>
          <p
            className="text-2xl md:text-3xl text-foreground font-bold mb-2"
            style={{ fontFamily: "'Jua', sans-serif" }}
          >
            모든 메뉴 포장 & 배달 가능!
          </p>
          <p
            className="text-lg md:text-xl text-foreground/70"
            style={{ fontFamily: "'Gaegu', sans-serif" }}
          >
            이미지는 추후 업데이트 예정입니다
          </p>
        </motion.div>
      </div>
    </section>
  );
}


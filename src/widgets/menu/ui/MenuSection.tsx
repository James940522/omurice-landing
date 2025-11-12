'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/shared/lib/utils';

// 추후 탭 기능은 Client Component로 features에서 추가 예정
// 현재는 첫 번째 카테고리만 표시

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
    color: 'from-accent to-primary',
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
    color: 'from-secondary to-primary',
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
    color: 'from-accent to-secondary',
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
    color: 'from-secondary to-accent',
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
    color: 'from-primary to-accent',
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
    color: 'from-primary to-secondary',
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
  'bg-accent',
  'bg-secondary',
  'bg-accent',
  'bg-secondary',
  'bg-primary',
  'bg-secondary',
];

export default function MenuSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  // 현재는 첫 번째 카테고리만 표시
  const activeCategoryData = menuCategories[0];

  return (
    <section id="menu" className="py-20 md:py-32 bg-white relative overflow-hidden" ref={ref}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

        {/* 카테고리 탭 - 추후 동적 기능 추가 예정 */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {menuCategories.map((category, index) => (
            <div
              key={category.id}
              className={cn(
                "px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg shadow-strong-hover",
                index === 0 ? cn(colorClasses[index], "text-white") : "bg-white text-foreground"
              )}
              style={{ fontFamily: "'Jua', sans-serif" }}
            >
              {category.name}
            </div>
          ))}
        </div>

        {/* 메뉴 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {activeCategoryData.items.map((item, index) => (
            <motion.div
              key={item}
              className="bg-white rounded-3xl overflow-hidden shadow-strong-hover"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              {/* 이미지 플레이스홀더 */}
              <div className={cn("aspect-square bg-gradient-to-br flex items-center justify-center relative overflow-hidden", activeCategoryData.color)}>
                <span
                  className="text-5xl md:text-6xl font-bold text-white"
                  style={{ fontFamily: "'Jua', sans-serif" }}
                >
                  IMG
                </span>
                {/* 귀여운 장식 */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/30 rounded-full" />
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-white/30 rounded-full" />
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
        </div>

        {/* 하단 안내 */}
        <motion.div
          className="mt-16 text-center bg-white rounded-3xl p-8 shadow-strong"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <span className="text-3xl md:text-4xl font-bold text-primary inline-block mb-4">
            IMG
          </span>
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

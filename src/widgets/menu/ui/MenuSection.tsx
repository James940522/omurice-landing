'use client';

import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

interface MenuItem {
  name: string;
  image: string;
  tags?: string[];
  badge?: string;
}

interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

const MENU_BASE = '/new-asset/menu';

const DIR = {
  omurice: '오므라이스',
  white: '화이트 오므라이스',
  kimchi: '김치 오므라이스',
  toowoomba: '투움바 오므라이스',
  whiteKimchi: '화이트 김치 오므라이스',
  bokkeumbap: '김치볶음밥',
  half: '하프 앤 하프',
  side: '사이드',
} as const;

const TOPPINGS = [
  '큐브스테이크',
  '돈까스',
  '떡갈비',
  '가라아게',
  '새우까스',
  '삼겹',
  '우삼겹',
  '스팸',
  '소세지',
];

const img = (...parts: string[]) => `${MENU_BASE}/${parts.join('/')}`;

const dish = (dir: string, name: string, tags?: string[]): MenuItem => ({
  name,
  image: img(dir, `${name}.jpeg`),
  tags,
});

const toppingDishes = (dir: string, suffix: string): MenuItem[] =>
  TOPPINGS.map((topping) => dish(dir, `${topping} ${suffix}`));

const bestMenus: MenuItem[] = [
  {
    name: '큐브 스테이크 오므라이스',
    image: img(DIR.omurice, '큐브스테이크 오므라이스.jpeg'),
    badge: '30% 쿠폰 / 무료배달',
  },
  {
    name: '새우까스 오므라이스',
    image: img(DIR.omurice, '새우까스 오므라이스.jpeg'),
    badge: '최애메뉴',
  },
  {
    name: '소세지 김치 오므라이스',
    image: img(DIR.kimchi, '소세지 김치 오므라이스.jpeg'),
  },
  {
    name: '돈까스 김치 오므라이스',
    image: img(DIR.kimchi, '돈까스 김치 오므라이스.jpeg'),
  },
  {
    name: '나홀로 오므라이스 세트',
    image: img('나홀로 오므라이스 세트.jpg'),
  },
  {
    name: '둘이서 배터지는 강호동 세트',
    image: img('둘이서 배터지는 강호동 세트.jpg'),
  },
];

const menuCategories: MenuCategory[] = [
  {
    id: 'set',
    name: '세트',
    items: [
      {
        name: '나홀로 오므라이스 세트',
        image: img('나홀로 오므라이스 세트.jpg'),
      },
      {
        name: '둘이서 오므라이스 세트',
        image: img('둘이서 오므라이스 세트.jpeg'),
      },
      {
        name: '둘이서 배터지는 강호동 세트',
        image: img('둘이서 배터지는 강호동 세트.jpg'),
      },
    ],
  },
  {
    id: 'omurice',
    name: '오므라이스',
    items: toppingDishes(DIR.omurice, '오므라이스'),
  },
  {
    id: 'white',
    name: '화이트',
    items: toppingDishes(DIR.white, '화이트 오므라이스'),
  },
  {
    id: 'kimchi',
    name: '김치',
    items: toppingDishes(DIR.kimchi, '김치 오므라이스'),
  },
  {
    id: 'toowoomba',
    name: '투움바',
    items: toppingDishes(DIR.toowoomba, '투움바 오므라이스'),
  },
  {
    id: 'white-kimchi',
    name: '화이트 김치',
    items: [
      ...TOPPINGS.filter((topping) => topping !== '우삼겹').map((topping) =>
        dish(DIR.whiteKimchi, `${topping} 화이트 김치 오므라이스`)
      ),
      {
        name: '우삼겹 화이트 김치 오므라이스',
        image: img(DIR.whiteKimchi, '우삼겸 화이트 김치 오므라이스.jpeg'),
      },
    ],
  },
  {
    id: 'bokkeumbap',
    name: '김치볶음밥',
    items: TOPPINGS.map((topping) => dish(DIR.bokkeumbap, `${topping} 베이컨 김치볶음밥`)),
  },
  {
    id: 'half',
    name: '하프앤하프',
    items: [dish(DIR.half, '블랙앤화이트'), dish(DIR.half, '블랙앤투움바')],
  },
  {
    id: 'side',
    name: '사이드',
    items: [
      { name: '가라아게', image: img(DIR.side, '가라아게.jpg') },
      { name: '감자튀김', image: img(DIR.side, '감자튀김.jpg') },
      { name: '대왕소세지', image: img(DIR.side, '대왕소세지.jpg') },
      { name: '돈까스', image: img(DIR.side, '돈까스.jpeg') },
      { name: '떡갈비', image: img(DIR.side, '떡갈비.jpeg') },
      { name: '버팔로봉', image: img(DIR.side, '버팔로봉.jpg') },
      { name: '버팔로윙', image: img(DIR.side, '버팔로윙.jpg') },
      { name: '짜장만두', image: img(DIR.side, '짜장만두.jpg') },
      { name: '짬뽕만두', image: img(DIR.side, '짬뽕만두.jpg') },
      { name: '치즈볼', image: img(DIR.side, '치즈볼.jpg') },
      { name: '팝콘치킨', image: img(DIR.side, '팝콘치킨.jpeg') },
    ],
  },
];

const marqueeItems = [
  'TODAY OMURICE',
  'BEST MENU',
  'RICE OMELET',
  'FRESH TOPPING',
  'DELIVERY FAVORITE',
  'SIGNATURE SAUCE',
];

function BestMenuCard({
  item,
  priority,
  index,
}: {
  item: MenuItem;
  priority: boolean;
  index: number;
}) {
  return (
    <article className="group relative w-[78vw] max-w-[520px] shrink-0 snap-start overflow-hidden rounded-[8px] bg-[#6b4423] p-2 shadow-[0_18px_40px_rgba(107,68,35,0.2)] sm:w-[420px] lg:w-[460px] xl:w-[520px]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] bg-[#fff4df]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 78vw, (max-width: 1280px) 460px, 520px"
          priority={priority}
          quality={90}
        />
        <div className="absolute left-3 top-3 rounded-[8px] bg-[#fec601] px-3 py-2 font-heading text-xs font-black text-[#4e2d14] shadow-[0_8px_18px_rgba(78,45,20,0.16)]">
          BEST {String(index + 1).padStart(2, '0')}
        </div>
      </div>
      <div className="px-4 py-5 text-white sm:px-6">
        {item.badge && (
          <p className="mb-3 inline-flex rounded-[8px] bg-[#ff6b12] px-3 py-1.5 text-xs font-black text-white">
            {item.badge}
          </p>
        )}
        <h3 className="break-keep font-heading text-xl font-black leading-tight sm:text-2xl">
          {item.name}
        </h3>
      </div>
    </article>
  );
}

function MenuCard({ item, priority }: { item: MenuItem; priority: boolean }) {
  return (
    <article className="group overflow-hidden rounded-[8px] bg-white shadow-[0_16px_36px_rgba(107,68,35,0.12)] ring-1 ring-[#ffd68a]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#fff4df]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          quality={88}
        />
      </div>
      <div className="flex min-h-16 items-center justify-center px-3 py-4">
        <h3 className="break-keep text-center font-heading text-sm font-black leading-snug text-[#4e2d14] sm:text-base">
          {item.name}
        </h3>
      </div>
    </article>
  );
}

export default function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [activeBestIndex, setActiveBestIndex] = useState(0);

  const currentCategory =
    menuCategories.find((category) => category.id === activeCategory) ?? menuCategories[0];

  const moveBestMenu = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const slider = sliderRef.current;
    const target = slider?.children[index] as HTMLElement | undefined;

    if (slider && target) {
      slider.scrollTo({ left: target.offsetLeft, behavior });
    }
  }, []);

  const advanceBestMenu = useCallback(() => {
    setActiveBestIndex((currentIndex) => {
      if (currentIndex === bestMenus.length - 1) {
        moveBestMenu(bestMenus.length);

        window.setTimeout(() => {
          moveBestMenu(0, 'auto');
        }, 650);

        return 0;
      }

      const nextIndex = currentIndex + 1;
      moveBestMenu(nextIndex);

      return nextIndex;
    });
  }, [moveBestMenu]);

  const scrollBestMenus = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      advanceBestMenu();
      return;
    }

    const nextIndex =
      activeBestIndex === 0 ? bestMenus.length - 1 : activeBestIndex - 1;

    moveBestMenu(nextIndex);
    setActiveBestIndex(nextIndex);
  };

  useEffect(() => {
    const timer = window.setInterval(advanceBestMenu, 3400);

    return () => window.clearInterval(timer);
  }, [advanceBestMenu]);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#fff7e8] py-20 text-[#4e2d14] md:py-28"
    >
      <style jsx global>{`
        @keyframes menu-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .menu-marquee-track {
          animation: menu-marquee 28s linear infinite;
        }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,198,1,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,198,1,0.18) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <div className="pointer-events-none absolute -left-28 top-28 h-28 w-[46vw] rotate-[-7deg] bg-[#fec601]/20" />
      <div className="pointer-events-none absolute -right-20 top-52 h-24 w-[40vw] rotate-[7deg] bg-[#ff6b12]/12" />
      <div
        className="pointer-events-none absolute right-0 top-10 h-14 w-[46vw] opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(45deg, #ff6b12 25%, transparent 25%), linear-gradient(-45deg, #ff6b12 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ff6b12 75%), linear-gradient(-45deg, transparent 75%, #ff6b12 75%)',
          backgroundPosition: '0 0, 0 18px, 18px -18px, -18px 0',
          backgroundSize: '36px 36px',
        }}
      />
      <div className="pointer-events-none absolute left-4 top-[390px] hidden -rotate-90 font-heading text-7xl font-black text-[#6b4423]/5 lg:block">
        TODAY OMURICE
      </div>
      <div className="pointer-events-none absolute left-1/2 top-[45%] h-[420px] w-[980px] -translate-x-1/2 rounded-t-full bg-white/60" />

      <div className="relative z-10 mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid items-center gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-14"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <div className="max-w-sm">
            <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#ff6b12] text-white shadow-[0_12px_24px_rgba(255,107,18,0.24)]">
              <Trophy size={24} strokeWidth={2.6} />
            </div>
            <p className="font-heading text-sm font-black uppercase text-[#ff6b12]">
              Today Omurice
            </p>
            <h2 className="mt-3 font-heading text-5xl font-black leading-[1.02] text-[#6b4423] sm:text-6xl">
              Best
              <br />
              Menu
            </h2>
            <p className="mt-5 break-keep text-lg font-bold leading-relaxed text-[#4e2d14]">
              배달앱에서 먼저 찾는 인기 메뉴와 세트 구성을 보기 좋게 모았습니다.
            </p>
            <div className="mt-8 flex gap-2">
              <button
                type="button"
                aria-label="이전 베스트 메뉴 보기"
                onClick={() => scrollBestMenus('prev')}
                className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-[#6b4423] text-white transition hover:bg-[#4e2d14]"
              >
                <ChevronLeft size={26} strokeWidth={2.8} />
              </button>
              <button
                type="button"
                aria-label="다음 베스트 메뉴 보기"
                onClick={() => scrollBestMenus('next')}
                className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-[#ff6b12] text-white transition hover:bg-[#df590a]"
              >
                <ChevronRight size={26} strokeWidth={2.8} />
              </button>
            </div>
          </div>

          <div className="relative min-w-0">
            <div className="pointer-events-none absolute -left-8 -top-9 z-20 hidden h-32 w-32 rotate-[-18deg] items-center justify-center rounded-full border-4 border-[#ff6b12] bg-[#fec601] text-center font-heading text-sm font-black uppercase leading-tight text-[#6b4423] shadow-[0_18px_35px_rgba(255,107,18,0.24)] md:flex">
              Best
              <br />
              Menu
            </div>
            <div
              ref={sliderRef}
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {[...bestMenus, ...bestMenus].map((item, index) => (
                <BestMenuCard
                  key={`${item.name}-${index}`}
                  item={item}
                  index={index % bestMenus.length}
                  priority={index < 2}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 mt-20 overflow-hidden bg-[#fec601] py-3 text-[#6b4423] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-1px_0_rgba(107,68,35,0.08)]">
        <div className="menu-marquee-track flex w-max gap-10 whitespace-nowrap font-heading text-lg font-black uppercase sm:text-xl">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-10">
              {item}
              <span className="h-2 w-2 rounded-full bg-[#ff6b12]" />
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          <p className="font-heading text-sm font-black uppercase text-[#ff6b12]">All Menu</p>
          <h2 className="mt-2 font-heading text-4xl font-black text-[#6b4423] sm:text-5xl">
            전체 메뉴 안내
          </h2>
          <p className="mt-4 break-keep text-base font-bold text-[#6b4423] sm:text-lg">
            오므라이스부터 사이드까지, 오늘은 오므라이스의 메뉴를 한눈에 확인하세요.
          </p>
        </motion.div>

        <div className="mx-auto mt-9 max-w-5xl overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max gap-2 rounded-[8px] bg-[#6b4423] p-2 shadow-[0_18px_34px_rgba(107,68,35,0.16)]">
            {menuCategories.map((category) => {
              const isActive = category.id === activeCategory;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`rounded-[8px] px-4 py-3 text-sm font-black transition sm:px-6 ${
                    isActive
                      ? 'bg-[#fec601] text-[#4e2d14] shadow-[0_8px_18px_rgba(254,198,1,0.28)]'
                      : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          key={currentCategory.id}
          className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {currentCategory.items.map((item, index) => (
            <MenuCard key={`${currentCategory.id}-${item.name}`} item={item} priority={index < 4} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

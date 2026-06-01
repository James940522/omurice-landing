'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface MenuItem {
  name: string;
  image: string;
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

const dish = (dir: string, name: string): MenuItem => ({
  name,
  image: img(dir, `${name}.jpeg`),
});

const toppingDishes = (dir: string, suffix: string): MenuItem[] =>
  TOPPINGS.map((topping) => dish(dir, `${topping} ${suffix}`));

const bestMenuNames = new Set([
  '큐브스테이크 오므라이스',
  '새우까스 오므라이스',
  '소세지 김치 오므라이스',
  '돈까스 김치 오므라이스',
  '나홀로 오므라이스 세트',
  '둘이서 배터지는 호동이 세트',
]);

const menuCategories: MenuCategory[] = [
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
        name: '둘이서 배터지는 호동이 세트',
        image: img('둘이서 배터지는 호동이 세트.jpg'),
      },
    ],
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
  'SIGNATURE PICKS',
  'RICE OMELET',
  'FRESH TOPPING',
  'DELIVERY FAVORITE',
  'SIGNATURE SAUCE',
];

function MenuCard({ item, priority }: { item: MenuItem; priority: boolean }) {
  const isBest = bestMenuNames.has(item.name);

  return (
    <article
      className={`group relative overflow-hidden rounded-[8px] border-2 bg-white shadow-[0_16px_36px_rgba(107,68,35,0.12)] ${
        isBest
          ? 'border-[#e32d1f] shadow-[0_18px_42px_rgba(227,45,31,0.2)]'
          : 'border-[#ffd68a]'
      }`}
    >
      {isBest && (
        <div className="absolute left-3 top-3 z-20 rounded-full bg-[#e32d1f] px-3 py-1.5 font-heading text-xs font-black tracking-wide text-white shadow-[0_8px_18px_rgba(227,45,31,0.28)]">
          BEST
        </div>
      )}
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
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);

  const currentCategory =
    menuCategories.find((category) => category.id === activeCategory) ?? menuCategories[0];

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

      <div className="relative z-10 overflow-hidden bg-[#fec601] py-3 text-[#6b4423] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-1px_0_rgba(107,68,35,0.08)]">
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

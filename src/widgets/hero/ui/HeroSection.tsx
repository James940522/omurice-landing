'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const heroSlides = [
  {
    desktopSrc: '/new-asset/sec-1/hero-01-desktop.webp',
    mobileSrc: '/new-asset/sec-1/hero-01-mobile.webp',
    fallbackSrc: '/asset/menu/오늘은_오므라이스/메뉴모음컷/메뉴모음컷 1.jpg',
    alt: '대한민국 최초 투움바 오므라이스',
  },
  {
    desktopSrc: '/new-asset/sec-1/hero-02-desktop.webp',
    mobileSrc: '/new-asset/sec-1/hero-02-mobile.webp',
    fallbackSrc: '/asset/menu/오늘은_오므라이스/메뉴모음컷/블랙 앤 투움바 오므라이스.jpg',
    alt: '독보적인 오늘은 오므라이스',
  },
  {
    desktopSrc: '/new-asset/sec-1/hero-03-desktop.webp',
    mobileSrc: '/new-asset/sec-1/hero-03-mobile.webp',
    fallbackSrc: '/asset/menu/오늘은_오므라이스/메뉴모음컷/화이트 메뉴모음1.jpg',
    alt: '압도적인 매출 화이트 오므라이스',
  },
];

function HeroSlideImage({
  desktopSrc,
  mobileSrc,
  fallbackSrc,
  alt,
  priority,
}: {
  desktopSrc: string;
  mobileSrc: string;
  fallbackSrc: string;
  alt: string;
  priority: boolean;
}) {
  const [desktopImageSrc, setDesktopImageSrc] = useState(desktopSrc);
  const [mobileImageSrc, setMobileImageSrc] = useState(mobileSrc);

  return (
    <>
      <Image
        src={mobileImageSrc}
        alt={alt}
        fill
        priority={priority}
        quality={90}
        sizes="100vw"
        className="object-cover md:hidden"
        onError={() => setMobileImageSrc(fallbackSrc)}
      />
      <Image
        src={desktopImageSrc}
        alt={alt}
        fill
        priority={priority}
        quality={90}
        sizes="100vw"
        className="hidden object-cover md:block"
        onError={() => setDesktopImageSrc(fallbackSrc)}
      />
    </>
  );
}

export default function HeroSection() {
  return (
    <section className="relative mt-14 aspect-[720/1000] overflow-hidden bg-black md:mt-16 md:aspect-[1920/840]">
      <h1 className="sr-only">
        오므라이스 프랜차이즈 창업 | 재영에프앤비(Jaeyoung F&B) 오늘은 오므라이스 · 에그이츠(EGG
        EATS)
      </h1>

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        loop
        speed={700}
        autoplay={{
          delay: 4200,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: '.hero-carousel-prev',
          nextEl: '.hero-carousel-next',
        }}
        pagination={{
          clickable: true,
          el: '.hero-carousel-pagination',
        }}
        className="h-full w-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.desktopSrc}>
            <div className="relative h-full w-full">
              <HeroSlideImage
                desktopSrc={slide.desktopSrc}
                mobileSrc={slide.mobileSrc}
                fallbackSrc={slide.fallbackSrc}
                alt={slide.alt}
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 mx-auto w-full max-w-7xl px-5 sm:bottom-7 sm:px-8">
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            type="button"
            aria-label="이전 이미지 보기"
            className="hero-carousel-prev flex size-11 items-center justify-center rounded-full border-2 border-orange-500 bg-black/85 text-orange-400 shadow-[0_0_0_3px_rgba(255,255,255,0.28),0_12px_28px_rgba(0,0,0,0.45)] backdrop-blur-sm transition hover:bg-orange-500 hover:text-white hover:shadow-[0_0_0_4px_rgba(255,255,255,0.36),0_14px_32px_rgba(0,0,0,0.52)] sm:size-12"
          >
            <span className="text-2xl leading-none" aria-hidden="true">
              ‹
            </span>
          </button>
          <button
            type="button"
            aria-label="다음 이미지 보기"
            className="hero-carousel-next flex size-11 items-center justify-center rounded-full border-2 border-orange-500 bg-black/85 text-orange-400 shadow-[0_0_0_3px_rgba(255,255,255,0.28),0_12px_28px_rgba(0,0,0,0.45)] backdrop-blur-sm transition hover:bg-orange-500 hover:text-white hover:shadow-[0_0_0_4px_rgba(255,255,255,0.36),0_14px_32px_rgba(0,0,0,0.52)] sm:size-12"
          >
            <span className="text-2xl leading-none" aria-hidden="true">
              ›
            </span>
          </button>
        </div>
      </div>

      <div className="hero-carousel-pagination absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 justify-center sm:bottom-5" />
    </section>
  );
}

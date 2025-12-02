'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import Image from 'next/image';

// 실제 리뷰 이미지들
const reviewImages = [
  '/asset/review/KakaoTalk_Photo_2025-11-29-19-50-51 001.jpeg',
  '/asset/review/KakaoTalk_Photo_2025-11-29-19-50-51 002.jpeg',
  '/asset/review/KakaoTalk_Photo_2025-11-29-19-50-51 003.jpeg',
  '/asset/review/KakaoTalk_Photo_2025-11-29-19-50-51 004.jpeg',
  '/asset/review/KakaoTalk_Photo_2025-11-29-19-50-52 005.jpeg',
  '/asset/review/KakaoTalk_Photo_2025-11-29-19-50-52 006.jpeg',
  '/asset/review/KakaoTalk_Photo_2025-11-29-19-50-52 007.jpeg',
  '/asset/review/KakaoTalk_Photo_2025-11-29-19-50-52 008.jpeg',
  '/asset/review/KakaoTalk_Photo_2025-11-29-19-50-52 009.jpeg',
  '/asset/review/KakaoTalk_Photo_2025-11-29-19-50-52 010.jpeg',
  '/asset/review/KakaoTalk_Photo_2025-11-29-19-50-53 011.jpeg',
  '/asset/review/KakaoTalk_Photo_2025-11-29-19-50-53 012.jpeg',
  '/asset/review/KakaoTalk_Photo_2025-11-29-19-50-53 013.jpeg',
  '/asset/review/KakaoTalk_Photo_2025-11-29-19-50-53 014.jpeg',
  '/asset/review/KakaoTalk_Photo_2025-11-29-19-50-53 015.jpeg',
  '/asset/review/KakaoTalk_Photo_2025-11-29-19-50-53 016.jpeg',
];

export default function ReviewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="reviews"
      className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100"
      ref={ref}
    >
      {/* 배경 장식 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* 배달앱 로고들 */}
          <div className="flex items-center justify-center gap-6 md:gap-10 mb-8">
            <motion.div
              className="relative bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-2xl"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src="/asset/etc/baemin-logo.png"
                alt="배달의민족"
                width={200}
                height={70}
                className="drop-shadow-lg h-16 md:h-20 w-auto"
              />
            </motion.div>

            <motion.div
              className="text-orange-600 text-4xl md:text-5xl font-bold"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              +
            </motion.div>

            <motion.div
              className="relative bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-2xl"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Image
                src="/asset/etc/coupang_eats.png"
                alt="쿠팡이츠"
                width={200}
                height={70}
                className="drop-shadow-lg h-16 md:h-20 w-auto"
              />
            </motion.div>
          </div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            거짓말 안 합니다!
            <br />
            <span className="text-orange-600">실제 고객 리뷰</span>가 증명합니다
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-gray-700 mb-6 font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            매일같이 쏟아지는 <span className="text-orange-600">리얼 후기</span>
            <br />
            이게 바로 진짜 맛집의 증거입니다
          </motion.p>
          <motion.div
            className="w-24 h-2 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto rounded-full shadow-lg"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          />
        </motion.div>

        {/* 리뷰 캐러셀 */}
        <motion.div
          className="relative max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1.5}
            loop={true}
            loopAdditionalSlides={2}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 250,
              modifier: 1,
              slideShadows: false,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                coverflowEffect: {
                  rotate: 10,
                  depth: 150,
                  slideShadows: false,
                },
              },
              640: {
                slidesPerView: 1.5,
                coverflowEffect: {
                  rotate: 15,
                  depth: 200,
                  slideShadows: false,
                },
              },
              1024: {
                slidesPerView: 2,
                coverflowEffect: {
                  rotate: 15,
                  depth: 250,
                  slideShadows: false,
                },
              },
            }}
            className="reviews-swiper !pb-16"
          >
            {reviewImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="px-4 py-8">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.4)] transition-all duration-300 max-w-md mx-auto">
                    {/* 리뷰 이미지 */}
                    <div className="relative aspect-[3/4] overflow-hidden rounded-t-[28px] bg-white m-3 mb-0">
                      <Image
                        src={image}
                        alt={`고객 리뷰 ${index + 1}`}
                        fill
                        className="object-contain p-2"
                        quality={90}
                      />
                    </div>

                    {/* 하단 라벨 */}
                    <div className="p-5 bg-gradient-to-r from-orange-500 to-yellow-500 m-3 mt-3 rounded-[20px] shadow-lg">
                      <p className="text-white text-center font-bold text-lg">
                        실제 고객님의 생생한 리뷰 #{index + 1}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 커스텀 네비게이션 버튼 */}
          <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center cursor-pointer shadow-2xl hover:scale-110 transition-transform duration-300">
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center cursor-pointer shadow-2xl hover:scale-110 transition-transform duration-300">
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </motion.div>

        {/* 하단 강조 메시지 */}
        <motion.div
          className="mt-16 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          {/* 메인 박스 */}
          <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* 배경 장식 */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

            <div className="relative z-10 text-center text-white space-y-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-5xl">⭐</span>
                <span className="text-5xl">⭐</span>
                <span className="text-5xl">⭐</span>
                <span className="text-5xl">⭐</span>
                <span className="text-5xl">⭐</span>
              </div>

              <p className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                리뷰가 말해주는 진실!
              </p>

              <p className="text-xl md:text-2xl font-medium opacity-95">
                조작 불가! 배달앱 실제 리뷰 캡쳐
                <br />
                <span className="text-yellow-300 font-bold">이 정도면 믿을 수밖에 없죠?</span>
              </p>

              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 inline-block">
                <p className="text-2xl md:text-3xl font-bold">💯 고객 만족도 최상위권</p>
                <p className="text-lg md:text-xl mt-2">매일 쌓이는 찐 리뷰들로 입증!</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

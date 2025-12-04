'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function ContactFormSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    region: '',
    budget: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 폼 제출 로직 구현
    console.log('Form submitted:', formData);
    alert('창업 문의가 접수되었습니다. 곧 연락드리겠습니다!');
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden bg-gray-900" ref={ref}>
      {/* 배경 이미지 컨테이너 */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          backgroundImage: 'url(/asset/bg/sec11-bg.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
        }}
      />

      {/* 어두운 오버레이 + 블러 효과 */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 헤더 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-6"></div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            창업 문의
          </h2>
          <p className="text-xl md:text-2xl text-white mb-2 drop-shadow-md">
            100개 이상의 가맹점이 성공 중!
          </p>
          <p className="text-lg md:text-xl text-white/90 drop-shadow-md">
            당신도 오늘은 오므라이스 가족이 되어보세요
          </p>
        </motion.div>

        {/* 폼 컨테이너 */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 이름 & 연락처 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                    placeholder="010-1234-5678"
                  />
                </div>
              </div>

              {/* 이메일 */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                  placeholder="example@email.com"
                />
              </div>

              {/* 희망 지역 & 예산 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="region" className="block text-sm font-bold text-gray-700 mb-2">
                    희망 창업 지역 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="region"
                    name="region"
                    required
                    value={formData.region}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                    placeholder="서울 강남구"
                  />
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-bold text-gray-700 mb-2">
                    투자 가능 예산
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                  >
                    <option value="">선택해주세요</option>
                    <option value="5000">5천만원 이하</option>
                    <option value="10000">5천만원 ~ 1억원</option>
                    <option value="15000">1억원 ~ 1억 5천만원</option>
                    <option value="20000">1억 5천만원 ~ 2억원</option>
                    <option value="20000+">2억원 이상</option>
                  </select>
                </div>
              </div>

              {/* 문의 내용 */}
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                  문의 내용
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all resize-none"
                  placeholder="창업에 대해 궁금하신 점을 자유롭게 작성해주세요."
                />
              </div>

              {/* 개인정보 동의 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-5 h-5 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                  />
                  <span className="text-sm text-gray-600 leading-relaxed">
                    개인정보 수집 및 이용에 동의합니다. 수집된 정보는 창업 상담 목적으로만 사용되며,
                    관련 법령에 따라 안전하게 관리됩니다.
                  </span>
                </label>
              </div>

              {/* 제출 버튼 */}
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-4 px-8 rounded-xl text-lg md:text-xl font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                창업 문의 신청하기
              </motion.button>

              {/* 안내 문구 */}
              <p className="text-center text-sm text-gray-500 mt-4">
                영업일 기준 24시간 이내에 담당자가 연락드립니다.
              </p>
            </form>
          </div>
        </motion.div>

        {/* 하단 연락처 */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 inline-block">
            <p className="text-white text-lg md:text-xl font-bold mb-4">빠른 상담을 원하시나요?</p>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <a
                href="tel:02-1234-5678"
                className="flex items-center gap-2 text-white text-xl md:text-2xl font-bold hover:scale-105 transition-transform"
              >
                010-9923-9502
              </a>
              <span className="hidden md:inline text-white/60">|</span>
              <a
                href="mailto:info@omurice.com"
                className="flex items-center gap-2 text-white text-xl md:text-2xl font-bold hover:scale-105 transition-transform"
              >
                wochl123@naver.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

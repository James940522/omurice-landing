'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// 도메인에 따른 SMS 메시지 생성 함수
function getSmsMessageByDomain(): string {
  if (typeof window === 'undefined') {
    return '홈페이지를 통해 창업 문의 드립니다.';
  }

  const hostname = window.location.hostname;
  console.log('🔍 현재 hostname:', hostname);

  // apply.todayomurice.com 또는 localhost인 경우 [네모] 문구 추가
  if (hostname === 'apply.todayomurice.com' || hostname === 'localhost') {
    console.log('✅ [네모] 메시지 적용');
    return '[네모] 홈페이지를 통해 창업 문의 드립니다.';
  }

  console.log('✅ 기본 메시지 적용');
  return '홈페이지를 통해 창업 문의 드립니다.';
}

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

  // 클라이언트 마운트 상태 추적
  const [isMounted, setIsMounted] = useState(false);

  // SMS 메시지 - 항상 기본값으로 초기화 (SSR과 일치)
  const [smsMessage, setSmsMessage] = useState('홈페이지를 통해 창업 문의 드립니다.');

  // 폼 제출 관련 state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyAgree, setPrivacyAgree] = useState(false);
  const [hp, setHp] = useState(''); // honeypot

  // 클라이언트 마운트 후 도메인 체크
  // SSR Hydration 에러 방지를 위해 클라이언트에서만 메시지 설정
  useEffect(() => {
    setIsMounted(true);
    const message = getSmsMessageByDomain();
    if (message !== smsMessage) {
      setSmsMessage(message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!privacyAgree) return;

    setIsSubmitting(true);
    try {
      // 현재 도메인 정보 가져오기
      const domain = typeof window !== 'undefined' ? window.location.hostname : '';

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          region: formData.region,
          message: formData.message,
          privacyAgree: true,
          hp,
          domain, // 도메인 정보 전송 ([네모] 태그용)
        }),
      });

      if (!res.ok) {
        if (res.status === 429) {
          alert('너무 많은 요청입니다. 잠시 후 다시 시도해주세요.');
        } else {
          throw new Error('SEND_FAIL');
        }
        return;
      }

      alert('접수 완료! 담당자가 영업일 기준 24시간 이내 연락드립니다.');
      setFormData({ name: '', phone: '', email: '', region: '', budget: '', message: '' });
      setPrivacyAgree(false);
      setHp('');
    } catch (error) {
      console.error('Form submission error:', error);
      alert('전송 실패. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden bg-gray-900" ref={ref}>
      {/* 배경 이미지 컨테이너 */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          backgroundImage: 'url(/asset/bg/sec2-bg.jpg)',
          backgroundSize: 'auto',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 헤더 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-6"></div>
          <h2
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{
              fontFamily: 'var(--font-heading)',
              color: '#FEC601',
              textShadow:
                '-2px -2px 0 #8B4513, 2px -2px 0 #8B4513, -2px 2px 0 #8B4513, 2px 2px 0 #8B4513, 4px 4px 8px rgba(0,0,0,0.5)',
            }}
          >
            창업 문의
          </h2>
          <p
            className="text-xl md:text-2xl mb-2 font-bold"
            style={{
              fontFamily: 'var(--font-heading)',
              color: '#FFFFFF',
              textShadow:
                '0 0 20px rgba(254, 198, 1, 0.8), 2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(254, 198, 1, 0.5)',
            }}
          >
            100개 이상의 가맹점이 성공 중!
          </p>
          <p
            className="text-lg md:text-xl font-semibold"
            style={{
              fontFamily: 'var(--font-body)',
              color: '#FFF9E6',
              textShadow: '1px 1px 4px rgba(0,0,0,0.8), 0 0 10px rgba(254, 198, 1, 0.4)',
            }}
          >
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                {/* 희망 지역 */}

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

              {/* Honeypot (봇 차단용) */}
              <input
                type="text"
                name="hp"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* 개인정보 동의 */}
              <div className="bg-gray-50 rounded-xl p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacyAgree}
                    onChange={(e) => setPrivacyAgree(e.target.checked)}
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
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-4 px-8 rounded-xl text-lg md:text-xl font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ${
                  isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
                }`}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? '전송 중...' : '창업 문의 신청하기'}
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
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 inline-block shadow-xl">
            <p className="text-gray-900 text-lg md:text-xl font-bold mb-4">
              빠른 상담을 원하시나요?
            </p>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <a
                href={
                  isMounted
                    ? `sms:010-9923-9502?body=${encodeURIComponent(smsMessage)}`
                    : 'tel:010-9923-9502'
                }
                className="flex items-center gap-2 text-gray-900 text-xl md:text-2xl font-bold hover:scale-105 transition-transform hover:text-yellow-600"
              >
                010-9923-9502
              </a>
              <span className="hidden md:inline text-gray-400">|</span>
              <a
                href="mailto:wochl123@naver.com"
                className="flex items-center gap-2 text-gray-900 text-xl md:text-2xl font-bold hover:scale-105 transition-transform hover:text-yellow-600"
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

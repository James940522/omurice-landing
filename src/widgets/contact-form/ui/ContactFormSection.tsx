'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// 도메인에 따른 SMS 메시지 생성 함수
function getSmsMessageByDomain(): string {
  if (typeof window === 'undefined') {
    return '오늘은 오므라이스 창업 문의 드립니다.';
  }

  const hostname = window.location.hostname;

  // apply.todayomurice.com 또는 localhost인 경우 [네모] 문구 추가
  if (hostname === 'apply.todayomurice.com' || hostname === 'localhost') {
    return '[네모] 오늘은 오므라이스 창업 문의 드립니다.';
  }

  return '오늘은 오므라이스 창업 문의 드립니다.';
}

const initialFormData = {
  name: '',
  phone: '',
  email: '',
  storeType: '',
  region: '',
  hasStore: '',
  message: '',
};

const storeTypeOptions = ['샵인샵', '단독매장', '홀매장', '기타매장'];
const storeOwnershipOptions = ['있음', '없음'];

export default function ContactFormSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState(initialFormData);

  // 클라이언트 마운트 상태 추적
  const [isMounted, setIsMounted] = useState(false);

  // SMS 메시지 - 항상 기본값으로 초기화 (SSR과 일치)
  const [smsMessage, setSmsMessage] = useState('오늘은 오므라이스 창업 문의 드립니다.');

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
    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.storeType ||
      !formData.region.trim() ||
      !formData.hasStore
    ) {
      alert('필수 항목을 입력해주세요.');
      return;
    }

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
          storeType: formData.storeType,
          region: formData.region,
          hasStore: formData.hasStore,
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
      setFormData(initialFormData);
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
    <section
      id="contact"
      className="relative overflow-hidden bg-[#fff8ef] py-14 md:py-20"
      ref={ref}
    >
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          backgroundImage: 'url(/new-asset/contact/contact-bg-mobile.webp)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          backgroundImage: 'url(/new-asset/contact/contact-bg.webp)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[0.86fr_1.08fr] lg:px-8">
        <motion.div
          className="text-left"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p
            className="mb-3 text-lg font-black text-[#8B4513] md:text-xl"
            style={{
              fontFamily: 'Georgia, serif',
              textShadow:
                '-1px -1px 0 #FFF9E6, 1px -1px 0 #FFF9E6, -1px 1px 0 #FFF9E6, 1px 1px 0 #FFF9E6, 2px 2px 6px rgba(0,0,0,0.24)',
            }}
          >
            Today Omurice
          </p>
          <h2
            className="mb-5 text-4xl font-black leading-[1.08] text-[#FEC601] md:text-[4.25rem]"
            style={{
              fontFamily: 'var(--font-heading)',
              WebkitTextStroke: '1px #8B4513',
              textShadow:
                '-2px -2px 0 #8B4513, 2px -2px 0 #8B4513, -2px 2px 0 #8B4513, 2px 2px 0 #8B4513, 5px 6px 0 rgba(139,69,19,0.38), 8px 10px 14px rgba(0,0,0,0.24)',
            }}
          >
            성공 창업,
            <br />
            오늘은 오므라이스입니다.
          </h2>
          <p
            className="inline-block max-w-md rounded-[8px] bg-white/86 px-4 py-3 text-base font-black leading-relaxed text-[#32190b] shadow-[0_12px_34px_rgba(84,45,10,0.13)] md:text-lg"
            style={{
              textShadow: '1px 1px 2px rgba(0,0,0,0.05)',
            }}
          >
            100호점이 선택한 배달 오므라이스 브랜드.
            <br />
            작은 공간에서도 안정적으로 시작할 수 있도록 상담부터 오픈까지 함께합니다.
          </p>
          <a
            href={
              isMounted
                ? `sms:010-9923-9502?body=${encodeURIComponent(smsMessage)}`
                : 'tel:010-9923-9502'
            }
            className="mt-6 inline-flex text-4xl font-black text-[#FEC601] transition hover:text-[#ff6b12] md:text-5xl"
            style={{
              fontFamily: 'var(--font-heading)',
              WebkitTextStroke: '1px #8B4513',
              textShadow:
                '-2px -2px 0 #8B4513, 2px -2px 0 #8B4513, -2px 2px 0 #8B4513, 2px 2px 0 #8B4513, 4px 5px 0 rgba(139,69,19,0.34), 7px 9px 13px rgba(0,0,0,0.22)',
            }}
          >
            010-9923-9502
          </a>
        </motion.div>

        <motion.div
          className="mx-auto w-full max-w-[34rem] lg:ml-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="rounded-[8px] border border-[#f4c47d]/80 bg-white p-5 shadow-[0_22px_60px_rgba(84,45,10,0.16)] md:p-6">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-black text-[#32190b] md:text-sm">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-[6px] border border-[#f2d6b8] bg-[#fffaf5] px-4 py-2.5 text-sm font-bold text-[#32190b] outline-none transition focus:border-[#ff6b12] focus:ring-2 focus:ring-[#fec601]/30"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-xs font-black text-[#32190b] md:text-sm">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-[6px] border border-[#f2d6b8] bg-[#fffaf5] px-4 py-2.5 text-sm font-bold text-[#32190b] outline-none transition focus:border-[#ff6b12] focus:ring-2 focus:ring-[#fec601]/30"
                    placeholder="010-1234-5678"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-black text-[#32190b] md:text-sm">
                    이메일 <span className="text-[#8a6848]">(선택)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-[6px] border border-[#f2d6b8] bg-[#fffaf5] px-4 py-2.5 text-sm font-bold text-[#32190b] outline-none transition focus:border-[#ff6b12] focus:ring-2 focus:ring-[#fec601]/30"
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="storeType" className="mb-1.5 block text-xs font-black text-[#32190b] md:text-sm">
                    매장형태 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="storeType"
                    name="storeType"
                    required
                    value={formData.storeType}
                    onChange={handleChange}
                    className="w-full rounded-[6px] border border-[#f2d6b8] bg-[#fffaf5] px-4 py-2.5 text-sm font-bold text-[#32190b] outline-none transition focus:border-[#ff6b12] focus:ring-2 focus:ring-[#fec601]/30"
                  >
                    <option value="">선택</option>
                    {storeTypeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_0.85fr]">
                <div>
                  <label htmlFor="region" className="mb-1.5 block text-xs font-black text-[#32190b] md:text-sm">
                    창업지역 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="region"
                    name="region"
                    required
                    value={formData.region}
                    onChange={handleChange}
                    className="w-full rounded-[6px] border border-[#f2d6b8] bg-[#fffaf5] px-4 py-2.5 text-sm font-bold text-[#32190b] outline-none transition focus:border-[#ff6b12] focus:ring-2 focus:ring-[#fec601]/30"
                    placeholder="서울 강남구"
                  />
                </div>
                <div>
                  <span className="mb-1.5 block text-xs font-black text-[#32190b] md:text-sm">
                    점포 보유 유무 <span className="text-red-500">*</span>
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {storeOwnershipOptions.map((option) => (
                      <label
                        key={option}
                        className={`flex cursor-pointer items-center justify-center rounded-[6px] border px-3 py-2.5 text-sm font-black transition ${
                          formData.hasStore === option
                            ? 'border-[#ff6b12] bg-[#ff6b12] text-white'
                            : 'border-[#f2d6b8] bg-[#fffaf5] text-[#6b4222] hover:border-[#ff6b12]/70'
                        }`}
                      >
                        <input
                          type="radio"
                          name="hasStore"
                          value={option}
                          checked={formData.hasStore === option}
                          onChange={handleChange}
                          required
                          className="sr-only"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-black text-[#32190b] md:text-sm">
                  문의내역 <span className="text-[#8a6848]">(선택)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-[6px] border border-[#f2d6b8] bg-[#fffaf5] px-4 py-2.5 text-sm font-bold text-[#32190b] outline-none transition focus:border-[#ff6b12] focus:ring-2 focus:ring-[#fec601]/30"
                  placeholder="창업에 대해 궁금하신 점을 자유롭게 작성해주세요."
                />
              </div>

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

              <div className="rounded-[6px] bg-[#fff8ef] p-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacyAgree}
                    onChange={(e) => setPrivacyAgree(e.target.checked)}
                    required
                    className="mt-1 h-5 w-5 rounded border-[#f2d6b8] text-[#ff6b12] focus:ring-[#fec601]"
                  />
                  <span className="text-xs leading-relaxed text-[#6b4222] md:text-sm">
                    개인정보 수집 및 이용에 동의합니다. 수집된 정보는 창업 상담 목적으로만 사용되며,
                    관련 법령에 따라 안전하게 관리됩니다.
                  </span>
                </label>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-[8px] bg-[#ff6b12] px-8 py-3.5 text-lg font-black text-white shadow-[0_16px_32px_rgba(255,107,18,0.25)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#e75c0b] hover:shadow-[0_18px_38px_rgba(255,107,18,0.3)] ${
                  isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
                }`}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? '전송 중...' : '창업 문의 신청하기'}
              </motion.button>

              <p className="mt-3 text-center text-xs text-gray-500 md:text-sm">
                영업일 기준 24시간 이내에 담당자가 연락드립니다.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

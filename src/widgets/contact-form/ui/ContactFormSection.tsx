'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useStoreCount } from '@/lib/use-store-count';

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
  const storeCount = useStoreCount();
  const storeCountLabel = storeCount?.toLocaleString('ko-KR') ?? null;

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
      className="relative overflow-hidden bg-[#fec601] py-12 md:py-16"
      ref={ref}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/new-asset/contact/contact-bg-yellow.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(255,255,255,0.36),transparent_34%),linear-gradient(90deg,rgba(255,246,212,0.58)_0%,rgba(255,218,30,0.1)_46%,rgba(255,123,0,0.16)_100%)]" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-6 px-4 sm:px-6 lg:grid-cols-[0.9fr_1fr] lg:px-8">
        <motion.div
          className="max-w-xl rounded-[18px] border-2 border-[#ff8a00]/45 bg-[#fff7df]/86 px-5 py-6 text-left shadow-[0_22px_48px_rgba(90,44,18,0.18)] backdrop-blur-[2px] md:px-7 md:py-8 lg:bg-[#fff7df]/76"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p
            className="mb-3 inline-flex rounded-full bg-[#4a260f] px-4 py-1.5 text-sm font-black uppercase tracking-[0.08em] text-[#fec601] md:text-base"
            style={{
              fontFamily: 'var(--font-heading)',
            }}
          >
            Today Omurice
          </p>
          <h2 className="mb-4 break-keep font-heading text-4xl font-black leading-[1.08] tracking-normal text-[#3a1b09] drop-shadow-[0_3px_0_rgba(255,255,255,0.62)] md:text-[4rem]">
            성공 창업,
            <br />
            <span className="text-[#e94f0b]">오늘은 오므라이스</span>입니다.
          </h2>
          <p className="max-w-md break-keep text-base font-black leading-relaxed text-[#4a260f] md:text-lg">
            {storeCountLabel
              ? `${storeCountLabel}개 점포가 선택한 오므라이스 브랜드.`
              : '전국 점포가 선택한 오므라이스 브랜드.'}
            <br />
            작은 공간에서도 안정적으로 시작할 수 있도록 상담부터 오픈까지 함께합니다.
          </p>
          <a
            href={
              isMounted
                ? `sms:010-9923-9502?body=${encodeURIComponent(smsMessage)}`
                : 'tel:010-9923-9502'
            }
            className="mt-6 inline-flex rounded-[12px] bg-[#3a1b09] px-5 py-3 font-heading text-3xl font-black tracking-tight text-[#fec601] shadow-[0_14px_28px_rgba(58,27,9,0.24)] transition hover:bg-[#ff6b12] hover:text-white md:text-4xl"
          >
            010-9923-9502
          </a>
        </motion.div>

        <motion.div
          className="mx-auto w-full max-w-[32rem] lg:ml-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="rounded-[18px] border-2 border-[#ff8a00] bg-[#fffaf0] p-4 shadow-[0_24px_60px_rgba(90,44,18,0.24)] md:p-5">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-black text-[#4a260f] md:text-sm">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-[8px] border-2 border-[#f2c26b] bg-white px-4 py-2.5 text-sm font-bold text-[#32190b] outline-none transition placeholder:text-[#9c7a5e] focus:border-[#ff6b12] focus:ring-2 focus:ring-[#fec601]/40"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-xs font-black text-[#4a260f] md:text-sm">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-[8px] border-2 border-[#f2c26b] bg-white px-4 py-2.5 text-sm font-bold text-[#32190b] outline-none transition placeholder:text-[#9c7a5e] focus:border-[#ff6b12] focus:ring-2 focus:ring-[#fec601]/40"
                    placeholder="010-1234-5678"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-black text-[#4a260f] md:text-sm">
                    이메일 <span className="text-[#8a6848]">(선택)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-[8px] border-2 border-[#f2c26b] bg-white px-4 py-2.5 text-sm font-bold text-[#32190b] outline-none transition placeholder:text-[#9c7a5e] focus:border-[#ff6b12] focus:ring-2 focus:ring-[#fec601]/40"
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="storeType" className="mb-1.5 block text-xs font-black text-[#4a260f] md:text-sm">
                    매장형태 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="storeType"
                    name="storeType"
                    required
                    value={formData.storeType}
                    onChange={handleChange}
                    className="w-full rounded-[8px] border-2 border-[#f2c26b] bg-white px-4 py-2.5 text-sm font-bold text-[#32190b] outline-none transition focus:border-[#ff6b12] focus:ring-2 focus:ring-[#fec601]/40"
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
                  <label htmlFor="region" className="mb-1.5 block text-xs font-black text-[#4a260f] md:text-sm">
                    창업지역 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="region"
                    name="region"
                    required
                    value={formData.region}
                    onChange={handleChange}
                    className="w-full rounded-[8px] border-2 border-[#f2c26b] bg-white px-4 py-2.5 text-sm font-bold text-[#32190b] outline-none transition placeholder:text-[#9c7a5e] focus:border-[#ff6b12] focus:ring-2 focus:ring-[#fec601]/40"
                    placeholder="서울 강남구"
                  />
                </div>
                <div>
                  <span className="mb-1.5 block text-xs font-black text-[#4a260f] md:text-sm">
                    점포 보유 유무 <span className="text-red-500">*</span>
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {storeOwnershipOptions.map((option) => (
                      <label
                        key={option}
                        className={`flex cursor-pointer items-center justify-center rounded-[6px] border px-3 py-2.5 text-sm font-black transition ${
                          formData.hasStore === option
                            ? 'border-[#4a260f] bg-[#4a260f] text-[#fec601]'
                            : 'border-[#f2c26b] bg-white text-[#6b4222] hover:border-[#ff6b12]/70'
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
                <label htmlFor="message" className="mb-1.5 block text-xs font-black text-[#4a260f] md:text-sm">
                  문의내역 <span className="text-[#8a6848]">(선택)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-[8px] border-2 border-[#f2c26b] bg-white px-4 py-2.5 text-sm font-bold text-[#32190b] outline-none transition placeholder:text-[#9c7a5e] focus:border-[#ff6b12] focus:ring-2 focus:ring-[#fec601]/40"
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

              <div className="rounded-[10px] border border-[#f2c26b]/70 bg-[#fff3cf] p-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacyAgree}
                    onChange={(e) => setPrivacyAgree(e.target.checked)}
                    required
                    className="mt-1 h-5 w-5 rounded border-[#f2c26b] text-[#ff6b12] focus:ring-[#fec601]"
                  />
                  <span className="text-xs font-bold leading-relaxed text-[#5a2c12] md:text-sm">
                    개인정보 수집 및 이용에 동의합니다. 수집된 정보는 창업 상담 목적으로만 사용되며,
                    관련 법령에 따라 안전하게 관리됩니다.
                  </span>
                </label>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-[12px] bg-[#ff6b12] px-8 py-3.5 text-lg font-black text-white shadow-[0_16px_32px_rgba(255,107,18,0.28)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#4a260f] hover:text-[#fec601] hover:shadow-[0_18px_38px_rgba(74,38,15,0.25)] ${
                  isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
                }`}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? '전송 중...' : '창업 문의 신청하기'}
              </motion.button>

              <p className="mt-3 text-center text-xs font-bold text-[#6b4222] md:text-sm">
                영업일 기준 24시간 이내에 담당자가 연락드립니다.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

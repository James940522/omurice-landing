'use client';

import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const initialFormData = {
  name: '',
  phone: '',
  region: '',
};

export default function FloatingInquiry() {
  const [isVisible, setIsVisible] = useState(false);
  const [isContactInView, setIsContactInView] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [privacyAgree, setPrivacyAgree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hp, setHp] = useState('');

  useEffect(() => {
    const contactSection = document.getElementById('contact');
    const observer = contactSection
      ? new IntersectionObserver(
          ([entry]) => {
            setIsContactInView(entry.isIntersecting);
          },
          { threshold: 0.12 }
        )
      : null;

    if (contactSection && observer) observer.observe(contactSection);
    setIsVisible(true);

    return () => observer?.disconnect();
  }, []);

  const shouldShow = isVisible && !isContactInView;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!formData.name.trim() || !formData.phone.trim() || !formData.region.trim()) {
      alert('성함, 연락처, 희망지역을 입력해주세요.');
      return;
    }

    if (!privacyAgree) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const domain = typeof window !== 'undefined' ? window.location.hostname : '';
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: '',
          storeType: '기타매장',
          region: formData.region,
          hasStore: '없음',
          message: '하단 빠른 가맹문의 바에서 접수되었습니다.',
          privacyAgree: true,
          hp,
          domain,
        }),
      });

      if (!res.ok) {
        if (res.status === 429) {
          alert('너무 많은 요청입니다. 잠시 후 다시 시도해주세요.');
          return;
        }

        throw new Error('SEND_FAIL');
      }

      alert('가맹문의가 접수되었습니다. 순차적으로 연락드리겠습니다.');
      setFormData(initialFormData);
      setPrivacyAgree(false);
      setHp('');
    } catch (error) {
      console.error('Floating inquiry submission error:', error);
      alert('전송 실패. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.aside
          className="fixed inset-x-0 bottom-0 z-[2147483647] overflow-hidden border-t-2 border-[#fec601] bg-[#4a260f] shadow-[0_-14px_34px_rgba(32,14,4,0.26)] lg:border-t-[3px]"
          initial={{ opacity: 0, y: 90 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 90 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          aria-label="빠른 가맹문의"
        >
          <div className="h-1 bg-linear-to-r from-[#ff6b12] via-[#fec601] to-[#ff6b12]" />
          <div className="pointer-events-none absolute left-0 top-1 hidden h-px w-full bg-linear-to-r from-transparent via-white/45 to-transparent lg:block" />
          <div className="pointer-events-none absolute -left-20 top-2 hidden h-20 w-80 rotate-[-6deg] bg-[#ff6b12]/20 lg:block" />
          <div className="pointer-events-none absolute -right-24 bottom-0 hidden h-20 w-96 rotate-[5deg] bg-[#fec601]/20 lg:block" />
          <form
            onSubmit={handleSubmit}
            className="relative mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-3 py-2 [scrollbar-width:none] sm:gap-3 sm:px-5 lg:max-w-[1480px] lg:gap-4 lg:overflow-visible lg:px-10 lg:py-3 [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex min-w-[112px] shrink-0 items-center gap-2 sm:min-w-[210px] lg:min-w-[318px] lg:gap-3">
              <p className="font-heading text-base font-black leading-none text-white sm:text-lg lg:text-xl">
                빠른 가맹문의
              </p>
              <a
                href="tel:010-9923-9502"
                className="hidden whitespace-nowrap font-heading text-2xl font-black tracking-tight text-[#fec601] sm:block lg:text-[2.25rem]"
              >
                010-9923-9502
              </a>
            </div>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="h-9 w-[104px] shrink-0 rounded-[6px] border border-[#f7c88b] bg-white px-3 text-sm font-black text-[#32190b] outline-none placeholder:text-[#9b8571] focus:border-[#fec601] focus:ring-2 focus:ring-[#fec601]/40 sm:h-10 sm:w-[128px] lg:h-12 lg:w-[172px] lg:rounded-[10px] lg:px-4 lg:text-base"
              placeholder="성함"
              autoComplete="name"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="h-9 w-[128px] shrink-0 rounded-[6px] border border-[#f7c88b] bg-white px-3 text-sm font-black text-[#32190b] outline-none placeholder:text-[#9b8571] focus:border-[#fec601] focus:ring-2 focus:ring-[#fec601]/40 sm:h-10 sm:w-[150px] lg:h-12 lg:w-[190px] lg:rounded-[10px] lg:px-4 lg:text-base"
              placeholder="연락처"
              autoComplete="tel"
            />
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="h-9 w-[118px] shrink-0 rounded-[6px] border border-[#f7c88b] bg-white px-3 text-sm font-black text-[#32190b] outline-none placeholder:text-[#9b8571] focus:border-[#fec601] focus:ring-2 focus:ring-[#fec601]/40 sm:h-10 sm:w-[142px] lg:h-12 lg:w-[182px] lg:rounded-[10px] lg:px-4 lg:text-base"
              placeholder="희망지역"
            />

            <input
              type="text"
              name="hp"
              value={hp}
              onChange={(event) => setHp(event.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <label className="flex min-w-[132px] shrink-0 cursor-pointer items-center gap-2 text-xs font-black leading-tight text-white sm:min-w-[152px] lg:min-w-[172px] lg:text-sm">
              <input
                type="checkbox"
                checked={privacyAgree}
                onChange={(event) => setPrivacyAgree(event.target.checked)}
                className="h-4 w-4 rounded border-white/60 text-[#ff6b12] focus:ring-[#fec601] lg:h-5 lg:w-5"
              />
              개인정보 동의
            </label>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`h-9 min-w-[112px] shrink-0 rounded-[6px] bg-[#fec601] px-4 text-sm font-black text-[#32190b] shadow-[0_8px_18px_rgba(0,0,0,0.18)] transition hover:bg-[#ffdd39] sm:h-10 sm:min-w-[154px] sm:text-base lg:h-12 lg:min-w-[190px] lg:rounded-[10px] lg:text-lg ${
                isSubmitting ? 'cursor-not-allowed opacity-60' : ''
              }`}
              whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
            >
              {isSubmitting ? '접수 중' : '가맹문의 신청'}
            </motion.button>
          </form>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

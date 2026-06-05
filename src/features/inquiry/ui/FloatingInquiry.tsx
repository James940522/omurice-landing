'use client';

import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { sanitizePhoneInput, validateInquiryLead } from '@/shared/lib/utils';

const initialFormData = {
  name: '',
  phone: '',
  region: '',
};

export default function FloatingInquiry() {
  const [isVisible, setIsVisible] = useState(false);
  const [isContactInView, setIsContactInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [hasUserCollapsed, setHasUserCollapsed] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [privacyAgree, setPrivacyAgree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hp, setHp] = useState('');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleMediaChange = () => {
      const matches = mediaQuery.matches;
      setIsMobile(matches);
      if (!matches) {
        setIsMobileExpanded(false);
        setHasUserCollapsed(false);
      }
    };

    handleMediaChange();
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

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

  useEffect(() => {
    if (!isMobile) return;

    const heroSection = document.getElementById('hero');
    if (!heroSection) {
      setIsMobileExpanded(!hasUserCollapsed);
      return;
    }

    const syncMobileExpandedState = () => {
      const heroRect = heroSection.getBoundingClientRect();
      const heroAlmostLeft = heroRect.bottom <= window.innerHeight * 0.18;

      if (!heroAlmostLeft) {
        setIsMobileExpanded(false);
        setHasUserCollapsed(false);
        return;
      }

      if (!hasUserCollapsed) {
        setIsMobileExpanded(true);
      }
    };

    syncMobileExpandedState();
    window.addEventListener('scroll', syncMobileExpandedState, { passive: true });
    window.addEventListener('resize', syncMobileExpandedState);

    return () => {
      window.removeEventListener('scroll', syncMobileExpandedState);
      window.removeEventListener('resize', syncMobileExpandedState);
    };
  }, [hasUserCollapsed, isMobile]);

  const shouldShow = isVisible && !isContactInView;
  const isSubmitDisabled = isSubmitting || !privacyAgree;

  const handleMobileOpen = () => {
    setIsMobileExpanded(true);
    setHasUserCollapsed(false);
  };

  const handleMobileCollapse = () => {
    setIsMobileExpanded(false);
    setHasUserCollapsed(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'phone' ? sanitizePhoneInput(value) : value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const validation = validateInquiryLead({
      name: formData.name,
      phone: formData.phone,
      region: formData.region,
      privacyAgree,
    });

    if (!validation.valid) {
      alert(validation.message);
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
      {shouldShow && isMobile && !isMobileExpanded && (
        <motion.button
          type="button"
          onClick={handleMobileOpen}
          className="fixed inset-x-3 bottom-3 z-[2147483647] flex items-center justify-between gap-3 rounded-full border-2 border-[#fec601] bg-[#4a260f] px-4 py-3 text-left shadow-[0_14px_30px_rgba(32,14,4,0.32)] md:hidden"
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 70 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          aria-label="빠른 가맹문의 다시 열기"
        >
          <span className="min-w-0">
            <span className="block font-heading text-sm font-black leading-none text-white">
              빠른 가맹문의
            </span>
            <span className="mt-1 block whitespace-nowrap font-heading text-lg font-black leading-none text-[#fec601]">
              010-9923-9502
            </span>
          </span>
          <span className="shrink-0 rounded-full bg-[#fec601] px-4 py-2 font-black text-[#32190b]">
            열기
          </span>
        </motion.button>
      )}

      {shouldShow && isMobile && isMobileExpanded && (
        <motion.aside
          className="fixed inset-x-0 bottom-0 z-[2147483647] overflow-hidden rounded-t-[22px] border-t-2 border-[#fec601] bg-[#4a260f] shadow-[0_-16px_36px_rgba(32,14,4,0.32)] md:hidden"
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 120 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          aria-label="빠른 가맹문의"
        >
          <div className="h-1 bg-linear-to-r from-[#ff6b12] via-[#fec601] to-[#ff6b12]" />
          <form
            onSubmit={handleSubmit}
            className="relative mx-auto flex w-full max-w-[440px] flex-col gap-2 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-2"
          >
            <button
              type="button"
              onClick={handleMobileCollapse}
              className="mx-auto mb-1 flex h-8 items-center justify-center rounded-full border border-[#fec601]/55 bg-[#32190b]/75 px-5 text-xs font-black text-[#fff8ea]"
            >
              접기
            </button>

            <div className="flex items-center justify-between gap-2 rounded-[12px] border border-[#fec601]/28 bg-[#32190b]/62 px-3 py-3 min-[380px]:gap-3 min-[380px]:px-4">
              <p className="shrink-0 font-heading text-sm font-black leading-none text-white min-[380px]:text-base">
                빠른 가맹문의
              </p>
              <a
                href="tel:010-9923-9502"
                className="whitespace-nowrap font-heading text-[clamp(1.02rem,5.2vw,1.25rem)] font-black leading-none tracking-tight text-[#fec601]"
              >
                010-9923-9502
              </a>
            </div>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              maxLength={30}
              className="h-11 w-full rounded-[10px] border border-[#f7c88b] bg-white px-4 text-base font-black text-[#32190b] outline-none placeholder:text-[#9b8571] focus:border-[#fec601] focus:ring-2 focus:ring-[#fec601]/40"
              placeholder="성함"
              autoComplete="name"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              inputMode="numeric"
              maxLength={13}
              pattern="[0-9-]*"
              className="h-11 w-full rounded-[10px] border border-[#f7c88b] bg-white px-4 text-base font-black text-[#32190b] outline-none placeholder:text-[#9b8571] focus:border-[#fec601] focus:ring-2 focus:ring-[#fec601]/40"
              placeholder="연락처"
              autoComplete="tel"
            />
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              maxLength={40}
              className="h-11 w-full rounded-[10px] border border-[#f7c88b] bg-white px-4 text-base font-black text-[#32190b] outline-none placeholder:text-[#9b8571] focus:border-[#fec601] focus:ring-2 focus:ring-[#fec601]/40"
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

            <label className="flex min-w-0 cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-[#fec601]/22 bg-[#32190b]/62 px-4 py-3 text-sm font-black leading-tight text-white">
              <input
                type="checkbox"
                checked={privacyAgree}
                onChange={(event) => setPrivacyAgree(event.target.checked)}
                className="h-5 w-5 rounded border-white/60 text-[#ff6b12] focus:ring-[#fec601]"
              />
              개인정보 동의
            </label>

            <motion.button
              type="submit"
              disabled={isSubmitDisabled}
              className={`h-12 w-full rounded-[12px] bg-[#fec601] px-4 text-base font-black leading-tight text-[#32190b] shadow-[0_10px_22px_rgba(0,0,0,0.18)] transition active:bg-[#ffdd39] ${
                isSubmitDisabled ? 'cursor-not-allowed opacity-55' : ''
              }`}
              whileTap={{ scale: isSubmitDisabled ? 1 : 0.98 }}
            >
              {isSubmitting ? '접수 중' : '가맹문의 신청'}
            </motion.button>
          </form>
        </motion.aside>
      )}

      {shouldShow && !isMobile && (
        <motion.aside
          className="fixed inset-x-0 bottom-0 z-[2147483647] hidden overflow-hidden border-t-2 border-[#fec601] bg-[#4a260f] shadow-[0_-14px_34px_rgba(32,14,4,0.26)] md:block lg:border-t-[3px]"
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
            className="relative mx-auto grid w-full max-w-7xl grid-cols-2 items-center gap-2 px-3 py-3 sm:grid-cols-[auto_1fr_1fr_1fr] sm:gap-3 sm:px-5 lg:flex lg:max-w-[1480px] lg:justify-center lg:gap-[clamp(0.45rem,0.8vw,0.75rem)] lg:px-[clamp(0.9rem,1.8vw,2.5rem)] lg:py-3"
          >
            <div className="col-span-2 flex min-w-0 items-center justify-between gap-2 sm:col-span-1 sm:min-w-[190px] sm:flex-col sm:items-start sm:justify-center lg:min-w-[clamp(238px,22vw,318px)] lg:flex-row lg:items-center lg:gap-[clamp(0.35rem,0.7vw,0.75rem)]">
              <p className="shrink-0 font-heading text-base font-black leading-none text-white sm:text-lg lg:text-[clamp(0.86rem,1.25vw,1.25rem)]">
                빠른 가맹문의
              </p>
              <a
                href="tel:010-9923-9502"
                className="whitespace-nowrap font-heading text-[clamp(1.12rem,6.4vw,1.45rem)] font-black leading-none tracking-tight text-[#fec601] sm:text-xl lg:text-[clamp(1.32rem,2.05vw,2.1rem)]"
              >
                010-9923-9502
              </a>
            </div>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              maxLength={30}
              className="h-10 min-w-0 rounded-[6px] border border-[#f7c88b] bg-white px-3 text-sm font-black text-[#32190b] outline-none placeholder:text-[#9b8571] focus:border-[#fec601] focus:ring-2 focus:ring-[#fec601]/40 sm:h-10 lg:h-12 lg:w-[clamp(120px,10.2vw,164px)] lg:shrink-0 lg:rounded-[10px] lg:px-3 lg:text-[clamp(0.78rem,0.9vw,0.95rem)] xl:px-4"
              placeholder="성함"
              autoComplete="name"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              inputMode="numeric"
              maxLength={13}
              pattern="[0-9-]*"
              className="h-10 min-w-0 rounded-[6px] border border-[#f7c88b] bg-white px-3 text-sm font-black text-[#32190b] outline-none placeholder:text-[#9b8571] focus:border-[#fec601] focus:ring-2 focus:ring-[#fec601]/40 sm:h-10 lg:h-12 lg:w-[clamp(128px,11vw,178px)] lg:shrink-0 lg:rounded-[10px] lg:px-3 lg:text-[clamp(0.78rem,0.9vw,0.95rem)] xl:px-4"
              placeholder="연락처"
              autoComplete="tel"
            />
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              maxLength={40}
              className="h-10 min-w-0 rounded-[6px] border border-[#f7c88b] bg-white px-3 text-sm font-black text-[#32190b] outline-none placeholder:text-[#9b8571] focus:border-[#fec601] focus:ring-2 focus:ring-[#fec601]/40 sm:h-10 lg:h-12 lg:w-[clamp(120px,10.8vw,170px)] lg:shrink-0 lg:rounded-[10px] lg:px-3 lg:text-[clamp(0.78rem,0.9vw,0.95rem)] xl:px-4"
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

            <label className="flex min-w-0 cursor-pointer items-center justify-center gap-2 text-xs font-black leading-tight text-white sm:justify-start lg:min-w-[clamp(104px,9vw,144px)] lg:shrink-0 lg:text-[clamp(0.68rem,0.82vw,0.86rem)]">
              <input
                type="checkbox"
                checked={privacyAgree}
                onChange={(event) => setPrivacyAgree(event.target.checked)}
                className="h-4 w-4 shrink-0 rounded border-white/60 text-[#ff6b12] focus:ring-[#fec601] lg:h-5 lg:w-5"
              />
              개인정보 동의
            </label>

            <motion.button
              type="submit"
              disabled={isSubmitDisabled}
              className={`h-10 min-w-0 break-keep rounded-[6px] bg-[#fec601] px-3 text-sm font-black leading-tight text-[#32190b] shadow-[0_8px_18px_rgba(0,0,0,0.18)] transition hover:bg-[#ffdd39] sm:h-10 sm:text-base lg:h-12 lg:min-w-[clamp(136px,11.5vw,184px)] lg:shrink-0 lg:rounded-[10px] lg:text-[clamp(0.84rem,1vw,1.08rem)] ${
                isSubmitDisabled ? 'cursor-not-allowed opacity-55' : ''
              }`}
              whileHover={{ scale: isSubmitDisabled ? 1 : 1.03 }}
              whileTap={{ scale: isSubmitDisabled ? 1 : 0.97 }}
            >
              {isSubmitting ? '접수 중' : '가맹문의 신청'}
            </motion.button>
          </form>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

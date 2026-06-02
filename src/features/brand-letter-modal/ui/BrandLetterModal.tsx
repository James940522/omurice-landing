'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { BaseModal } from '@/shared/ui';

interface BrandLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BrandLetterModal({ isOpen, onClose }: BrandLetterModalProps) {
  const [imgError, setImgError] = useState(false);
  const [dontShowToday, setDontShowToday] = useState(false);

  useEffect(() => {
    if (isOpen) setImgError(false);
  }, [isOpen]);

  const handleClose = () => {
    if (dontShowToday) {
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0);
      localStorage.setItem('hideModal_brand-letter', tomorrow.getTime().toString());
    }

    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      modalId="brand-letter"
      position={{
        mobile: { left: 'left-[50%]', top: 'top-24', transform: 'translate-x-[-50%]' },
        desktop: { left: 'sm:left-4', top: 'sm:top-28' },
      }}
      width="w-[calc(100vw-2rem)] max-w-[620px]"
      maxHeight="max-h-[calc(100svh-7rem)] sm:max-h-[calc(100svh-8rem)]"
      className="overflow-hidden rounded-[22px] border-2 border-[#ff7a00] bg-[#ffb800] p-2 shadow-2xl sm:p-3"
      customFooter={
        <div className="mt-2 grid grid-cols-[1fr_104px] items-center gap-2 rounded-xl bg-white/55 p-2 sm:grid-cols-[1fr_132px]">
          <label className="flex cursor-pointer items-center justify-center gap-2 text-xs font-bold text-[#4a260f] sm:text-sm">
            <input
              type="checkbox"
              checked={dontShowToday}
              onChange={(event) => setDontShowToday(event.target.checked)}
              className="h-4 w-4 rounded border-2 border-[#8a6848] text-[#ff6b12] focus:ring-2 focus:ring-[#fec601] sm:h-5 sm:w-5"
            />
            오늘 하루 창 열지 않기
          </label>
          <button
            type="button"
            onClick={handleClose}
            className="h-10 rounded-lg border-2 border-[#e7d5bd] bg-white text-sm font-black text-gray-900 shadow-sm transition hover:bg-gray-50 sm:h-11 sm:text-base"
          >
            닫기
          </button>
        </div>
      }
    >
      <div className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-[#f6b600]">
        {imgError ? (
          <div className="px-4 py-14 text-center text-sm font-bold text-[#5a2c12]">
            이미지를 불러올 수 없습니다.
          </div>
        ) : (
          <Image
            src="/new-asset/notice/brand-letter-modal.webp"
            alt="오늘은 오므라이스 브랜드 소개"
            width={1254}
            height={1254}
            className="h-auto max-h-[calc(100svh-13rem)] w-auto max-w-full object-contain sm:max-h-[calc(100svh-14rem)]"
            sizes="(max-width: 640px) calc(100vw - 2rem), 620px"
            priority
            unoptimized
            onError={() => setImgError(true)}
          />
        )}
      </div>
    </BaseModal>
  );
}

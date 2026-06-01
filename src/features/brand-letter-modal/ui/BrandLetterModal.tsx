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

  useEffect(() => {
    if (isOpen) setImgError(false);
  }, [isOpen]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      modalId="brand-letter"
      position={{
        mobile: { left: 'left-[50%]', top: 'top-24', transform: 'translate-x-[-50%]' },
        desktop: { left: 'sm:left-4', top: 'sm:top-28' },
      }}
      width="w-[94vw] sm:w-[min(620px,92vw)]"
      maxHeight="max-h-[calc(100vh-7rem)] sm:max-h-[82vh]"
      className="overflow-hidden rounded-[22px] border-2 border-[#ff7a00] bg-[#ffb800] p-2 shadow-2xl sm:p-3"
    >
      <div className="relative flex min-h-[260px] w-full items-center justify-center overflow-hidden rounded-2xl bg-[#f6b600]">
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
            className="h-auto w-full object-contain"
            sizes="(max-width: 640px) 94vw, 620px"
            priority
            unoptimized
            onError={() => setImgError(true)}
          />
        )}
      </div>
    </BaseModal>
  );
}

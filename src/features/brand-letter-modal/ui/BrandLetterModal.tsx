'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnnouncementModal, type ModalSequence } from '@/shared/ui';

interface BrandLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  sequence?: ModalSequence;
}

export default function BrandLetterModal({ isOpen, onClose, sequence }: BrandLetterModalProps) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (isOpen) setImgError(false);
  }, [isOpen]);

  return (
    <AnnouncementModal
      isOpen={isOpen}
      onClose={onClose}
      modalId="brand-letter"
      title="브랜드 안내"
      sequence={sequence}
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
    </AnnouncementModal>
  );
}

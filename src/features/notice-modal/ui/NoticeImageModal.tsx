'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { BaseModal } from '@/shared/ui';

interface NoticeImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  modalId: string;
  title?: string;
}

export default function NoticeImageModal({
  isOpen,
  onClose,
  imageSrc,
  modalId,
  title,
}: NoticeImageModalProps) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (isOpen) setImgError(false);
  }, [isOpen, imageSrc]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      modalId={modalId}
      position={{
        mobile: { left: 'left-[50%]', top: 'top-16', transform: 'translate-x-[-50%]' },
        desktop: { left: 'sm:left-4', top: 'sm:top-20' },
      }}
      width="w-[96vw] sm:w-[min(560px,92vw)]"
      maxHeight="max-h-[calc(100vh-4rem)] sm:max-h-[92vh]"
      className="bg-white border-2 border-gray-200 rounded-2xl p-2 sm:p-3 shadow-xl"
    >
      <div className="relative w-full min-h-[240px] flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
        {imgError ? (
          <div className="py-12 px-4 text-center text-gray-500 text-sm">
            이미지를 불러올 수 없습니다.
          </div>
        ) : (
          <Image
            src={imageSrc}
            alt={title ?? '공지 이미지'}
            width={800}
            height={1200}
            className="w-full h-auto max-w-full object-contain"
            unoptimized
            sizes="(max-width: 640px) 96vw, 560px"
            onError={() => setImgError(true)}
          />
        )}
      </div>
    </BaseModal>
  );
}

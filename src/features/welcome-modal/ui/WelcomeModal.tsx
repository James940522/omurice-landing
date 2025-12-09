'use client';

import Image from 'next/image';
import { BaseModal } from '@/shared/ui';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToContact: () => void;
}

export default function WelcomeModal({ isOpen, onClose, onNavigateToContact }: WelcomeModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      modalId="owner-recruitment"
      position={{
        desktop: { left: 'sm:left-4', top: 'sm:top-4' },
      }}
      width="w-[90vw] sm:w-[400px]"
      className="bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 border-4 sm:border-[6px] border-yellow-500 rounded-3xl p-3 sm:p-6 shadow-xl"
      header={
        <div className="text-center py-4 px-4">
          <p className="text-xs font-bold text-orange-600 mb-3">정직브랜드 1위</p>

          <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-3 leading-tight">
            오늘은 오므라이스
            <br />
            창업의 마지막 기회!
          </h2>

          <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 mb-2 drop-shadow-md">
            2025
          </div>

          {/* 로고 이미지 */}
          <div className="relative w-48 h-16 mx-auto mb-2">
            <Image
              src="/asset/logo/오므라이스_문구.png"
              alt="오늘은 오므라이스"
              fill
              className="object-contain"
            />
          </div>

          <div className="text-xl sm:text-2xl font-black text-gray-900">오너 모집 공고</div>
        </div>
      }
    >
      {/* Content */}
      <div className="px-4 sm:px-6 pb-4">
        {/* 메뉴 이미지 */}
        <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden mb-4 shadow-lg border-4 border-orange-300">
          <Image
            src="/asset/menu/오늘은_오므라이스/메뉴모음컷/메뉴모음컷 2 작은사이즈.jpg"
            alt="오늘은 오므라이스 메뉴"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        </div>

        {/* 혜택 박스들 */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl p-3 sm:p-4 text-center shadow-md">
            <p className="text-sm sm:text-base font-bold">교육비 면제</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl p-3 sm:p-4 text-center shadow-md">
            <p className="text-sm sm:text-base font-bold">로열티 면제</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl p-3 sm:p-4 text-center shadow-md">
          <p className="text-sm sm:text-base font-bold">인테리어 자율시공</p>
        </div>
      </div>
    </BaseModal>
  );
}

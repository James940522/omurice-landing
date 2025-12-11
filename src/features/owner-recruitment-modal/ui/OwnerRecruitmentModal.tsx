'use client';

import Image from 'next/image';
import { BaseModal } from '@/shared/ui';

interface OwnerRecruitmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToContact: () => void;
}

export default function OwnerRecruitmentModal({
  isOpen,
  onClose,
  onNavigateToContact,
}: OwnerRecruitmentModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      modalId="owner-recruitment"
      position={{
        mobile: { left: 'left-[50%]', top: 'top-16', transform: 'translate-x-[-50%]' },
        desktop: { left: 'sm:left-4', top: 'sm:top-20' },
      }}
      width="w-[90vw] sm:w-[400px]"
      className="bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 border-4 sm:border-[6px] border-yellow-500 rounded-3xl p-3 sm:p-6 shadow-xl"
      header={
        <div className="text-center py-4 px-4">
          <p
            className="text-xs sm:text-sm font-bold text-orange-600 mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            정직브랜드 1위
          </p>

          <h2
            className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            오늘은 오므라이스
            <br />
            창업의 마지막 기회!
          </h2>

          <div
            className="text-5xl sm:text-6xl font-bold text-yellow-500 mb-2 drop-shadow-md"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
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

          <div
            className="text-xl sm:text-2xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            오너 모집 공고
          </div>

          {/* 추가 문구 */}
          <div className="bg-yellow-400 rounded-xl p-3 shadow-lg mb-2">
            <p
              className="text-sm sm:text-base font-bold text-gray-900 leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              대한민국 1등 오므라이스
              <br />
              선착순 창업혜택 이벤트
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-2">
            <p
              className="text-xs sm:text-sm font-medium text-white"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              모든 창업고민 해결
            </p>
            <a
              href="tel:010-9923-9502"
              className="text-base sm:text-lg font-bold text-yellow-400 hover:text-yellow-300 transition-colors"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              010-9923-9502
            </a>
          </div>
        </div>
      }
    >
      {/* Content */}
      <div className="px-4 sm:px-6 pb-4">
        {/* 메뉴 이미지 */}
        <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden mb-4 shadow-lg border-4 border-orange-300">
          <Image
            src="/asset/menu/오늘은_오므라이스/메뉴모음컷/modal.jpg"
            alt="오늘은 오므라이스 메뉴"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        </div>

        {/* 혜택 박스들 */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-yellow-400 text-gray-900 rounded-xl p-3 sm:p-4 text-center shadow-md">
            <p
              className="text-sm sm:text-base font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              교육비 면제
            </p>
          </div>
          <div className="bg-yellow-400 text-gray-900 rounded-xl p-3 sm:p-4 text-center shadow-md">
            <p
              className="text-sm sm:text-base font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              로열티 면제
            </p>
          </div>
        </div>

        <div className="bg-yellow-400 text-gray-900 rounded-xl p-3 sm:p-4 text-center shadow-md mb-4">
          <p
            className="text-sm sm:text-base font-bold"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            인테리어 자율시공
          </p>
        </div>

        {/* 공고 지원하기 버튼 */}
        <button
          onClick={onNavigateToContact}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 border-4 border-red-700"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          <span className="text-lg sm:text-xl">공고 지원하기</span>
        </button>
      </div>
    </BaseModal>
  );
}

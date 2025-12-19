'use client';

import { useState, useEffect } from 'react';
import { BaseModal } from '@/shared/ui';
import StoreItem from './StoreItem';
import ComingSoonItem from './ComingSoonItem';
import { fetchStores } from '@/lib/stores';

interface StoreStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StoreStatusModal({ isOpen, onClose }: StoreStatusModalProps) {
  // CSV 데이터에서 동적으로 가맹점 리스트를 가져옴
  const [stores, setStores] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // CSV에서 매장 데이터 로드
    const loadStores = async () => {
      try {
        const storeData = await fetchStores();
        // branch_name만 추출
        const storeNames = storeData.map((store) => store.branch_name);
        setStores(storeNames);
      } catch (error) {
        console.error('Failed to load stores:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStores();
  }, []);

  const comingSoonCount = 0; // 현재 104개 매장 운영 중

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      modalId="store-status"
      position={{
        mobile: { left: 'left-[50%]', top: 'top-16', transform: 'translate-x-[-50%]' },
        desktop: { left: 'sm:left-[420px]', top: 'sm:top-20' },
      }}
      width="w-[95vw] sm:w-[580px]"
      className="bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 border-4 sm:border-[6px] border-yellow-500 rounded-3xl p-3 sm:p-6 shadow-xl"
      header={
        <>
          {/* 메인 타이틀 */}
          <div className="text-center mb-4 sm:mb-5">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight"
              style={{
                fontFamily: 'var(--font-heading)',
                color: '#FFC107',
                textShadow:
                  '-2px -2px 0 #FF6B00, 2px -2px 0 #FF6B00, -2px 2px 0 #FF6B00, 2px 2px 0 #FF6B00, 4px 4px 0 #FF8C00, 6px 6px 0 #FF6B00, 8px 8px 12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 193, 7, 0.6)',
              }}
            >
              최단기간 104호점
              <br />
              달성 신화
            </h2>
          </div>

          {/* 서브 타이틀 */}
          <div className="text-center mb-3 sm:mb-4">
            <h3
              className="text-lg sm:text-xl font-bold text-gray-900"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              가맹점 현황 {!isLoading && stores.length > 0 && `(${stores.length}개 운영 중)`}
            </h3>
          </div>
        </>
      }
    >
      {/* Content - 가맹점 리스트 */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 sm:p-3 shadow-lg border border-yellow-200 max-h-[60vh] overflow-y-auto sm:max-h-none sm:overflow-y-visible">
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">매장 정보를 불러오는 중...</p>
          </div>
        ) : (
          <div className="grid grid-cols-5 sm:grid-cols-6 gap-y-1 gap-x-1 sm:gap-y-1.5 sm:gap-x-1.5 justify-items-center pb-2 sm:pb-4">
            {stores.map((store, index) => (
              <StoreItem key={index} storeName={store} />
            ))}

            {comingSoonCount > 0 &&
              [...Array(comingSoonCount)].map((_, index) => (
                <ComingSoonItem key={`coming-${index}`} />
              ))}
          </div>
        )}
      </div>
    </BaseModal>
  );
}

'use client';

import { useState, useEffect, useMemo } from 'react';
import { BaseModal } from '@/shared/ui';
import StoreItem from './StoreItem';
import { fetchStores } from '@/lib/stores';
import type { Store } from '@/lib/stores';
import { useStoreCount } from '@/lib/use-store-count';

interface StoreStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const getSortTime = (store: Store) => {
  const openDate = store.open_date?.trim() ?? '';
  if (!DATE_PATTERN.test(openDate)) return 0;
  return new Date(`${openDate}T00:00:00+09:00`).getTime();
};

export default function StoreStatusModal({ isOpen, onClose }: StoreStatusModalProps) {
  // CSV 데이터에서 동적으로 가맹점 리스트를 가져옴
  const [stores, setStores] = useState<Store[]>([]);
  const storeCount = useStoreCount();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // CSV에서 매장 데이터 로드
    const loadStores = async () => {
      try {
        const storeData = await fetchStores();
        setStores(storeData);
      } catch (error) {
        console.error('Failed to load stores:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStores();
  }, []);

  const sortedStores = useMemo(
    () =>
      [...stores].sort((a, b) => {
        const timeDiff = getSortTime(a) - getSortTime(b);
        if (timeDiff !== 0) return timeDiff;
        return Number(a.store_code) - Number(b.store_code);
      }),
    [stores]
  );
  const displayStoreCount = storeCount ?? stores.length;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      modalId="store-status"
      position={{
        mobile: { left: 'left-[50%]', top: 'top-16', transform: 'translate-x-[-50%]' },
        desktop: { left: 'sm:left-[420px]', top: 'sm:top-20' },
      }}
      width="w-[95vw] sm:w-[820px]"
      className="overflow-hidden rounded-[18px] border-4 border-[#ffb21a] bg-[#5a2c12] p-0 shadow-xl sm:border-[6px]"
      header={
        <div className="relative overflow-hidden bg-linear-to-b from-[#6b3a17] via-[#4a260f] to-[#2f1608] px-4 py-6 text-center sm:px-8 sm:py-7">
          <div
            className="absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.72) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.72) 1px, transparent 1px)',
              backgroundSize: '34px 34px',
            }}
          />
          <div className="absolute -left-16 top-5 h-20 w-56 rotate-[-11deg] bg-[#fec601]/18" />
          <div className="absolute -right-16 bottom-4 h-20 w-56 rotate-[10deg] bg-[#ff6b12]/22" />

          <div className="relative z-10">
            <p className="font-heading text-lg font-black text-white/90 sm:text-2xl">
              가맹사업 1년만에{' '}
              <span className="text-[#fec601] drop-shadow-[0_3px_0_rgba(84,39,12,0.8)]">
                100호점
              </span>{' '}
              달성!
            </p>
            <h2 className="mt-2 break-keep font-heading text-4xl font-black leading-none text-[#fff7e8] drop-shadow-[0_6px_0_rgba(37,18,7,0.85)] sm:text-6xl">
              오늘은 오므라이스
              <br className="sm:hidden" /> 오픈 현황
            </h2>
            <div className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full border border-[#fec601]/45 bg-[#fff7e8]/12 px-4 py-2 text-xs font-black text-[#fff1c0] sm:text-sm">
              <span>전국 {displayStoreCount || '-'}개 점포</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#fec601]" />
              <span>오픈으로 증명한 브랜드</span>
            </div>
          </div>
        </div>
      }
    >
      <div className="max-h-[62vh] overflow-y-auto bg-linear-to-b from-[#3b1b0b] via-[#532a12] to-[#3b1b0b] p-3 sm:p-5">
        {isLoading ? (
          <div className="rounded-xl bg-[#fffaf0] py-8 text-center">
            <p className="font-bold text-[#5a2c12]">매장 정보를 불러오는 중...</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-center">
              <p className="break-keep font-heading text-sm font-black text-[#fff1c0] sm:text-base">
                한 그릇의 기준이 전국으로 넓어지는 중입니다.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-2.5 lg:grid-cols-6">
              {sortedStores.map((store) => (
                <StoreItem key={store.store_code} store={store} />
              ))}
            </div>
            <div className="mt-5 rounded-2xl border-2 border-[#ffb21a]/70 bg-[#fffaf0] px-4 py-4 shadow-[0_10px_24px_rgba(34,14,4,0.24)] sm:px-6 sm:py-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-7">
                <div className="flex items-center justify-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#1346a0] bg-white text-xs font-black text-[#1346a0] sm:h-12 sm:w-12">
                    TEL
                  </span>
                  <a
                    href="tel:010-9923-9502"
                    className="font-heading text-3xl font-black tracking-tight text-[#1346a0] sm:text-4xl"
                  >
                    010-9923-9502
                  </a>
                </div>
                <p className="break-keep text-center text-sm font-bold leading-relaxed text-[#2f1608] sm:text-left sm:text-base">
                  <mark className="rounded bg-[#fec601]/70 px-1 font-black text-[#4a260f]">
                    가맹문의 폭주
                  </mark>
                  로 인하여 상담이 지연될 수 있습니다.
                  <br />
                  순차적으로 연락드리고 있으니, 너른 양해 부탁드립니다.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </BaseModal>
  );
}

'use client';

import { BaseModal } from '@/shared/ui';
import StoreItem from './StoreItem';
import ComingSoonItem from './ComingSoonItem';

interface StoreStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StoreStatusModal({ isOpen, onClose }: StoreStatusModalProps) {
  // CSV 데이터 기반 전체 가맹점 리스트
  const stores = [
    '동대문점',
    '마포점',
    '신림점',
    '연신내점',
    '진주점',
    '강동점',
    '사하점',
    '해운대점',
    '중랑점',
    '안양점',
    '금천점',
    '수유점',
    '양정점',
    '광진점',
    '부천점',
    '안산점',
    '포항 북구 홍해점',
    '포항 북구점',
    '포항 남구 오천점',
    '강남점',
    '송파점',
    '충북점',
    '하남점',
    '순천점',
    '양산점 웅상점',
    '부산기장점',
    '대전점',
    '세종점',
    '구리점',
    '세종 조치원점',
    '충남 공주점',
    '영등포점',
    '양산평산점',
    '산본점',
    '부산 강서점',
    '전남광양점',
    '전남중마점',
    '광주월계점',
    '대구서구점',
    '천안점',
    '대구율하점',
    '대구수성점',
    '경남진해점',
    '성신여대점',
    '제주점',
    '분당수내점',
    '천안쌍용점',
    '수원인계점',
    '부평점',
    '안산고잔점',
    '경남김해점',
    '부산대연점',
    '전남완도점',
    '경주안강점',
    '경주황상점',
    '전남여수점',
    '진해용원점',
    '용인수지점',
    '아산배방점',
    '부산사직점',
    '화성봉담점',
    '강원원주점',
    '여주점',
    '시흥점',
    '일산점',
    '인천검단점',
    '서산점',
    '당진점',
    '익산점',
    '칠곡점',
    '대전서구점',
    '평택점',
    '의정부점',
    '동탄점',
    '충주점',
    '동두천점',
    '안성점',
    '진해자은점',
    '이천점',
    '경남사천점',
    '인천가정점',
    '제주애월점',
    '경북구미점',
    '김포구래점',
    '천안성정점',
    '광주서구점',
    '경북영천점',
    '화성병점점',
    '오산점',
    '안동점',
    '영주점',
    '전주효자점',
    '부산사상점',
    '충북혁신도시',
    '대전유성점',
    '남원점',
    '예산점',
    '옥천점',
    '나주점',
    '충북음성점',
    '계룡점',
    '노원점',
    '삼천포점',
  ];

  const comingSoonCount = 2;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      modalId="store-status"
      position={{
        mobile: { left: 'left-[50%]', top: 'top-24', transform: 'translate-x-[-50%]' },
        desktop: { left: 'sm:left-[420px]', top: 'sm:top-20' },
      }}
      maxHeight="max-h-[90vh]"
      className="bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 border-4 sm:border-[6px] border-yellow-500 rounded-3xl p-3 sm:p-6 shadow-xl"
      header={
        <>
          {/* 메인 타이틀 */}
          <div className="text-center mb-3 sm:mb-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl py-3 px-4">
            <h2 className="text-xl sm:text-2xl font-black text-white drop-shadow-md leading-tight">
              최단기간 100호점 달성 신화
            </h2>
          </div>

          {/* 서브 타이틀 */}
          <div className="text-center mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-black text-gray-900">전국 가맹점 현황</h3>
          </div>
        </>
      }
    >
      {/* Content - 가맹점 리스트 */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 sm:p-4 shadow-lg border border-yellow-200">
        <div className="grid grid-cols-4 gap-y-2 gap-x-2 sm:gap-y-3 sm:gap-x-3 justify-items-center pb-2 sm:pb-4">
          {stores.map((store, index) => (
            <StoreItem key={index} storeName={store} />
          ))}

          {[...Array(comingSoonCount)].map((_, index) => (
            <ComingSoonItem key={`coming-${index}`} />
          ))}
        </div>
      </div>
    </BaseModal>
  );
}

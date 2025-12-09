import Image from 'next/image';

interface StoreItemProps {
  storeName: string;
}

export default function StoreItem({ storeName }: StoreItemProps) {
  // "점" 제거하고 짧은 이름으로 표시
  const displayName = storeName.replace('점', '').replace('오늘은 오므라이스 ', '');

  return (
    <div className="relative w-16 h-12 sm:w-20 sm:h-16 flex items-center justify-center">
      {/* 계란 배경 이미지 */}
      <Image src="/asset/etc/egg_item.png" alt="" fill className="object-contain" />

      {/* 가맹점 이름 텍스트 */}
      <div className="relative z-10 text-center px-1 sm:px-2">
        <p className="text-[8px] sm:text-[10px] leading-tight font-bold text-gray-800 drop-shadow-sm">
          {displayName}
        </p>
      </div>
    </div>
  );
}

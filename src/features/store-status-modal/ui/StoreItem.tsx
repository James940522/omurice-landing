import Image from 'next/image';

interface StoreItemProps {
  storeName: string;
}

export default function StoreItem({ storeName }: StoreItemProps) {
  // "점" 제거하고 짧은 이름으로 표시
  const displayName = storeName.replace('점', '').replace('오늘은 오므라이스 ', '');

  return (
    <div className="relative w-20 h-16 sm:w-24 sm:h-20 flex items-center justify-center">
      {/* 계란 배경 이미지 */}
      <Image src="/asset/etc/egg_item.png" alt="" fill className="object-contain" />

      {/* 가맹점 이름 텍스트 */}
      <div className="relative z-10 text-center px-2">
        <p
          className="text-[10px] sm:text-xs font-bold text-gray-900 drop-shadow-md leading-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {displayName}
        </p>
      </div>
    </div>
  );
}

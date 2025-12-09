import Image from 'next/image';

export default function ComingSoonItem() {
  return (
    <div className="relative w-16 h-12 sm:w-20 sm:h-16 flex items-center justify-center opacity-60">
      {/* 계란 배경 이미지 (회색조) */}
      <Image src="/asset/etc/egg_item.png" alt="" fill className="object-contain grayscale" />

      {/* COMING SOON 텍스트 */}
      <div className="relative z-10 text-center px-1 sm:px-2">
        <p className="text-[7px] sm:text-[9px] leading-tight font-bold text-gray-700 drop-shadow-sm">
          COMING
          <br />
          SOON
        </p>
      </div>
    </div>
  );
}

import Image from 'next/image';

export default function ComingSoonItem() {
  return (
    <div className="relative w-20 h-16 sm:w-24 sm:h-20 flex items-center justify-center opacity-60">
      {/* 계란 배경 이미지 (회색조) */}
      <Image src="/asset/etc/egg_item3.png" alt="" fill className="object-contain grayscale" />

      {/* COMING SOON 텍스트 */}
      <div className="relative z-10 text-center px-2">
        <p className="text-[9px] sm:text-[11px] leading-tight font-black text-gray-700 drop-shadow-md">
          COMING
          <br />
          SOON
        </p>
      </div>
    </div>
  );
}

import Image from 'next/image';

const desktopImage = {
  src: '/new-asset/sec-3/sec-3-desktop.webp',
  width: 1672,
  height: 941,
  alt: '오므라이스 브랜드 경쟁력',
};

const mobileImage = {
  src: '/new-asset/sec-3/sec-3-mobile.webp',
  width: 1254,
  height: 1254,
  alt: '오므라이스 브랜드 경쟁력',
};

export default function RevenueProofSection() {
  return (
    <section id="revenue" className="relative w-full overflow-hidden bg-[#f36a00]">
      <div className="relative hidden aspect-[1672/941] w-full lg:block">
        <Image
          src={desktopImage.src}
          alt={desktopImage.alt}
          fill
          sizes="100vw"
          quality={90}
          className="object-cover"
        />
      </div>

      <div className="relative aspect-square w-full lg:hidden">
        <Image
          src={mobileImage.src}
          alt={mobileImage.alt}
          fill
          sizes="100vw"
          quality={90}
          className="object-cover"
        />
      </div>
    </section>
  );
}

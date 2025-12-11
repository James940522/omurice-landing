import Image from 'next/image';

export default function Footer() {
  return (
    <footer id="contact" className="bg-amber-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 상단 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* 로고 및 소개 */}
          <div>
            <div className="mb-4">
              <Image
                src="/asset/logo/Jaeyoung_F&B.png"
                alt="오늘은 오므라이스"
                width={200}
                height={200}
                loading="lazy"
                quality={75}
              />
            </div>
            <div className="space-y-2">
              <p
                className="text-sm text-amber-800 font-medium"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                (주)재영에프앤비 | 대표자: 최재영, 이호남
              </p>
              <p className="text-sm text-amber-700" style={{ fontFamily: 'var(--font-body)' }}>
                사업자등록번호: 576-88-03176
              </p>
              <p
                className="text-sm text-amber-700 leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                주소: 서울특별시 동대문구 왕산로 200
                <br />
                롯데캐슬 SKY-L65 섹션오피스 1204호
              </p>
            </div>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h4 className="text-xl md:text-2xl font-bold mb-4 text-orange-500">바로가기</h4>
            <ul className="space-y-3">
              {[
                { name: '브랜드 소개', href: '#brand' },
                { name: '수익 구조', href: '#revenue' },
                { name: '창업 과정', href: '#startup-process' },
                { name: '메뉴', href: '#menu' },
                { name: '고객 리뷰', href: '#reviews' },
                { name: '매장 안내', href: '#store' },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-lg text-amber-800 hover:text-orange-500 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 고객센터 */}
          <div>
            <h4 className="text-xl md:text-2xl font-bold mb-4 text-orange-500">고객센터</h4>
            <div className="space-y-3">
              <p className="text-3xl font-bold text-amber-900">010-9923-9502</p>
              <p className="text-lg text-amber-700">오전 08:30 ~ 오후 20:00</p>
              <p className="text-lg text-amber-700">이메일: wochl123@naver.com</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

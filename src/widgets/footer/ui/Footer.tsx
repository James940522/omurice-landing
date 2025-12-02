import Image from 'next/image';

export default function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 상단 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* 로고 및 소개 */}
          <div>
            <div className="mb-4">
              <Image
                src="/asset/logo/회사_로고.png"
                alt="오늘은 오므라이스"
                width={250}
                height={250}
                loading="lazy"
                quality={75}
              />
            </div>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h4 className="text-xl md:text-2xl font-bold mb-4 text-white">바로가기</h4>
            <ul className="space-y-3">
              {[
                { name: '브랜드 소개', href: '#brand' },
                { name: '창업 혜택', href: '#revenue' },
                { name: '창업 과정', href: '#startup-process' },
                { name: '메뉴', href: '#menu' },
                { name: '고객 리뷰', href: '#reviews' },
                { name: '매장 안내', href: '#store' },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-lg text-white/90 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 고객센터 */}
          <div>
            <h4 className="text-xl md:text-2xl font-bold mb-4 text-white">고객센터</h4>
            <div className="space-y-3">
              <p className="text-3xl font-bold text-white">1588-0000</p>
              <p className="text-lg text-white/90">
                평일 09:00 - 18:00
                <br />
                주말 및 공휴일 휴무
              </p>
              <p className="text-lg text-white/90">이메일: help@omurice.co.kr</p>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-white/30 my-8" />

        {/* 하단 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 회사 정보 */}
          <div>
            <p className="text-sm text-white/90 leading-relaxed">
              (주)오늘은오므라이스 | 대표이사: 홍길동
              <br />
              사업자등록번호: 123-45-67890
              <br />
              통신판매업신고번호: 제2024-서울강남-12345호
              <br />
              주소: 서울특별시 강남구 테헤란로 123, 오늘은오므라이스빌딩
            </p>
          </div>

          {/* 법적 고지 */}
          <div className="md:text-right">
            <div className="flex flex-wrap gap-4 md:justify-end mb-4">
              <button className="text-sm text-white/90 hover:text-white transition-colors">
                이용약관
              </button>
              <button className="text-sm text-white font-bold border-b-2 border-white">
                개인정보처리방침
              </button>
              <button className="text-sm text-white/90 hover:text-white transition-colors">
                가맹문의
              </button>
            </div>
            <p className="text-sm text-white/90">© 2024 오늘은 오므라이스. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

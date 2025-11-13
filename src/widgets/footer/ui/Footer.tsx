export default function Footer() {
  const socialLinks = [
    { label: 'Instagram' },
    { label: 'Facebook' },
    { label: 'YouTube' },
    { label: 'Blog' },
  ];

  return (
    <footer className="bg-foreground text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 상단 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* 로고 및 소개 */}
          <div>
            <h3
              className="text-3xl md:text-4xl font-bold mb-4 text-primary"
              
            >
              IMG 오늘은 오므라이스
            </h3>
            <p
              className="text-lg text-white/80 mb-6"
              
            >
              당신의 성공적인 창업을
              <br />
              함께 만들어갑니다
            </p>
            {/* 소셜 미디어 */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <div
                  key={social.label}
                  className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white hover:bg-secondary transition-colors text-xs"
                >
                  SNS
                </div>
              ))}
            </div>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h4
              className="text-xl md:text-2xl font-bold mb-4 text-primary"
              
            >
              바로가기
            </h4>
            <ul className="space-y-3">
              {['브랜드', '메뉴', '배민 주문', '매장안내', '창업문의'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-lg text-white/80 hover:text-primary transition-colors"
                    
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 고객센터 */}
          <div>
            <h4
              className="text-xl md:text-2xl font-bold mb-4 text-primary"
              
            >
              고객센터
            </h4>
            <div className="space-y-3">
              <p
                className="text-3xl font-bold text-primary"
                
              >
                1588-0000
              </p>
              <p
                className="text-lg text-white/80"
                
              >
                평일 09:00 - 18:00
                <br />
                주말 및 공휴일 휴무
              </p>
              <p
                className="text-lg text-white/80"
                
              >
                이메일: help@omurice.co.kr
              </p>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-white/20 my-8" />

        {/* 하단 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 회사 정보 */}
          <div>
            <p
              className="text-sm text-white/60 leading-relaxed"
              
            >
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
              <button className="text-sm text-white/60 hover:text-primary transition-colors">
                이용약관
              </button>
              <button className="text-sm text-primary font-bold">
                개인정보처리방침
              </button>
              <button className="text-sm text-white/60 hover:text-primary transition-colors">
                가맹문의
              </button>
            </div>
            <p
              className="text-sm text-white/60"
              
            >
              © 2024 오늘은 오므라이스. All rights reserved.
            </p>
          </div>
        </div>

        {/* 귀여운 장식 */}
        <div className="text-center mt-8">
          <span className="text-2xl font-bold text-primary">IMG</span>
        </div>
      </div>
    </footer>
  );
}


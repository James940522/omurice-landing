export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-accent-pink/20 pt-20">
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full opacity-20 blur-3xl" />
        <div className="absolute top-1/3 right-10 w-40 h-40 bg-accent-pink rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-36 h-36 bg-accent-blue rounded-full opacity-20 blur-3xl" />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-20">
        <div>
          {/* 이미지 플레이스홀더 */}
          <div className="mx-auto mb-8 w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-primary to-secondary rounded-full shadow-strong flex items-center justify-center">
            <span className="text-4xl md:text-5xl font-bold text-white">IMG</span>
          </div>

          {/* 메인 타이틀 */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground"
            style={{ fontFamily: "'Jua', sans-serif" }}
          >
            <span className="text-primary">오늘은</span>{' '}
            <span className="text-secondary">오므라이스</span>
          </h1>

          {/* 서브 타이틀 */}
          <p
            className="text-2xl md:text-3xl lg:text-4xl mb-4 text-foreground/80 font-bold"
            style={{ fontFamily: "'Jua', sans-serif" }}
          >
            국내 1위 오므라이스 프랜차이즈
          </p>
          <p
            className="text-xl md:text-2xl mb-12 text-foreground/70"
            style={{ fontFamily: "'Gaegu', sans-serif" }}
          >
            1년만에 가맹점 100호점 돌파의 신화
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#contact"
              className="bg-primary text-white px-10 py-4 rounded-full text-xl md:text-2xl font-bold shadow-strong-hover hover:bg-secondary transition-all duration-300 inline-block"
            >
              창업 문의하기
            </a>
            <a
              href="#menu"
              className="bg-white text-foreground px-10 py-4 rounded-full text-xl md:text-2xl font-bold shadow-strong-hover hover:bg-accent-pink hover:text-white transition-all duration-300 border-4 border-primary inline-block"
            >
              메뉴 보기
            </a>
          </div>
        </div>

        {/* 스크롤 다운 인디케이터 */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="text-2xl text-primary font-bold">↓</div>
        </div>
      </div>
    </section>
  );
}


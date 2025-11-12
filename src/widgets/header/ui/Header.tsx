export default function Header() {
  const navItems = [
    { name: '브랜드', href: '#brand' },
    { name: '창업 안내', href: '#startup-guide' },
    { name: '창업 비용', href: '#startup-cost' },
    { name: '메뉴', href: '#menu' },
    { name: '매장안내', href: '#store' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl md:text-3xl font-bold">
            <a
              href="#"
              className="text-primary hover:text-secondary transition-colors duration-300"
              style={{ fontFamily: "'Jua', sans-serif" }}
            >
              IMG 오늘은 오므라이스
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary font-medium text-lg transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-secondary transition-all duration-300 shadow-strong-hover font-bold"
            >
              창업문의
            </a>
          </nav>

          {/* Mobile Menu Button - 추후 동적 기능 추가 예정 */}
          <div className="md:hidden text-foreground text-sm">
            메뉴
          </div>
        </div>
      </div>
    </header>
  );
}


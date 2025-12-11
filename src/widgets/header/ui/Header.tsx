'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiMenu } from 'react-icons/hi';
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: '브랜드 소개', href: '#brand' },
    { name: '수익 구조', href: '#revenue' },
    { name: '창업 과정', href: '#startup-process' },
    { name: '메뉴', href: '#menu' },
    { name: '고객 리뷰', href: '#reviews' },
    { name: '매장 안내', href: '#store' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-strong' : 'bg-white/95 backdrop-blur-sm shadow-md'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <motion.div className="shrink-0" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="#"
              className="flex items-center gap-1.5 md:gap-2"
              aria-label="오늘은 오므라이스 & 에그이츠 홈으로 이동"
            >
              <Image
                src="/asset/logo/오므라이스_문구.png"
                alt="오늘은 오므라이스"
                width={200}
                height={100}
                className="h-8 md:h-10 lg:h-12 w-auto"
                priority
                quality={75}
              />
              <span
                className="relative text-sm md:text-base lg:text-lg font-black -mr-2 "
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: '#FFA500',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                }}
              >
                ✕
              </span>
              <Image
                src="/asset/logo/에그이츠_문구.png"
                alt="에그이츠"
                width={200}
                height={100}
                className="h-16 md:h-18 lg:h-22 w-auto"
                priority
                quality={75}
              />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`font-medium text-base transition-colors duration-300 ${
                  isScrolled
                    ? 'text-foreground hover:text-primary'
                    : 'text-foreground/90 hover:text-foreground'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.button>
            ))}
            <motion.button
              onClick={() => scrollToSection('#contact')}
              className="bg-foreground text-white px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-strong-hover font-bold border-2 border-foreground hover:border-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              창업문의
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="text-foreground text-3xl hover:text-primary transition-colors"
                  type="button"
                  aria-label="메뉴 열기"
                >
                  <HiMenu />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white">
                <SheetHeader className="border-b-2 border-primary pb-4">
                  <SheetTitle className="text-2xl font-bold text-primary">메뉴</SheetTitle>
                  <SheetDescription className="sr-only">네비게이션 메뉴</SheetDescription>
                </SheetHeader>

                {/* Navigation Items */}
                <nav className="flex-1 overflow-y-auto pt-6">
                  <div className="space-y-4">
                    {navItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => scrollToSection(item.href)}
                        className="block w-full text-left text-foreground hover:text-primary font-bold text-xl py-4 px-4 rounded-xl hover:bg-primary/10 transition-all duration-300"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </nav>

                {/* Sidebar Footer */}
                <div className="absolute bottom-6 left-6 right-6 border-t-2 border-primary/20 pt-6">
                  <button
                    onClick={() => scrollToSection('#contact')}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full hover:shadow-strong transition-all duration-300 font-bold text-xl"
                  >
                    창업문의 하기 →
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

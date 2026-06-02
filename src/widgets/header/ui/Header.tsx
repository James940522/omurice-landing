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
import { CONTACT_NAV_ITEM, SITE_NAV_ITEMS } from '@/shared/config/navigation';

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

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-[110] overflow-hidden border-b transition-all duration-300 ${
        isScrolled
          ? 'border-[#fec601] bg-[#4a260f]/96 shadow-[0_12px_34px_rgba(32,14,4,0.26)] backdrop-blur-md'
          : 'border-[#fec601]/85 bg-[#4a260f]/92 shadow-[0_10px_28px_rgba(32,14,4,0.22)] backdrop-blur-md'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-1 bg-linear-to-r from-[#ff6b12] via-[#fec601] to-[#ff6b12] xl:block" />
      <div className="pointer-events-none absolute left-0 top-1 hidden h-px w-full bg-linear-to-r from-transparent via-white/35 to-transparent xl:block" />
      <div className="pointer-events-none absolute -left-20 top-3 hidden h-20 w-72 rotate-[-8deg] bg-[#ff6b12]/20 xl:block" />
      <div className="pointer-events-none absolute -right-24 bottom-0 hidden h-20 w-80 rotate-[7deg] bg-[#fec601]/20 xl:block" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:max-w-[1480px] xl:px-10">
        <div className="flex h-14 items-center justify-between md:h-16 xl:h-[84px]">
          {/* Logo */}
          <motion.div className="shrink-0" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}>
            <a
              href="#"
              className="flex items-center rounded-full border border-[#fec601]/55 bg-[#fff8ea] px-3 py-1.5 shadow-[0_10px_24px_rgba(20,8,2,0.22)] xl:px-4 xl:py-2"
              aria-label="오늘은 오므라이스 홈으로 이동"
            >
              <Image
                src="/asset/logo/오므라이스_문구3.png"
                alt="오늘은 오므라이스"
                width={200}
                height={100}
                className="h-7 w-auto md:h-9 lg:h-10 xl:h-[46px]"
                priority
                quality={75}
              />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center xl:flex">
            <div className="flex items-center rounded-full border border-[#fec601]/55 bg-[#32190b]/88 px-2 py-2 shadow-[0_12px_28px_rgba(20,8,2,0.24),inset_0_1px_0_rgba(255,255,255,0.10)]">
              {SITE_NAV_ITEMS.map((item, index) => (
                <div key={item.name} className="flex items-center">
                  {index > 0 && <span className="mx-1.5 h-1.5 w-1.5 rounded-full bg-[#fec601]/85" />}
                  <motion.button
                    onClick={() => scrollToSection(item.href)}
                    className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-black text-[#fff8ea] transition-all duration-300 hover:bg-[#fff8ea] hover:text-[#4a260f]"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {item.name}
                  </motion.button>
                </div>
              ))}

              <span className="mx-2 h-6 w-px bg-[#fec601]/45" />
              <motion.button
                onClick={() => scrollToSection(CONTACT_NAV_ITEM.href)}
                className="relative overflow-hidden rounded-full bg-[#fec601] px-5 py-2.5 font-black text-[#32190b] shadow-[0_8px_18px_rgba(254,198,1,0.22)] transition-all duration-300 hover:bg-[#ffdd39]"
                whileHover={{ y: -1, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70" />
                {CONTACT_NAV_ITEM.name}
              </motion.button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="xl:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="text-3xl text-[#fff8ea] transition-colors hover:text-[#fec601]"
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
                    {SITE_NAV_ITEMS.map((item) => (
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
                    onClick={() => scrollToSection(CONTACT_NAV_ITEM.href)}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full hover:shadow-strong transition-all duration-300 font-bold text-xl"
                  >
                    창업 문의하기 →
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

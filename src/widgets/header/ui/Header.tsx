'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiMenu } from 'react-icons/hi';
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
    { name: '브랜드', href: '#brand' },
    { name: '창업안내', href: '#startup-guide' },
    { name: '비용', href: '#startup-cost' },
    { name: '메뉴', href: '#menu' },
    { name: '매장', href: '#store' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-strong' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            className="shrink-0 text-2xl md:text-3xl font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#"
              className="text-primary hover:text-secondary transition-colors duration-300"
              style={{ fontFamily: "'Jua', sans-serif" }}
            >
              오늘은 오므라이스
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground hover:text-primary font-medium text-lg transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.button>
            ))}
            <motion.button
              onClick={() => scrollToSection('#contact')}
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-secondary transition-all duration-300 shadow-strong-hover font-bold"
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
                  className="text-foreground text-3xl"
                  type="button"
                >
                  <HiMenu />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white">
                <SheetHeader className="border-b-2 border-primary pb-4">
                  <SheetTitle
                    className="text-2xl font-bold text-primary"
                    style={{ fontFamily: "'Jua', sans-serif" }}
                  >
                    메뉴
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    네비게이션 메뉴
                  </SheetDescription>
                </SheetHeader>

                {/* Navigation Items */}
                <nav className="flex-1 overflow-y-auto pt-6">
                  <div className="space-y-4">
                    {navItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => scrollToSection(item.href)}
                        className="block w-full text-left text-foreground hover:text-primary font-bold text-xl py-4 px-4 rounded-xl hover:bg-primary/10 transition-all duration-300"
                        style={{ fontFamily: "'Jua', sans-serif" }}
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
                    style={{ fontFamily: "'Jua', sans-serif" }}
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

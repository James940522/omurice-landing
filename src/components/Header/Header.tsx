'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

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
    { name: '메뉴', href: '#menu' },
    { name: '배민 주문', href: '#baemin' },
    { name: '매장안내', href: '#store' },
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
            className="flex-shrink-0 text-2xl md:text-3xl font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#"
              className="text-primary hover:text-secondary transition-colors duration-300"
              style={{ fontFamily: "'Jua', sans-serif" }}
            >
              IMG 오늘은 오므라이스
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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
          <button
            className="md:hidden text-foreground text-3xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-white border-t-2 border-primary"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="px-4 pt-2 pb-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left text-foreground hover:text-primary font-medium text-lg py-2 transition-colors duration-300"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="block w-full bg-primary text-white px-6 py-3 rounded-full hover:bg-secondary transition-all duration-300 shadow-strong font-bold text-center mt-4"
            >
              창업문의
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}


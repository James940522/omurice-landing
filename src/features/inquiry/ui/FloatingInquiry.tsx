'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingInquiry() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 화면 높이의 80% 이상 스크롤하면 버튼 표시 (두 번째 섹션 시작)
      const scrollPosition = window.scrollY;
      const triggerPosition = window.innerHeight * 0.8;
      setIsVisible(scrollPosition > triggerPosition);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 상태 체크

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToContact}
          className="fixed bottom-8 right-8 z-50 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full shadow-strong-hover flex items-center justify-center font-black text-sm md:text-base border-4 border-orange-500"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
            },
          }}
        >
          <span className="text-center leading-tight text-orange-600">
            창업
            <br />
            문의
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

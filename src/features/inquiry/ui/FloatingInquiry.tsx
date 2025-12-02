'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiChatAlt2 } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import type { InquiryForm } from '@/shared/types';

export default function FloatingInquiry() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InquiryForm>();

  const onSubmit = (data: InquiryForm) => {
    console.log('Form submitted:', data);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsOpen(false);
      reset();
    }, 2000);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-secondary rounded-full shadow-strong-hover flex items-center justify-center text-white text-3xl md:text-4xl"
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        {isOpen ? <HiX /> : <HiChatAlt2 />}
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Form Modal */}
            <motion.div
              className="fixed bottom-28 right-8 z-50 w-[calc(100%-4rem)] md:w-96 bg-white rounded-3xl shadow-strong overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {isSubmitted ? (
                /* Success Message */
                <motion.div
                  className="p-8 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div className="text-4xl font-bold text-primary mb-4">IMG</motion.div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">신청 완료!</h3>
                  <p className="text-lg text-foreground/70">곧 연락드리겠습니다</p>
                </motion.div>
              ) : (
                <>
                  {/* Header */}
                  <div className="bg-gradient-to-r from-primary to-secondary p-6">
                    <h3 className="text-2xl font-bold text-white text-center">오늘은 오므라이스</h3>
                    <p className="text-white/90 text-center mt-2">지금 바로 시작하세요!</p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    {/* 이름 */}
                    <div>
                      <label className="block text-foreground font-bold mb-2">이름 *</label>
                      <input
                        type="text"
                        {...register('name', { required: '이름을 입력해주세요' })}
                        className="w-full px-4 py-3 border-2 border-primary/30 rounded-xl focus:border-primary focus:outline-none transition-colors"
                        placeholder="홍길동"
                      />
                      {errors.name && (
                        <p className="text-secondary text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* 연락처 */}
                    <div>
                      <label className="block text-foreground font-bold mb-2">연락처 *</label>
                      <input
                        type="tel"
                        {...register('phone', {
                          required: '연락처를 입력해주세요',
                          pattern: {
                            value: /^[0-9-]+$/,
                            message: '올바른 연락처를 입력해주세요',
                          },
                        })}
                        className="w-full px-4 py-3 border-2 border-primary/30 rounded-xl focus:border-primary focus:outline-none transition-colors"
                        placeholder="010-1234-5678"
                      />
                      {errors.phone && (
                        <p className="text-secondary text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* 희망 지역 */}
                    <div>
                      <label className="block text-foreground font-bold mb-2">희망 지역 *</label>
                      <input
                        type="text"
                        {...register('region', { required: '희망 지역을 입력해주세요' })}
                        className="w-full px-4 py-3 border-2 border-primary/30 rounded-xl focus:border-primary focus:outline-none transition-colors"
                        placeholder="서울 강남구"
                      />
                      {errors.region && (
                        <p className="text-secondary text-sm mt-1">{errors.region.message}</p>
                      )}
                    </div>

                    {/* 개인정보 동의 */}
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="agree"
                        {...register('agree', { required: '개인정보 처리방침에 동의해주세요' })}
                        className="mt-1 w-5 h-5 accent-primary"
                      />
                      <label htmlFor="agree" className="text-sm text-foreground/70">
                        개인정보 처리방침에 동의합니다 *
                      </label>
                    </div>
                    {errors.agree && (
                      <p className="text-secondary text-sm">{errors.agree.message}</p>
                    )}

                    {/* 제출 버튼 */}
                    <motion.button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl font-bold text-lg shadow-strong-hover"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      상담 신청하기
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

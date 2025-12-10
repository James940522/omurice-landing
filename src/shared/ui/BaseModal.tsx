'use client';

import { ReactNode, useState } from 'react';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  position: {
    mobile?: { left?: string; top?: string; transform?: string };
    desktop?: { left?: string; top?: string; transform?: string };
  };
  width?: string;
  maxHeight?: string;
  className?: string;
  header?: ReactNode;
  children: ReactNode;
  modalId?: string;
  customFooter?: ReactNode;
}

export default function BaseModal({
  isOpen,
  onClose,
  position,
  width = 'w-[90vw] sm:w-[400px]',
  maxHeight,
  className = '',
  header,
  children,
  modalId,
  customFooter,
}: BaseModalProps) {
  const [dontShowToday, setDontShowToday] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    if (dontShowToday && modalId) {
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0);
      localStorage.setItem(`hideModal_${modalId}`, tomorrow.getTime().toString());
    }
    onClose();
  };

  // 모바일 위치
  const mobileLeft = position.mobile?.left || 'left-[50%]';
  const mobileTop = position.mobile?.top || 'top-[50%]';
  const mobileTransform = position.mobile?.transform || 'translate-x-[-50%] translate-y-[-50%]';

  // 데스크톱 위치
  const desktopLeft = position.desktop?.left || 'sm:left-4';
  const desktopTop = position.desktop?.top || 'sm:top-4';
  const desktopTransform = position.desktop?.transform || 'sm:translate-x-0 sm:translate-y-0';

  return (
    <div
      className={`absolute ${mobileLeft} ${mobileTop} ${mobileTransform} ${desktopLeft} ${desktopTop} ${desktopTransform} z-50 ${width} ${maxHeight || ''} flex flex-col shadow-2xl ${className}`}
    >
      {/* Header */}
      {header && <div className="flex-shrink-0">{header}</div>}

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">{children}</div>

      {/* Footer */}
      <div className="flex-shrink-0">
        {customFooter ? (
          customFooter
        ) : (
          <div className="mt-4 space-y-3 bg-white/50 rounded-2xl p-4">
            <div className="flex items-center justify-center gap-2">
              <input
                type="checkbox"
                id={`dontShowToday_${modalId}`}
                checked={dontShowToday}
                onChange={(e) => setDontShowToday(e.target.checked)}
                className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 border-2 border-gray-400 rounded focus:ring-2 focus:ring-orange-500"
              />
              <label
                htmlFor={`dontShowToday_${modalId}`}
                className="text-xs sm:text-sm text-gray-700 font-medium cursor-pointer"
              >
                오늘 하루 창 열지 않기
              </label>
            </div>

            <button
              onClick={handleClose}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg border-2 border-gray-300 text-sm sm:text-base"
            >
              닫기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

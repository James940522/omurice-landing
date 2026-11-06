'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './BaseModal.module.css';

export interface ModalSequence {
  current: number;
  total: number;
}

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
  title?: string;
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
  title = '공지사항',
}: BaseModalProps) {
  const [dontShowToday, setDontShowToday] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) modalRef.current?.focus({ preventScroll: true });
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    if (dontShowToday && modalId) {
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0);
      try {
        localStorage.setItem(`hideModal_${modalId}`, tomorrow.getTime().toString());
      } catch {
        // Closing still works when the browser blocks storage.
      }
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
      ref={modalRef}
      role="dialog"
      aria-label={title}
      tabIndex={-1}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.stopPropagation();
          handleClose();
        }
      }}
      className={`absolute ${mobileLeft} ${mobileTop} ${mobileTransform} ${desktopLeft} ${desktopTop} ${desktopTransform} z-50 ${width} ${maxHeight || ''} flex flex-col shadow-2xl outline-none ${className}`}
    >
      {/* Header */}
      {header && <div className="flex-shrink-0">{header}</div>}

      {/* Content */}
      <div
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain scrollbar-hide focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#8a4900]"
        role="region"
        aria-label={`${title} 내용`}
        tabIndex={0}
      >
        {children}
      </div>

      {/* Footer */}
      <div className={styles.footerContainer}>
        {customFooter ? (
          customFooter
        ) : (
          <div className={styles.footer}>
            <label className={styles.hideToday}>
              <input
                type="checkbox"
                id={`dontShowToday_${modalId}`}
                checked={dontShowToday}
                onChange={(e) => setDontShowToday(e.target.checked)}
              />
              <span>오늘 하루 창 열지 않기</span>
            </label>

            <button type="button" onClick={handleClose} className={styles.close}>
              닫기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

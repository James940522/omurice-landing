'use client';

import type { ReactNode } from 'react';
import BaseModal, { type ModalSequence } from './BaseModal';
import styles from './AnnouncementModal.module.css';

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalId: string;
  title: string;
  sequence?: ModalSequence;
  width?: string;
  children: ReactNode;
}

export default function AnnouncementModal({
  isOpen,
  onClose,
  modalId,
  title,
  sequence,
  width = 'w-[calc(100vw-2rem)] max-w-[620px]',
  children,
}: AnnouncementModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      modalId={modalId}
      title={title}
      position={{
        mobile: {
          left: 'left-1/2',
          top: 'top-[var(--notice-top)]',
          transform: '-translate-x-1/2',
        },
        desktop: { left: 'sm:left-4', top: 'sm:top-[var(--notice-top)]' },
      }}
      width={width}
      className={`${styles.popup} overflow-hidden rounded-[22px] border-2 border-[#ff7a00] bg-[#ffb800] p-2 shadow-2xl sm:p-3`}
      header={
        <div className="flex min-h-8 shrink-0 items-center justify-between gap-3 px-1 pb-2 text-xs font-bold text-[#4a260f] sm:text-sm">
          <span>{title}</span>
          {sequence && (
            <span
              aria-label={`공지 ${sequence.current} / ${sequence.total}`}
              className="shrink-0 rounded-full bg-[#4a260f] px-2.5 py-1 text-[11px] font-black tabular-nums text-[#fff6d9]"
            >
              {sequence.current} / {sequence.total}
            </span>
          )}
        </div>
      }
    >
      {children}
    </BaseModal>
  );
}

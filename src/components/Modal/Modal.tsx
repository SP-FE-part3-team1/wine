'use client';

import { useEffect, useRef, KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { BaseModalProps } from '../../types/component-types';
import styles from './Modal.module.css';

export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  size = 'medium', 
  className = '',
  children 
}: BaseModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  // Focus trap for accessibility
  useEffect(() => {
    if (!isOpen) return;

    // Store the currently focused element
    lastActiveElementRef.current = document.activeElement as HTMLElement;

    // Focus the modal when it opens
    const focusModal = () => {
      if (modalRef.current) {
        modalRef.current.focus();
      }
    };

    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(focusModal, 10);

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timeoutId);
      document.body.style.overflow = '';
      
      // Restore focus to the previously focused element
      if (lastActiveElementRef.current) {
        lastActiveElementRef.current.focus();
      }
    };
  }, [isOpen]);

  // Handle ESC key
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div 
        ref={modalRef}
        className={`${styles.modal} ${styles[size]} ${className}`}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        {/* Header with close button */}
        <div className={styles.header}>
          {title && (
            <h2 id="modal-title" className={styles.title}>
              {title}
            </h2>
          )}
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="모달 닫기"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );

  // Render to portal (document.body)
  return typeof document !== 'undefined' 
    ? createPortal(modalContent, document.body)
    : null;
};
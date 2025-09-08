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
  contentPadding,
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
        {/* Header with centered title */}
        {title && (
          <div className={styles.header}>
            <h2 id="modal-title" className={styles.title}>
              {title}
            </h2>
          </div>
        )}

        {/* Content */}
        <div 
          className={styles.content}
          style={contentPadding ? { padding: contentPadding } : {}}
        >
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
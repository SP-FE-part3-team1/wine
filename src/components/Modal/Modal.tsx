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

  useEffect(() => {
    if (!isOpen) return;

    lastActiveElementRef.current = document.activeElement as HTMLElement;

    const focusModal = () => {
      if (modalRef.current) {
        modalRef.current.focus();
      }
    };

    const timeoutId = setTimeout(focusModal, 10);
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timeoutId);
      document.body.style.overflow = '';
      
      if (lastActiveElementRef.current) {
        lastActiveElementRef.current.focus();
      }
    };
  }, [isOpen]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return typeof document !== 'undefined' 
    ? createPortal(
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
            {title && (
              <div className={styles.header}>
                <h2 id="modal-title" className={styles.title}>
                  {title}
                </h2>
              </div>
            )}

            <div 
              className={styles.content}
              style={contentPadding ? { padding: contentPadding } : {}}
            >
              {children}
            </div>
          </div>
        </div>, 
        document.body
      )
    : null;
};
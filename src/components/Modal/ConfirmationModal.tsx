'use client';

import { Modal } from './Modal';
import { ConfirmationModalProps } from '../../types/component-types';
import styles from './ConfirmationModal.module.css';

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "삭제하기",
  cancelText = "취소",
  variant = "default"
}: ConfirmationModalProps) => {
  
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="small"
      className={styles.confirmationModal}
    >
      <div className={styles.content}>
        {/* Icon */}
        <div className={`${styles.iconContainer} ${styles[variant]}`}>
          {variant === 'destructive' ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M8.228 9C8.654 6.754 10.639 5 13 5C15.361 5 17.346 6.754 17.772 9M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM13 17V13H11V17H13ZM11 9H13V11H11V9Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>

        {/* Title */}
        <h3 className={styles.title}>
          {title}
        </h3>

        {/* Message */}
        <p className={styles.message}>
          {message}
        </p>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`${styles.confirmButton} ${styles[variant]}`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};
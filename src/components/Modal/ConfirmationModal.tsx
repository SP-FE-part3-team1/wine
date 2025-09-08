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
      contentPadding="3.2rem 1.6rem 2.4rem"
    >
      <div className={styles.content}>
        {/* Title */}
        <h3 className={styles.title}>
          {title}
        </h3>

        {/* Message - only show if provided */}
        {message && (
          <p className={styles.message}>
            {message}
          </p>
        )}

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
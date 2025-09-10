// 기본 Modal 컴포넌트
export { Modal } from './Modal';
export { ConfirmationModal } from './ConfirmationModal';
export { useModal as useModalState } from './useModal';

// Modal Manager 시스템
export { ModalProvider, useModal, useWineModal, useReviewModal, useFilterModal } from './manager/ModalProvider';
export { useModalManager } from './manager/useModalManager';

// Smart Modal Hook 시스템
export { useSmartModal, useQuickModal } from './hooks/useSmartModal';

// Form Modals
export { WineFormModal, ReviewFormModal, FilterModal } from './forms';

// Types
export type { 
  ModalType, 
  ModalState, 
  UseModalManagerReturn, 
  WineFormModalProps, 
  ReviewFormModalProps, 
  FilterModalProps 
} from '../../types/component-types';
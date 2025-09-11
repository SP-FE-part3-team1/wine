"use client";

import { createContext, useContext, ReactNode, useEffect } from "react";
import {
  ModalType,
  UseModalManagerReturn,
  WineFormData,
  ReviewFormData,
  FilterState,
} from "../../../types/component-types";
import { useModalManager } from "./useModalManager";
import { WineFormModal } from "../forms/WineFormModal";
import { ReviewFormModal } from "../forms/ReviewFormModal";
import { FilterModal } from "../forms/FilterModal";
import styles from "./ModalProvider.module.css";

// Modal Context 생성
const ModalContext = createContext<UseModalManagerReturn | null>(null);

// Modal Context Hook
export const useModal = (): UseModalManagerReturn => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};

// Loading Modal 컴포넌트
const LoadingModal = () => (
  <div className={styles.loadingOverlay}>
    <div className={styles.loadingContent}>
      <div className={styles.spinner} />
      <p className={styles.loadingText}>데이터를 불러오는 중...</p>
    </div>
  </div>
);

interface ModalProviderProps {
  children: ReactNode;
}

/**
 * ModalProvider - 모든 모달을 관리하는 최상위 Provider
 */
export const ModalProvider = ({ children }: ModalProviderProps) => {
  const modalManager = useModalManager();

  // modalState 변경 감지를 위한 useEffect
  useEffect(() => {
    console.log("ModalProvider - modalState 변경됨:", modalManager.modalState);
  }, [modalManager.modalState]);

  /**
   * 현재 활성 모달에 따라 적절한 모달 컴포넌트를 렌더링
   */
  const renderModal = () => {
    const { activeModal, modalData, isLoading } = modalManager.modalState;

    // 디버그 로그 추가
    console.log("Modal Provider - renderModal 호출됨");
    console.log("activeModal:", activeModal);
    console.log("modalData:", modalData);
    console.log("isLoading:", isLoading);

    // 로딩 상태 표시
    if (isLoading) {
      console.log("로딩 모달 표시 중...");
      return <LoadingModal />;
    }

    // 활성 모달이 없으면 null 반환
    if (!activeModal || !modalData) {
      console.log("활성 모달 없음 - null 반환");
      return null;
    }

    // 모달 타입에 따른 컴포넌트 렌더링
    switch (activeModal) {
      case ModalType.WINE_REGISTER:
      case ModalType.WINE_EDIT:
        return (
          <WineFormModal
            mode={modalData.mode as "create" | "edit"}
            initialData={modalData.initialData as WineFormData | undefined}
            wineId={modalData.wineId as string | undefined}
            onClose={modalManager.closeModal}
            onSuccess={(wine) => {
              // 성공 콜백이 있으면 실행
              if (modalData.onSuccess) {
                (
                  modalData.onSuccess as (wine: Record<string, unknown>) => void
                )(wine);
              }
              // TODO: 성공 토스트 메시지 표시
              console.log(`Wine ${modalData.mode}d successfully:`, wine);
            }}
          />
        );

      case ModalType.REVIEW_CREATE:
      case ModalType.REVIEW_EDIT:
        return (
          <ReviewFormModal
            mode={modalData.mode as "create" | "edit"}
            wineId={modalData.wineId as string}
            reviewId={modalData.reviewId as string | undefined}
            initialData={modalData.initialData as ReviewFormData | undefined}
            wineName={modalData.wineName as string | undefined}
            wineImage={modalData.wineImage as string | undefined}
            onClose={modalManager.closeModal}
            onSuccess={(review) => {
              // 성공 콜백이 있으면 실행
              if (modalData.onSuccess) {
                (
                  modalData.onSuccess as (
                    review: Record<string, unknown>
                  ) => void
                )(review);
              }
              // TODO: 성공 토스트 메시지 표시
              console.log(`Review ${modalData.mode}d successfully:`, review);
            }}
          />
        );

      case ModalType.FILTER:
        return (
          <FilterModal
            initialData={modalData.initialData as FilterState}
            maxPrice={modalData.maxPrice as number | undefined}
            onClose={modalManager.closeModal}
            onApply={(filters) => {
              // 필터 적용 콜백이 있으면 실행
              if (modalData.onApply) {
                (modalData.onApply as (filters: FilterState) => void)(filters);
              }
              // TODO: 필터 적용 피드백
              console.log("Filters applied:", filters);
            }}
          />
        );

      default:
        console.warn(`Unknown modal type: ${activeModal}`);
        return null;
    }
  };

  return (
    <ModalContext.Provider value={modalManager}>
      {children}
      {renderModal()}
    </ModalContext.Provider>
  );
};

// 편의 함수들 - 컴포넌트에서 쉽게 사용할 수 있도록
export const useWineModal = () => {
  const { openWineModal } = useModal();
  return {
    openCreateWineModal: () => openWineModal("create"),
    openEditWineModal: (wineId: string) => openWineModal("edit", wineId),
  };
};

export const useReviewModal = () => {
  const { openReviewModal } = useModal();
  return {
    openCreateReviewModal: (wineId: string) =>
      openReviewModal("create", wineId),
    openEditReviewModal: (wineId: string, reviewId: string) =>
      openReviewModal("edit", wineId, reviewId),
  };
};

export const useFilterModal = () => {
  const { openFilterModal } = useModal();
  return { openFilterModal };
};

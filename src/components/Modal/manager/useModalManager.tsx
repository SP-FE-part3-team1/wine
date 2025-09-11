"use client";

import { useState, useCallback } from "react";
import {
  ModalType,
  ModalState,
  UseModalManagerReturn,
  FilterState,
  WineFormModalProps,
  ReviewFormModalProps,
} from "../../../types/component-types";
import { WINE_FORM_CONFIG, REVIEW_FORM_CONFIG } from "./modalConfigs";
import { components } from "../../../types/types.d";
// ✅ Server Actions를 직접 임포트합니다.
import { getWine } from "@/actions/wine.action";
import { getReview } from "@/actions/review.action";

/**
 * Modal Manager Hook
 * 모든 모달의 상태와 동작을 중앙에서 관리하는 훅
 */
export const useModalManager = (): UseModalManagerReturn => {
  const [modalState, setModalState] = useState<ModalState>({
    activeModal: null,
    modalData: null,
    isLoading: false,
  });

  /**
   * 모달 닫기
   */
  const closeModal = useCallback(() => {
    setModalState({
      activeModal: null,
      modalData: null,
      isLoading: false,
    });
  }, []);

  /**
   * 와인 등록/수정 모달 열기
   * @param mode - 'create' | 'edit'
   * @param wineId - 수정 시 필요한 와인 ID
   */
  const openWineModal = useCallback(
    async (
      mode: "create" | "edit",
      wineId?: string,
      onSuccess?: WineFormModalProps["onSuccess"]
    ) => {
      let initialData = null;

      // 수정 모드인 경우 기존 데이터 로드
      if (mode === "edit" && wineId) {
        setModalState((prev) => ({ ...prev, isLoading: true }));

        try {
          const wineData = (await getWine(
            wineId
          )) as components["schemas"]["WineDetailType"]; // 타입 단언은 유지
          // API 응답을 폼 데이터 형식으로 변환
          initialData = WINE_FORM_CONFIG.edit.dataMapper(wineData);
        } catch (error) {
          console.error("Failed to load wine data:", error);
          setModalState((prev) => ({ ...prev, isLoading: false }));
          return;
        }
      }

      const newModalState = {
        activeModal:
          mode === "create" ? ModalType.WINE_REGISTER : ModalType.WINE_EDIT,
        modalData: {
          mode,
          initialData,
          wineId,
          onClose: closeModal,
          onSuccess,
        },
        isLoading: false,
      };
      setModalState(newModalState);
    },
    [closeModal]
  );

  /**
   * 리뷰 등록/수정 모달 열기
   * @param mode - 'create' | 'edit'
   * @param wineId - 리뷰를 남길 와인 ID
   * @param reviewId - 수정 시 필요한 리뷰 ID
   */
  const openReviewModal = useCallback(
    async (
      mode: "create" | "edit",
      wineId: string,
      reviewId?: string | null, // reviewId를 null 또는 undefined로 받을 수 있도록 변경
      onSuccess?: ReviewFormModalProps["onSuccess"]
    ) => {
      let initialData = null;
      let wineName = "";
      let wineImage = "";

      // 와인 정보 로드
      try {
        const wine = await getWine(wineId);
        if (wine) {
          wineName = wine.name;
          wineImage = wine.image;
        }
      } catch (error) {
        console.error("Failed to load wine data:", error);
      }

      // 수정 모드인 경우 기존 데이터 로드
      if (mode === "edit" && reviewId) {
        setModalState((prev) => ({ ...prev, isLoading: true }));

        try {
          if (!reviewId) throw new Error("Review ID is required for editing.");
          const reviewData = (await getReview(
            reviewId
          )) as components["schemas"]["ReviewDetailType"]; // 타입 단언은 유지
          // API 응답을 폼 데이터 형식으로 변환
          initialData = REVIEW_FORM_CONFIG.edit.dataMapper(reviewData);
        } catch (error) {
          console.error("Failed to load review data:", error);
          setModalState((prev) => ({ ...prev, isLoading: false }));
          return;
        }
      }

      setModalState({
        activeModal:
          mode === "create" ? ModalType.REVIEW_CREATE : ModalType.REVIEW_EDIT,
        modalData: {
          mode,
          wineId,
          reviewId,
          initialData,
          onClose: closeModal,
          onSuccess,
          wineName,
          wineImage,
        },
        isLoading: false,
      });
    },
    [closeModal]
  );

  /**
   * 필터 모달 열기
   * @param currentFilters - 현재 적용된 필터 상태
   * @param onApply - 필터 적용 콜백
   * @param maxPrice - 가격 슬라이더 최대값 (옵션)
   */
  const openFilterModal = useCallback(
    (currentFilters: FilterState, onApply?: (filters: FilterState) => void, maxPrice?: number) => {
      setModalState({
        activeModal: ModalType.FILTER,
        modalData: {
          initialData: currentFilters,
          onClose: closeModal,
          onApply,
          maxPrice,
        },
        isLoading: false,
      });
    },
    [closeModal]
  );

  return {
    modalState,
    openWineModal,
    openReviewModal,
    openFilterModal,
    closeModal,
  };
};

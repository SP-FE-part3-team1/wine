'use client';

import { useState, useCallback } from 'react';

import { ModalType, ModalState, UseModalManagerReturn, FilterState } from '../../../types/component-types';
import { getWine } from '../../../actions/wine.action';
import { getReview } from '../../../actions/review.action';

/**
 * Modal Manager Hook
 * 모든 모달의 상태와 동작을 중앙에서 관리하는 훅
 */
export const useModalManager = (): UseModalManagerReturn => {
  const [modalState, setModalState] = useState<ModalState>({
    activeModal: null,
    modalData: null,
    isLoading: false
  });

  /**
   * 모달 닫기
   */
  const closeModal = useCallback(() => {
    setModalState({
      activeModal: null,
      modalData: null,
      isLoading: false
    });
  }, []);

  /**
   * 와인 등록/수정 모달 열기
   * @param mode - 'create' | 'edit'
   * @param wineId - 수정 시 필요한 와인 ID
   */
  const openWineModal = useCallback(async (
    mode: 'create' | 'edit',
    wineId?: string
  ) => {
    console.log(`openWineModal 호출됨 - mode: ${mode}, wineId: ${wineId}`);
    let initialData = null;
    
    // 수정 모드인 경우 기존 데이터 로드
    if (mode === 'edit' && wineId) {
      setModalState(prev => ({ ...prev, isLoading: true }));
      
      try {
        const wineData = await getWine(wineId);
        // API 응답을 폼 데이터 형식으로 변환
        initialData = {
          name: wineData.name,
          type: wineData.type as 'RED' | 'WHITE' | 'SPARKLING',
          region: wineData.region,
          price: wineData.price,
          image: wineData.image
        };
      } catch (error) {
        console.error('Failed to load wine data:', error);
        setModalState(prev => ({ ...prev, isLoading: false }));
        return;
      }
    }
    
    console.log('모달 상태 업데이트 중...');
    const newModalState = {
      activeModal: ModalType.WINE_REGISTER,
      modalData: { 
        mode, 
        initialData, 
        wineId,
        onClose: closeModal
      },
      isLoading: false
    };
    console.log('새 모달 상태:', newModalState);
    setModalState(newModalState);
  }, [closeModal]);

  /**
   * 리뷰 등록/수정 모달 열기
   * @param mode - 'create' | 'edit'
   * @param wineId - 리뷰를 남길 와인 ID
   * @param reviewId - 수정 시 필요한 리뷰 ID
   */
  const openReviewModal = useCallback(async (
    mode: 'create' | 'edit',
    wineId: string,
    reviewId?: string
  ) => {
    let initialData = null;
    
    // 수정 모드인 경우 기존 데이터 로드
    if (mode === 'edit' && reviewId) {
      setModalState(prev => ({ ...prev, isLoading: true }));
      
      try {
        const reviewData = await getReview(reviewId);
        // API 응답을 폼 데이터 형식으로 변환
        initialData = {
          rating: reviewData.rating,
          content: reviewData.content,
          aroma: reviewData.aroma,
          lightBold: reviewData.lightBold,
          smoothTannic: reviewData.smoothTannic,
          drySweet: reviewData.drySweet,
          softAcidic: reviewData.softAcidic
        };
      } catch (error) {
        console.error('Failed to load review data:', error);
        setModalState(prev => ({ ...prev, isLoading: false }));
        return;
      }
    }
    
    setModalState({
      activeModal: ModalType.REVIEW_CREATE,
      modalData: { 
        mode, 
        wineId, 
        reviewId, 
        initialData,
        onClose: closeModal
      },
      isLoading: false
    });
  }, [closeModal]);

  /**
   * 필터 모달 열기
   * @param currentFilters - 현재 적용된 필터 상태
   */
  const openFilterModal = useCallback((currentFilters: FilterState) => {
    setModalState({
      activeModal: ModalType.FILTER,
      modalData: { 
        initialData: currentFilters,
        onClose: closeModal
      },
      isLoading: false
    });
  }, [closeModal]);

  return {
    modalState,
    openWineModal,
    openReviewModal,
    openFilterModal,
    closeModal
  };
};
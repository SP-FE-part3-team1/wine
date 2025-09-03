'use client';

import { useState, useCallback } from 'react';
import { ModalType, ModalState, UseModalManagerReturn, FilterState } from '../../../types/component-types';

// API 호출을 위한 임시 함수들 (실제 API 클라이언트로 교체 예정)
const fetchWineData = async (wineId: string) => {
  // TODO: 실제 API 호출로 교체
  try {
    const response = await fetch(`https://winereview-api.vercel.app/17-1/wines/${wineId}`);
    if (!response.ok) throw new Error('Failed to fetch wine data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching wine data:', error);
    throw error;
  }
};

const fetchReviewData = async (reviewId: string) => {
  // TODO: 실제 API 호출로 교체
  try {
    const response = await fetch(`https://winereview-api.vercel.app/17-1/reviews/${reviewId}`);
    if (!response.ok) throw new Error('Failed to fetch review data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching review data:', error);
    throw error;
  }
};

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
   * 와인 등록/수정 모달 열기
   * @param mode - 'create' | 'edit'
   * @param wineId - 수정 시 필요한 와인 ID
   */
  const openWineModal = useCallback(async (
    mode: 'create' | 'edit',
    wineId?: string
  ) => {
    let initialData = null;
    
    // 수정 모드인 경우 기존 데이터 로드
    if (mode === 'edit' && wineId) {
      setModalState(prev => ({ ...prev, isLoading: true }));
      
      try {
        const wineData = await fetchWineData(wineId);
        // API 응답을 폼 데이터 형식으로 변환
        initialData = {
          name: wineData.name || '',
          type: wineData.type || 'RED',
          region: wineData.region || '',
          year: wineData.year || new Date().getFullYear(),
          price: wineData.price || 0,
          alcoholContent: wineData.alcoholContent || 0,
          volume: wineData.volume || 750,
          tasteProfile: wineData.tasteProfile || [],
          image: wineData.image || ''
        };
      } catch (error) {
        console.error('Failed to load wine data:', error);
        setModalState(prev => ({ ...prev, isLoading: false }));
        return;
      }
    }
    
    setModalState({
      activeModal: ModalType.WINE_REGISTER,
      modalData: { 
        mode, 
        initialData, 
        wineId,
        onClose: closeModal
      },
      isLoading: false
    });
  }, []);

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
        const reviewData = await fetchReviewData(reviewId);
        // API 응답을 폼 데이터 형식으로 변환
        initialData = {
          rating: reviewData.rating || 0,
          content: reviewData.content || '',
          tasteProfile: reviewData.tasteProfile || [],
          lightBold: reviewData.lightBold || 0,
          smoothTannic: reviewData.smoothTannic || 0,
          drySweet: reviewData.drySweet || 0,
          softAcidic: reviewData.softAcidic || 0
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
  }, []);

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
  }, []);

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

  return {
    modalState,
    openWineModal,
    openReviewModal,
    openFilterModal,
    closeModal
  };
};
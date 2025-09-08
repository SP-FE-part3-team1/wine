'use client';

import { useState, useCallback } from 'react';
import { Modal } from '../Modal';
import { ReviewFormModalProps, ReviewFormData, TASTE_PROFILE_OPTIONS } from '../../../types/component-types';
import { REVIEW_FORM_CONFIG, transformReviewDataForApi } from '../manager/modalConfigs';
import { fetchWithAuth } from '../../../actions/api.action';
import { StarRating } from '../../StarRating/StarRating';
import { Chip } from '../../Chip/Chip';
import Button from '../../Button/Button';
import styles from './ReviewFormModal.module.css';

export const ReviewFormModal = ({
  mode,
  wineId,
  reviewId,
  initialData,
  onClose,
  onSuccess
}: ReviewFormModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ReviewFormData>(
    mode === 'edit' && initialData
      ? initialData
      : REVIEW_FORM_CONFIG.create.initialValues
  );

  // 폼 데이터 업데이트
  const updateFormData = useCallback((field: keyof ReviewFormData, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // 폼 검증
  const validateForm = (): boolean => {
    return formData.content.trim().length > 0;
  };

  // 폼 제출
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const apiData = transformReviewDataForApi(formData, wineId);
      const endpoint = mode === 'edit' && reviewId
        ? `/reviews/${reviewId}`
        : '/reviews';

      const method = mode === 'edit' ? 'PATCH' : 'POST';

      const result = await fetchWithAuth(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData)
      });

      if (onSuccess) {
        onSuccess(result);
      }

      onClose();
    } catch (error) {
      console.error(`Error ${mode}ing review:`, error);
      // 인증 실패 시 로그인 페이지로 리다이렉트는 fetchWithAuth에서 처리됨
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="리뷰 등록"
      size="medium"
    >
      <div className={styles.modalContent}>
        {/* Wine Icon and Title - Matching Figma Design */}
        <div className={styles.wineHeader}>
          <div className={styles.wineIcon}>
            <svg
              width="24"
              height="32"
              viewBox="0 0 24 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 2h8v6l-2 18H10L8 8V2z"
                fill="currentColor"
                opacity="0.8"
              />
              <path
                d="M8 2h8v2H8V2z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className={styles.wineInfo}>
            <h3 className={styles.wineName}>Sentinel Carbernet Sauvignon 2016</h3>
            <div className={styles.wineRating}>
              <StarRating
                value={4}
                readOnly={true}
                size="small"
                maxRating={5}
              />
            </div>
          </div>
        </div>

        {/* 리뷰 내용 입력 - 리뷰등록.png 정확히 구현 */}
        <textarea
          className={styles.reviewTextarea}
          placeholder="후기를 작성해 주세요"
          value={formData.content}
          onChange={(e) => updateFormData('content', e.target.value)}
          disabled={isSubmitting}
        />

        {/* 맛 특성 슬라이더 - 리뷰등록.png 정확히 구현 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>와인의 맛은 어떤가요?</h3>
          <div className={styles.tasteSliders}>
            <div className={styles.sliderGroup}>
              <div className={styles.sliderLabel}>
                <span className={styles.leftLabel}>가벼워요</span>
                <span className={styles.rightLabel}>진해요</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={formData.body || 3}
                onChange={(e) => updateFormData('body', parseInt(e.target.value))}
                className={styles.tasteSlider}
                disabled={isSubmitting}
              />
            </div>
            <div className={styles.sliderGroup}>
              <div className={styles.sliderLabel}>
                <span className={styles.leftLabel}>부드러워요</span>
                <span className={styles.rightLabel}>떫어요</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={formData.tannin || 3}
                onChange={(e) => updateFormData('tannin', parseInt(e.target.value))}
                className={styles.tasteSlider}
                disabled={isSubmitting}
              />
            </div>
            <div className={styles.sliderGroup}>
              <div className={styles.sliderLabel}>
                <span className={styles.leftLabel}>드라이해요</span>
                <span className={styles.rightLabel}>달아요</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={formData.sweetness || 3}
                onChange={(e) => updateFormData('sweetness', parseInt(e.target.value))}
                className={styles.tasteSlider}
                disabled={isSubmitting}
              />
            </div>
            <div className={styles.sliderGroup}>
              <div className={styles.sliderLabel}>
                <span className={styles.leftLabel}>안셔요</span>
                <span className={styles.rightLabel}>많이셔요</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={formData.acidity || 3}
                onChange={(e) => updateFormData('acidity', parseInt(e.target.value))}
                className={styles.tasteSlider}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        {/* 기억에 남는 향 - 리뷰등록.png 정확히 구현 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>기억에 남는 향이 있나요?</h3>
          <div className={styles.tasteChips}>
            <Chip
              options={TASTE_PROFILE_OPTIONS}
              selectedValues={formData.tasteProfile}
              onSelectionChange={(values) => updateFormData('tasteProfile', values)}
              multiple
              ariaLabel="기억에 남는 향 선택"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* 버튼 - 리뷰등록.png 정확히 구현 */}
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!validateForm() || isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? '저장 중...' : '리뷰 남기기'}
        </Button>
      </div>
    </Modal>
  );
};
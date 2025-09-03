'use client';

import { useState, useCallback } from 'react';
import { Modal } from '../Modal';
import { ReviewFormModalProps, ReviewFormData, TASTE_PROFILE_OPTIONS } from '../../../types/component-types';
import { REVIEW_FORM_CONFIG, TASTE_SLIDERS, transformReviewDataForApi } from '../manager/modalConfigs';
import { StarRating } from '../../StarRating/StarRating';
import ReviewInput from '../../Input/ReviewInput';
import { Chip } from '../../Chip/Chip';
import { RangeSlider } from '../../RangeSlider/RangeSlider';
import { Button } from '../../Button/Button';
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

  const config = REVIEW_FORM_CONFIG[mode];

  // 폼 데이터 업데이트
  const updateFormData = useCallback((field: keyof ReviewFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // 폼 검증
  const validateForm = (): boolean => {
    return formData.rating > 0 && formData.content.trim().length > 0;
  };

  // 폼 제출
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const apiData = transformReviewDataForApi(formData, wineId);
      const url = mode === 'edit' && reviewId
        ? `https://winereview-api.vercel.app/17-1/reviews/${reviewId}`
        : 'https://winereview-api.vercel.app/17-1/reviews';

      const method = mode === 'edit' ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          // TODO: Authorization 헤더 추가 필요
        },
        body: JSON.stringify(apiData)
      });

      if (!response.ok) {
        throw new Error(`Failed to ${mode} review`);
      }

      const result = await response.json();

      if (onSuccess) {
        onSuccess(result);
      }

      onClose();
    } catch (error) {
      console.error(`Error ${mode}ing review:`, error);
      // TODO: 에러 알림 처리
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={config.title}
      size="large"
      className={styles.reviewFormModal}
    >
      <div className={styles.modalContent}>
        {/* 별점 섹션 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>전체 평가</h3>
          <div className={styles.ratingContainer}>
            <StarRating
              value={formData.rating}
              onChange={(rating) => updateFormData('rating', rating)}
              maxRating={5}
              size="large"
              disabled={isSubmitting}
            />
            <div className={styles.ratingText}>
              {formData.rating > 0 ? `${formData.rating}점` : '별점을 선택해주세요'}
            </div>
          </div>
        </div>

        {/* 맛 특성 슬라이더 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>이 와인은 어떤 맛인가요?</h3>
          <div className={styles.tasteSliders}>
            {TASTE_SLIDERS.map((slider) => (
              <div key={slider.key} className={styles.sliderGroup}>
                <div className={styles.sliderLabel}>
                  <span className={styles.leftLabel}>{slider.leftLabel}</span>
                  <span className={styles.rightLabel}>{slider.rightLabel}</span>
                </div>
                <RangeSlider
                  value={formData[slider.key]}
                  min={slider.min}
                  max={slider.max}
                  step={slider.step}
                  onChange={(value) => updateFormData(slider.key, value)}
                  disabled={isSubmitting}
                />
                <div className={styles.sliderValue}>
                  {formData[slider.key]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 맛 프로필 태그 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>맛 프로필</h3>
          <p className={styles.sectionDescription}>
            이 와인에서 느껴지는 맛을 선택해주세요. (선택사항)
          </p>
          <Chip
            options={TASTE_PROFILE_OPTIONS}
            selectedValues={formData.tasteProfile}
            onSelectionChange={(values) => updateFormData('tasteProfile', values)}
            multiple
            ariaLabel="와인 맛 프로필 선택"
            disabled={isSubmitting}
          />
        </div>

        {/* 리뷰 텍스트 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>리뷰 작성</h3>
          <div className={styles.reviewInputContainer}>
            <ReviewInput
              id="review-content"
              name="content"
              placeholder="이 와인에 대한 솔직한 후기를 남겨주세요. 어떤 상황에서 마셨는지, 어떤 맛이었는지, 추천하고 싶은지 등을 자유롭게 작성해주세요."
              value={formData.content}
              handleChange={(e) => updateFormData('content', e.target.value)}
              error={formData.content.trim().length === 0}
              errorText="리뷰 내용을 입력해주세요"
            />
            <div className={styles.characterCount}>
              {formData.content.length} / 500자
            </div>
          </div>
        </div>

        {/* 버튼 그룹 */}
        <div className={styles.buttonGroup}>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            취소
          </Button>
          
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!validateForm() || isSubmitting}
          >
            {isSubmitting ? '저장 중...' : mode === 'edit' ? '리뷰 수정' : '리뷰 등록'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
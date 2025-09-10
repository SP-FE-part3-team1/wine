'use client';

import { useState, useCallback } from 'react';
import { Modal } from '../Modal';
import { ReviewFormModalProps, ReviewFormData, ChipOption } from '../../../types/component-types';
import { REVIEW_FORM_CONFIG, transformReviewDataForApi } from '../manager/modalConfigs';
import { createReview, updateReview } from '../../../actions/review.action';
import { components } from '../../../types/types';
import { StarRating } from '../../StarRating/StarRating';
import { Chip } from '../../Chip/Chip';
import Button from '../../Button/Button';
import styles from './ReviewFormModal.module.css';

// API 스키마에 맞는 아로마 옵션들
const AROMA_OPTIONS: ChipOption[] = [
  { value: 'CHERRY', label: '체리' },
  { value: 'BERRY', label: '베리' },
  { value: 'OAK', label: '오크' },
  { value: 'VANILLA', label: '바닐라' },
  { value: 'PEPPER', label: '후추' },
  { value: 'BAKING', label: '베이킹' },
  { value: 'GRASS', label: '풀' },
  { value: 'APPLE', label: '사과' },
  { value: 'PEACH', label: '복숭아' },
  { value: 'CITRUS', label: '시트러스' },
  { value: 'TROPICAL', label: '열대과일' },
  { value: 'MINERAL', label: '미네랄' },
  { value: 'FLOWER', label: '꽃' },
  { value: 'TOBACCO', label: '담배' },
  { value: 'EARTH', label: '흙' },
  { value: 'CHOCOLATE', label: '초콜릿' },
  { value: 'SPICE', label: '향신료' },
  { value: 'CARAMEL', label: '카라멜' },
  { value: 'LEATHER', label: '가죽' }
];

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
    return formData.content.trim().length > 0 && formData.rating > 0;
  };

  // 폼 제출
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const apiData = transformReviewDataForApi(formData, wineId);
      
      let result;
      if (mode === 'edit' && reviewId) {
        result = await updateReview(reviewId, apiData);
      } else {
        result = await createReview(apiData);
      }

      if (onSuccess) {
        onSuccess(result);
      }

      onClose();
    } catch (error) {
      console.error(`Error ${mode}ing review:`, error);
      // TODO: 사용자에게 에러 메시지 표시
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

        {/* 별점 입력 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>별점을 남겨주세요</h3>
          <div className={styles.ratingSection}>
            <StarRating
              value={formData.rating}
              onChange={(rating) => updateFormData('rating', rating)}
              size="large"
              maxRating={5}
              disabled={isSubmitting}
            />
            <span className={styles.ratingText}>
              {formData.rating > 0 ? `${formData.rating}점` : '별점을 선택해주세요'}
            </span>
          </div>
        </div>

        {/* 리뷰 내용 입력 - 리뷰등록.png 정확히 구현 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>리뷰를 작성해주세요</h3>
          <textarea
            className={styles.reviewTextarea}
            placeholder="후기를 작성해 주세요"
            value={formData.content}
            onChange={(e) => updateFormData('content', e.target.value)}
            disabled={isSubmitting}
          />
        </div>

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
                value={formData.lightBold}
                onChange={(e) => updateFormData('lightBold', parseInt(e.target.value))}
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
                value={formData.smoothTannic}
                onChange={(e) => updateFormData('smoothTannic', parseInt(e.target.value))}
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
                value={formData.drySweet}
                onChange={(e) => updateFormData('drySweet', parseInt(e.target.value))}
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
                value={formData.softAcidic}
                onChange={(e) => updateFormData('softAcidic', parseInt(e.target.value))}
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
              options={AROMA_OPTIONS}
              selectedValues={formData.aroma}
              onSelectionChange={(values) => updateFormData('aroma', values as components['schemas']['Aroma'][])}
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
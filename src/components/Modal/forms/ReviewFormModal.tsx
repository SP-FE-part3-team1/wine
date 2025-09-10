"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "../Modal";
import {
  ReviewFormModalProps,
  ReviewFormData,
  TASTE_PROFILE_OPTIONS,
} from "../../../types/component-types";
import {
  REVIEW_FORM_CONFIG,
  transformReviewDataForApi,
} from "../manager/modalConfigs";
// ❌ 삭제된 API URL 파일과 fetchWithAuth는 더 이상 사용하지 않습니다.
// import { fetchWithAuth } from "../../../actions/api.action";
// import { reviewApiUrls } from "./api-urls";
// ✅ 새로운 Server Action을 임포트합니다. (파일 경로는 실제 프로젝트에 맞게 조정)
import { createReview, updateReview } from "@/actions/review.action";
import { StarRating } from "../../StarRating/StarRating";
import { Chip } from "../../Chip/Chip";
import Button from "../../Button/Button";
import styles from "./ReviewFormModal.module.css";

export const ReviewFormModal = ({
  mode,
  wineId,
  reviewId,
  initialData,
  onClose,
  onSuccess,
  wineName,
  wineAvgRating,
}: ReviewFormModalProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ReviewFormData>(
    mode === "edit" && initialData
      ? initialData
      : REVIEW_FORM_CONFIG.create.initialValues
  );

  // 폼 데이터 업데이트
  const updateFormData = useCallback(
    (field: keyof ReviewFormData, value: string | number | string[]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

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
      let result;

      if (mode === "edit" && reviewId) {
        result = await updateReview(reviewId, apiData);
      } else {
        result = await createReview(apiData);
      }

      if (onSuccess && result) {
        onSuccess(result);
      }
      router.refresh(); // 페이지 새로고침
      onClose();
    } catch (error) {
      console.error(`Error ${mode}ing review:`, error);
      // 인증 실패 시 로그인 페이지로 리다이렉트는 fetchWithAuth에서 처리됨
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="리뷰 등록" size="medium">
      <div className={styles.modalContent}>
        {/* Wine Icon and Title - Matching Figma Design */}
        <div className={styles.wineHeader}>
          <div className={styles.wineIcon}>
            <svg
              width="59"
              height="59"
              viewBox="0 0 59 59"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_79_5158)">
                <path
                  d="M45.0664 58.4823L40.6877 55.9026V42.2815C40.6877 41.7917 40.2906 41.3945 39.8007 41.3945C39.3109 41.3945 38.9137 41.7917 38.9137 42.2815V55.9026L34.535 58.4823C34.4087 58.5568 34.4615 58.7505 34.6081 58.7505H44.9932C45.14 58.7505 45.1927 58.5568 45.0664 58.4823Z"
                  fill="white"
                />
                <path
                  d="M21.391 16.0453V0.818828C21.391 0.366614 21.0244 0 20.5721 0H16.1798C15.7276 0 15.3609 0.366614 15.3609 0.818828V16.0453C15.3609 16.8989 15.0767 17.7282 14.553 18.4023L12.5984 20.9184C11.3668 22.5039 10.6982 24.4545 10.6982 26.4621V57.0728C10.6982 57.9991 11.4491 58.75 12.3755 58.75H24.3764C25.3028 58.75 26.0537 57.9991 26.0537 57.0728V26.4621C26.0537 24.4543 25.3851 22.5039 24.1535 20.9184L22.1989 18.4023C21.6752 17.7282 21.391 16.8989 21.391 16.0453Z"
                  fill="#6A42DB"
                />
                <path
                  d="M46.1148 25.4463H33.4873C33.4873 25.4463 30.5374 32.7336 31.9174 37.3912C33.0667 41.2702 36.484 42.9318 38.4211 43.5779C39.3168 43.8767 40.2852 43.8767 41.1808 43.5779C43.1179 42.9318 46.5352 41.2702 47.6845 37.3912C49.0648 32.7336 46.1148 25.4463 46.1148 25.4463Z"
                  fill="white"
                />
                <path
                  d="M31.608 33.1816C31.4864 34.6463 31.5398 36.1172 31.9174 37.3913C33.0667 41.2703 36.484 42.9318 38.4211 43.578C39.3168 43.8768 40.2851 43.8768 41.1808 43.578C43.1178 42.9318 46.5352 41.2703 47.6845 37.3913C48.062 36.1172 48.1155 34.6463 47.9939 33.1816H31.608Z"
                  fill="#6A42DB"
                />
                <path
                  d="M26.0531 44.3451H17.9127C17.1039 44.3451 16.4482 43.6895 16.4482 42.8806V32.5036C16.4482 31.6947 17.1039 31.0391 17.9127 31.0391H26.0531V44.3451Z"
                  fill="#9170EE"
                />
                <path
                  d="M20.5715 0H16.1792C15.727 0 15.3604 0.366614 15.3604 0.818828V14.2245H21.3905C21.3905 14.2245 21.3905 3.84514 21.3905 0.818828C21.3904 0.366614 21.0238 0 20.5715 0Z"
                  fill="#5732BF"
                />
                <path
                  d="M21.544 5.57805H15.2069C15.022 5.57805 14.8721 5.42819 14.8721 5.24322V2.96081C14.8721 2.77595 15.0219 2.62598 15.2069 2.62598H21.544C21.7288 2.62598 21.8788 2.77583 21.8788 2.96081V5.24322C21.8787 5.42819 21.7288 5.57805 21.544 5.57805Z"
                  fill="#5732BF"
                />
              </g>
              <defs>
                <clipPath id="clip0_79_5158">
                  <rect width="58.75" height="58.75" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className={styles.wineInfo}>
            <h3 className={styles.wineName}>{wineName || "와인 이름"}</h3>
            <div className={styles.wineRating}>
              <StarRating
                value={formData.rating}
                onChange={(newRating) => updateFormData("rating", newRating)}
                size="small"
                maxRating={5}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        {/* 리뷰 내용 입력 - 리뷰등록.png 정확히 구현 */}
        <textarea
          className={styles.reviewTextarea}
          placeholder="후기를 작성해 주세요"
          value={formData.content}
          onChange={(e) => updateFormData("content", e.target.value)}
          disabled={isSubmitting}
        />

        {/* 맛 특성 슬라이더 - 리뷰등록.png 정확히 구현 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>와인의 맛은 어떤가요?</h3>
          <div className={styles.tasteSliders}>
            <div className={styles.sliderGroup}>
              <div className={styles.sliderLabel}>
                <span className={styles.leftLabel}>라이트</span>
                <span className={styles.rightLabel}>진한</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={formData.lightBold}
                onChange={(e) =>
                  updateFormData("lightBold", parseInt(e.target.value, 10))
                }
                className={styles.tasteSlider}
                disabled={isSubmitting}
              />
            </div>
            <div className={styles.sliderGroup}>
              <div className={styles.sliderLabel}>
                <span className={styles.leftLabel}>부드러운</span>
                <span className={styles.rightLabel}>떫은</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={formData.smoothTannic}
                onChange={(e) =>
                  updateFormData("smoothTannic", parseInt(e.target.value, 10))
                }
                className={styles.tasteSlider}
                disabled={isSubmitting}
              />
            </div>
            <div className={styles.sliderGroup}>
              <div className={styles.sliderLabel}>
                <span className={styles.leftLabel}>드라이</span>
                <span className={styles.rightLabel}>달콤한</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={formData.drySweet}
                onChange={(e) =>
                  updateFormData("drySweet", parseInt(e.target.value, 10))
                }
                className={styles.tasteSlider}
                disabled={isSubmitting}
              />
            </div>
            <div className={styles.sliderGroup}>
              <div className={styles.sliderLabel}>
                <span className={styles.leftLabel}>부드러운</span>
                <span className={styles.rightLabel}>산미</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={formData.softAcidic}
                onChange={(e) =>
                  updateFormData("softAcidic", parseInt(e.target.value, 10))
                }
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
              selectedValues={formData.aroma}
              onSelectionChange={(values) => updateFormData("aroma", values)}
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
          {isSubmitting ? "저장 중..." : "리뷰 남기기"}
        </Button>
      </div>
    </Modal>
  );
};

// "use client";

// import { useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { Modal } from "../Modal";
// import {
//   ReviewFormModalProps,
//   ReviewFormData,
//   TASTE_PROFILE_OPTIONS,
// } from "../../../types/component-types";
// import {
//   REVIEW_FORM_CONFIG,
//   transformReviewDataForApi,
// } from "../manager/modalConfigs";
// // ❌ 삭제된 API URL 파일과 fetchWithAuth는 더 이상 사용하지 않습니다.
// // import { fetchWithAuth } from "../../../actions/api.action";
// // import { reviewApiUrls } from "./api-urls";
// // ✅ 새로운 Server Action을 임포트합니다. (파일 경로는 실제 프로젝트에 맞게 조정)
// import { createReview, updateReview } from "@/actions/review.action";
// import { StarRating } from "../../StarRating/StarRating";
// import { Chip } from "../../Chip/Chip";
// import Button from "../../Button/Button";
// import styles from "./ReviewFormModal.module.css";

// export const ReviewFormModal = ({
//   mode,
//   wineId,
//   reviewId,
//   initialData,
//   onClose,
//   onSuccess,
//   wineName,
//   wineAvgRating,
// }: ReviewFormModalProps) => {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState<ReviewFormData>(
//     mode === "edit" && initialData
//       ? initialData
//       : REVIEW_FORM_CONFIG.create.initialValues
//   );

//   // 폼 데이터 업데이트
//   const updateFormData = useCallback(
//     (field: keyof ReviewFormData, value: string | number | string[]) => {
//       setFormData((prev) => ({ ...prev, [field]: value }));
//     },
//     []
//   );

//   // 폼 검증
//   const validateForm = (): boolean => {
//     return formData.content.trim().length > 0;
//   };

//   // 폼 제출
//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     try {
//       const apiData = transformReviewDataForApi(formData, wineId);
//       let result;

//       if (mode === "edit" && reviewId) {
//         result = await updateReview(reviewId, apiData);
//       } else {
//         result = await createReview(apiData);
//       }

//       if (onSuccess && result) {
//         onSuccess(result);
//       }
//       router.refresh(); // 페이지 새로고침
//       onClose();
//     } catch (error) {
//       console.error(`Error ${mode}ing review:`, error);
//       // 인증 실패 시 로그인 페이지로 리다이렉트는 fetchWithAuth에서 처리됨
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Modal isOpen={true} onClose={onClose} title="리뷰 등록" size="medium">
//       <div className={styles.modalContent}>
//         {/* Wine Icon and Title - Matching Figma Design */}
//         <div className={styles.wineHeader}>
//           <div className={styles.wineIcon}>
//             <svg
//               width="24"
//               height="32"
//               viewBox="0 0 24 32"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M8 2h8v6l-2 18H10L8 8V2z"
//                 fill="currentColor"
//                 opacity="0.8"
//               />
//               <path d="M8 2h8v2H8V2z" fill="currentColor" />
//             </svg>
//           </div>
//           <div className={styles.wineInfo}>
//             <h3 className={styles.wineName}>{wineName || "와인 이름"}</h3>
//             <div className={styles.wineRating}>
//               <StarRating
//                 value={wineAvgRating || 0}
//                 readOnly={true}
//                 size="small"
//                 maxRating={5}
//               />
//             </div>
//           </div>
//         </div>

//         {/* 리뷰 내용 입력 - 리뷰등록.png 정확히 구현 */}
//         <textarea
//           className={styles.reviewTextarea}
//           placeholder="후기를 작성해 주세요"
//           value={formData.content}
//           onChange={(e) => updateFormData("content", e.target.value)}
//           disabled={isSubmitting}
//         />

//         {/* 맛 특성 슬라이더 - 리뷰등록.png 정확히 구현 */}
//         <div className={styles.section}>
//           <h3 className={styles.sectionTitle}>와인의 맛은 어떤가요?</h3>
//           <div className={styles.tasteSliders}>
//             <div className={styles.sliderGroup}>
//               <div className={styles.sliderLabel}>
//                 <span className={styles.leftLabel}>라이트</span>
//                 <span className={styles.rightLabel}>진한</span>
//               </div>
//               <input
//                 type="range"
//                 min="0"
//                 max="5"
//                 step="1"
//                 value={formData.lightBold}
//                 onChange={(e) =>
//                   updateFormData("lightBold", parseInt(e.target.value, 10))
//                 }
//                 className={styles.tasteSlider}
//                 disabled={isSubmitting}
//               />
//             </div>
//             <div className={styles.sliderGroup}>
//               <div className={styles.sliderLabel}>
//                 <span className={styles.leftLabel}>부드러운</span>
//                 <span className={styles.rightLabel}>떫은</span>
//               </div>
//               <input
//                 type="range"
//                 min="0"
//                 max="5"
//                 step="1"
//                 value={formData.smoothTannic}
//                 onChange={(e) =>
//                   updateFormData("smoothTannic", parseInt(e.target.value, 10))
//                 }
//                 className={styles.tasteSlider}
//                 disabled={isSubmitting}
//               />
//             </div>
//             <div className={styles.sliderGroup}>
//               <div className={styles.sliderLabel}>
//                 <span className={styles.leftLabel}>드라이</span>
//                 <span className={styles.rightLabel}>달콤한</span>
//               </div>
//               <input
//                 type="range"
//                 min="0"
//                 max="5"
//                 step="1"
//                 value={formData.drySweet}
//                 onChange={(e) =>
//                   updateFormData("drySweet", parseInt(e.target.value, 10))
//                 }
//                 className={styles.tasteSlider}
//                 disabled={isSubmitting}
//               />
//             </div>
//             <div className={styles.sliderGroup}>
//               <div className={styles.sliderLabel}>
//                 <span className={styles.leftLabel}>부드러운</span>
//                 <span className={styles.rightLabel}>산미</span>
//               </div>
//               <input
//                 type="range"
//                 min="0"
//                 max="5"
//                 step="1"
//                 value={formData.softAcidic}
//                 onChange={(e) =>
//                   updateFormData("softAcidic", parseInt(e.target.value, 10))
//                 }
//                 className={styles.tasteSlider}
//                 disabled={isSubmitting}
//               />
//             </div>
//           </div>
//         </div>

//         {/* 기억에 남는 향 - 리뷰등록.png 정확히 구현 */}
//         <div className={styles.section}>
//           <h3 className={styles.sectionTitle}>기억에 남는 향이 있나요?</h3>
//           <div className={styles.tasteChips}>
//             <Chip
//               options={TASTE_PROFILE_OPTIONS}
//               selectedValues={formData.aroma}
//               onSelectionChange={(values) => updateFormData("aroma", values)}
//               multiple
//               ariaLabel="기억에 남는 향 선택"
//               disabled={isSubmitting}
//             />
//           </div>
//         </div>

//         {/* 버튼 - 리뷰등록.png 정확히 구현 */}
//         <Button
//           variant="primary"
//           onClick={handleSubmit}
//           disabled={!validateForm() || isSubmitting}
//           className={styles.submitButton}
//         >
//           {isSubmitting ? "저장 중..." : "리뷰 남기기"}
//         </Button>
//       </div>
//     </Modal>
//   );
// };

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

  const updateFormData = useCallback(
    (field: keyof ReviewFormData, value: string | number | string[]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const validateForm = (): boolean => {
    return formData.content.trim().length > 0;
  };

  // ✅ 핵심 수정: edit일 때는 wineId(및 reviewId)를 바디에서 제거
  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const apiData = transformReviewDataForApi(formData, wineId);
      let result;

      if (mode === "edit" && reviewId) {
        // 서버 스키마가 body.wineId 를 허용하지 않으므로 제거
        const {
          wineId: _omitWineId,
          reviewId: _omitReviewId,
          ...updateBody
        } = apiData as any;
        result = await updateReview(String(reviewId), updateBody);
      } else {
        // create는 wineId 필요하므로 그대로 전송
        if (!wineId) {
          alert("와인 ID가 없어 리뷰를 생성할 수 없습니다.");
          setIsSubmitting(false);
          return;
        }
        result = await createReview(apiData);
      }

      onSuccess?.(result);
      router.refresh();
      onClose();
    } catch (error) {
      console.error(`Error ${mode}ing review:`, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={mode === "edit" ? "리뷰 수정" : "리뷰 등록"} // ← UX 개선
      size="medium"
    >
      <div className={styles.modalContent}>
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
              <path d="M8 2h8v2H8V2z" fill="currentColor" />
            </svg>
          </div>
          <div className={styles.wineInfo}>
            <h3 className={styles.wineName}>{wineName || "와인 이름"}</h3>
            <div className={styles.wineRating}>
              <StarRating
                value={wineAvgRating || 0}
                readOnly
                size="small"
                maxRating={5}
              />
            </div>
          </div>
        </div>

        <textarea
          className={styles.reviewTextarea}
          placeholder="후기를 작성해 주세요"
          value={formData.content}
          onChange={(e) => updateFormData("content", e.target.value)}
          disabled={isSubmitting}
        />

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

        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!validateForm() || isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting
            ? "저장 중..."
            : mode === "edit"
            ? "수정하기"
            : "리뷰 남기기"}
        </Button>
      </div>
    </Modal>
  );
};

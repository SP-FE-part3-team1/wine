"use client";

import { useState, useCallback, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "../Modal";
import {
  WineFormModalProps,
  WineFormData,
  WineType,
  WINE_TYPE_OPTIONS,
} from "../../../types/component-types";
import {
  WINE_FORM_CONFIG,
  transformWineDataForApi,
} from "../manager/modalConfigs";
import { createWine, updateWine } from "../../../actions/wine.action";
import { uploadImage } from "../../../actions/image.action";
import CustomInput from "../../Input/CustomInput";
import Select from "../../Select/Select";
import Button from "../../Button/Button";
import styles from "./WineFormModal.module.css";

export const WineFormModal = ({
  mode,
  initialData,
  wineId,
  onClose,
  onSuccess,
}: WineFormModalProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image || null
  );
  const [touched, setTouched] = useState<{
    [key in keyof WineFormData]?: boolean;
  }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<WineFormData>(
    mode === "edit" && initialData
      ? initialData
      : WINE_FORM_CONFIG.create.initialValues
  );

  // 폼 데이터 업데이트
  const updateFormData = useCallback(
    (field: keyof WineFormData, value: string | number) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  // 필드 blur 이벤트 핸들러
  const handleBlur = (field: keyof WineFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // 폼 검증
  const validateForm = useCallback((): boolean => {
    return !!(
      formData.name &&
      formData.type &&
      formData.region &&
      formData.price >= 0
    );
  }, [formData, imagePreview, imageFile]);

  // 이미지 파일 변경 핸들러
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 폼 제출
  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      let imageUrl = formData.image;

      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("image", imageFile);
        const uploadResult = await uploadImage(imageFormData);
        imageUrl = uploadResult.url;
      }

      const finalFormData = { ...formData, image: imageUrl };
      const apiData = transformWineDataForApi(finalFormData);

      let result;
      if (mode === "edit" && wineId) {
        result = await updateWine(wineId, apiData);
      } else {
        result = await createWine(apiData);
      }

      if (onSuccess) {
        onSuccess(result);
      }
      
      // 생성 모드이면 상세 페이지로 이동, 수정 모드이면 현재 페이지 새로고침
      if (mode === "create" && result?.id) {
        router.push(`/wines/${result.id}`);
      } else {
        router.refresh();
      }
      onClose();
    } catch (error) {
      console.error(`Error ${mode}ing wine:`, error);
      // TODO: 사용자에게 에러 메시지 표시
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={mode === "edit" ? "와인 수정" : "와인 등록"}
      size="small"
      className={styles.wineFormModal}
    >
      <div className={styles.modalContent}>
        {/* 와인 이름 */}
        <div className={styles.formField}>
          <label className={styles.fieldLabel}>와인 이름</label>
          <div onBlur={() => handleBlur("name")}>
            <CustomInput
              id="wine-name"
              name="name"
              type="text"
              placeholder="와인 이름 입력"
              value={formData.name}
              handleChange={(e) => updateFormData("name", e.target.value)}
              error={touched.name && !formData.name}
              errorText="와인 이름을 입력해주세요"
              labelText=""
            />
          </div>
        </div>

        {/* 가격 */}
        <div className={styles.formField}>
          <label className={styles.fieldLabel}>가격</label>
          <CustomInput
            id="wine-price"
            name="price"
            type="text"
            placeholder="가격 입력"
            value={formData.price.toString()}
            handleChange={(e) =>
              updateFormData("price", parseInt(e.target.value) || 0)
            }
            labelText=""
          />
        </div>

        {/* 원산지 */}
        <div className={styles.formField}>
          <label className={styles.fieldLabel}>원산지</label>
          <div onBlur={() => handleBlur("region")}>
            <CustomInput
              id="wine-region"
              name="region"
              type="text"
              placeholder="원산지 입력"
              value={formData.region}
              handleChange={(e) => updateFormData("region", e.target.value)}
              error={touched.region && !formData.region}
              errorText="원산지를 입력해주세요"
              labelText=""
            />
          </div>
        </div>

        {/* 타입 */}
        <div className={styles.formField}>
          <label className={styles.fieldLabel}>타입</label>
          <Select
            options={WINE_TYPE_OPTIONS}
            value={formData.type}
            onChange={(value) => updateFormData("type", value as WineType)}
            placeholder="Red"
            size="M"
          />
        </div>

        {/* 와인 사진 (파일 첨부 방식으로 변경) */}
        <div className={styles.formField}>
          <label className={styles.fieldLabel}>와인 사진</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: "none" }}
          />
          <div
            className={styles.imageUpload}
            onClick={() => fileInputRef.current?.click()}
            style={
              imagePreview
                ? {
                    backgroundImage: `url(${imagePreview})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {}
            }
          >
            {!imagePreview && (
              <div className={styles.uploadIcon}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 17.5C13.25 17.5 14.3125 17.0625 15.1875 16.1875C16.0625 15.3125 16.5 14.25 16.5 13C16.5 11.75 16.0625 10.6875 15.1875 9.8125C14.3125 8.9375 13.25 8.5 12 8.5C10.75 8.5 9.6875 8.9375 8.8125 9.8125C7.9375 10.6875 7.5 11.75 7.5 13C7.5 14.25 7.9375 15.3125 8.8125 16.1875C9.6875 17.0625 10.75 17.5 12 17.5ZM12 15.5C11.3 15.5 10.7083 15.2583 10.225 14.775C9.74167 14.2917 9.5 13.7 9.5 13C9.5 12.3 9.74167 11.7083 10.225 11.225C10.7083 10.7417 11.3 10.5 12 10.5C12.7 10.5 13.2917 10.7417 13.775 11.225C14.2583 11.7083 14.5 12.3 14.5 13C14.5 13.7 14.2583 14.2917 13.775 14.775C13.2917 15.2583 12.7 15.5 12 15.5ZM4 21C3.45 21 2.97917 20.8042 2.5875 20.4125C2.19583 20.0208 2 19.55 2 19V7C2 6.45 2.19583 5.97917 2.5875 5.5875C2.97917 5.19583 3.45 5 4 5H7.15L8.4 3.65C8.58333 3.45 8.80417 3.29167 9.0625 3.175C9.32083 3.05833 9.59167 3 9.875 3H14.125C14.4083 3 14.6792 3.05833 14.9375 3.175C15.1958 3.29167 15.4167 3.45 15.6 3.65L16.85 5H20C20.55 5 21.0208 5.19583 21.4125 5.5875C21.8042 5.97917 22 6.45 22 7V19C22 19.55 21.8042 20.0208 21.4125 20.4125C21.0208 20.8042 20.55 21 20 21H4Z"
                    fill="#CFDBEA"
                  />
                </svg>
              </div>
            )}
          </div>
          {/*
            <div className={styles.imagePreview}>
              <img 
                src={formData.image} 
                alt="와인 이미지 미리보기" 
                className={styles.previewImage}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          */}
        </div>

        {/* 버튼 그룹 */}
        <div className={styles.buttonGroup}>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
            className={styles.cancelButton}
          >
            취소
          </Button>

          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!validateForm() || isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting
              ? "저장 중..."
              : mode === "edit"
              ? "와인 수정하기"
              : "와인 등록하기"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

'use client';

import { useState, useCallback } from 'react';
import { Modal } from '../Modal';
import { WineFormModalProps, WineFormData, WineType, WINE_TYPE_OPTIONS } from '../../../types/component-types';
import { WINE_FORM_CONFIG, transformWineDataForApi } from '../manager/modalConfigs';
import { createWine, updateWine } from '../../../actions/wine.action';
import CustomInput from '../../Input/CustomInput';
import Select from '../../Select/Select';
import Button from '../../Button/Button';
import styles from './WineFormModal.module.css';

export const WineFormModal = ({ 
  mode, 
  initialData, 
  wineId, 
  onClose, 
  onSuccess 
}: WineFormModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<WineFormData>(
    mode === 'edit' && initialData 
      ? initialData 
      : WINE_FORM_CONFIG.create.initialValues
  );

  // 폼 데이터 업데이트
  const updateFormData = useCallback((field: keyof WineFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // 폼 검증
  const validateForm = (): boolean => {
    return !!(formData.name && formData.type && formData.region && formData.price >= 0 && formData.image);
  };

  // 폼 제출
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const apiData = transformWineDataForApi(formData);
      
      let result;
      if (mode === 'edit' && wineId) {
        result = await updateWine(wineId, apiData);
      } else {
        result = await createWine(apiData);
      }
      
      if (onSuccess) {
        onSuccess(result);
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
      title={mode === 'edit' ? '와인 수정' : '와인 등록'}
      size="small"
      className={styles.wineFormModal}
    >
      <div className={styles.modalContent}>
        {/* 와인 이름 */}
        <div className={styles.formField}>
          <label className={styles.fieldLabel}>와인 이름</label>
          <CustomInput
            id="wine-name"
            name="name"
            type="text"
            placeholder="와인 이름 입력"
            value={formData.name}
            handleChange={(e) => updateFormData('name', e.target.value)}
            error={!formData.name}
            errorText="와인 이름을 입력해주세요"
            labelText=""
          />
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
            handleChange={(e) => updateFormData('price', parseInt(e.target.value) || 0)}
            labelText=""
          />
        </div>

        {/* 원산지 */}
        <div className={styles.formField}>
          <label className={styles.fieldLabel}>원산지</label>
          <CustomInput
            id="wine-region"
            name="region"
            type="text"
            placeholder="원산지 입력"
            value={formData.region}
            handleChange={(e) => updateFormData('region', e.target.value)}
            error={!formData.region}
            errorText="원산지를 입력해주세요"
            labelText=""
          />
        </div>

        {/* 타입 */}
        <div className={styles.formField}>
          <label className={styles.fieldLabel}>타입</label>
          <Select
            options={WINE_TYPE_OPTIONS}
            value={formData.type}
            onChange={(value) => updateFormData('type', value as WineType)}
            placeholder="Red"
            size="M"
          />
        </div>

        {/* 와인 사진 */}
        <div className={styles.formField}>
          <label className={styles.fieldLabel}>와인 사진 URL</label>
          <CustomInput
            id="wine-image"
            name="image"
            type="text"
            placeholder="이미지 URL을 입력하세요 (예: https://example.com/wine.jpg)"
            value={formData.image}
            handleChange={(e) => updateFormData('image', e.target.value)}
            error={!formData.image}
            errorText="이미지 URL을 입력해주세요"
            labelText=""
          />
          {formData.image && (
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
          )}
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
            {isSubmitting ? '저장 중...' : (mode === 'edit' ? '와인 수정하기' : '와인 등록하기')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
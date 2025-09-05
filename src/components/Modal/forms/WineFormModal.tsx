'use client';

import { useState, useCallback } from 'react';
import { Modal } from '../Modal';
import { WineFormModalProps, WineFormData, WineType, WINE_TYPE_OPTIONS } from '../../../types/component-types';
import { WINE_FORM_CONFIG, transformWineDataForApi } from '../manager/modalConfigs';
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
    return !!(formData.name && formData.type && formData.region && formData.price >= 0);
  };

  // 폼 제출
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const apiData = transformWineDataForApi(formData);
      const url = mode === 'edit' && wineId 
        ? `https://winereview-api.vercel.app/17-1/wines/${wineId}`
        : 'https://winereview-api.vercel.app/17-1/wines';
      
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
        throw new Error(`Failed to ${mode} wine`);
      }

      const result = await response.json();
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      onClose();
    } catch (error) {
      console.error(`Error ${mode}ing wine:`, error);
      // TODO: 에러 알림 처리
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
          <label className={styles.fieldLabel}>와인 사진</label>
          <div className={styles.imageUpload}>
            <div className={styles.uploadIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z" fill="#C4C4C4"/>
              </svg>
            </div>
          </div>
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
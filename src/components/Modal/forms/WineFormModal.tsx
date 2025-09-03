'use client';

import { useState, useCallback } from 'react';
import { Modal } from '../Modal';
import { WineFormModalProps, WineFormData, WINE_TYPE_OPTIONS, TASTE_PROFILE_OPTIONS } from '../../../types/component-types';
import { WINE_FORM_CONFIG, transformWineDataForApi } from '../manager/modalConfigs';
import CustomInput from '../../Input/CustomInput';
import Select from '../../Select/Select';
import { Chip } from '../../Chip/Chip';
import { RangeSlider } from '../../RangeSlider/RangeSlider';
import { Button } from '../../Button/Button';
import styles from './WineFormModal.module.css';

interface StepProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepProps) => (
  <div className={styles.stepIndicator}>
    {Array.from({ length: totalSteps }, (_, index) => (
      <div
        key={index}
        className={`${styles.step} ${index + 1 <= currentStep ? styles.active : ''}`}
      >
        {index + 1}
      </div>
    ))}
  </div>
);

export const WineFormModal = ({ 
  mode, 
  initialData, 
  wineId, 
  onClose, 
  onSuccess 
}: WineFormModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<WineFormData>(
    mode === 'edit' && initialData 
      ? initialData 
      : WINE_FORM_CONFIG.create.initialValues
  );

  const config = WINE_FORM_CONFIG[mode];
  const totalSteps = 3;

  // 폼 데이터 업데이트
  const updateFormData = useCallback((field: keyof WineFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // 단계 검증
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.name && formData.type && formData.region && formData.year);
      case 2:
        return !!(formData.price >= 0 && formData.alcoholContent >= 0 && formData.volume > 0);
      case 3:
        return true; // 맛 프로필은 선택적
      default:
        return false;
    }
  };

  // 다음 단계로
  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // 이전 단계로
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // 폼 제출
  const handleSubmit = async () => {
    if (!validateStep(totalSteps)) return;
    
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

  const renderStep1 = () => (
    <div className={styles.stepContent}>
      <h3 className={styles.stepTitle}>기본 정보</h3>
      
      <CustomInput
        id="wine-name"
        name="name"
        type="text"
        placeholder="와인 이름을 입력해주세요"
        labelText="와인 이름"
        value={formData.name}
        handleChange={(e) => updateFormData('name', e.target.value)}
        error={!formData.name}
        errorText="와인 이름을 입력해주세요"
      />

      <Select
        fieldLabel="와인 타입"
        options={WINE_TYPE_OPTIONS}
        value={formData.type}
        onChange={(value) => updateFormData('type', value)}
        placeholder="와인 타입을 선택해주세요"
        size="M"
      />

      <CustomInput
        id="wine-region"
        name="region"
        type="text"
        placeholder="원산지를 입력해주세요"
        labelText="원산지"
        value={formData.region}
        handleChange={(e) => updateFormData('region', e.target.value)}
        error={!formData.region}
        errorText="원산지를 입력해주세요"
      />

      <CustomInput
        id="wine-year"
        name="year"
        type="text"
        placeholder="빈티지 연도"
        labelText="빈티지"
        value={formData.year.toString()}
        handleChange={(e) => updateFormData('year', parseInt(e.target.value) || new Date().getFullYear())}
        error={!formData.year}
        errorText="빈티지를 입력해주세요"
      />
    </div>
  );

  const renderStep2 = () => (
    <div className={styles.stepContent}>
      <h3 className={styles.stepTitle}>상세 정보</h3>
      
      <div className={styles.priceSection}>
        <label className={styles.sectionLabel}>가격 (원)</label>
        <RangeSlider
          value={formData.price}
          min={0}
          max={1000000}
          step={1000}
          onChange={(value) => updateFormData('price', value)}
        />
        <div className={styles.priceDisplay}>₩ {formData.price.toLocaleString()}</div>
      </div>

      <CustomInput
        id="wine-alcohol"
        name="alcoholContent"
        type="text"
        placeholder="13.5"
        labelText="알코올 도수 (%)"
        value={formData.alcoholContent.toString()}
        handleChange={(e) => updateFormData('alcoholContent', parseFloat(e.target.value) || 0)}
      />

      <CustomInput
        id="wine-volume"
        name="volume"
        type="text"
        placeholder="750"
        labelText="용량 (ml)"
        value={formData.volume.toString()}
        handleChange={(e) => updateFormData('volume', parseInt(e.target.value) || 750)}
      />
    </div>
  );

  const renderStep3 = () => (
    <div className={styles.stepContent}>
      <h3 className={styles.stepTitle}>맛 프로필</h3>
      <p className={styles.stepDescription}>
        이 와인의 맛을 가장 잘 표현하는 태그들을 선택해주세요. (선택사항)
      </p>
      
      <Chip
        options={TASTE_PROFILE_OPTIONS}
        selectedValues={formData.tasteProfile}
        onSelectionChange={(values) => updateFormData('tasteProfile', values)}
        multiple
        ariaLabel="와인 맛 프로필 선택"
      />
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return renderStep1();
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={config.title}
      size="large"
      className={styles.wineFormModal}
    >
      <div className={styles.modalContent}>
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        
        {renderCurrentStep()}
        
        <div className={styles.buttonGroup}>
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={isSubmitting}
            >
              이전
            </Button>
          )}
          
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            취소
          </Button>
          
          {currentStep < totalSteps ? (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!validateStep(currentStep) || isSubmitting}
            >
              다음
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={!validateStep(currentStep) || isSubmitting}
            >
              {isSubmitting ? '저장 중...' : '와인 등록'}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
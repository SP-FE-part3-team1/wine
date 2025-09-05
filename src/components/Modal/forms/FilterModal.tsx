'use client';

import { useState, useCallback } from 'react';
import { Modal } from '../Modal';
import { FilterModalProps, FilterState } from '../../../types/component-types';
import { FILTER_DEFAULT_VALUES } from '../manager/modalConfigs';
import { Chip } from '../../Chip/Chip';
import { RatingRadio } from '../../RatingRadio/RatingRadio';
import Button from '../../Button/Button';
import styles from './FilterModal.module.css';

// 피그마 디자인에 맞는 와인 타입 옵션
const WINE_TYPE_FILTER_OPTIONS = [
  { value: 'RED', label: 'Red' },
  { value: 'WHITE', label: 'White' }, 
  { value: 'SPARKLING', label: 'Sparkling' }
];

// sm.png 피그마 디자인에 맞는 평점 옵션
const RATING_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: '4.8-5.0', label: '4.8 - 5.0' },
  { value: '4.5-4.8', label: '4.5 - 4.8' },
  { value: '4.0-4.5', label: '4.0 - 4.5' },
  { value: '3.0-4.0', label: '3.0 - 4.0' }
];

export const FilterModal = ({
  initialData,
  onClose,
  onApply
}: FilterModalProps) => {
  const [filterData, setFilterData] = useState<FilterState>(initialData);

  // 필터 데이터 업데이트
  const updateFilterData = useCallback((field: keyof FilterState, value: string | string[] | [number, number] | null) => {
    setFilterData(prev => ({ 
      ...prev, 
      [field]: value 
    }));
  }, []);

  // 필터 초기화
  const handleReset = () => {
    setFilterData(FILTER_DEFAULT_VALUES);
  };

  // 필터 적용
  const handleApply = () => {
    onApply(filterData);
    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="필터"
      size="small"
      className={styles.filterModal}
    >
      <div className={styles.modalContent}>
        {/* WINE TYPES - 피그마 디자인 그대로 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>WINE TYPES</h3>
          <Chip
            options={WINE_TYPE_FILTER_OPTIONS}
            selectedValues={filterData.wineTypes || []}
            onSelectionChange={(values) => updateFilterData('wineTypes', values)}
            multiple={true}
            ariaLabel="와인 타입 필터"
          />
        </div>

        {/* PRICE - 피그마 디자인처럼 간단한 슬라이더 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>PRICE</h3>
          <div className={styles.priceContainer}>
            <div className={styles.priceLabels}>
              <span>W 0</span>
              <span>W 74,000</span>
            </div>
            <div className={styles.priceSlider}>
              <input
                type="range"
                min="0"
                max="74000"
                step="1000"
                value={filterData.priceRange[1] || 74000}
                onChange={(e) => updateFilterData('priceRange', [0, parseInt(e.target.value)] as [number, number])}
                className={styles.slider}
              />
            </div>
          </div>
        </div>

        {/* RATING - sm.png 정확히 구현 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>RATING</h3>
          <RatingRadio
            options={RATING_OPTIONS}
            value={filterData.selectedRating || 'all'}
            onChange={(value) => updateFilterData('selectedRating', value)}
            name="rating-filter"
          />
        </div>

        {/* 버튼 그룹 - sm.png 정확히 구현 */}
        <div className={styles.buttonGroup}>
          <Button
            variant="secondary"
            onClick={handleReset}
            className={styles.resetButton}
          >
            초기화
          </Button>
          
          <Button
            variant="primary"
            onClick={handleApply}
            className={styles.applyButton}
          >
            필터 적용하기
          </Button>
        </div>
      </div>
    </Modal>
  );
};
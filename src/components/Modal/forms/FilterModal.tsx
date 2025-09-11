'use client';

import { useState, useCallback } from 'react';
import { Modal } from '../Modal';
import { FilterModalProps, FilterState } from '../../../types/component-types';
import { FILTER_DEFAULT_VALUES, UNIFIED_RATING_OPTIONS } from '../manager/modalConfigs';
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
      contentPadding="3.2rem 2.4rem 2.4rem"
    >
      <div className={styles.modalContent}>
        {/* WINE TYPES - 피그마 디자인 그대로 */}
        <div className={`${styles.section} ${styles.wineTypeSection}`}>
          <h3 className={styles.sectionTitle}>WINE TYPES</h3>
          <Chip
            options={WINE_TYPE_FILTER_OPTIONS}
            selectedValues={filterData.selectedTypes || []}
            onSelectionChange={(values) => updateFilterData('selectedTypes', values)}
            multiple={true}
            ariaLabel="와인 타입 필터"
            className={styles.wineTypeChipContainer}
          />
        </div>

        {/* PRICE - 듀얼 핸들 커스텀 슬라이더 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>PRICE</h3>
          <div className={styles.priceContainer}>
            <div className={styles.priceSlider}>
              <div className={styles.rangeSlider}>
                <div className={styles.sliderTrack}>
                  <div 
                    className={styles.sliderRange}
                    style={{
                      left: `${((filterData.priceRange[0] || 0) / 400000) * (283 - 24)}px`,
                      width: `${(((filterData.priceRange[1] || 400000) - (filterData.priceRange[0] || 0)) / 400000) * (283 - 24)}px`
                    }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="400000"
                  step="10000"
                  value={filterData.priceRange[0] || 0}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    const maxValue = filterData.priceRange[1] || 400000;
                    updateFilterData('priceRange', [Math.min(value, maxValue), maxValue] as [number, number]);
                  }}
                  className={`${styles.rangeInput} ${styles.rangeInputMin}`}
                />
                <input
                  type="range"
                  min="0"
                  max="400000"
                  step="10000"
                  value={filterData.priceRange[1] || 400000}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    const minValue = filterData.priceRange[0] || 0;
                    updateFilterData('priceRange', [minValue, Math.max(value, minValue)] as [number, number]);
                  }}
                  className={`${styles.rangeInput} ${styles.rangeInputMax}`}
                />
                <div 
                  className={styles.priceLabel}
                  style={{
                    left: `${12 + ((filterData.priceRange[0] || 0) / 400000) * (283 - 24)}px`
                  }}
                >
                  ₩{(filterData.priceRange[0] || 0).toLocaleString()}
                </div>
                <div 
                  className={styles.priceLabel}
                  style={{
                    left: `${12 + ((filterData.priceRange[1] || 400000) / 400000) * (283 - 24)}px`
                  }}
                >
                  ₩{(filterData.priceRange[1] || 400000).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RATING - sm.png 정확히 구현 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>RATING</h3>
          <RatingRadio
            options={UNIFIED_RATING_OPTIONS}
            value={filterData.rating || 'all'}
            onChange={(value) => updateFilterData('rating', value)}
            name="rating-filter"
            className="filterModalRating"
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
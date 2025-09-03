'use client';

import { useState, useCallback } from 'react';
import { Modal } from '../Modal';
import { FilterModalProps, FilterState, WINE_TYPE_OPTIONS } from '../../../types/component-types';
import { FILTER_DEFAULT_VALUES } from '../manager/modalConfigs';
import { Chip } from '../../Chip/Chip';
import RangeSlider from '../../RangeSlider/RangeSlider';
import Button from '../../Button/Button';
import styles from './FilterModal.module.css';

export const FilterModal = ({
  initialData,
  onClose,
  onApply
}: FilterModalProps) => {
  const [filterData, setFilterData] = useState<FilterState>(initialData);

  // 필터 데이터 업데이트
  const updateFilterData = useCallback((field: keyof FilterState, value: any) => {
    setFilterData(prev => ({ ...prev, [field]: value }));
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

  // 활성 필터 개수 계산
  const getActiveFiltersCount = () => {
    let count = 0;
    
    if (filterData.wineTypes.length > 0) count++;
    if (filterData.priceRange[0] > FILTER_DEFAULT_VALUES.priceRange[0] || 
        filterData.priceRange[1] < FILTER_DEFAULT_VALUES.priceRange[1]) count++;
    if (filterData.ratingRange[0] > FILTER_DEFAULT_VALUES.ratingRange[0] ||
        filterData.ratingRange[1] < FILTER_DEFAULT_VALUES.ratingRange[1]) count++;
    
    return count;
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="필터"
      size="medium"
      className={styles.filterModal}
    >
      <div className={styles.modalContent}>
        {/* 와인 타입 필터 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>와인 타입</h3>
          <Chip
            options={WINE_TYPE_OPTIONS}
            selectedValues={filterData.wineTypes}
            onSelectionChange={(values) => updateFilterData('wineTypes', values)}
            multiple
            ariaLabel="와인 타입 필터"
          />
        </div>

        {/* 가격 범위 필터 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>가격 범위</h3>
          <div className={styles.rangeContainer}>
            <div className={styles.rangeLabels}>
              <span>₩ {filterData.priceRange[0].toLocaleString()}</span>
              <span>₩ {filterData.priceRange[1].toLocaleString()}</span>
            </div>
            <RangeSlider
              value={filterData.priceRange[0]}
              min={FILTER_DEFAULT_VALUES.priceRange[0]}
              max={FILTER_DEFAULT_VALUES.priceRange[1]}
              step={10000}
              onChange={(value) => updateFilterData('priceRange', [value, filterData.priceRange[1]])}
            />
            <div className={styles.priceInputs}>
              <div className={styles.inputGroup}>
                <label htmlFor="min-price">최저가</label>
                <input
                  id="min-price"
                  type="number"
                  min={FILTER_DEFAULT_VALUES.priceRange[0]}
                  max={filterData.priceRange[1]}
                  value={filterData.priceRange[0]}
                  onChange={(e) => {
                    const value = Math.max(
                      FILTER_DEFAULT_VALUES.priceRange[0],
                      Math.min(filterData.priceRange[1], parseInt(e.target.value) || 0)
                    );
                    updateFilterData('priceRange', [value, filterData.priceRange[1]]);
                  }}
                  className={styles.priceInput}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="max-price">최고가</label>
                <input
                  id="max-price"
                  type="number"
                  min={filterData.priceRange[0]}
                  max={FILTER_DEFAULT_VALUES.priceRange[1]}
                  value={filterData.priceRange[1]}
                  onChange={(e) => {
                    const value = Math.min(
                      FILTER_DEFAULT_VALUES.priceRange[1],
                      Math.max(filterData.priceRange[0], parseInt(e.target.value) || 0)
                    );
                    updateFilterData('priceRange', [filterData.priceRange[0], value]);
                  }}
                  className={styles.priceInput}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 평점 범위 필터 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>평점 범위</h3>
          <div className={styles.rangeContainer}>
            <div className={styles.rangeLabels}>
              <span>{filterData.ratingRange[0]}점 이상</span>
              <span>{filterData.ratingRange[1]}점 이하</span>
            </div>
            <div className={styles.ratingSliders}>
              <div className={styles.sliderGroup}>
                <label>최소 평점</label>
                <RangeSlider
                  value={filterData.ratingRange[0]}
                  min={FILTER_DEFAULT_VALUES.ratingRange[0]}
                  max={filterData.ratingRange[1]}
                  step={0.5}
                  onChange={(value) => updateFilterData('ratingRange', [value, filterData.ratingRange[1]])}
                />
              </div>
              <div className={styles.sliderGroup}>
                <label>최대 평점</label>
                <RangeSlider
                  value={filterData.ratingRange[1]}
                  min={filterData.ratingRange[0]}
                  max={FILTER_DEFAULT_VALUES.ratingRange[1]}
                  step={0.5}
                  onChange={(value) => updateFilterData('ratingRange', [filterData.ratingRange[0], value])}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 활성 필터 정보 */}
        <div className={styles.filterInfo}>
          <span className={styles.activeFilters}>
            활성 필터: {getActiveFiltersCount()}개
          </span>
        </div>

        {/* 버튼 그룹 */}
        <div className={styles.buttonGroup}>
          <Button
            variant="outline"
            onClick={handleReset}
            className={styles.resetButton}
          >
            초기화
          </Button>
          
          <div className={styles.primaryButtons}>
            <Button
              variant="outline"
              onClick={onClose}
            >
              취소
            </Button>
            
            <Button
              variant="primary"
              onClick={handleApply}
            >
              필터 적용
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
'use client';

import { ChipProps, ChipOption } from '../../types/component-types';
import styles from './Chip.module.css';

export const Chip = ({ 
  options, 
  selectedValues, 
  onSelectionChange, 
  disabled = false,
  multiple = true,
  ariaLabel = '옵션 선택'
}: ChipProps) => {
  const handleOptionToggle = (value: string) => {
    if (disabled) return;
    
    const isSelected = selectedValues.includes(value);
    let newSelectedValues: string[];
    
    if (multiple) {
      if (isSelected) {
        // 선택 해제
        newSelectedValues = selectedValues.filter(selectedValue => selectedValue !== value);
      } else {
        // 선택 추가
        newSelectedValues = [...selectedValues, value];
      }
    } else {
      // 단일 선택 모드
      newSelectedValues = isSelected ? [] : [value];
    }
    
    onSelectionChange(newSelectedValues);
  };

  return (
    <div className={styles.container} role="group" aria-label={ariaLabel}>
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value);
        
        return (
          <button
            key={option.value}
            type="button"
            className={`${styles.chip} ${isSelected ? styles.selected : ''} ${disabled ? styles.disabled : ''}`}
            onClick={() => handleOptionToggle(option.value)}
            disabled={disabled}
            aria-pressed={isSelected}
            aria-label={`${option.label} ${isSelected ? '선택됨' : '선택하기'}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

// 와인 타입 전용 래퍼 컴포넌트 (하위 호환성을 위해 유지)
export const WineTypeChip = ({ 
  types, 
  selectedTypes, 
  onTypesChange, 
  disabled = false 
}: { 
  types: ('RED' | 'WHITE' | 'SPARKLING')[];
  selectedTypes: ('RED' | 'WHITE' | 'SPARKLING')[];
  onTypesChange: (types: ('RED' | 'WHITE' | 'SPARKLING')[]) => void;
  disabled?: boolean;
}) => {
  const WINE_TYPE_LABELS: Record<'RED' | 'WHITE' | 'SPARKLING', string> = {
    RED: 'Red',
    WHITE: 'White',
    SPARKLING: 'Sparkling'
  };

  const options = types.map(type => ({
    value: type,
    label: WINE_TYPE_LABELS[type]
  }));

  return (
    <Chip
      options={options}
      selectedValues={selectedTypes}
      onSelectionChange={onTypesChange as (values: string[]) => void}
      disabled={disabled}
      ariaLabel="와인 타입 선택"
    />
  );
};
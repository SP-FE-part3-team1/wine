'use client';

import { WineTypeChipProps, WineType } from '../../types/component-types';
import styles from './WineTypeChip.module.css';

const WINE_TYPE_LABELS: Record<WineType, string> = {
  RED: 'Red',
  WHITE: 'White',
  SPARKLING: 'Sparkling'
};

export const WineTypeChip = ({ 
  types, 
  selectedTypes, 
  onTypesChange, 
  disabled = false 
}: WineTypeChipProps) => {
  const handleTypeToggle = (type: WineType) => {
    if (disabled) return;
    
    const isSelected = selectedTypes.includes(type);
    let newSelectedTypes: WineType[];
    
    if (isSelected) {
      // 선택 해제
      newSelectedTypes = selectedTypes.filter(selectedType => selectedType !== type);
    } else {
      // 선택 추가
      newSelectedTypes = [...selectedTypes, type];
    }
    
    onTypesChange(newSelectedTypes);
  };

  return (
    <div className={styles.container} role="group" aria-label="와인 타입 선택">
      {types.map((type) => {
        const isSelected = selectedTypes.includes(type);
        
        return (
          <button
            key={type}
            type="button"
            className={`${styles.chip} ${isSelected ? styles.selected : ''} ${disabled ? styles.disabled : ''}`}
            onClick={() => handleTypeToggle(type)}
            disabled={disabled}
            aria-pressed={isSelected}
            aria-label={`${WINE_TYPE_LABELS[type]} 와인 ${isSelected ? '선택됨' : '선택하기'}`}
          >
            {WINE_TYPE_LABELS[type]}
          </button>
        );
      })}
    </div>
  );
};
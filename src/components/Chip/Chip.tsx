'use client';

import { ChipProps } from '../../types/component-types';
import styles from './Chip.module.css';

export const Chip = ({ 
  options, 
  selectedValues = [], 
  onSelectionChange = () => {}, 
  disabled = false,
  readonly = false,
  multiple = true,
  ariaLabel = '옵션 선택',
  className = ''
}: ChipProps) => {
  const handleOptionToggle = (value: string) => {
    if (disabled || readonly) return;
    
    const isSelected = selectedValues.includes(value);
    let newSelectedValues: string[];
    
    if (multiple) {
      if (isSelected) {
        newSelectedValues = selectedValues.filter(selectedValue => selectedValue !== value);
      } else {
        newSelectedValues = [...selectedValues, value];
      }
    } else {
      newSelectedValues = isSelected ? [] : [value];
    }
    
    onSelectionChange(newSelectedValues);
  };

  return (
    <div className={`${styles.container} ${className}`} role="group" aria-label={ariaLabel}>
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value);
        
        return (
          <button
            key={option.value}
            type="button"
            className={`${styles.chip} ${isSelected ? styles.selected : ''} ${disabled ? styles.disabled : ''} ${readonly ? styles.readonly : ''}`}
            onClick={() => handleOptionToggle(option.value)}
            disabled={disabled}
            aria-pressed={isSelected}
            aria-label={readonly ? option.label : `${option.label} ${isSelected ? '선택됨' : '선택하기'}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

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
      onSelectionChange={(values) => onTypesChange(values as ('RED' | 'WHITE' | 'SPARKLING')[])}
      disabled={disabled}
      ariaLabel="와인 타입 선택"
    />
  );
};
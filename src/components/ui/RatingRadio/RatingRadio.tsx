'use client';

import { ChangeEvent } from 'react';
import { RatingRadioProps } from '../../types/component-types';
import styles from './RatingRadio.module.css';

export const RatingRadio = ({
  value,
  onChange,
  options,
  name,
  disabled = false
}: RatingRadioProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange(e.target.value);
  };

  return (
    <div 
      className={`${styles.container} ${disabled ? styles.disabled : ''}`}
      role="radiogroup"
      aria-label="평점 범위 선택"
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={`${styles.option} ${value === option.value ? styles.selected : ''}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={handleChange}
            disabled={disabled}
            className={styles.radioInput}
          />
          <span className={styles.radioLabel}>
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
};
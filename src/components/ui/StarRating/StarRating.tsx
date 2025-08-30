'use client';

import { useState, KeyboardEvent } from 'react';
import { StarRatingProps } from '../../types/component-types';
import styles from './StarRating.module.css';

export const StarRating = ({
  value,
  onChange,
  maxRating = 5,
  readOnly = false,
  size = 'medium',
  disabled = false
}: StarRatingProps) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const isInteractive = !readOnly && !disabled && onChange;

  const handleStarClick = (rating: number) => {
    if (!isInteractive) return;
    onChange!(rating);
  };

  const handleStarEnter = (rating: number) => {
    if (!isInteractive) return;
    setHoverValue(rating);
  };

  const handleStarLeave = () => {
    if (!isInteractive) return;
    setHoverValue(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, rating: number) => {
    if (!isInteractive) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        onChange!(rating);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        if (rating < maxRating) {
          setFocusedIndex(rating);
          const nextButton = e.currentTarget.parentElement?.children[rating] as HTMLButtonElement;
          nextButton?.focus();
        }
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        if (rating > 1) {
          setFocusedIndex(rating - 2);
          const prevButton = e.currentTarget.parentElement?.children[rating - 2] as HTMLButtonElement;
          prevButton?.focus();
        }
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        const firstButton = e.currentTarget.parentElement?.children[0] as HTMLButtonElement;
        firstButton?.focus();
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(maxRating - 1);
        const lastButton = e.currentTarget.parentElement?.children[maxRating - 1] as HTMLButtonElement;
        lastButton?.focus();
        break;
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const getCurrentValue = () => {
    return hoverValue !== null ? hoverValue : value;
  };

  const getStarStatus = (starIndex: number): 'empty' | 'filled' | 'half' => {
    const currentValue = getCurrentValue();
    
    if (starIndex < Math.floor(currentValue)) {
      return 'filled';
    } else if (starIndex < currentValue && currentValue % 1 >= 0.5) {
      return 'half';
    }
    return 'empty';
  };

  const renderStar = (index: number) => {
    const rating = index + 1;
    const status = getStarStatus(index);
    const isFocused = focusedIndex === index;
    
    const starClasses = `
      ${styles.star} 
      ${styles[size]} 
      ${styles[status]}
      ${isInteractive ? styles.interactive : ''}
      ${isFocused ? styles.focused : ''}
      ${disabled ? styles.disabled : ''}
    `.trim();

    if (isInteractive) {
      return (
        <button
          key={index}
          type="button"
          className={starClasses}
          onClick={() => handleStarClick(rating)}
          onMouseEnter={() => handleStarEnter(rating)}
          onMouseLeave={handleStarLeave}
          onKeyDown={(e) => handleKeyDown(e, rating)}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          disabled={disabled}
          aria-label={`${rating}점 평가`}
          tabIndex={index === 0 || focusedIndex === index ? 0 : -1}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`star-gradient-${index}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={status === 'half' ? `url(#star-gradient-${index})` : 'currentColor'}
              stroke="currentColor"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      );
    }

    return (
      <div key={index} className={starClasses}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  };

  return (
    <div
      className={`${styles.container} ${styles[size]}`}
      role={isInteractive ? 'radiogroup' : 'img'}
      aria-label={isInteractive ? '별점 선택' : `${value}점 평가`}
      aria-readonly={readOnly}
    >
      <div className={styles.stars}>
        {Array.from({ length: maxRating }, (_, index) => renderStar(index))}
      </div>
      {!readOnly && (
        <span className={styles.srOnly}>
          현재 평점: {getCurrentValue()}점 (최대 {maxRating}점)
        </span>
      )}
    </div>
  );
};
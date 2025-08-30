import type { SelectProps } from './types';
// 👇 useState 외에 useRef, useEffect를 추가로 import 해주세요.
import { useState, useRef, useEffect } from 'react';
import styles from './Select.module.css';

function Select({ fieldLabel, options, value, onChange, placeholder = "선택하세요" }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find(option => option.value === value)?.label || placeholder;

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
     <div className={styles.selectComponentWrapper}>
      {/* 👇 fieldLabel prop이 있을 때만 label 태그를 보여줌 */}
      {fieldLabel && <label className={styles.fieldLabel}>{fieldLabel}</label>}
      
    <div
      className={styles.container}
      onClick={() => setIsOpen(!isOpen)}
      ref={containerRef}
      data-is-open={isOpen}
      tabIndex={0}
    >
      <div className={styles.selectWrapper}>
        <div className={styles.selectedValue}>
          {selectedLabel}
        </div>
        <img
          src="/assets/images/icon/dropdown.svg"
          alt="Dropdown Icon"
          className={styles.dropdownIcon}
        />
      </div>

      {isOpen && (
        <ul className={styles.optionsList}>
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`${styles.option} ${option.value === value ? styles.selected : ''}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
  );
}

export default Select;
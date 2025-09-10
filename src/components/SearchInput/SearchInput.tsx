"use client";

import {
  useState,
  useRef,
  KeyboardEvent,
  ChangeEvent,
  FocusEvent,
} from "react";
import { SearchInputProps } from "../../types/component-types";
import styles from "./SearchInput.module.css";

export const SearchInput = ({
  value,
  onChange,
  placeholder = "와인을 검색해 보세요",
  onSearch,
  onClear,
  disabled = false,
  maxLength = 100,
  onFocus,
  onBlur,
}: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === "Enter" && onSearch) {
      e.preventDefault();
      onSearch(value);
    }

    if (e.key === "Escape") {
      inputRef.current?.blur();
      if (value && onClear) {
        onClear();
      }
    }
  };

  const handleSearchClick = () => {
    if (disabled || !onSearch) return;
    onSearch(value);
  };

  const handleClearClick = () => {
    if (disabled || !onClear) return;
    onClear();
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div
      className={`${styles.container} ${isFocused ? styles.focused : ""} ${
        disabled ? styles.disabled : ""
      }`}
    >
      <button
        type="button"
        className={styles.searchIcon}
        onClick={handleSearchClick}
        disabled={disabled}
        aria-label="검색"
        tabIndex={-1}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className={styles.input}
        aria-label="와인 검색"
      />

      {value && onClear && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClearClick}
          disabled={disabled}
          aria-label="검색어 지우기"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

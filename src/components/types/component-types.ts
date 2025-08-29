// Wine Platform - SearchInput 컴포넌트 타입 정의

// 검색 입력 컴포넌트
export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  disabled?: boolean;
  maxLength?: number;
}

// 공통 컴포넌트 기본 props
export interface BaseComponentProps {
  className?: string;
  'data-testid'?: string;
}
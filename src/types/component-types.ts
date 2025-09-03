// Wine Platform - 공통 컴포넌트 타입 정의

// API 타입에서 가져온 와인 타입
export type WineType = "RED" | "WHITE" | "SPARKLING";

// 칩 컴포넌트 공통 인터페이스
export interface ChipOption {
  value: string;
  label: string;
}

export interface ChipProps {
  options: ChipOption[];
  selectedValues?: string[];
  onSelectionChange?: (values: string[]) => void;
  disabled?: boolean;
  readonly?: boolean;
  multiple?: boolean;
  ariaLabel?: string;
}

// 와인 타입 칩 컴포넌트 (하위 호환성)
export interface WineTypeChipProps {
  types: WineType[];
  selectedTypes: WineType[];
  onTypesChange: (types: WineType[]) => void;
  disabled?: boolean;
}

// 평점 라디오 컴포넌트
export interface RatingOption {
  label: string;
  value: string;
}

export interface RatingRadioProps {
  value: string;
  onChange: (value: string) => void;
  options: RatingOption[];
  name: string;
  disabled?: boolean;
}

// 별점 컴포넌트
export interface StarRatingProps {
  value: number;
  onChange?: (rating: number) => void;
  maxRating?: number;
  readOnly?: boolean;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
}

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

// Modal 컴포넌트 타입 정의
export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  children: React.ReactNode;
}

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
}

// 공통 컴포넌트 기본 props
export interface BaseComponentProps {
  className?: string;
  "data-testid"?: string;
}
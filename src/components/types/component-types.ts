// Wine Platform - StarRating 컴포넌트 타입 정의

// 별점 컴포넌트
export interface StarRatingProps {
  value: number;
  onChange?: (rating: number) => void;
  maxRating?: number;
  readOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
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
// Wine Platform - RatingRadio 컴포넌트 타입 정의

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
// Wine Platform - WineTypeChip 컴포넌트 타입 정의

// API 타입에서 가져온 와인 타입
export type WineType = 'RED' | 'WHITE' | 'SPARKLING';

// 와인 타입 칩 컴포넌트
export interface WineTypeChipProps {
  types: WineType[];
  selectedTypes: WineType[];
  onTypesChange: (types: WineType[]) => void;
  disabled?: boolean;
}

// 공통 컴포넌트 기본 props
export interface BaseComponentProps {
  className?: string;
  'data-testid'?: string;
}
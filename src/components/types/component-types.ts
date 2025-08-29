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
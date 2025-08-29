// Wine Platform - StarRating 컴포넌트 타입 정의

// 별점 컴포넌트
export interface StarRatingProps {
  value: number;
  onChange?: (rating: number) => void;
  maxRating?: number;
  readOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

// 공통 컴포넌트 기본 props
export interface BaseComponentProps {
  className?: string;
  'data-testid'?: string;
}
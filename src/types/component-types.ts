// Wine Platform - 공통 컴포넌트 타입 정의

import { components } from "./types.d";
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
  className?: string;
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
  className?: string;
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
  onFocus?: () => void;
  onBlur?: () => void;
}

// Modal 컴포넌트 타입 정의
export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "small" | "medium" | "large";
  className?: string;
  contentPadding?: string;
  children: React.ReactNode;
}

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}

// Modal Manager 시스템 타입
export enum ModalType {
  WINE_REGISTER = "wine-register",
  WINE_EDIT = "wine-edit",
  REVIEW_CREATE = "review-create",
  REVIEW_EDIT = "review-edit",
  FILTER = "filter",
}

export interface ModalState {
  activeModal: ModalType | null;
  modalData: Record<string, unknown> | null;
  isLoading: boolean;
}

// 와인 관련 타입
export type WineFormData = components["schemas"]["CreateWineBody"] & {
  // CreateWineBody에 없는 추가 필드가 있다면 여기에 정의
  year?: number; // API 스펙에 없으므로 UI 전용 필드로 관리
  alcoholContent?: number; // API 스펙에 없으므로 UI 전용 필드로 관리
  volume?: number; // API 스펙에 없으므로 UI 전용 필드로 관리
};

export interface WineFormModalProps {
  mode: "create" | "edit";
  initialData?: WineFormData;
  wineId?: string;
  onClose: () => void;
  onSuccess?: (wine: components["schemas"]["Wine"]) => void;
}

// 리뷰 관련 타입
export type ReviewFormData = Omit<
  components["schemas"]["CreateReviewBody"],
  "wineId"
>;

export interface ReviewFormModalProps {
  mode: "create" | "edit";
  wineId: string;
  reviewId?: string;
  initialData?: ReviewFormData;
  onClose: () => void;
  onSuccess?: (review: components["schemas"]["ReviewDetailType"]) => void;
  wineName?: string;
  wineAvgRating?: number;
}

// 필터 관련 타입
export interface FilterState {
  wineTypes: string[];
  priceRange: [number, number];
  ratingRange: [number, number];
  selectedRating?: string;
}

export interface FilterModalProps {
  initialData: FilterState;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

// Modal Manager Hook 반환 타입
export interface UseModalManagerReturn {
  modalState: ModalState;
  openWineModal: (mode: "create" | "edit", wineId?: string) => Promise<void>;
  openReviewModal: (
    mode: "create" | "edit",
    wineId: string,
    reviewId?: string
  ) => Promise<void>;
  openFilterModal: (currentFilters: FilterState) => void;
  closeModal: () => void;
}

// 공통 컴포넌트 기본 props
export interface BaseComponentProps {
  className?: string;
  "data-testid"?: string;
}

// API 응답 타입 (기본 구조)
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// 와인 맛 프로필 상수
export const TASTE_PROFILE_OPTIONS: ChipOption[] = [
  { value: "fruity", label: "과일향" },
  { value: "woody", label: "우디" },
  { value: "sweet", label: "달콤함" },
  { value: "dry", label: "드라이" },
  { value: "spicy", label: "스파이시" },
  { value: "floral", label: "꽃향" },
  { value: "citrus", label: "시트러스" },
  { value: "mineral", label: "미네랄" },
  { value: "herbal", label: "허브" },
  { value: "earthy", label: "흙내음" },
  { value: "nutty", label: "견과류" },
  { value: "vanilla", label: "바닐라" },
  { value: "oak", label: "오크" },
  { value: "butter", label: "버터" },
  { value: "tobacco", label: "담배" },
  { value: "leather", label: "가죽" },
  { value: "chocolate", label: "초콜릿" },
  { value: "coffee", label: "커피" },
  { value: "caramel", label: "카라멜" },
  { value: "honey", label: "꿀" },
  { value: "pepper", label: "후추" },
];

// 와인 타입 옵션
export const WINE_TYPE_OPTIONS: ChipOption[] = [
  { value: "RED", label: "Red" },
  { value: "WHITE", label: "White" },
  { value: "SPARKLING", label: "Sparkling" },
];

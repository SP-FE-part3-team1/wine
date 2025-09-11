import {
  WineFormData,
  ReviewFormData,
  FilterState,
  WineType,
} from "../../../types/component-types";
import { components } from "../../../types/types";

/**
 * 와인 폼 설정 - API 스키마에 맞춤
 */
export const WINE_FORM_CONFIG = {
  create: {
    initialValues: {
      name: "",
      type: "RED" as WineType,
      region: "",
      price: 0,
      image: "/assets/images/wine/default-wine-placeholder.png", // 기본 이미지
    } as WineFormData,
    title: "와인 등록하기",
  },

  edit: {
    /**
     * API 데이터를 폼 데이터로 변환 - API 스키마에 맞춤
     * @param apiData - API에서 받은 와인 데이터
     */
    dataMapper: (
      apiData: components["schemas"]["WineDetailType"]
    ): WineFormData => ({
      name: apiData.name,
      type: apiData.type as WineType,
      region: apiData.region,
      price: apiData.price,
      image: apiData.image,
    }),
    title: "와인 수정하기",
  },
};

/**
 * 리뷰 폼 설정 - API 스키마에 맞춤
 */
export const REVIEW_FORM_CONFIG = {
  create: {
    initialValues: {
      rating: 0,
      content: "",
      aroma: [],
      lightBold: 3,
      smoothTannic: 3,
      drySweet: 3,
      softAcidic: 3,
    } as ReviewFormData,
    title: "리뷰 남기기",
  },

  edit: {
    /**
     * API 데이터를 폼 데이터로 변환 - API 스키마에 맞춤
     * @param apiData - API에서 받은 리뷰 데이터
     */
    dataMapper: (
      apiData: components["schemas"]["ReviewDetailType"]
    ): ReviewFormData => ({
      rating: apiData.rating,
      content: apiData.content,
      aroma: apiData.aroma,
      lightBold: apiData.lightBold,
      smoothTannic: apiData.smoothTannic,
      drySweet: apiData.drySweet,
      softAcidic: apiData.softAcidic,
    }),
    title: "리뷰 수정하기",
  },
};

/**
 * 통합된 레이팅 옵션 (데스크탑과 모바일 공통)
 */
export const UNIFIED_RATING_OPTIONS = [
  { value: "all", label: "전체" },
  { value: "4", label: "4.5 - 5.0" },
  { value: "3", label: "4.0 - 4.5" },
  { value: "2", label: "3.5 - 4.0" },
  { value: "1", label: "3.0 - 3.5" },
];

/**
 * 필터 기본값 (데스크탑과 모바일 통합) - 동적 최대값 지원
 */
export const createFilterDefaultValues = (maxPrice: number = 400000): FilterState => ({
  selectedTypes: [],
  priceRange: [0, maxPrice],
  rating: "all",
});

/**
 * @deprecated 하드코딩된 기본값 - createFilterDefaultValues 사용 권장
 */
export const FILTER_DEFAULT_VALUES: FilterState = createFilterDefaultValues();

/**
 * 맛 프로필 슬라이더 설정
 */
export const TASTE_SLIDERS = [
  {
    key: "lightBold" as const,
    label: "라이트 ← → 진한",
    leftLabel: "라이트",
    rightLabel: "진한",
    min: 0,
    max: 5,
    step: 1,
  },
  {
    key: "smoothTannic" as const,
    label: "부드러운 ← → 떫은",
    leftLabel: "부드러운",
    rightLabel: "떫은",
    min: 0,
    max: 5,
    step: 1,
  },
  {
    key: "drySweet" as const,
    label: "드라이 ← → 달콤한",
    leftLabel: "드라이",
    rightLabel: "달콤한",
    min: 0,
    max: 5,
    step: 1,
  },
  {
    key: "softAcidic" as const,
    label: "안 셔요 ← → 셔요",
    leftLabel: "안 셔요",
    rightLabel: "셔요",
    min: 0,
    max: 5,
    step: 1,
  },
];

/**
 * API 요청을 위한 데이터 변환 - API 스키마에 맞춤
 */
export const transformWineDataForApi = (
  formData: WineFormData
): components["schemas"]["CreateWineBody"] => ({
  name: formData.name,
  type: formData.type,
  region: formData.region,
  price: formData.price,
  image: formData.image || "/assets/images/wine/default-wine-placeholder.png", // 빈 이미지시 기본 이미지
});

export const transformReviewDataForApi = (
  formData: ReviewFormData,
  wineId?: string
):
  | components["schemas"]["CreateReviewBody"]
  | components["schemas"]["UpdateReviewBody"] => {
  const baseData = {
    rating: formData.rating,
    content: formData.content,
    aroma: formData.aroma,
    lightBold: formData.lightBold,
    smoothTannic: formData.smoothTannic,
    drySweet: formData.drySweet,
    softAcidic: formData.softAcidic,
  };

  if (wineId) {
    return { ...baseData, wineId: parseInt(wineId) };
  }
  return baseData;
};

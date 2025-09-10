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
      image: "/assets/images/icon/wine.svg",
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
 * 필터 기본값
 */
export const FILTER_DEFAULT_VALUES: FilterState = {
  wineTypes: [],
  priceRange: [0, 400000],
  ratingRange: [0, 5],
  selectedRating: "all",
};

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
    label: "부드러운 ← → 산미",
    leftLabel: "부드러운",
    rightLabel: "산미",
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
  image: formData.image,
});

export const transformReviewDataForApi = (
  formData: ReviewFormData,
  wineId: string
): components["schemas"]["CreateReviewBody"] => ({
  rating: formData.rating,
  content: formData.content,
  aroma: formData.aroma,
  lightBold: formData.lightBold,
  smoothTannic: formData.smoothTannic,
  drySweet: formData.drySweet,
  softAcidic: formData.softAcidic,
  wineId: parseInt(wineId),
});

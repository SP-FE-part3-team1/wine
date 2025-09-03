import { WineFormData, ReviewFormData, FilterState, ChipOption } from '../../../types/component-types';

/**
 * 와인 폼 설정
 */
export const WINE_FORM_CONFIG = {
  create: {
    initialValues: {
      name: '',
      type: 'RED' as const,
      region: '',
      year: new Date().getFullYear(),
      price: 0,
      alcoholContent: 0,
      volume: 750,
      tasteProfile: [],
      image: ''
    } as WineFormData,
    title: '와인 등록하기'
  },
  
  edit: {
    /**
     * API 데이터를 폼 데이터로 변환
     * @param apiData - API에서 받은 와인 데이터
     */
    dataMapper: (apiData: any): WineFormData => ({
      name: apiData.name || '',
      type: apiData.type || 'RED',
      region: apiData.region || '',
      year: apiData.year || new Date().getFullYear(),
      price: apiData.price || 0,
      alcoholContent: apiData.alcoholContent || apiData.alcohol_content || 0, // snake_case 대응
      volume: apiData.volume || 750,
      tasteProfile: apiData.tasteProfile || apiData.taste_tags || [],
      image: apiData.image || apiData.imageUrl || ''
    }),
    title: '와인 수정하기'
  }
};

/**
 * 리뷰 폼 설정
 */
export const REVIEW_FORM_CONFIG = {
  create: {
    initialValues: {
      rating: 0,
      content: '',
      tasteProfile: [],
      lightBold: 0,
      smoothTannic: 0, 
      drySweet: 0,
      softAcidic: 0
    } as ReviewFormData,
    title: '리뷰 남기기'
  },
  
  edit: {
    /**
     * API 데이터를 폼 데이터로 변환
     * @param apiData - API에서 받은 리뷰 데이터
     */
    dataMapper: (apiData: any): ReviewFormData => ({
      rating: apiData.rating || 0,
      content: apiData.content || '',
      tasteProfile: apiData.tasteProfile || apiData.taste_tags || [],
      lightBold: apiData.lightBold || apiData.light_bold || 0,
      smoothTannic: apiData.smoothTannic || apiData.smooth_tannic || 0,
      drySweet: apiData.drySweet || apiData.dry_sweet || 0,
      softAcidic: apiData.softAcidic || apiData.soft_acidic || 0
    }),
    title: '리뷰 수정하기'
  }
};

/**
 * 필터 기본값
 */
export const FILTER_DEFAULT_VALUES: FilterState = {
  wineTypes: [],
  priceRange: [0, 1000000],
  ratingRange: [0, 5]
};

/**
 * 맛 프로필 슬라이더 설정
 */
export const TASTE_SLIDERS = [
  {
    key: 'lightBold' as const,
    label: '라이트 ← → 진한',
    leftLabel: '라이트',
    rightLabel: '진한',
    min: 0,
    max: 5,
    step: 1
  },
  {
    key: 'smoothTannic' as const,
    label: '부드러운 ← → 떫은',
    leftLabel: '부드러운',
    rightLabel: '떫은',
    min: 0,
    max: 5,
    step: 1
  },
  {
    key: 'drySweet' as const,
    label: '드라이 ← → 달콤한',
    leftLabel: '드라이',
    rightLabel: '달콤한',
    min: 0,
    max: 5,
    step: 1
  },
  {
    key: 'softAcidic' as const,
    label: '부드러운 ← → 산미',
    leftLabel: '부드러운',
    rightLabel: '산미',
    min: 0,
    max: 5,
    step: 1
  }
];

/**
 * API 요청을 위한 데이터 변환
 */
export const transformWineDataForApi = (formData: WineFormData) => ({
  name: formData.name,
  type: formData.type,
  region: formData.region,
  year: formData.year,
  price: formData.price,
  alcoholContent: formData.alcoholContent,
  volume: formData.volume,
  tasteProfile: formData.tasteProfile,
  ...(formData.image && { image: formData.image })
});

export const transformReviewDataForApi = (formData: ReviewFormData, wineId: string) => ({
  wineId,
  rating: formData.rating,
  content: formData.content,
  tasteProfile: formData.tasteProfile,
  lightBold: formData.lightBold,
  smoothTannic: formData.smoothTannic,
  drySweet: formData.drySweet,
  softAcidic: formData.softAcidic
});
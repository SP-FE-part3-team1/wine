import { WineFormData, ReviewFormData, FilterState, WineType } from '../../../types/component-types';

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
    dataMapper: (apiData: Record<string, unknown>): WineFormData => ({
      name: (typeof apiData.name === 'string') ? apiData.name : '',
      type: (apiData.type === 'RED' || apiData.type === 'WHITE' || apiData.type === 'SPARKLING') ? apiData.type as WineType : 'RED',
      region: (typeof apiData.region === 'string') ? apiData.region : '',
      year: (typeof apiData.year === 'number') ? apiData.year : new Date().getFullYear(),
      price: (typeof apiData.price === 'number') ? apiData.price : 0,
      alcoholContent: (typeof apiData.alcoholContent === 'number') ? apiData.alcoholContent : ((typeof apiData.alcohol_content === 'number') ? apiData.alcohol_content : 0),
      volume: (typeof apiData.volume === 'number') ? apiData.volume : 750,
      tasteProfile: Array.isArray(apiData.tasteProfile) ? apiData.tasteProfile as string[] : (Array.isArray(apiData.taste_tags) ? apiData.taste_tags as string[] : []),
      image: (typeof apiData.image === 'string') ? apiData.image : ((typeof apiData.imageUrl === 'string') ? apiData.imageUrl : '')
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
      body: 3,
      tannin: 3,
      sweetness: 3,
      acidity: 3,
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
    dataMapper: (apiData: Record<string, unknown>): ReviewFormData => ({
      rating: (typeof apiData.rating === 'number') ? apiData.rating : 0,
      content: (typeof apiData.content === 'string') ? apiData.content : '',
      tasteProfile: Array.isArray(apiData.tasteProfile) ? apiData.tasteProfile as string[] : (Array.isArray(apiData.taste_tags) ? apiData.taste_tags as string[] : []),
      body: (typeof apiData.body === 'number') ? apiData.body : 3,
      tannin: (typeof apiData.tannin === 'number') ? apiData.tannin : 3,
      sweetness: (typeof apiData.sweetness === 'number') ? apiData.sweetness : 3,
      acidity: (typeof apiData.acidity === 'number') ? apiData.acidity : 3,
      lightBold: (typeof apiData.lightBold === 'number') ? apiData.lightBold : ((typeof apiData.light_bold === 'number') ? apiData.light_bold : 0),
      smoothTannic: (typeof apiData.smoothTannic === 'number') ? apiData.smoothTannic : ((typeof apiData.smooth_tannic === 'number') ? apiData.smooth_tannic : 0),
      drySweet: (typeof apiData.drySweet === 'number') ? apiData.drySweet : ((typeof apiData.dry_sweet === 'number') ? apiData.dry_sweet : 0),
      softAcidic: (typeof apiData.softAcidic === 'number') ? apiData.softAcidic : ((typeof apiData.soft_acidic === 'number') ? apiData.soft_acidic : 0)
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
  ratingRange: [0, 5],
  selectedRating: 'all'
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
  wineId: parseInt(wineId),
  rating: formData.rating,
  content: formData.content,
  tasteProfile: formData.tasteProfile,
  body: formData.body || formData.lightBold || 3,
  tannin: formData.tannin || formData.smoothTannic || 3,
  sweetness: formData.sweetness || formData.drySweet || 3,
  acidity: formData.acidity || formData.softAcidic || 3,
  lightBold: formData.lightBold || 0,
  smoothTannic: formData.smoothTannic || 0,
  drySweet: formData.drySweet || 0,
  softAcidic: formData.softAcidic || 0
});
/**
 * 와인 상세 정보 API의 `reviews` 배열에 포함된 리뷰 객체의 타입
 */
export interface Review {
  id: number;
  rating: number;      // 별점 (1-5)
  lightBold: number;   // 바디감 (1-5)
  smoothTannic: number; // 타닌 (1-5)
  drySweet: number;    // 당도 (1-5)
  softAcidic: number;  // 산미 (1-5)
  aroma: string[];
  content: string;
  createdAt: string;
  user: {
    id: number;
    nickname: string;
    image: string | null;
  };
  isLiked: boolean; 
}

/**
 * ReviewCard 컴포넌트가 직접적으로 받는 props
 */
export interface ReviewCardProps {
  review: Review;
  onLikeClick?: (reviewId: number) => void;
  onMoreClick?: (reviewId: number) => void;
  onDelete: (reviewId: number) => void;
}



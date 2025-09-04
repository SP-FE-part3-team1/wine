export interface RatingDistribution {
  '5': number; // 5점 리뷰 수
  '4': number; // 4점 리뷰 수
  '3': number; // 3점 리뷰 수
  '2': number; // 2점 리뷰 수
  '1': number; // 1점 리뷰 수
}

export interface WineRatingSummaryProps {
  /** 전체 리뷰의 평균 별점 */
  avgRating: number;
  /** 전체 리뷰 개수 */
  reviewCount: number;
  /** 점수대별 리뷰 분포 */
  ratingDistribution: RatingDistribution;
  /** '리뷰 남기기' 버튼 클릭 시 실행될 함수 */
  onWriteReviewClick?: () => void;
}


'use client';

import { useState } from 'react';
// 기존 ReviewCard와 타입을 그대로 사용합니다.
import ReviewCard from '../ReviewCard/ReviewCard';
import { Review } from '../ReviewCard/types';
import styles from './ReviewList.module.css'; // 아래에 CSS 코드도 추가합니다.

// ReviewList가 받을 Props 타입 정의
interface ReviewListProps {
  initialReviews: Review[];
}

export default function ReviewList({ initialReviews }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  // ✨ '좋아요' 로직을 ReviewList가 담당합니다.
  const handleLike = (reviewId: number) => {
    setReviews((currentReviews) =>
      currentReviews.map((review) =>
        review.id === reviewId
          ? { ...review, isLiked: !review.isLiked } // isLiked 상태를 토글합니다.
          : review
      )
    );
    // TODO: 서버 API로 '좋아요' 상태를 업데이트하는 로직을 여기에 추가할 수 있습니다.
    console.log(`Review ID ${reviewId}의 좋아요 상태가 변경되었습니다.`);
  };

  // '더보기' 메뉴 클릭 핸들러 (현재는 콘솔 로그만)
  const handleMore = (reviewId: number) => {
    console.log(`Review ID ${reviewId}의 '더보기'가 클릭되었습니다.`);
    // TODO: 여기에 수정/삭제 메뉴를 보여주는 로직을 구현할 수 있습니다.
  };

  return (
    <section className={styles.reviewSection}>
      <h3 className={styles.listTitle}>리뷰 목록</h3>
      <div className={styles.reviewList}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onLikeClick={handleLike}
              onMoreClick={handleMore}
            />
          ))
        ) : (
          <p className={styles.noReviews}>아직 작성된 리뷰가 없습니다.</p>
        )}
      </div>
    </section>
  );
}
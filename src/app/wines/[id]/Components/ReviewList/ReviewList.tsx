'use client';

import { useState, useRef } from 'react';

import ReviewCard from '../ReviewCard/ReviewCard';
import { Review } from '../ReviewCard/types';
import styles from './ReviewList.module.css'; // 아래에 CSS 코드도 추가합니다.

import Image from 'next/image';
import Button from '@/components/Button/Button';


import { likeReview, unlikeReview} from '@/lib/review'; 

// ReviewList가 받을 Props 타입 정의
interface ReviewListProps {
  initialReviews: Review[];
  wineId: number; // API 호출을 위해 와인 ID를 받음
}


export default function ReviewList({ initialReviews }: ReviewListProps) { 

  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  
 const observerRef = useRef<HTMLDivElement | null>(null);

  // '좋아요' 핸들러
  const handleLike = async (reviewId: number, currentIsLiked: boolean) => {
    setReviews((currentReviews) =>
      currentReviews.map((review) =>
        review.id === reviewId
          ? { ...review, isLiked: !review.isLiked } // isLiked 상태를 토글
          : review
      )
    );
    // @TODO: 서버 API로 '좋아요' 상태를 업데이트하는 로직.
    console.log(`Review ID ${reviewId}의 좋아요 상태가 변경되었습니다.`);
      try {
        if(currentIsLiked) {
          await unlikeReview(reviewId); // 좋아요 취소
        } else {
          await likeReview(reviewId); // 좋아요 추가
        }
        //
      } catch (err) {
        console.error("좋아요 상태 업데이트 실패:", err);
        // 롤백 처리
        setReviews((currentReviews) =>
          currentReviews.map((review) =>
            review.id === reviewId
              ? { ...review, isLiked: currentIsLiked } // 원래 상태로 롤백
              : review
          )
        );
      }
  };

  // '더보기' 메뉴 클릭 핸들러
  const handleMore = (reviewId: number) => {
    console.log(`Review ID ${reviewId}의 '더보기'가 클릭되었습니다.`);
    // @TODO: 수정/삭제 메뉴를 보여주는 로직을 구현
  };

  // 삭제 핸들러
   // ✨ 리뷰 삭제 핸들러 함수를 수정합니다.
  const handleDelete = (reviewId: number) => {
    // 화면에서 리뷰 제거 (낙관적 업데이트)
    setReviews((currentReviews) =>
      currentReviews.filter((review) => review.id !== reviewId)
    );

    // ✨ 2. @TODO: 실제 서버에 삭제를 요청하는 API 호출 로직
    console.log(`@TODO: 서버에 ID가 ${reviewId}인 리뷰 삭제 요청을 보내야 합니다.`);
    /*
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('서버에서 리뷰 삭제에 실패했습니다.');
      }
      console.log('서버에서 리뷰가 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error(error);
      // @TODO: 에러 발생 시 UI 롤백 처리
      alert('리뷰 삭제에 실패했습니다. 다시 시도해 주세요.');
    }
    */
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
              onLikeClick={() => handleLike(review.id, review.isLiked)}
              onMoreClick={handleMore}
              onDelete={handleDelete} 
            />
          ))
        ) : (
          <div className={styles.noReviewsContainer}>
          <div className={styles.noReviewsSign}>
            <Image src="/assets/images/alert/alert.png" alt="No Reviews" width={100} height={100} />
          <p>작성된 리뷰가 없어요</p>
           <div className={styles.buttonWrapper}>
          </div>
         <Button variant="primary" className={styles.reviewButton}>
          리뷰 남기기
        </Button>
        </div>
        </div>
        )}
      </div>

      <div ref={observerRef} style={{ height: '50px' }}>
      </div>
    </section>
  );
}
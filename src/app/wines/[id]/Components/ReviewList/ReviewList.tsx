'use client';

import { useState, useRef, useCallback } from 'react';

import ReviewCard from '../ReviewCard/ReviewCard';
import { Review } from '../ReviewCard/types';
import { components } from '@/types/types';
import styles from './ReviewList.module.css'; // 아래에 CSS 코드도 추가합니다.

import Image from 'next/image';
import Button from '@/components/Button/Button';
import { useQuickModal } from '@/components/Modal';


import { likeReview, unlikeReview, deleteReview} from '@/lib/review'; 

// ReviewList가 받을 Props 타입 정의
interface ReviewListProps {
  initialReviews: Review[];
  wineId: number; // API 호출을 위해 와인 ID를 받음
  currentUser: { id: number }; // 현재 로그인한 유저 정보 
}


export default function ReviewList({ initialReviews, wineId, currentUser }: ReviewListProps) { 
  const modal = useQuickModal();

  // 리뷰 상태 관리 - 동적 업데이트를 위해 initialReviews에 의존하지 않음
  const [reviews, setReviews] = useState<Review[]>([]);
  const currentReviews = reviews.length > 0 ? reviews : initialReviews;
  
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
    // API로 '좋아요' 상태를 업데이트하는 로직.
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

  //수정 핸들러
  const handleEdit = (reviewId: number) => {
      modal.review.edit(wineId, reviewId, { onSuccess: handleReviewUpdate });
    }


  // 삭제 핸들러
  const handleDelete = async (reviewId: number) => {
    // 현재 리뷰 백업
    const reviewToDelete = reviews.find(review => review.id === reviewId);
    
    // 화면에서 리뷰 제거 (낙관적 업데이트)
    setReviews((currentReviews) =>
      currentReviews.filter((review) => review.id !== reviewId)
    );

    try {
      await deleteReview(reviewId);
      console.log('서버에서 리뷰가 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('서버에서 리뷰 삭제에 실패했습니다.', error);
      // 롤백 처리 - initialReviews 대신 백업된 리뷰 사용
      alert('리뷰 삭제에 실패했습니다. 다시 시도해 주세요.');
      if (reviewToDelete) {
        setReviews((currentReviews) => [...currentReviews, reviewToDelete]);
      }
    } 
  };

  // 리뷰 성공 콜백
  const handleReviewSuccess = useCallback((newReview: components["schemas"]["ReviewDetailType"]) => {
    setReviews(prev => {
      if (prev.length === 0) {
        return [...initialReviews, newReview as unknown as Review];
      } else {
        return [...prev, newReview as unknown as Review];
      }
    });
  }, [initialReviews]);
  
  const handleReviewUpdate = useCallback((updatedReview: components["schemas"]["ReviewDetailType"]) => {
    setReviews(prev => {
      if (prev.length === 0) {
        return initialReviews.map(r => r.id === updatedReview.id ? updatedReview as unknown as Review : r);
      } else {
        return prev.map(r => r.id === updatedReview.id ? updatedReview as unknown as Review : r);
      }
    });
  }, [initialReviews]);

  // '리뷰 남기기' 버튼 클릭 핸들러
  const handleWriteReviewClick = () => {
    modal.review.create(wineId, { onSuccess: handleReviewSuccess });
  };

  return (
    <section className={styles.reviewSection}>
      <h3 className={styles.listTitle}>리뷰 목록</h3>
      <div className={styles.reviewList}>
        {currentReviews.length > 0 ? (
          currentReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onLikeClick={() => handleLike(review.id, review.isLiked)}
              onDelete={handleDelete} 
              onEdit={handleEdit}
              currentUser={currentUser}
            />
          ))
        ) : (
          <div className={styles.noReviewsContainer}>
          <div className={styles.noReviewsSign}>
            <Image src="/assets/images/alert/alert.png" alt="No Reviews" width={100} height={100} />
          <p>작성된 리뷰가 없어요</p>
           <div className={styles.buttonWrapper}>
          </div>
         <Button 
         variant="primary" 
         className={styles.reviewButton}
         onClick={handleWriteReviewClick}
         >
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
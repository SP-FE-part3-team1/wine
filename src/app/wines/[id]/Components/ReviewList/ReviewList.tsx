'use client';

import { useState, useEffect, useRef } from 'react';
// 기존 ReviewCard와 타입을 그대로 사용합니다.
import ReviewCard from '../ReviewCard/ReviewCard';
import { Review } from '../ReviewCard/types';
import styles from './ReviewList.module.css'; // 아래에 CSS 코드도 추가합니다.

// ReviewList가 받을 Props 타입 정의
interface ReviewListProps {
  initialReviews: Review[];
  wineId: number; // API 호출을 위해 와인 ID를 받음
}

const REVIEW_LIMIT = 5; // 한 번에 5개씩 불러옴.


export default function ReviewList({ initialReviews, wineId }: ReviewListProps) {

  console.log('ReviewList가 받은 wineId:', wineId); 

  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(initialReviews.length === REVIEW_LIMIT);
  const [isLoading, setIsLoading] = useState(false);
  
 const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMoreReviews = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    
    try {
      // ✨ Mock API Route를 호출합니다.
      const response = await fetch(`/api/wines/${wineId}/reviews?page=${page}&limit=${REVIEW_LIMIT}`);

       if (!response.ok) {
        // 응답이 200 OK가 아니면 (404 등)
        setHasMore(false); // 더 이상 시도하지 않도록 hasMore를 false로 변경
        throw new Error(`서버 응답 오류: ${response.status}`);
      }
      const data = await response.json();

      if (data.reviews?.length > 0) {
        setReviews((prev) => [...prev, ...data.reviews]);
        setPage((prev) => prev + 1);
        setHasMore(data.hasMore);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("리뷰를 불러오는 데 실패했습니다.", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0] && entries[0].isIntersecting) {
          loadMoreReviews();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading, hasMore, page]); // 의존성 배열 업데이트



  // '좋아요' 핸들러
  const handleLike = (reviewId: number) => {
    setReviews((currentReviews) =>
      currentReviews.map((review) =>
        review.id === reviewId
          ? { ...review, isLiked: !review.isLiked } // isLiked 상태를 토글합니다.
          : review
      )
    );
    // @TODO: 서버 API로 '좋아요' 상태를 업데이트하는 로직.
    console.log(`Review ID ${reviewId}의 좋아요 상태가 변경되었습니다.`);
  };

  // '더보기' 메뉴 클릭 핸들러
  const handleMore = (reviewId: number) => {
    console.log(`Review ID ${reviewId}의 '더보기'가 클릭되었습니다.`);
    // @TODO: 수정/삭제 메뉴를 보여주는 로직을 구현
  };

  // 삭제 핸들러
   // ✨ 리뷰 삭제 핸들러 함수를 수정합니다.
  const handleDelete = (reviewId: number) => {
    // ✨ 1. window.confirm과 if문을 제거하여 바로 실행되도록 합니다.
    // 먼저 화면에서 리뷰를 즉시 제거합니다. (낙관적 업데이트)
    setReviews((currentReviews) =>
      currentReviews.filter((review) => review.id !== reviewId)
    );

    // ✨ 2. @TODO: 실제 서버에 삭제를 요청하는 API 호출 로직은 그대로 둡니다.
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
              onLikeClick={handleLike}
              onMoreClick={handleMore}
              onDelete={handleDelete} 
            />
          ))
        ) : (
          <p className={styles.noReviews}>아직 작성된 리뷰가 없습니다.</p>
        )}
      </div>

      <div ref={observerRef} style={{ height: '50px' }}>
        {isLoading && <p>로딩 중...</p>}
        {/* {!hasMore && reviews.length > 0 && <p>모든 리뷰를 다 봤습니다.</p>} */}
      </div>
    </section>
  );
}
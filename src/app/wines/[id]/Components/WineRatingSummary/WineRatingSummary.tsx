"use client"

import type { WineRatingSummaryProps } from './types';
import styles from './WineRatingSummary.module.css';


import Button from '@/components/Button/Button';
import { StarRating } from '@/components/StarRating/StarRating';
import { ModalProvider, useQuickModal } from '@/components/Modal';

function WineRatingSummary({
  avgRating,
  reviewCount,
  ratingDistribution,
  wineId,
}: WineRatingSummaryProps) {
  // 모달
  const modal = useQuickModal();

  // 1. Object.entries로 배열로 만든 뒤, 바로 정렬.
  const distributionEntries = Object.entries(ratingDistribution)
    .sort(([starsA], [starsB]) => Number(starsB) - Number(starsA));

  // '리뷰 남기기' 버튼 클릭 핸들러
  const handleWriteReviewClick = () => {
    modal.review.create(wineId);
  };

  return (
    <ModalProvider>
    <div className={styles.container}>
      {/* 왼쪽: 평균 점수 섹션 */}
      <div className={styles.summarySection}>
        <div className={styles.avgRating}>{avgRating.toFixed(1)}</div>
        <div className={styles.starAndCountWrapper}>
        <StarRating 
        value={avgRating} onChange={() => {}} readOnly={true} size='small' />
        <div className={styles.reviewCount}>{reviewCount.toLocaleString()}개의 후기</div>
        </div>
      </div>

      {/* 점수 분포 */}
      <div className={styles.distributionSection}>
          {/*key와 value를 꺼내 분포 bar 작성*/}
          {distributionEntries.map(([stars, count]) => {
            const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0;
            return (
              <div key={stars} className={styles.barItem}>
                <span className={styles.barLabel}>{stars}점</span>
                <div className={styles.progressBarContainer}>
                  <div
                    className={styles.progressBarFiller}
                    style={{ width: `${percentage}%` }}
                    aria-valuenow={percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            );
          })}
      </div>
        <div className={styles.buttonWrapper}>
         <Button 
         variant="primary" 
         onClick={handleWriteReviewClick}
         className={styles.reviewButton}>
          리뷰 남기기
        </Button>
        </div>
    </div>
    </ModalProvider>
  );
}

export default WineRatingSummary;


import styles from './page.module.css'; // 👈 기존 CSS 파일을 그대로 사용합니다.
import loadingStyles from './loading.module.css'; // 👈 스켈레톤 전용 스타일을 추가합니다.

export default function Loading() {
  return (
    // page.tsx와 동일한 최상위 구조와 클래스 이름 사용
    <div className={styles.pageContainer}>
      {/* WineSummaryCard 스켈레톤 */}
      <div className={styles.wineSummaryContainer}>
        <div className={loadingStyles.summaryCardSkeleton} />
      </div>

      {/* page.tsx와 동일한 하단 레이아웃 구조 */}
      <div className={styles.RatingSummaryAndReview}>
        {/* WineRatingSummary 스켈레톤 */}
        <div className={styles.wineRatingSummaryContainer}>
          <div className={loadingStyles.ratingSummarySkeleton} />
        </div>

        {/* ReviewList 스켈레톤 */}
        <div className={styles.reviewContainer}>
          <div className={loadingStyles.reviewListSkeleton}>
            <div className={loadingStyles.reviewCardSkeleton} />
            <div className={loadingStyles.reviewCardSkeleton} />
            <div className={loadingStyles.reviewCardSkeleton} />
          </div>
        </div>
      </div>
    </div>
  );
}
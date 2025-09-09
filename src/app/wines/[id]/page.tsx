
import { getWine } from '@/lib/wine';
import { getUser } from "@/actions/api.action";
import { notFound } from 'next/navigation';

import styles from './page.module.css'
import WineSummaryCard from './Components/WineSummaryCard/WineSummaryCard';
import ReviewList from './Components/ReviewList/ReviewList';
import WineRatingSummary from './Components/WineRatingSummary/WineRatingSummary';


// // 빌드 시점에 일부 상세페이지 미리 만듦
// export async function generateStaticParams() {
//   const wines = await getAllWines();

//   // wines에 배열이 없거나하여 에러객체가 반환되는경우
//   if (!Array.isArray(wines)) {
//     return [];
//   }

//   return wines.slice(0, 10).map((wine: { id: any }) => ({
//     id: String(wine.id),
//   }));
// }

// 1. 페이지 Props 타입을 공식 문서에 맞게 Promise 형태로 정의합니다.
type PageProps = {
  params: Promise<{ id: string }>;
};

// 페이지 컴포넌트는 props 객체에서 params를 바로 구조분해 할당하는 것이 더 간단합니다.
export default async function WineDetailPage({ params }: {
  params: Promise<{ id: string }>; // params가 Promise임을 명시
}) {
  // Promise가 이행(resolve)되기를 기다린 후, 바로 id를 구조 분해합니다.
  const { id } = await params;

  // 와인 데이터
  const wine = await getWine(id);

 
  
  if (!wine) {
    notFound();
  }
  
  // wine 객체에서 리뷰 목록을 바로 가져옵니다.
  const initialReviews = JSON.parse(JSON.stringify(wine.reviews || []));


    // 초기 5개 리뷰만 잘라서 전달
  // const initialReviews = wine.reviews ? wine.reviews.slice(0, 5) : [];

  // API 응답 스키마에 맞춰 avgRatings를 ratingDistribution으로 사용합니다.
  const ratingDistribution = wine.avgRatings || { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 };

   // 유저 정보
  const user = await getUser();
  const currentUser = JSON.parse(JSON.stringify((user.id || null)));

  //  // 서버 액션 또는 클라이언트 컴포넌트에서 처리할 이벤트 핸들러 (예시)
  // const handleWriteReview = () => {
  //   'use server';
  //   console.log('리뷰 남기기 버튼 클릭!');
  //   // 실제 구현 시에는 useRouter 등을 사용해 페이지를 이동시킵니다.
  // };

  return (
    <div className={styles.pageContainer}>
    <div className={styles.wineSummaryContainer}>
      <WineSummaryCard
        imageUrl={wine.image}
        name={wine.name}
        origin={wine.region}
        price={`₩ ${wine.price.toLocaleString()}`}
      />
     </div> 
      <div className={styles.RatingSummaryAndReview}>
      <div className={styles.wineRatingSummaryContainer}>
        {initialReviews.length > 0 && <WineRatingSummary
          avgRating={wine.avgRating}
          reviewCount={wine.reviewCount}
          ratingDistribution={ratingDistribution}
          // onWriteReviewClick={handleWriteReview}
        />}
      </div>
      
      <div className={styles.reviewContainer}>
          <ReviewList 
          initialReviews={initialReviews}
          wineId={wine.id} 
          currentUser={currentUser}
          />
      </div>
      </div>
     </div> 
  );
}


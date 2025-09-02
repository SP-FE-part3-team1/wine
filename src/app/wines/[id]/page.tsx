// import { getAllWines, getWineDetail } from '../../services/wineApi';
import { wineDetailData } from './dummyWines.js';

import { notFound } from 'next/navigation';
import styles from './page.module.css'
// import { getWineDetail } from '@/app/wines/[id]/wineApi';


import WineSummaryCard from './Components/WineSummaryCard/WineSummaryCard';
import ReviewCard from './Components/ReviewCard/ReviewCard';

// --- 데이터 로직 ---
// dummyWines.js를 직접 사용하도록 모의 함수를 수정합니다.
const getWineDetail = async (id: string) => {
  const wine = wineDetailData.find(w => w.id === Number(id));
  return Promise.resolve(wine);
};

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
  params: { id: string };
};

// 페이지 컴포넌트는 props 객체에서 params를 바로 구조분해 할당하는 것이 더 간단합니다.
export default async function WineDetailPage({ params }: PageProps) {
  const { id } = params;

  // 와인 상세 정보 (리뷰 포함)를 조회합니다.
  const wine = await getWineDetail(id);

  if (!wine) {
    notFound();
  }
  
  // wine 객체에서 리뷰 목록을 바로 가져옵니다.
  const reviews = wine.reviews || [];

  // 서버 컴포넌트이므로 실제 동작은 클라이언트 컴포넌트에서 구현해야 합니다.
  // 여기서는 콘솔 로그만 남기는 예시 함수입니다.
  // const handleLike = (reviewId: number) => {
  //   'use server';
  //   console.log(`${reviewId}번 리뷰에 좋아요 클릭!`);
  // };

  // const handleMore = (reviewId: number) => {
  //   'use server';
  //   console.log(`${reviewId}번 리뷰 더보기 클릭!`);
  // };

  return (
    <main className={styles.main}>
      <WineSummaryCard
        imageUrl={wine.image}
        name={wine.name}
        origin={wine.region}
        price={`₩ ${wine.price.toLocaleString()}`}
      />
      
      <div className={styles.reviewSection}>
        <div className={styles.reviewList}>
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              // onLikeClick={() => handleLike(review.id)}
              // onMoreClick={() => handleMore(review.id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}


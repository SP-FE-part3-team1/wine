// import { getAllWines, getWineDetail } from '../../services/wineApi';
import { wineDetailData } from './dummyWines.js';
import { notFound } from 'next/navigation';
// import { getWineDetail } from '@/app/wines/[id]/wineApi';
import WineSummaryCard from './WineSummaryCard/WineSummaryCard';

// --- 데이터 로직 ---
// 실제 API 대신 더미 데이터에서 와인 정보를 찾는 모의 함수
const getWineDetail = async (id: string) => {
  const wine = wineDetailData.find(wine => wine.id === Number(id));
  
  // 실제 API 호출처럼 Promise를 반환하여 비동기 동작을 유지합니다.
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
  params: Promise<{ id: string }>;
};

// 2. 페이지 컴포넌트는 전체 props 객체를 받습니다
export default async function WineDetailPage(props: PageProps) {
  const params = await props.params;
  const id = params.id;

  // 더미 데이터를 조회하는 getWineDetail 함수를 호출합니다.
  const wine = await getWineDetail(id);

  if (!wine) {
    notFound();
    // notFound()는 렌더링을 중단하므로 아래 return은 실행되지 않습니다.
  }

  return (
    <div>
      <h1>와인 상세 정보</h1>
      {/* 더미 데이터의 필드명(image, region)에 맞게 props를 전달하고,
        숫자인 price를 '원' 단위 문자열로 포맷팅합니다.
      */}
      <WineSummaryCard
        imageUrl={wine.image}
        name={wine.name}
        origin={wine.region}
        price={`₩ ${wine.price.toLocaleString()}`}
      />
      {/* 여기에 리뷰 목록 등 상세 페이지의 다른 UI를 추가할 수 있습니다. */}
    </div>
  );
}
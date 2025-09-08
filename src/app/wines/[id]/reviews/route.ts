import { NextResponse } from 'next/server';
// ✨ 수정된 경로: 고정된 위치에서 파일을 가져옵니다.
import { wineDetailData } from '../dummyWines.js';

export async function GET(
  request: Request,
  { params }: { params: { wineId: string } }
) {
  const { wineId } = params;
  const { searchParams } = new URL(request.url);
  
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '5', 10);

  try {
    const wine = wineDetailData.find((w) => w.id === Number(wineId));

    if (!wine || !wine.reviews) {
      return NextResponse.json({ error: '와인 또는 리뷰를 찾을 수 없습니다.' }, { status: 404 });
    }
    
    const allReviews = wine.reviews;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedReviews = allReviews.slice(startIndex, endIndex);

    return NextResponse.json({
      reviews: paginatedReviews,
      hasMore: endIndex < allReviews.length,
    });

  } catch (error) {
    return NextResponse.json({ error: '서버 내부 오류' }, { status: 500 });
  }
}
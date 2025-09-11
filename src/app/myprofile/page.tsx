import MyProfilePageClient from "./MyProfilePageClient";

import { getMyProfileAction, type MyProfile } from "@/actions/myprofile.action";
import {
  getMyReviewsForCard,
  type ReviewCardData,
} from "@/actions/myreviews.action";
import {
  getMyWinesForCard,
  type MyWineCardData,
} from "@/actions/mywine.action";

export const dynamic = "force-dynamic"; // 사용자별 데이터면 동적 권장(캐시 무효화)
export const revalidate = 0; // 캐시 없이 매 요청마다

export default async function MyProfilePage() {
  // 3개 호출을 병렬로
  const [myprofile, reviews, wines] = await Promise.all([
    getMyProfileAction().catch(() => null as MyProfile | null),
    getMyReviewsForCard().catch(() => [] as ReviewCardData[]),
    getMyWinesForCard().catch(() => [] as MyWineCardData[]),
  ]);

  return <MyProfilePageClient initial={{ myprofile, reviews, wines }} />;
}

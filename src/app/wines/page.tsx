// app/wines/page.tsx
import { getAllWines } from "./wineApi";
import PageClient from "./PageClient";

export default async function Page() {
  // 서버에서 데이터 패칭
  const wines = await getAllWines();
  // 클라이언트 컴포넌트에 내려줌
  return <PageClient wines={wines} />;
}

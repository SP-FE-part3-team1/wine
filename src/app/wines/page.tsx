"use client";

import { useState } from "react";
import { mockWines, WineListType } from "./mockWines";
import WineCarousel from "./WineCarousel";
import CardWine from "./CardWine";
import { SearchInput } from "@/components/SearchInput/SearchInput";
import styles from "@/app/wines/page.module.css";
import FilterIcon from "./FilterIcon";
export default function Page() {
  const [search, setSearch] = useState("");

  // 검색어 기준 필터링
  const filteredWines: WineListType[] = mockWines.filter(
    (wine) =>
      wine.name.toLowerCase().includes(search.toLowerCase()) ||
      wine.region.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className={styles.main}>
      {/* 추천 와인 캐러셀 */}
      <WineCarousel
        wines={mockWines}
        onClickWine={(id) => {
          console.log(`와인 ${id} 클릭됨`);
        }}
      />

      {/* 검색 인풋 */}
      <SearchInput
        value={search}
        onChange={setSearch}
        onSearch={(val) => console.log("검색 실행:", val)}
        onClear={() => setSearch("")}
      />

      <FilterIcon />

      {/* 카드 리스트 (검색 반영) */}
      <section className={styles.wineList}>
        {filteredWines.map((wine) => (
          <CardWine
            key={wine.id}
            imageUrl={wine.image}
            infoTitle={wine.name}
            infoDescription={wine.region}
            tagLabel={`₩ ${wine.price.toLocaleString()}`}
            rating={wine.avgRating}
            reviewState={`${wine.reviewCount}개의 후기`}
            detailTitle="최근 후기"
            detailDescription={
              wine.recentReview?.content ?? "아직 리뷰가 없습니다"
            }
            onClick={() => console.log(`${wine.name} 클릭됨`)}
          />
        ))}
      </section>
    </main>
  );
}

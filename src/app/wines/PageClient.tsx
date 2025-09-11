"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import WineCarousel from "./Components/WineCarousel/WineCarousel";
import CardWine from "./Components/CardWine/CardWine";
import { SearchInput } from "@/components/SearchInput/SearchInput";
import FilterIcon from "./Components/FilterIcon/FilterIcon";
import Button from "@/components/Button/Button";
import { Chip } from "@/components/Chip";
import RangeSlider from "@/components/RangeSlider/RangeSlider";
import { RatingRadio } from "@/components/RatingRadio";
import { components } from "@/types/types";
import { useQuickModal } from "@/components/Modal";
import { UNIFIED_RATING_OPTIONS } from "@/components/Modal/manager/modalConfigs";
import type { FilterState } from "@/types/component-types";

export type WineListType = components["schemas"]["WineListType"];
export default function PageClient({
  wines,
  recommendedWines,
}: {
  wines: WineListType[];
  recommendedWines: WineListType[];
}) {
  const router = useRouter();
  const modal = useQuickModal();
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [rating, setRating] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 필터 적용 콜백 함수
  const handleFilterApply = useCallback((newFilters: FilterState) => {
    setSelectedTypes(newFilters.selectedTypes);
    setPriceRange(newFilters.priceRange);
    setRating(newFilters.rating);
  }, []);
  // 와인 가격 중 최대값
  const maxPrice = useMemo(() => {
    const validPrices = wines
      .map((w) => w.price)
      .filter((p): p is number => typeof p === "number" && !isNaN(p));
    return validPrices.length > 0 ? Math.max(...validPrices) : 0;
  }, [wines]);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);

  // maxPrice가 계산되면 priceRange 업데이트
  useEffect(() => {
    if (maxPrice > 0) {
      setPriceRange(prev => [prev[0], maxPrice]);
    }
  }, [maxPrice]);

  // 검색/필터링 로직
  const filteredWines = wines.filter((wine) => {
    const matchesSearch =
      wine.name.toLowerCase().includes(search.toLowerCase()) ||
      wine.region.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(wine.type);

    const matchesPrice =
      wine.price >= priceRange[0] && wine.price <= priceRange[1];

    const matchesRating =
      rating === "" || rating === "all"
        ? true
        : rating === "4"
        ? wine.avgRating >= 4.5 && wine.avgRating <= 5.0
        : rating === "3"
        ? wine.avgRating >= 4.0 && wine.avgRating < 4.5
        : rating === "2"
        ? wine.avgRating >= 3.5 && wine.avgRating < 4.0
        : rating === "1"
        ? wine.avgRating >= 3.0 && wine.avgRating < 3.5
        : true;

    return matchesSearch && matchesType && matchesPrice && matchesRating;
  });

  return (
    <main className={styles.main}>
      {/* 추천 와인 캐러셀 */}
      <WineCarousel
        wines={recommendedWines}
        onClickWine={(id) => router.push(`/wines/${id}`)}
      />

      {/* 필터/검색/등록 버튼 */}
      <div className={styles.topBar}>
        <div
          className={styles.filterWrapper}
          onClick={() => {
            const currentFilters: FilterState = {
              selectedTypes,
              priceRange,
              rating,
            };
            modal.filter(currentFilters, handleFilterApply, maxPrice);
          }}
        >
          <FilterIcon />
        </div>
        <div className={styles.searchInput}>
          <SearchInput
            value={search}
            onChange={setSearch}
            onSearch={(val) => console.log("검색 실행:", val)}
            onClear={() => setSearch("")}
            onFocus={() => setIsSearching(true)}
            onBlur={(e) => {
              if (isModalOpen) return; // 모달 열려 있으면 blur 무시

              const target = e.relatedTarget as HTMLElement | null;
              if (!target) {
                setIsSearching(false);
                return;
              }

              const btnClass = styles.mobileRegisterBtn ?? "";
              if (!btnClass || !target.classList.contains(btnClass)) {
                setIsSearching(false);
              }
            }}
          />
        </div>
        <div className={styles.btn}>
          <Button
            variant="primary"
            ariaLabel="와인 등록하기"
            className={styles.registerButton}
            onClick={() => modal.add()}
          >
            와인 등록하기
          </Button>
        </div>
      </div>
      <div
        className={styles.mobileFilterWrapper}
        onClick={() => {
          const currentFilters: FilterState = {
            selectedTypes,
            priceRange,
            rating,
          };
          modal.filter(currentFilters, handleFilterApply, maxPrice);
        }}
      >
        <FilterIcon />
      </div>

      {/* 본문 레이아웃 */}
      <div className={styles.contentLayout}>
        {/* 필터 영역 */}
        <div className={styles.filterPanel}>
          <div className={styles.desktopChip}>
            <h3>WINE TYPES</h3>
            <Chip
              options={[
                { value: "RED", label: "Red" },
                { value: "WHITE", label: "White" },
                { value: "SPARKLING", label: "Sparkling" },
              ]}
              selectedValues={selectedTypes}
              onSelectionChange={setSelectedTypes}
              multiple
              ariaLabel="와인 타입 필터"
            />
          </div>

          <div className={styles.desktopRangeSlider}>
            <h3>PRICE</h3>
            <RangeSlider
              type="range"
              min={0}
              max={maxPrice}
              step={10000}
              value={priceRange}
              onChange={setPriceRange}
              showValue
            />
          </div>

          <div className={styles.desktopRating}>
            <h3>RATING</h3>
            <RatingRadio
              name="rating"
              value={rating}
              onChange={setRating}
              options={UNIFIED_RATING_OPTIONS}
            />
          </div>
          <Button
            variant="primary"
            ariaLabel="와인 등록하기"
            className={styles.registerButtonSide}
            onClick={() => modal.add()}
          >
            와인 등록하기
          </Button>
        </div>

        {/* 카드 리스트 */}
        <div className={styles.wineList}>
          {filteredWines.map((wine) => (
            <CardWine
              key={wine.id}
              imageUrl={wine.image}
              infoTitle={wine.name}
              infoDescription={wine.region}
              tagLabel={`₩ ${wine.price.toLocaleString()}`}
              rating={wine.avgRating}
              reviewState={`${wine.reviewCount}개의 후기`}
              detailTitle="최신 후기"
              detailDescription={
                wine.recentReview?.content ?? "아직 리뷰가 없습니다"
              }
              onClick={() => router.push(`/wines/${wine.id}`)}
            />
          ))}
        </div>
      </div>
      {/* 모바일 전용 하단 고정 버튼 */}
      {isSearching && !isModalOpen && (
        <div className={styles.mobileBtnBottom}>
          <Button
            variant="primary"
            ariaLabel="와인 등록하기"
            className={styles.mobileRegisterBtn}
            onClick={() => {
              setIsModalOpen(true);
              modal.add({
                onClose: () => {
                  setIsModalOpen(false);
                  setIsSearching(true);
                },
              });
            }}
          >
            와인 등록하기
          </Button>
        </div>
      )}
    </main>
  );
}

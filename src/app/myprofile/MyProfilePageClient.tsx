"use client";

import { useMemo, useState, useCallback } from "react";
import MyWineCard from "./_components/MyWineCard";
import MyProfileReviewCard from "./_components/MyProfileReviewCard";
import MyProfileCard from "./_components/MyProfileCard";

import styles from "./MyProfilePage.module.css";
import font from "@/app/fonts.module.css";
import Image from "next/image";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { useQuickModal } from "@/components/Modal";

import type { MyProfile } from "@/actions/myprofile.action";
import type { ReviewCardData } from "@/actions/myreviews.action";
import type { MyWineCardData } from "@/actions/mywine.action";

type TabKey = "reviews" | "wines";
const TABS: { key: TabKey; label: string }[] = [
  { key: "reviews", label: "내가 쓴 후기" },
  { key: "wines", label: "내가 등록한 와인" },
];

// ── any 금지용 안전 유틸
type NumStr = number | string;
const isNumStr = (v: unknown): v is NumStr =>
  typeof v === "number" || typeof v === "string";
const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

// ReviewCardData에서 wineId 안전 추출
function pickWineId(r: ReviewCardData): string | undefined {
  const o = r as unknown;
  if (!isRecord(o)) return undefined;
  if ("wineId" in o) {
    const v = (o as { wineId?: unknown }).wineId;
    if (isNumStr(v)) return String(v);
  }
  if ("wine" in o) {
    const w = (o as { wine?: unknown }).wine;
    if (isRecord(w) && "id" in w) {
      const idVal = (w as { id?: unknown }).id;
      if (isNumStr(idVal)) return String(idVal);
    }
  }
  if ("wineID" in o) {
    const v = (o as { wineID?: unknown }).wineID;
    if (isNumStr(v)) return String(v);
  }
  return undefined;
}

// 카드 형태 + wineId 포함
function toCardReview(r: ReviewCardData) {
  return {
    id: String(r.id),
    rating: r.rating,
    wine: r.wineName ?? r.wine?.name ?? "와인 이름 없음",
    note: r.content,
    wineId: pickWineId(r),
    updatedAt: r.updatedAt,
  };
}

type Props = {
  initial: {
    myprofile: MyProfile | null;
    reviews: ReviewCardData[];
    wines: MyWineCardData[];
  };
};

export default function MyProfilePageClient({ initial }: Props) {
  const [active, setActive] = useState<TabKey>("reviews");

  // 동적 업데이트를 위한 상태 관리
  const [reviews, setReviews] = useState<ReviewCardData[]>([]);
  const [wines, setWines] = useState<MyWineCardData[]>([]);
  const currentReviews = reviews.length > 0 ? reviews : initial.reviews;
  const currentWines = wines.length > 0 ? wines : initial.wines;
  const { myprofile } = initial;
  const modal = useQuickModal();

  // 삭제 콜백 함수들
  const handleReviewDeleted = useCallback(
    (deletedId: string) => {
      if (reviews.length === 0) {
        setReviews(initial.reviews.filter((r) => String(r.id) !== deletedId));
      } else {
        setReviews((prev) => prev.filter((r) => String(r.id) !== deletedId));
      }
    },
    [reviews.length, initial.reviews]
  );

  const handleWineDeleted = useCallback(
    (deletedId: string) => {
      if (wines.length === 0) {
        setWines(initial.wines.filter((w) => String(w.id) !== deletedId));
      } else {
        setWines((prev) => prev.filter((w) => String(w.id) !== deletedId));
      }
    },
    [wines.length, initial.wines]
  );

  const counts = useMemo(
    () => ({ reviews: currentReviews.length, wines: currentWines.length }),
    [currentReviews.length, currentWines.length]
  );

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.profilebox}>
          {myprofile ? (
            <MyProfileCard
              user={{
                id: String(myprofile.id),
                nickname: myprofile.nickname,
                image: myprofile.image ?? "",
              }}
            />
          ) : (
            // 로딩 문구 제거: 데이터가 없을 때만 간단 안내
            <p>프로필 정보를 불러오는 중...</p>
          )}
        </div>
      </aside>

      <main className={styles.content}>
        <section aria-label="내 활동" className={styles.section}>
          <div className={styles.tabsRow}>
            <div className={styles.tabs}>
              {TABS.map((t) => {
                const isActive = active === t.key;
                return (
                  <button
                    key={t.key}
                    type="button"
                    className={`${styles.tab} ${font["text-2lg-semibold"]} ${
                      isActive ? styles.tabActive : ""
                    }`}
                    aria-selected={isActive}
                    onClick={() => setActive(t.key)}
                  >
                    <span className={font["text-2xl-semibold"]}>{t.label}</span>
                  </button>
                );
              })}
            </div>
            <div className={`${styles.count} ${font["text-xs-regular"]}`}>
              총 <strong>{counts[active]}</strong>개
            </div>
          </div>

          <div className={styles.list}>
            {active === "reviews" ? (
              currentReviews.length === 0 ? (
                <div className={styles.warningwrapper}>
                  <div className={styles.warning}>
                    <Image
                      src="/assets/images/alert/alert.png"
                      alt=""
                      width={100}
                      height={100}
                    />
                    <p className={styles.warningtext}>
                      작성된 후기가 없습니다.
                    </p>
                    <Link href={"/wines"}>
                      <Button
                        variant="secondary"
                        radius={12}
                        className={`${styles.reveiwBtn} ${font["text-lg-semibold"]}`}
                        style={{ width: "15em", height: "5rem" }}
                      >
                        와인 후기 작성하러 가기
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                currentReviews.map((r) => (
                  <MyProfileReviewCard
                    key={r.id}
                    review={toCardReview(r)}
                    onDeleted={handleReviewDeleted}
                  />
                ))
              )
            ) : currentWines.length === 0 ? (
              <div className={styles.warningwrapper}>
                <div className={styles.warning}>
                  <Image
                    src="/assets/images/alert/alert.png"
                    alt=""
                    width={100}
                    height={100}
                  />
                  <p className={styles.warningtext}>등록한 와인이 없습니다.</p>

                  <Button
                    variant="secondary"
                    radius={12}
                    className={`${styles.wineAddBtn} ${font["text-lg-semibold"]}`}
                    style={{ width: "15em", height: "5rem" }}
                    onClick={() => modal.add()}
                  >
                    와인 등록하기
                  </Button>
                </div>
              </div>
            ) : (
              currentWines.map((w) => (
                <MyWineCard
                  key={w.id}
                  mywine={w}
                  onDeleted={handleWineDeleted}
                />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

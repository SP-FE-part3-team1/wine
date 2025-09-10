"use client";

import { useEffect, useMemo, useState } from "react";

import MyWineCard from "./_components/MyWineCard";
import {
  getMyWinesForCard,
  type MyWineCardData,
} from "@/actions/mywine.action";

import MyProfileReviewCard from "./_components/MyProfileReviewCard";
import {
  getMyReviewsForCard,
  type ReviewCardData,
} from "@/actions/myreviews.action";

import MyProfileCard from "./_components/MyProfileCard";
import { getMyProfileAction, type MyProfile } from "@/actions/myprofile.action";

import styles from "./MyProfilePage.module.css";
import font from "@/app/fonts.module.css";

type TabKey = "reviews" | "wines";

const TABS: { key: TabKey; label: string }[] = [
  { key: "reviews", label: "내가 쓴 후기" },
  { key: "wines", label: "내가 등록한 와인" },
];

// 카드가 기대하는 형태로 변환
function toCardReview(r: ReviewCardData) {
  return {
    id: String(r.id),
    rating: r.rating,
    time: new Date(r.updatedAt).toLocaleDateString(),
    wine: r.wineName ?? r.wine?.name ?? "와인 이름 없음",
    note: r.content,
  };
}

export default function MyProfilePage() {
  const [active, setActive] = useState<TabKey>("reviews");

  // 프로필
  const [myprofile, setmyProfile] = useState<MyProfile | null>(null);
  const [profileLoading, setprofileLoading] = useState(true);
  const [profileError, setprofileError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setprofileLoading(true);
        setprofileError(null);
        const p = await getMyProfileAction();
        setmyProfile(p);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setprofileError(e.message);
        } else {
          setprofileError("프로필 로딩 실패");
        }
      } finally {
        setprofileLoading(false);
      }
    })();
  }, []);

  // 리뷰
  const [reviews, setReviews] = useState<ReviewCardData[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setReviewsLoading(true);
        setReviewsError(null);
        const list = await getMyReviewsForCard();
        setReviews(list);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setReviewsError(e.message);
        } else {
          setReviewsError("리뷰 로딩 실패");
        }
      } finally {
        setReviewsLoading(false);
      }
    })();
  }, []);

  //와인
  const [wines, setWines] = useState<MyWineCardData[]>([]);
  const [winesLoading, setWinesLoading] = useState(true);
  const [winesError, setWinesError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setWinesLoading(true);
        const list = await getMyWinesForCard();
        setWines(list);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setWinesError(e.message);
        } else {
          setWinesError("와인 로딩 실패");
        }
      } finally {
        setWinesLoading(false);
      }
    })();
  }, []);

  // 총 개수 (state 기반)
  const counts = useMemo(
    () => ({ reviews: reviews.length, wines: wines.length }),
    [reviews, wines]
  );

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.profilebox}>
          {profileLoading ? (
            <p>프로필 불러오는 중…</p>
          ) : profileError ? (
            <p>{profileError}</p>
          ) : myprofile ? (
            <MyProfileCard
              user={{
                id: String(myprofile.id),
                nickname: myprofile.nickname,
                image: myprofile.image ?? "",
              }}
            />
          ) : (
            <p>프로필 없음</p>
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
              reviewsLoading ? (
                <p>후기 불러오는 중…</p>
              ) : reviewsError ? (
                <p>{reviewsError}</p>
              ) : reviews.length === 0 ? (
                <p>작성한 후기가 없습니다.</p>
              ) : (
                reviews.map((r) => (
                  <MyProfileReviewCard key={r.id} review={toCardReview(r)} />
                ))
              )
            ) : winesLoading ? (
              <p>등록한 와인 불러오는 중…</p>
            ) : winesError ? (
              <p>{winesError}</p>
            ) : wines.length === 0 ? (
              <p>등록한 와인이 없습니다.</p>
            ) : (
              wines.map((w) => <MyWineCard key={w.id} mywine={w} />)
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

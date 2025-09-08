"use client";

import { useState } from "react";

import MyWineCard from "./_components/MyWineCard";
import { mockWines } from "./fixtures/wines";

import MyProfileReviewCard from "./_components/MyProfileReviewCard";
import { mockReviews } from "./fixtures/reviews";

import MyProfileCard from "./_components/MyProfileCard";
import { mockProfile } from "./fixtures/profile";

import styles from "./MyProfilePage.module.css";
import font from "@/app/fonts.module.css";

type TabKey = "reviews" | "wines";

const TABS: { key: TabKey; label: string }[] = [
  { key: "reviews", label: "내가 쓴 후기" },
  { key: "wines", label: "내가 등록한 와인" },
];
export default function MyProfilePage() {
  const [active, setActive] = useState<TabKey>("reviews");
  const counts = { reviews: mockReviews.length, wines: mockWines.length };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.profilebox}>
          <MyProfileCard user={mockProfile} />
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
            {active === "reviews"
              ? mockReviews.map((review) => (
                  <MyProfileReviewCard key={review.id} review={review} />
                ))
              : mockWines.map((mywine) => (
                  <MyWineCard key={mywine.id} mywine={mywine} />
                ))}
          </div>
        </section>
      </main>
    </div>
  );
}

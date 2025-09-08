// app/myprofile/fixtures/reviews.ts
import type { Review } from "../_components/MyProfileReviewCard";

export const mockReviews: Review[] = [
  {
    id: "r1",
    rating: 5.0,
    time: "10시간 전",
    wine: "Sentinel Cabernet Sauvignon 2016",
    note: "Plum and peppery on the nose. Black cherry and blackberry on the palate. Supple tannins, medium body.",
  },
  {
    id: "r2",
    rating: 4.2,
    time: "어제",
    wine: "Chablis Premier Cru",
    note: "Green apple and citrus with a chalky mineral finish.",
  },
  {
    id: "r3",
    rating: 5.0,
    time: "10시간 전",
    wine: "Sentinel Cabernet Sauvignon 2016",
    note: "Plum and peppery on the nose. Black cherry and blackberry on the palate. Supple tannins, medium body.",
  },
];

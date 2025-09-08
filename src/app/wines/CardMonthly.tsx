"use client";
import { StarRating } from "@/components/StarRating";
import styles from "./CardMonthly.module.css";
import Image from "next/image";

type CardMonthlyProps = {
  rating: number;
  description?: string;
  imageUrl?: string;
  onClick?: () => void;
};

const CardMonthly = ({
  rating,
  description,
  imageUrl,
  onClick,
}: CardMonthlyProps) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.body}>
        {imageUrl && (
          <div className={styles.imageWrapper}>
            <img src={imageUrl} alt="와인 이미지" className={styles.image} />
          </div>
        )}
        <div className={styles.content}>
          <div className={styles.ratingWrapper}>
            <span className={styles.ratingValue}>
              {Number(rating ?? 0).toFixed(1)}
            </span>
            <StarRating size="small" value={rating} />
          </div>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </div>
    </div>
  );
};

export default CardMonthly;

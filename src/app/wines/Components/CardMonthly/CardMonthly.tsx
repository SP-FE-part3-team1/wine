"use client";
import { useState } from "react";
import { StarRating } from "@/components/StarRating";
import styles from "./CardMonthly.module.css";
import Image from "next/image";

type CardMonthlyProps = {
  rating: number;
  description?: string;
  imageUrl?: string;
  onClick?: () => void;
};

const fallbackImage = "/assets/images/wine/default-wine-placeholder.png";

const CardMonthly = ({
  rating,
  description,
  imageUrl,
  onClick,
}: CardMonthlyProps) => {
  const validSrc =
    imageUrl && (imageUrl.startsWith("http") || imageUrl.startsWith("/"))
      ? imageUrl
      : fallbackImage;

  const [imgSrc, setImgSrc] = useState(validSrc);
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.body}>
        <div className={styles.imageWrapper}>
          <Image
            src={imgSrc}
            alt="와인 이미지"
            width={38}
            height={136}
            className={styles.image}
            onError={() => setImgSrc(fallbackImage)}
          />
        </div>
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

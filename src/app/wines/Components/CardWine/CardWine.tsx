"use client";
import Tag from "@/components/Tag/Tag";
import styles from "@/app/wines/Components/CardWine/CardWine.module.css";
import { StarRating } from "@/components/StarRating";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { useState } from "react";

type CardWineProps = {
  imageUrl?: string;
  infoTitle?: string;
  infoDescription?: string;
  tagLabel?: string;
  rating?: number;
  reviewState?: string;
  detailTitle?: string;
  detailDescription?: string;
  onClick?: () => void;
};

const fallbackImage = "/assets/images/wine/default-wine-placeholder.png";
// URL 유효성 체크 + fallback 처리
const normalizeSrc = (src?: string) => {
  if (!src) return fallbackImage;
  try {
    const url = new URL(src); // 제대로 된 URL인지 확인
    // 확장자 검사
    if (!/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i.test(url.pathname)) {
      return fallbackImage;
    }
    return src;
  } catch {
    // URL 생성 자체가 실패하면 fallback
    return fallbackImage;
  }
};

const CardWine = ({
  imageUrl,
  infoTitle,
  infoDescription,
  tagLabel,
  rating,
  reviewState,
  detailTitle,
  detailDescription,
  onClick,
}: CardWineProps) => {
  const [imgSrc, setImgSrc] = useState(normalizeSrc(imageUrl));

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.body}>
        {imageUrl && (
          <div className={styles.imageWrapper}>
            <Image
              src={imgSrc}
              alt="와인 이미지"
              width={70}
              height={212}
              className={styles.image}
              onError={() => setImgSrc(fallbackImage)}
            />
          </div>
        )}
        <div className={styles.contentBox}>
          <div className={styles.content}>
            {infoTitle && <div className={styles.infoTitle}>{infoTitle}</div>}
            {infoDescription && (
              <div className={styles.infoDescription}>{infoDescription}</div>
            )}
            <div className={styles.tagWrapper}>
              {tagLabel && <Tag>{tagLabel}</Tag>}
            </div>
          </div>
          <div className={styles.wineRating}>
            {rating !== undefined && (
              <div className={styles.ratingValue}>{rating.toFixed(1)}</div>
            )}
            <div className={styles.ratingBox}>
              {rating !== undefined && <StarRating value={rating} />}
              {reviewState && (
                <div className={styles.reviewState}>{reviewState}</div>
              )}
            </div>
            <Button
              variant="icon"
              ariaLabel="더보기"
              radius={16}
              style={{ width: "3.2rem", height: "3.2rem" }}
            >
              <Image
                src="/assets/images/icon/right.svg"
                alt="더보기"
                width={32}
                height={32}
              />
            </Button>
          </div>
        </div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.detailContent}>
        {detailTitle && <div className={styles.detailTitle}>{detailTitle}</div>}
        {detailDescription && (
          <div className={styles.detailDescription}>{detailDescription}</div>
        )}
      </div>
    </div>
  );
};

export default CardWine;

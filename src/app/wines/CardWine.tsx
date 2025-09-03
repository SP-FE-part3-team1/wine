"use client";
import Tag from "@/components/Tag/Tag";
import styles from "@/app/wines/CardWine.module.css";
import { StarRating } from "@/components/StarRating";
import Image from "next/image";
import Button from "@/components/Button/Button";

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
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.body}>
        {imageUrl && (
          <div className={styles.imageWrapper}>
            <img src={imageUrl} alt="와인 이미지" className={styles.image} />
          </div>
        )}
        <div className={styles.contentBox}>
          <div className={styles.content}>
            {infoTitle && <div className={styles.infoTitle}>{infoTitle}</div>}
            {infoDescription && (
              <div className={styles.infoDescription}>{infoDescription}</div>
            )}
            <div className={tagLabel}>
              {tagLabel && <Tag size="S">{tagLabel}</Tag>}
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

"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Tag from "@/components/Tag/Tag";
import styles from "./MyProfileReviewCard.module.css";
import Button from "@/components/Button/Button";
import font from "@/app/fonts.module.css";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu";
import { DropdownMenuItem } from "@/components/DropdownMenu/types";
import { useQuickModal, ConfirmationModal } from "@/components/Modal";
import { deleteReview } from "@/actions/review.action";

export type Review = {
  id: string;
  rating: number;
  time: string;
  wine: string;
  note: string;
  /** 있으면 리뷰 수정에 함께 사용됨 */
  wineId?: string | number;
};

type Props = {
  review: Review;
  /** 선택: 부모에서 삭제 후 목록 갱신하고 싶으면 콜백 전달 */
  onDeleted?: (id: string) => void;
};

function MyProfileReviewCard({ review, onDeleted }: Props) {
  const modal = useQuickModal();
  const [open, setOpen] = useState(false);

  const handleEditReview = useCallback(() => {
    if (review.wineId != null) {
      modal.review.edit(String(review.wineId), review.id);
    } else {
      // wineId가 없으면 reviewId만으로 동작하는 구현 fallback
      modal.edit({ reviewId: review.id });
    }
  }, [modal, review.id, review.wineId]);

  // 삭제 확인 모달 열기
  const handleAskDeleteReview = useCallback(() => {
    setOpen(true);
  }, []);

  // 삭제 확정
  const handleConfirmDeleteReview = useCallback(async () => {
    await deleteReview(review.id);
    onDeleted?.(review.id);
    // ConfirmationModal은 onConfirm 실행 직후 onClose를 자동 호출(현재 구현)하므로
    // 여기서 setOpen(false)는 불필요하지만, 안전하게 두고 싶으면 아래 주석 해제:
    // setOpen(false);
  }, [review.id, onDeleted]);

  const menuItems: DropdownMenuItem[] = [
    { label: "수정하기", onClick: handleEditReview },
    { label: "삭제하기", onClick: handleAskDeleteReview },
  ];

  return (
    <div className={styles.reviewCard}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Tag
            icon={
              <svg
                width="1.6rem"
                height="1.6rem"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17.2752L7.85002 19.7752C7.66668 19.8919 7.47502 19.9419 7.27501 19.9252C7.07501 19.9085 6.90001 19.8419 6.75002 19.7252C6.60001 19.6085 6.48335 19.4627 6.40002 19.2877C6.31668 19.1127 6.30002 18.9169 6.35002 18.7002L7.45002 13.9752L3.77502 10.8002C3.60835 10.6502 3.50418 10.4794 3.46252 10.2877C3.42085 10.096 3.43335 9.90853 3.50002 9.72519C3.56668 9.54186 3.66668 9.39186 3.80002 9.2752C3.93335 9.15853 4.11668 9.08353 4.35002 9.0502L9.20002 8.6252L11.075 4.1752C11.1583 3.9752 11.2875 3.8252 11.4625 3.7252C11.6375 3.6252 11.8167 3.5752 12 3.5752C12.1833 3.5752 12.3625 3.6252 12.5375 3.7252C12.7125 3.8252 12.8417 3.9752 12.925 4.1752L14.8 8.6252L19.65 9.0502C19.8833 9.08353 20.0667 9.15853 20.2 9.2752C20.3333 9.39186 20.4333 9.54186 20.5 9.72519C20.5667 9.90853 20.5792 10.096 20.5375 10.2877C20.4958 10.4794 20.3917 10.6502 20.225 10.8002L16.55 13.9752L17.65 18.7002C17.7 18.9169 17.6833 19.1127 17.6 19.2877C17.5167 19.4627 17.4 19.6085 17.25 19.7252C17.1 19.8419 16.925 19.9085 16.725 19.9252C16.525 19.9419 16.3333 19.8919 16.15 19.7752L12 17.2752Z" />
              </svg>
            }
          >
            {review.rating.toFixed(1)}
          </Tag>
          <p className={`${styles.time} ${font["text-md-regular"]}`}>
            {review.time}
          </p>
        </div>
        <div className={styles.right}>
          <DropdownMenu items={menuItems} size="S">
            {/* 케밥 버튼은 메뉴만 열기 */}
            <Button
              variant="icon"
              ariaLabel="Kebab menu"
              radius={16}
              style={{ width: "2.6rem", height: "2.6rem" }}
            >
              <Image
                src="/assets/images/icon/menu.svg"
                alt=""
                width={26}
                height={26}
              />
            </Button>
          </DropdownMenu>
        </div>
      </div>

      <div className={styles.review}>
        <div className={`${styles.wine} ${font["text-md-regular"]}`}>
          {review.wine ?? "와인 이름 없음"}
        </div>
        <div className={`${styles.textReview} ${font["text-md-regular"]}`}>
          {review.note}
        </div>
      </div>

      <ConfirmationModal
        isOpen={open}
        title="작성한 리뷰를 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        onClose={() => setOpen(false)}
        onConfirm={handleConfirmDeleteReview}
      />
    </div>
  );
}

export default MyProfileReviewCard;

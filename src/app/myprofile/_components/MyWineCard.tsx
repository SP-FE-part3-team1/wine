"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import styles from "./MyWineCard.module.css";
import font from "@/app/fonts.module.css";
import Button from "@/components/Button/Button";
import Tag from "@/components/Tag/Tag";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu";
import { DropdownMenuItem } from "@/components/DropdownMenu/types";
import { useQuickModal, ConfirmationModal } from "@/components/Modal";
import { deleteWine } from "@/actions/wine.action";

export type MyWine = {
  id: string;
  title: string;
  region: string;
  price: number;
  imageSrc: string;
};

type Props = {
  mywine: MyWine;
  /** 선택: 삭제 후 부모에서 목록 갱신하려면 콜백 전달 */
  onDeleted?: (id: string) => void;
};

function MyWineCard({ mywine, onDeleted }: Props) {
  const modal = useQuickModal();
  const [open, setOpen] = useState<boolean>(false);

  const priceText = new Intl.NumberFormat("ko-KR", {
    maximumFractionDigits: 0,
  }).format(mywine.price);

  const handleEditWine = useCallback(() => {
    modal.edit({ wineId: mywine.id });
  }, [modal, mywine.id]);

  // 삭제 확인 모달 열기
  const handleAskDeleteWine = useCallback(() => {
    setOpen(true);
  }, []);

  // 삭제 확정 (ConfirmationModal이 onConfirm 후 자동 onClose 호출)
  const handleConfirmDeleteWine = useCallback(async () => {
    await deleteWine(mywine.id);
    onDeleted?.(mywine.id);
  }, [mywine.id, onDeleted]);

  const menuItems: DropdownMenuItem[] = [
    { label: "수정하기", onClick: handleEditWine },
    { label: "삭제하기", onClick: handleAskDeleteWine },
  ];

  return (
    <div className={styles.cardWrap}>
      <div className={styles.wineCard}>
        <div className={styles.wineImgWrapper}>
          <Image
            src={mywine.imageSrc}
            alt={mywine.title}
            width={52}
            height={100}
            className={styles.wineImg}
            priority={false}
          />
        </div>

        <div className={styles.body}>
          <div className={styles.wine}>
            <div>
              <div className={`${styles.title} ${font["text-2xl-semibold"]}`}>
                {mywine.title}
              </div>
              <div className={`${styles.region} ${font["text-lg-regular"]}`}>
                {mywine.region}
              </div>
            </div>
            <div className={styles.tag}>
              <Tag icon="₩">{priceText}</Tag>
            </div>
          </div>

          <div className={styles.moreArea}>
            <DropdownMenu items={menuItems} size="S">
              {/* 케밥 버튼은 메뉴만 열기 */}
              <Button
                variant="icon"
                ariaLabel="Kebab menu"
                radius={16}
                style={{ width: "2.6rem", height: "2.6rem", padding: "0.5rem" }}
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
      </div>

      <ConfirmationModal
        isOpen={open}
        title="와인 삭제"
        message="정말로 이 와인을 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        onClose={() => setOpen(false)}
        onConfirm={handleConfirmDeleteWine}
      />
    </div>
  );
}

export default MyWineCard;

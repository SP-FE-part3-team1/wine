"use client";

import Image from "next/image";
import styles from "./MyWineCard.module.css";
import font from "@/app/fonts.module.css";
import Button from "@/components/Button/Button";
import Tag from "@/components/Tag/Tag";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu";
import { DropdownMenuItem } from "@/components/DropdownMenu/types";

export type MyWine = {
  id: string;
  title: string;
  region: string;
  price: number;
  imageSrc: string;
};

type Props = {
  mywine: MyWine;
  onMenuSelect?: (action: "edit" | "delete", id: string) => void;
};

function MyWineCard({ mywine, onMenuSelect }: Props) {
  const priceText = new Intl.NumberFormat("ko-KR", {
    maximumFractionDigits: 0,
  }).format(mywine.price);

  const menuItems: DropdownMenuItem[] = [
    { label: "수정하기", onClick: () => onMenuSelect?.("edit", mywine.id) },
    { label: "삭제하기", onClick: () => onMenuSelect?.("delete", mywine.id) },
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
    </div>
  );
}

export default MyWineCard;

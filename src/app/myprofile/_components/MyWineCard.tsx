import Image from "next/image";
import styles from "./MyWineCard.module.css";
import font from "@/app/fonts.module.css";
import Button from "@/components/Button/Button";
import Tag from "@/components/Tag/Tag";

export type MyWine = {
  id: string;
  title: string;
  region: string;
  price: number;
  imageSrc: string;
};

// 카드에서는 id가 필요 없어서 Omit
type Props = Omit<MyWine, "id">;

export default function MyWineCard({ title, region, price, imageSrc }: Props) {
  const priceText = new Intl.NumberFormat("ko-KR", {
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <div className={styles.cardWrap}>
      <div className={styles.wineCard}>
        {/* 왼쪽: 병 이미지 */}
        <div className={styles.wineImgWrapper}>
          <Image
            src={imageSrc}
            alt={title}
            width={52}
            height={120}
            className={styles.wineImg}
            priority={false}
          />
        </div>

        <div className={styles.body}>
          <div className={styles.wine}>
            <div>
              <div className={`${styles.title} ${font["text-3xl-semibold"]}`}>
                {title}
              </div>
              <div className={`${styles.region} ${font["text-lg-regular"]}`}>
                {region}
              </div>
            </div>
            <div className={styles.tag}>
              <Tag size="M" icon="₩">
                {priceText}
              </Tag>
            </div>
          </div>

          <div className={styles.moreArea}>
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
          </div>
        </div>
      </div>
    </div>
  );
}

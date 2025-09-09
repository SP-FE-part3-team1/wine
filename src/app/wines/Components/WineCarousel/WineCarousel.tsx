import { useRef, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Button from "@/components/Button/Button";
import Image from "next/image";
import CardMonthly from "../CardMonthly/CardMonthly";
import styles from "@/app/wines/WineCarousel.module.css";
import { components } from "@/types/types";

type WineListType = components["schemas"]["WineListType"];
type WineCarouselProps = {
  wines: WineListType[];
  onClickWine?: (id: number) => void;
};
const WineCarousel = ({ wines, onClickWine }: WineCarouselProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className={styles.carouselWrapper}>
      <h1 className={styles.title}>이번 달 추천 와인</h1>
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView="auto"
        centerInsufficientSlides={false}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          376: { slidesPerView: "auto", spaceBetween: 16 },
          769: { slidesPerView: "auto", spaceBetween: 16 },
        }}
      >
        {wines.map((wine) => (
          <SwiperSlide key={wine.id} style={{ width: "16rem" }}>
            <CardMonthly
              imageUrl={wine.image}
              rating={wine.avgRating}
              description={wine.name}
              onClick={() => onClickWine?.(wine.id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Button
        variant="primary"
        ariaLabel="다음 와인"
        className={styles.nextButton}
        style={{
          width: "4.8rem",
          height: "4.8rem",
          backgroundColor: "white",
          border: "1px solid #CFDBEA",
          borderRadius: "50%",
        }}
        onClick={() => swiperRef.current?.slideNext()}
      >
        <Image
          src="/assets/images/icon/right.svg"
          alt="다음 와인"
          width={24}
          height={24}
        />
      </Button>
    </div>
  );
};

export default WineCarousel;

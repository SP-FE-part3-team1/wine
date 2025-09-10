"use client";

import styles from "@/app/wines/Components/FilterIcon/FilterIcon.module.css";

type FilterIconProps = {
  onClick?: () => void;
};

const FilterIcon = ({ onClick }: FilterIconProps) => {
  return (
    <button
      type="button"
      className={styles.filterButton}
      onClick={onClick}
      aria-label="필터 열기"
    >
      <img
        src="/assets/images/icon/filter.svg"
        alt="필터 아이콘"
        className={styles.icon}
      />
    </button>
  );
};

export default FilterIcon;

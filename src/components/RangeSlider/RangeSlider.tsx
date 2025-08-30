"use client";

import React from "react";
import styles from "./RangeSlider.module.css";

type Base = {
  min: number;
  max: number;
  step?: number;
};

type SingleProps = Base & {
  type?: "single";
  value: number;
  onChange: (value: number) => void;
  showValue?: boolean;
};

type RangeProps = Base & {
  type: "range";
  value: [number, number];
  onChange: (value: [number, number]) => void;
  showValue?: boolean;
};

type Props = SingleProps | RangeProps;

const formatKRW = (n: number) =>
  `₩ ${new Intl.NumberFormat("ko-KR").format(n)}`;

export default function RangeSlider(props: Props) {
  const { min, max, step = 1 } = props;
  const pct = (v: number) => ((v - min) * 100) / (max - min);

  if (props.type === "range") {
    const [minVal, maxVal] = props.value;

    // 트랙 배경(선택 영역만 보라색)
    const trackStyle = {
      background: `linear-gradient(
        to right,
        #ddd ${pct(minVal)}%,
        #6c63ff ${pct(minVal)}%,
        #6c63ff ${pct(maxVal)}%,
        #ddd ${pct(maxVal)}%
      )`,
    };

    return (
      <div className={styles.track} style={trackStyle}>
        {props.showValue && (
          <>
            <div className={styles.bubble} style={{ left: `${pct(minVal)}%` }}>
              {formatKRW(minVal)}
            </div>
            <div className={styles.bubble} style={{ left: `${pct(maxVal)}%` }}>
              {formatKRW(maxVal)}
            </div>
          </>
        )}

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={(e) => {
            const next = Math.min(Number(e.target.value), maxVal - step);
            props.onChange([next, maxVal]);
          }}
          className={`${styles.thumb} ${styles.thumbLeft} ${
            minVal > max - 100 ? styles.thumbOnTop : ""
          }`}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={(e) => {
            const next = Math.max(Number(e.target.value), minVal + step);
            props.onChange([minVal, next]);
          }}
          className={`${styles.thumb} ${styles.thumbRight}`}
        />
      </div>
    );
  }

  // single 모드
  return (
    <div className={`${styles.track} ${styles.trackSingle}`}>
      {(props.showValue ?? false) && (
        <div className={styles.bubble} style={{ left: `${pct(props.value)}%` }}>
          {props.value}
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={props.value}
        onChange={(e) =>
          (props as SingleProps).onChange(Number(e.target.value))
        }
        className={`${styles.thumb} ${styles.thumbSingle}`}
      />
    </div>
  );
}

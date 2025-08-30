"use client";

import React from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost" | "icon";
type Radius = 12 | 16 | 100;

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
  variant?: Variant;
  radius?: Radius;
  ariaLabel?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  radius = 16,
  ariaLabel,
  children,
  className,
  ...rest
}) => {
  const classes = [
    styles.button,
    styles[variant],
    styles[`r${radius}`],
    className, // 외부에서 폰트 모듈 같은 className도 받을 수 있게 병합
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" aria-label={ariaLabel} className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;

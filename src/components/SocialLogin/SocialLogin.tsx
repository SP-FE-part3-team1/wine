"use client";

import styles from "./SocialLogin.module.css";

type SocialLoginProps = {
  children: React.ReactNode;
  logoSrc: string;
  alt?: string;
  size?: "sm" | "md" | "fill";
  onClick?: () => void;
};

const SocialLogin = ({
  children,
  logoSrc,
  alt = "sns logo",
  size = "md",
  onClick,
}: SocialLoginProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.snsButton} ${styles[size]}`}
    >
      <img src={logoSrc} alt={alt} className={styles.logo} />
      <span className={styles.text}>{children}</span>
    </button>
  );
};

export default SocialLogin;

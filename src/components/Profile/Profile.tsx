"use client";

import styles from "./Profile.module.css";

type ProfileProps = {
  src: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
};

const Profile = ({
  src,
  alt = "profile",
  size = "lg",
  onClick,
}: ProfileProps) => {
  return (
    <div className={`${styles.profile} ${styles[size]}`} onClick={onClick}>
      <img src={src} alt={alt} className={styles.image} />
      <div className={styles.overlay}>
        <img src="/assets/images/icon/photo.svg" alt="upload icon" />
      </div>
    </div>
  );
};

export default Profile;

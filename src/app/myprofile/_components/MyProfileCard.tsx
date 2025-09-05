"use client";

import styles from "./MyProfileCard.module.css";
import Button from "@/components/Button/Button";
import font from "@/app/fonts.module.css";
import Profile from "@/components/Profile/Profile";
import CustomInput from "@/components/Input/CustomInput";

import { useState } from "react";

export type UserProfile = {
  id: string;
  nickname: string;
  image: string;
};

type Props = {
  user: UserProfile;
  // onNicknameSubmit?: (next: string) => void; // 나중에 API 붙일 때 사용
};

function MyProfileCard({ user }: Props) {
  const [name, setName] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    // TODO: 나중에 API 연동 (예: mutate / fetch)
    console.log("닉네임 변경:", name);
  };

  const changed = name.trim() !== user.nickname;

  return (
    <div className={styles.myprofilecard}>
      <div className={styles.profile}>
        <Profile src="assets/images/profile/profile.png" alt="" size="md" />
        <p className={font["text-xl-semibold"]}>{user.nickname}</p>
      </div>
      <div className={styles.nickname}>
        <label htmlFor="nickname" className={font["text-md-medium"]}>
          닉네임
        </label>
        <div className={styles.fieldRow}>
          <CustomInput
            id="nickname"
            name="nickname"
            type="text"
            placeholder={user.nickname}
            labelText=""
            src=""
            error={false}
            value={name}
            handleChange={handleChange}
          />

          <div className={styles.actions}>
            <Button
              variant="primary"
              radius={16}
              className={font["text-md-semibold"]}
              style={{ width: "8.9rem", height: "4.2rem" }}
              onClick={handleSubmit}
            >
              변경하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfileCard;

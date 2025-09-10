"use client";

import styles from "./MyProfileCard.module.css";
import Button from "@/components/Button/Button";
import font from "@/app/fonts.module.css";
import Profile from "@/components/Profile/Profile";
import CustomInput from "@/components/Input/CustomInput";

import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import {
  patchMyProfileAction,
  type PatchState,
} from "@/actions/myprofile.action";

export type UserProfile = {
  id: string;
  nickname: string;
  image: string;
};

type Props = { user: UserProfile };

// JPEG/PNG만
const ALLOWED = ["image/jpeg", "image/png"];
const MAX_BYTES = 5 * 1024 * 1024;

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="primary"
      radius={16}
      className={font["text-md-semibold"]}
      style={{ width: "8.9rem", height: "4.2rem" }}
      type="submit"
      disabled={disabled || pending}
    >
      {pending ? "저장 중…" : "변경하기"}
    </Button>
  );
}

export default function MyProfileCard({ user }: Props) {
  const [displayNickname, setDisplayNickname] = useState(user.nickname);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState(user.image);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);
  const openPicker = () => fileRef.current?.click();

  const [state, formAction] = useActionState<PatchState, FormData>(
    patchMyProfileAction,
    { ok: false }
  );

  // 서버 액션 결과 반영
  useEffect(() => {
    if (!state) return;

    if (state.ok) {
      if (state.nickname) {
        setDisplayNickname(state.nickname);
        setName("");
      }
      if (typeof state.image !== "undefined") {
        setImageUrl(state.image ?? "");
      }
      setError(null);

      // 미리보기/파일 필드 정리
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";

      // 다음 프레임에 blob URL revoke
      requestAnimationFrame(() => {
        if (blobUrlRef.current) {
          URL.revokeObjectURL(blobUrlRef.current);
          blobUrlRef.current = null;
        }
      });
    } else if (state.message) {
      setError(state.message);
    }
  }, [state]);

  // 파일 선택: 검증 + 미리보기
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    if (!ALLOWED.includes(f.type)) {
      setError("JPEG/PNG 이미지만 업로드할 수 있어요.");
      e.currentTarget.value = "";
      return;
    }
    if (f.size > MAX_BYTES) {
      setError("파일 용량은 최대 5MB까지 가능합니다.");
      e.currentTarget.value = "";
      return;
    }
    setError(null);

    // 이전 blob URL 정리
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }

    const url = URL.createObjectURL(f);
    blobUrlRef.current = url;
    setPreview(url);
  };

  const changedNickname = !!name.trim() && name.trim() !== displayNickname;
  const changedImage = !!preview;
  const changed = changedNickname || changedImage;

  const currentImageSrc =
    preview || imageUrl || "/assets/images/profile/profile.png";

  return (
    <div className={styles.myprofilecard}>
      <div className={styles.profile}>
        <div className={styles.profileimg}>
          <Profile
            src={currentImageSrc}
            alt=""
            size="md"
            onClick={openPicker}
          />
          <div style={{ display: "grid", gap: "0.4rem" }}>
            <p className={font["text-xl-semibold"]}>{displayNickname}</p>
            {error && (
              <p role="alert" style={{ color: "#d32f2f", fontSize: 12 }}>
                {error}
              </p>
            )}
          </div>
        </div>

        {/* 같은 폼에서 닉네임+파일 제출 (파일은 서버에서 uploadImage로 처리) */}
        <div className={styles.formaction}>
          <form action={formAction}>
            <input
              ref={fileRef}
              type="file"
              name="image"
              accept="image/jpeg,image/png"
              onChange={onFileChange}
              style={{ display: "none" }}
              className={styles.inputCol}
            />

            <div className={styles.nickname}>
              <label htmlFor="nickname" className={font["text-md-medium"]}>
                닉네임
              </label>
              <div className={styles.fieldRow}>
                <div className={styles.inputCol}>
                  <CustomInput
                    id="nickname"
                    name="nickname"
                    type="text"
                    placeholder={displayNickname}
                    labelText=""
                    src=""
                    error={false}
                    value={name}
                    handleChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className={styles.actions}>
                  <SubmitButton disabled={!changed} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

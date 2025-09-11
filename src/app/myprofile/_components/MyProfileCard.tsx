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
  const [resetImage, setResetImage] = useState(false);
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
      setPreview(null);
      setResetImage(false);

      if (fileRef.current) fileRef.current.value = "";

      // blob URL 정리
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
    setResetImage(false);

    // 이전 blob URL 정리
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }

    const url = URL.createObjectURL(f);
    blobUrlRef.current = url;
    setPreview(url);
  };

  // 기본 이미지로 되돌리기
  const handleResetImage = () => {
    setError(null);
    setResetImage(true);

    // 파일/미리보기 초기화
    if (fileRef.current) fileRef.current.value = "";
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
    setPreview(null);

    // 화면 즉시 반영 (기본 이미지 표시)
    setImageUrl("");
  };

  const changedNickname = !!name.trim() && name.trim() !== displayNickname;
  const changedImage = resetImage || !!preview; // 반드시 boolean으로
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
          <div className={styles.wrapperprofile}>
            <div className={`${styles.nickname1} ${font["text-xl-semibold"]}`}>
              {displayNickname}
            </div>
            {error && (
              <p role="alert" style={{ color: "#d32f2f", fontSize: 12 }}>
                {error}
              </p>
            )}
            <div>
              {(imageUrl || preview) && (
                <button
                  type="button"
                  onClick={handleResetImage}
                  className={styles.resetBtn}
                  aria-label="기본 이미지로 변경"
                >
                  기본이미지 변경
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 닉네임 + 파일(옵션) 같은 폼에서 제출 */}
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
            {resetImage && <input type="hidden" name="removeImage" value="1" />}

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

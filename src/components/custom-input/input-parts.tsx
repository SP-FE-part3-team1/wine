"use client";

import { CustomInputType } from "@/types/input-component-types";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useVisible } from "@/hooks/visible-btn-hook";
import { useFileInputRef } from "@/hooks/file-input-ref-hook";
import { inputMaxLength } from "@/utils/input-length";
import Image from "next/image";
import style from "./input-parts.module.css";

const PWDTYPE = "password";

const InputParts = ({
  id,
  name,
  type,
  placeholder,
  src,
  width,
  height,
  error = false,
  errorText,
  value,
  handleChange,
}: CustomInputType & {
  src?: string | StaticImport;
  width?: number;
  height?: number;
  error: boolean;
  errorText?: string;
}) => {
  const [changeType, visible, handleVisibleButtonClick] = useVisible(type);
  const [fileInputRef, handleFileButtonClick] = useFileInputRef();

  function fileAndErrorStyle(
    type: CustomInputType["type"],
    error: boolean
  ): string {
    switch (type) {
      case "file":
        return error
          ? `${style.file} ${style["input-invalid"]}`
          : (style.file as string);
      default:
        return error
          ? `${style.input} ${style["input-invalid"]}`
          : (style.input as string);
    }
  }

  return (
    <div className={style.container}>
      <input
        className={fileAndErrorStyle(type, error)}
        ref={type === "file" ? fileInputRef : null}
        type={changeType}
        id={id}
        name={name}
        placeholder={placeholder}
        maxLength={inputMaxLength(type)}
        accept={type === "file" ? ".jpg, .png, .jpeg, .svg, .webp" : undefined}
        value={value}
        onChange={handleChange}
      />
      {PWDTYPE === type && (
        <button
          className={style["visible-btn"]}
          onClick={handleVisibleButtonClick}
        >
          <Image
            src={
              visible
                ? "/assets/images/icon/visible.svg"
                : "/assets/images/icon/invisible.svg"
            }
            width={20}
            height={20}
            alt="비밀번호 보기"
          />
        </button>
      )}
      {type === "file" && (
        <button className={style["file-btn"]} onClick={handleFileButtonClick}>
          <Image
            src={src ? src : "/assets/images/icon/photo.svg"}
            width={width ? width : 32}
            height={height ? height : 32}
            alt="와인 사진"
            priority
          />
        </button>
      )}
      {error && <div className={style["error-text"]}>{errorText}</div>}
    </div>
  );
};

export default InputParts;

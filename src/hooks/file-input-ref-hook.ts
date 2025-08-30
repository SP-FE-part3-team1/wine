import { RefObject, useRef } from "react";

export function useFileInputRef(): [
  fileInputRef: RefObject<HTMLInputElement | null>,
  handleFileButtonClick: () => void
] {
  const fileInputRef: RefObject<HTMLInputElement | null> = useRef(null);

  const handleFileButtonClick = () => {
    if (!fileInputRef!.current) return;
    fileInputRef!.current.click();
  };

  return [fileInputRef, handleFileButtonClick];
}

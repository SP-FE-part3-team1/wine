import { CustomInputType } from "@/types/input-component-types";
import { useState } from "react";

export function useVisible(
  type: CustomInputType["type"]
): [
  changeType: CustomInputType["type"],
  visible: boolean,
  handleVisibleButtonClick: () => void
] {
  const [changeType, setChangeType] = useState(type);
  const [visible, setVisible] = useState(false);

  const handleVisibleButtonClick = () => {
    setVisible(!visible);
    if (changeType === "password") {
      setChangeType("text");
    } else {
      setChangeType("password");
    }
  };

  return [changeType, visible, handleVisibleButtonClick];
}

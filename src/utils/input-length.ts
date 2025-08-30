import { CustomInputType } from "@/types/input-component-types";

export const inputMaxLength = (type: CustomInputType["type"]) => {
  switch (type) {
    case "file":
      return undefined;
    default:
      return 30;
  }
};

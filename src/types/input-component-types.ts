import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { ChangeEvent, RefObject } from "react";

export type ReviewType = {
  name: string;
  id: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
};

export type CustomInputType = {
  id: string;
  name: string;
  placeholder?: string;
  type: "text" | "email" | "password" | "file";
  value?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type CustomInputAndLabelAndRefType = CustomInputType & {
  labelText: string;
  fileInputRef?: RefObject<HTMLInputElement> | undefined;
  src?: string | StaticImport;
  width?: number;
  height?: number;
};

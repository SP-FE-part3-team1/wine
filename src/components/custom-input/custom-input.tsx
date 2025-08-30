import { CustomInputAndLabelAndRefType } from "@/types/input-component-types";
import InputParts from "./input-parts";
import LabelParts from "./label-parts";
import style from "./custom-input.module.css";

const CustomInput = ({
  id,
  name,
  type,
  placeholder,
  labelText,
  src,
  width,
  height,
  error,
  errorText,
  value,
  handleChange,
}: CustomInputAndLabelAndRefType & {
  error: boolean;
  errorText?: string;
}) => {
  const props = {
    id,
    name,
    type,
    placeholder,
    src,
    width,
    height,
    error,
    errorText,
    value,
    handleChange,
  };

  return (
    <div className={style.container}>
      <LabelParts id={id} labelText={labelText} />
      <InputParts {...props} />
    </div>
  );
};

export default CustomInput;

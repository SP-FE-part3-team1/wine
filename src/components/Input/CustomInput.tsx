import { CustomInputAndLabelAndRefType } from "@/types/input-component-types";
import InputParts from "./InputParts";
import LabelParts from "./LabelParts";
import style from "./CustomInput.module.css";

//error값을 사용하지 않으려면 false로 설정해주시면 됩니다.
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

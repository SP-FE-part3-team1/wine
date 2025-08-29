import { ReviewType } from "@/types/input-component-types";
import style from "./review-input.module.css";

const ReviewInput = ({
  name,
  id,
  value,
  handleChange,
  placeholder,
}: ReviewType) => {
  return (
    <textarea
      className={style.text}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default ReviewInput;

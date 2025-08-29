import { ReviewType } from "@/types/input-component-types";
import style from "./review-input.module.css";

const ReviewInput = ({
  name,
  id,
  placeholder,
  error,
  errorText,
  value,
  handleChange,
}: ReviewType & {
  error: boolean;
  errorText?: string;
}) => {
  return (
    <>
      <textarea
        className={
          error ? `${style.text} ${style["text-invalid"]}` : `${style.text}`
        }
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {error && <div className={style["error-text"]}>{errorText}</div>}
    </>
  );
};

export default ReviewInput;

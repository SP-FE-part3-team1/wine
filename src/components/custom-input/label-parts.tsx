import style from "./label-parts.module.css";

const LabelParts = ({ id, labelText }: { id: string; labelText: string }) => {
  return (
    <label className={style.label} htmlFor={id}>
      {labelText}
    </label>
  );
};

export default LabelParts;

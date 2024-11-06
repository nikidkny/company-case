import classNames from "classnames";

interface Props {
  label: string;
  onRemove: () => void;
}
export default function FilterTag({ label, onRemove }: Props) {
  const classes = classNames(["filter-tag"]);

  return (
    <button onClick={onRemove}>
      <span className={classes}>
        {label}
        &times;
      </span>
    </button>
  );
}

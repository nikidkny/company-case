import classNames from "classnames";

interface Props {
  label: string;
  onSelect: () => void;
  classnames?: string;
}

export default function DropdownItem({ label, onSelect, classnames }: Props) {
  const classes = classNames(["dropdown-item", classnames]);
  return (
    <div onClick={onSelect} className={classes}>
      {label}
    </div>
  );
}

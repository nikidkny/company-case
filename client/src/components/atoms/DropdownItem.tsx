import classNames from "classnames";

interface Props {
  label: string;
  onSelect: () => void;
  className?: string;
}

export default function DropdownItem({ label, onSelect, className }: Props) {
  const classes = classNames(["dropdown-item", className]);
  return (
    <div onClick={onSelect} className={classes}>
      {label}
    </div>
  );
}

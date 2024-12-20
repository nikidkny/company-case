import classNames from "classnames";
import { Icon } from "./Icon/Icon";
import { ICON_NAMES } from "./Icon/IconNames";

interface DropdownInputProps {
  selectedLabel: string;
  onClick: () => void;
  isOpen: boolean;
  className?: string;
}

export default function DropdownInput({
  selectedLabel,
  onClick,
  isOpen,
  className,
}: DropdownInputProps) {
  const classes = classNames(["dropdown-input", className]);

  const handleClick = () => {
    onClick();
  };

  return (
    <div onClick={handleClick} className={classes}>
      <span>{selectedLabel}</span>
      <Icon
        name={ICON_NAMES.dropdown_arrow}
        width={11.263}
        height={6.718}
        viewBox={"0 0 11.263 6.718"}
        fill="fill-red-500"
        className={`fill-red-500 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
      />
    </div>
  );
}

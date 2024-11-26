import classNames from "classnames";
import { Icon } from "./Icon/Icon";
import { ICON_NAMES } from "./Icon/IconNames";

interface Props {
  label: string;
  selected?: boolean;
  onClick: () => void;
  className?: string;
}

export default function OptionTag({ label, onClick, className }: Props) {
  const classes = classNames("option-tag", className);
  // const classes = classNames("selection-tag", className);
  return (
    <span className={classes} onClick={onClick}>
      {label}
      <Icon name={ICON_NAMES.burger_crossed} height={8.833} width={14.384} viewBox={"0 0 10.384 14.833"} strokeWidth={"0.1rem"} />
    </span>
  );
}

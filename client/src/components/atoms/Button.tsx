import { Icon } from "./Icon/Icon";
import { ICON_NAMES } from "./Icon/IconNames";
import classNames from "classnames";

type type = "primary" | "secondary" | "tertiary";
type state = "default" | "hover" | "disabled" | "active";

interface Props {
  buttonLabel: string;
  buttonVariant: type;
  buttonState: state;
  size?: "desktop" | "mobile";
  icon?: ICON_NAMES;
  iconPosition: "none" | "leading" | "trailing";
  onClick?: () => void;
}

export default function IconButton({
  buttonLabel = "Button",
  buttonVariant = "primary",
  buttonState = "default",
  icon,
  iconPosition = "trailing",
  onClick,
}: Props) {
  const classes = classNames([
    "btn",
    `btn-${buttonVariant}`,
    {
      [`icon-btn-${buttonState}`]: buttonState === "disabled",
    },
    { [`icon-btn-${iconPosition}`]: iconPosition === "trailing" },
    { [`icon-btn-${iconPosition}`]: iconPosition === "leading" },
  ]);

  return (
    <button
      className={classes}
      onClick={buttonState !== "disabled" ? onClick : undefined}
      disabled={buttonState === "disabled"}
    >
      {icon && iconPosition === "leading" && (
        <span className="icon-left">
          <Icon name={icon} />
        </span>
      )}
      {buttonLabel}
      {icon && iconPosition === "trailing" && (
        <span className="icon-right">
          <Icon name={icon} />
        </span>
      )}
    </button>
  );
}

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
  icon: ICON_NAMES;
  iconPosition: "left" | "right";
  onClick?: () => void;
}

export default function IconButton({
  buttonLabel = "Button",
  buttonVariant = "primary",
  buttonState = "default",
  icon,
  iconPosition = "left",
  onClick,
}: Props) {
  const classes = classNames([
    "icon-btn",
    `icon-btn-${buttonVariant}`,
    {
      [`icon-btn-${buttonState}`]: buttonState === "disabled",
    },
  ]);

  return (
    <button
      className={classes}
      onClick={buttonState !== "disabled" ? onClick : undefined}
      disabled={buttonState === "disabled"}
    >
      {icon && iconPosition === "left" && (
        <span className="icon-left">
          <Icon name={icon} />
        </span>
      )}
      {buttonLabel}
      {icon && iconPosition === "right" && (
        <span className="icon-right">
          <Icon name={icon} />
        </span>
      )}
    </button>
  );
}

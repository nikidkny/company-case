import { Icon } from "./Icon/Icon";
import { ICON_NAMES } from "./Icon/IconNames";
import classNames from "classnames";

type type = "primary" | "secondary" | "tertiary" | "borderless";
type state = "default" | "hover" | "disabled" | "active";

interface Props {
  buttonLabel?: string;
  buttonVariant: type;
  buttonState: state;
  size?: "desktop" | "mobile";
  icon?: ICON_NAMES;
  iconPosition: "none" | "leading" | "trailing" | "top" | "bottom";
  onClick?: () => void;
  iconWidth?: number;
  iconHeight?: number;
  iconViewbox?: string;
  className?: string;
}

export default function IconButton({
  buttonLabel,
  buttonVariant = "primary",
  buttonState = "default",
  icon,
  iconPosition = "trailing",
  iconWidth = 24,
  iconHeight = 24,
  iconViewbox = "0 0 24 24",
  onClick,
  className,
}: Props) {
  const classes = classNames([
    "btn",
    `btn-${buttonVariant}`,
    {
      [`btn-${buttonState}`]: buttonState === "disabled",
    },
    { [`icon-btn-${iconPosition}`]: iconPosition },
    className,
  ]);

  return (
    <button
      className={classes}
      onClick={buttonState !== "disabled" ? onClick : undefined}
      disabled={buttonState === "disabled"}
    >
      {icon && iconPosition === "leading" && (
        <span className="icon-left">
          <Icon name={icon} width={iconWidth} height={iconHeight} viewBox={iconViewbox} />
        </span>
      )}
      {icon && iconPosition === "top" && (
        <span className="icon-top">
          <Icon name={icon} width={iconWidth} height={iconHeight} viewBox={iconViewbox} />
        </span>
      )}
      {buttonLabel}
      {icon && iconPosition === "bottom" && (
        <span className="icon-bottom">
          <Icon name={icon} width={iconWidth} height={iconHeight} viewBox={iconViewbox} />
        </span>
      )}
      {icon && iconPosition === "trailing" && (
        <span className="icon-right">
          <Icon name={icon} width={iconWidth} height={iconHeight} viewBox={iconViewbox} />
        </span>
      )}
    </button>
  );
}

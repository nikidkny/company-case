import { Link } from "@tanstack/react-router";
import { Icon } from "./Icon/Icon";
import { ICON_NAMES } from "./Icon/IconNames";
import classNames from "classnames";

type type = "primary" | "secondary" | "tertiary" | "borderless";
type state = "default" | "hover" | "disabled" | "active";

interface Props {
  buttonVariant: type;
  buttonState?: state;
  buttonLabel?: string;
  iconPosition: "none" | "leading" | "trailing" | "top" | "bottom";
  size?: "lg" | "sm";
  icon?: ICON_NAMES;
  onClick?: () => void;
  iconWidth?: number;
  iconHeight?: number;
  iconViewbox?: string;
  className?: string;
  to?: string;
  type?: "button" | "submit";
  params?: Record<string, string>;
  customData?: { [key: string]: string }; //this is to allow the button to redirect to a page with components rendered conditionally based on the key provided. fx login/register
  children?: React.ReactNode;
}

export default function Button({
  buttonVariant = "primary",
  buttonState = "default",
  buttonLabel = "",
  iconPosition = "trailing",
  size = "sm",
  icon,
  onClick,
  iconWidth = 24,
  iconHeight = 24,
  iconViewbox = "0 0 24 24",
  className = "",
  to,
  params,
  customData,
  children,
  type,
}: Props) {
  const classes = classNames([
    `btn-${size}`,
    `btn-${buttonVariant}`,
    {
      [`btn-${buttonState}`]: buttonState === "disabled",
    },
    { [`icon-btn-${iconPosition}`]: iconPosition },
    className,
  ]);
  const queryParams = customData ? `${to}?${new URLSearchParams(customData).toString()}` : "";

  return (
    <>
      {(to && (
        <Link
          href={queryParams}
          params={params}
          to={to}
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
          {children || buttonLabel}
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
        </Link>
      )) || (
        <button
          className={classes}
          onClick={buttonState !== "disabled" ? onClick : undefined}
          disabled={buttonState === "disabled"}
          type={type}
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
          {children || buttonLabel}
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
      )}
    </>
  );
}

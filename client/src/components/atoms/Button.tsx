import { Link } from "@tanstack/react-router";
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
  to?: string;
  type?: "button" | "submit";
  params?: Record<string, string>;
  customData?: { [key: string]: string }; //this is to allow the button to redirect to a page with components rendered conditionally based on the key provided. fx login/register
  children?: React.ReactNode;
}

export default function Button({
  buttonLabel = "",
  buttonVariant = "primary",
  buttonState = "default",
  icon,
  iconPosition = "trailing",
  iconWidth = 24,
  iconHeight = 24,
  iconViewbox = "0 0 24 24",
  onClick,
  className = "",
  to,
  params,
  customData,
  children,
  type,
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
  const queryParams = customData ? `${to}?${new URLSearchParams(customData).toString()}` : "";
  const isExternal = to && (to.startsWith("http://") || to.startsWith("https://"));
  return (
    <>
      {(to &&
        ((isExternal && (
          <a href={to} className={classes} target="_blank" rel="noopener noreferrer" onClick={buttonState !== "disabled" ? onClick : undefined}>
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
          </a>
        )) || (
          <Link href={queryParams} params={params} to={to} className={classes} onClick={buttonState !== "disabled" ? onClick : undefined} disabled={buttonState === "disabled"}>
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
        ))) || (
        <button className={classes} onClick={buttonState !== "disabled" ? onClick : undefined} disabled={buttonState === "disabled"} type={type}>
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

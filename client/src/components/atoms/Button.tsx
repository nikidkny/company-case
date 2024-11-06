import classNames from "classnames";
type type = "primary" | "secondary" | "tertiary";
type state = "default" | "hover" | "disabled" | "active";

interface Props {
  buttonLabel: string;
  buttonVariant: type;
  buttonState: state;
  size?: "small" | "medium" | "large";
  icon?: string;
  iconPosition?: "left" | "right";
  onClick?: () => void;
}

export default function Button({
  buttonLabel = "Button",
  buttonVariant = "primary",
  buttonState = "default",
  size = "medium",
  iconPosition = "left",
  onClick,
}: Props) {
  const classes = classNames([
    `btn`,
    `btn--${buttonVariant}`,
    `btn--${buttonState}`,
    `btn--${size}`,
    { [`btn--icon-${iconPosition}`]: iconPosition },
  ]);
  return (
    <button
      className={classes}
      onClick={buttonState !== "disabled" ? onClick : undefined}
      disabled={buttonState === "disabled"}
    >
      {buttonLabel}
    </button>
  );
}

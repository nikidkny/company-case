import classNames from "classnames";
type type = "primary" | "secondary" | "tertiary";
type state = "default" | "hover" | "disabled" | "active";

interface Props {
  buttonLabel: string;
  buttonVariant: type;
  buttonState: state;
  size?: "desktop" | "mobile";
  icon?: string;
  iconPosition?: "left" | "right";
  onClick?: () => void;
}

export default function Button({
  buttonLabel = "Button",
  buttonVariant = "primary",
  buttonState = "default",
  // size = "desktop",
  onClick,
}: Props) {
  const classes = classNames([
    `btn`,
    `btn-${buttonVariant}`,
    {
      [`btn-${buttonState}`]: buttonState === "disabled",
    },
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

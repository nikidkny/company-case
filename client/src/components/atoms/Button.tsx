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
  const classes = classNames(
    "rounded-button p-4 text-center cursor-pointer font-bold font-montserrat text-button shadow-button leading-1.19 w-fit ",
    {
      "bg-blue-500 text-white border-none": buttonVariant === "primary",
      "bg-white text-blue-500 border-solid border-1px border-gray-400":
        buttonVariant === "secondary",
      "bg-red-500 text-white": buttonVariant === "tertiary",
      "opacity-50 cursor-not-allowed": buttonState === "disabled",
    },
    { [`hover:bg-blue-400`]: buttonVariant === "primary" },
    {
      [`hover:bg-gray-200 border-1px border-solid border-gray-400`]: buttonVariant === "secondary",
    },
    { [`hover:bg-red-400`]: buttonVariant === "tertiary" }
  );
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

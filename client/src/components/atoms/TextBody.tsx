import classNames from "classnames";

interface Props {
  children: React.ReactNode;
  variant?: "p" | "span" | "div" | "strong" | "em";
  size?: "lg" | "md" | "sm";
  classnames?: string;
}

export default function TextBody({ children, variant = "p", size = "md", classnames }: Props) {
  const classes = classNames(
    [
      { "text--body-sm": size === "sm" },
      { "text--body-lg": size === "lg" },
      { "text--body-md": size === "md" },
      { "text-bold": variant === "strong" },
      { "text-italic": variant === "em" },
    ],
    classnames
  );

  const Element = variant;

  return <Element className={classes}>{children}</Element>;
}

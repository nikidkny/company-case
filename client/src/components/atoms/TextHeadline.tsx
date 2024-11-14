import classNames from "classnames";

interface Props {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "strong" | "em";
  size?: "lg" | "sm";
  classnames?: string;
}

export default function TextHeadline({ children, variant = "h1", size = "lg", classnames }: Props) {
  const classes = classNames(
    [
      { "text--h1-lg": size === "lg" && variant === "h1" },
      { "text--h1-sm": size === "sm" && variant === "h1" },
      { "text--h2-lg": size === "lg" && variant === "h2" },
      { "text--h2-sm": size === "sm" && variant === "h2" },
      { "text--h3-lg": size === "lg" && variant === "h3" },
      { "text--h3-sm": size === "sm" && variant === "h3" },
      // { "text--h4-lg": size === "lg" },
      // { "text--h4-sm": size === "sm" },
      // { "text--h5-lg": size === "lg" },
      // { "text--h5-sm": size === "sm" },
      // { "text--h6-lg": size === "lg" },
      // { "text--h6-sm": size === "sm" },
      { "text-bold": variant === "strong" },
      { "text-italic": variant === "em" },
    ],
    classnames
  );

  const Element = variant;

  return <Element className={classes}>{children}</Element>;
}

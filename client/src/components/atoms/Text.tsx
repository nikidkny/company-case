import classNames from "classnames";

interface Props {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "body" | "caption";
}

export default function Text({ children, variant = "body" }: Props) {
  const classes = classNames([`text--${variant}`]);
  switch (variant) {
    case "h1":
      return <h1 className={classes}>{children}</h1>;
    case "h2":
      return <h2 className={classes}>{children}</h2>;
    case "h3":
      return <h3 className={classes}>{children}</h3>;
    case "caption":
      return <span className={classes}>{children}</span>;
    default:
      return <p className={classes}>{children}</p>;
  }
}

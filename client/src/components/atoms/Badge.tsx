import classNames from "classnames";

interface Props {
  BadgeLabel: string;
  BadgeSize: "sm" | "lg";
  className?: string;
}

export default function Badge({ BadgeLabel, BadgeSize, className }: Props) {
  const classes = classNames([`badge--${BadgeSize}`, className]);
  const formattedLabel = BadgeLabel
    ? BadgeLabel.charAt(0).toUpperCase() + BadgeLabel.slice(1).toLowerCase()
    : "";

  return <span className={classes}>{formattedLabel}</span>;
}

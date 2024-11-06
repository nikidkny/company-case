import classNames from "classnames";

interface Props {
  badgeLabel?: string;
  badgeVariant?: "primary" | "secondary";
}

export default function Badge({ badgeLabel = "Badge", badgeVariant = "primary" }: Props) {
  const classes = classNames([`badge`, `badge--${badgeVariant}`]);
  return <span className={classes}>{badgeLabel}</span>;
}

import classNames from "classnames";

interface Props {
  PostBadgeType: "offer" | "wanted";
  PostBadgeSize: "sm" | "lg";
  className?: string;
}

export default function PostBadge({ PostBadgeType, PostBadgeSize = "lg", className }: Props) {
  const badgeLabel =
    PostBadgeType.charAt(0).toUpperCase() + PostBadgeType.slice(1).replace("-", " ");

  const classes = classNames(
    [`post-badge--${PostBadgeSize}`, `post-badge--${PostBadgeType}`],
    className
  );

  return <span className={classes}>{badgeLabel}</span>;
}

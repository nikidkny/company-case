import classNames from "classnames";

interface Props {
  PostBadgeType: "offer" | "wanted";
  PostBadgeSize: "small" | "large";
}

export default function PostBadge({ PostBadgeType, PostBadgeSize = "large" }: Props) {
  const badgeLabel =
    PostBadgeType.charAt(0).toUpperCase() + PostBadgeType.slice(1).replace("-", " ");

  const classes = classNames([`post-badge--${PostBadgeSize}`, `post-badge--${PostBadgeType}`]);

  return <span className={classes}>{badgeLabel}</span>;
}

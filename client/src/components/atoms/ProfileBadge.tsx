import classNames from "classnames";

interface Props {
  ProfileBadgeType: "seeking" | "not-seeking";
  ProfileBadgeSize: "small" | "large";
  className?: string;
}

export default function ProfileBadge({ ProfileBadgeType, ProfileBadgeSize, className }: Props) {
  const badgeLabel =
    ProfileBadgeType.charAt(0).toUpperCase() + ProfileBadgeType.slice(1).replace("-", " ");

  const classes = classNames([
    `profile-badge--${ProfileBadgeType} profile-badge--${ProfileBadgeSize}`,
    className,
  ]);

  return <span className={classes}>{badgeLabel}</span>;
}

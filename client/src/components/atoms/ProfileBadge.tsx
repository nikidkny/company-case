import classNames from "classnames";

interface Props {
  ProfileBadgeType: "seeking" | "not-seeking";
  ProfileBadgeSize: "small" | "large";
}

export default function ProfileBadge({ ProfileBadgeType, ProfileBadgeSize }: Props) {
  const badgeLabel =
    ProfileBadgeType.charAt(0).toUpperCase() + ProfileBadgeType.slice(1).replace("-", " ");

  const classes = classNames([
    `profile-badge--${ProfileBadgeType} profile-badge--${ProfileBadgeSize}`,
  ]);

  return <span className={classes}>{badgeLabel}</span>;
}

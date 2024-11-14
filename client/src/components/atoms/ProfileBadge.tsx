import classNames from "classnames";

interface Props {
  ProfileBadgeType: "seeking" | "not-seeking";
  ProfileBadgeSize: "small" | "large";
  classnames?: string;
}

export default function ProfileBadge({ ProfileBadgeType, ProfileBadgeSize, classnames }: Props) {
  const badgeLabel =
    ProfileBadgeType.charAt(0).toUpperCase() + ProfileBadgeType.slice(1).replace("-", " ");

  const classes = classNames([
    `profile-badge--${ProfileBadgeType} profile-badge--${ProfileBadgeSize}`,
    classnames,
  ]);

  return <span className={classes}>{badgeLabel}</span>;
}

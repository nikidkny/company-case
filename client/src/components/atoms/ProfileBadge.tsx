import classNames from "classnames";

interface Props {
  ProfileBadgeLabel: string;
  ProfileBadgeSize: "sm" | "lg";
  className?: string;
}

export default function ProfileBadge({ ProfileBadgeLabel, ProfileBadgeSize, className }: Props) {
  const classes = classNames([`profile-badge--${ProfileBadgeSize}`, className]);
  const formattedLabel = ProfileBadgeLabel
    ? ProfileBadgeLabel.charAt(0).toUpperCase() + ProfileBadgeLabel.slice(1).toLowerCase()
    : "";
  return <span className={classes}>{formattedLabel}</span>;
}

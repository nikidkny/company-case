import classNames from "classnames";

interface Props {
  ProfileBageLabel: string;
  ProfileBadgeSize: "sm" | "lg";
  className?: string;
}

export default function ProfileBadge({ ProfileBageLabel, ProfileBadgeSize, className }: Props) {
  const classes = classNames([`profile-badge--${ProfileBadgeSize}`, className]);
  const formattedLabel = ProfileBageLabel
    ? ProfileBageLabel.charAt(0).toUpperCase() + ProfileBageLabel.slice(1).toLowerCase()
    : "";
  return <span className={classes}>{formattedLabel}</span>;
}

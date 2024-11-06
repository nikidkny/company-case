import classNames from "classnames";
interface Props {
  name: string;
  size: string;
  color: string;
}

export default function Icon(props: Props) {
  const classes = classNames([`icon-${props.name}`, `icon--${props.size}`, `icon--${props.color}`]);
  return <i className={classes}></i>;
}

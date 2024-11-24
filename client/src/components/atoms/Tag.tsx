import classNames from "classnames";

interface Props {
  number: string;
  className?: string;
}

export default function Tag(props: Props) {
  const classes = classNames("tag");

  return <div className={classes}>{props.number}</div>;
}

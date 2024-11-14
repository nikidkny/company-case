import classNames from "classnames";

interface Props {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

export default function Image(props: Props) {
  const classes = classNames(["image"]);
  return <img className={classes} src={props.src} alt={props.alt} />;
}
import classNames from "classnames";

interface Props {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  classnames?: string;
}

export default function Image(props: Props) {
  const classes = classNames("image", props.classnames);
  return (
    <img
      className={classes}
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
    />
  );
}

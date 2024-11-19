import classNames from "classnames";

interface Props {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  className?: string;
}

export default function Image(props: Props) {
  const classes = classNames("image", props.className);
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

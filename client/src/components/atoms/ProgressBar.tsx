import classNames from "classnames";

interface Props {
  progress: number;
  className?: string;
}

export default function ProgressBar(props: Props) {
  const classes = classNames(["progress-bar"]);
  return (
    <div className={classes}>
      <div className="progress-bar__fill" style={{ width: `${props.progress}%` }} />
    </div>
  );
}

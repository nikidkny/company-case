import classNames from "classnames";

interface Props {
  label: string;
  selected: boolean;
  onSelect: () => void;
  className?: string;
}

export default function SelectionTag(props: Props) {
  const classes = classNames(
    "selection-tag",
    [{ "selection-tag--selected": props.selected }],
    props.className
  );

  return (
    <span className={classes} onClick={props.onSelect}>
      {props.label}
      &times;
    </span>
  );
}

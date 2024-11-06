import classNames from "classnames";

interface Props {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export default function SelectionTag(props: Props) {
  const classes = classNames(["selection-tag", { "selection-tag--selected": props.selected }]);

  return (
    <div>
      <span className={classes} onClick={props.onSelect}>
        {props.label}
      </span>
    </div>
  );
}

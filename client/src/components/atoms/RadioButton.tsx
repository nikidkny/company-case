import classNames from "classnames";

interface Props {
  radioLabel: string;
  radioName: string;
  radioValue: string;
  checked?: boolean;
  onChange: (value: string) => void;
}

export default function RadioButton(props: Props) {
  const classes = classNames([`radiobtn`, `radiobtn--${props.checked ? "checked" : "unchecked"}`]);
  return (
    <label className={classes}>
      <input
        type="radio"
        name={props.radioName}
        value={props.radioValue}
        checked={props.checked}
        onChange={() => props.onChange(props.radioValue)}
        className="text-blue-500"
      />
      <span>{props.radioLabel}</span>
    </label>
  );
}

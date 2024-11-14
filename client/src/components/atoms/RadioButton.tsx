import classNames from "classnames";

interface Props {
  radioLabel: string;
  radioName: string;
  radioValue: string;
  checked?: boolean;
  onChange: (value: string) => void;
  classnames?: string;
}

export default function RadioButton(props: Props) {
  const labelClasses = classNames("radio-btn", props.classnames);
  const inputClasses = classNames({ ["radio-btn--checked"]: props.checked === true });

  return (
    <label className={labelClasses}>
      <input
        type="radio"
        name={props.radioName}
        value={props.radioValue}
        checked={props.checked}
        onChange={() => props.onChange(props.radioValue)}
        className={inputClasses}
      />
      <span>{props.radioLabel}</span>
    </label>
  );
}

import classNames from "classnames";

interface Props {
  checkboxLabel: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
}

export default function Checkbox({ checkboxLabel, checked, onChange }: Props) {
  const classes = classNames([`checkbox--${checked}`]);

  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={classes}
      />
      <span>{checkboxLabel}</span>
    </label>
  );
}

import classNames from "classnames";

interface Props {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  classnames?: string;
}

export default function RangeInput({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  classnames,
}: Props) {
  const classes = classNames("range-input", classnames);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={handleChange}
      className={classes}
    />
  );
}

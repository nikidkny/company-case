import classNames from "classnames";

interface Props {
  textareaPlaceholder: string;
  textareaValue?: string;
  onChange: (value: string) => void;
  rows?: number;
}

export default function Textarea({
  textareaPlaceholder = "Enter text...",
  textareaValue = "",
  onChange,
  rows = 4,
}: Props) {
  const classes = classNames([`textarea`]);

  return (
    <textarea
      value={textareaValue}
      onChange={(e) => onChange(e.target.value)}
      name={textareaValue}
      id={textareaValue}
      placeholder={textareaPlaceholder}
      rows={rows}
      className={classes}
    />
  );
}

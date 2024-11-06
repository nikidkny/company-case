import classNames from "classnames";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputType: "text" | "password" | "email" | "search";
}

export default function TextInput(props: Props) {
  const classes = classNames([`input--${props.inputType}`]);

  return (
    <label>
      <input type={props.inputType} className={classes} placeholder={props.placeholder} />
      {props.inputType === "search" && <span className="icon-search">🔍</span>}
    </label>
  );
}

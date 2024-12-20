import classNames from "classnames";
import { Icon } from "./Icon/Icon";
import { ICON_NAMES } from "./Icon/IconNames";
import TextBody from "./TextBody";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputType: "text" | "password" | "email" | "search" | "date" | "number";
  icon?: ICON_NAMES;
  isValid?: boolean;
  validityMsg?: string;
  disabled?: boolean;
  className?: string;
  id: string;
  name: string;
  required?: boolean;
}

export default function TextInput({
  value,
  onChange,
  placeholder,
  inputType,
  icon,
  isValid,
  validityMsg,
  disabled,
  className,
  id,
  name,
  required,
}: Props) {
  const containerClasses = classNames(
    "input-container",
    {
      "border-red-500": isValid === false, // Error border color
      "border-blue-500": isValid, // Valid border color
      "bg-gray-100 text-gray-500 cursor-not-allowed": disabled, // Disabled styles
    },
    className
  );

  const inputClasses = classNames("input-text", {
    "text-red-500": isValid === false, // Error text color
    "text-gray-400": disabled, // Disabled text color
  });

  return (
    <div className={containerClasses}>
      {icon && <Icon name={icon} />}
      <input
        type={inputType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClasses}
        aria-invalid={!isValid}
        aria-disabled={disabled}
        disabled={disabled}
        id={id}
        name={name}
        required={required}
      />
      {isValid === false && validityMsg && (
        <TextBody className="text-red-500 text-sm mt-1">{validityMsg}</TextBody>
      )}
    </div>
  );
}

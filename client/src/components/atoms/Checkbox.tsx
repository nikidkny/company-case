import classNames from "classnames";
import { ICON_NAMES } from "./Icon/IconNames";
import { Icon } from "./Icon/Icon";

interface Props {
  name: string;
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  label: string;
  shouldValidate?: boolean;
  valid?: boolean;
  required?: boolean;
  onChange: (checked: boolean) => void;
}

export default function Checkbox({ name, label, className, disabled, required, shouldValidate, valid, checked, onChange }: Props) {
  const containerClasses = classNames(
    "flex items-center gap-2 cursor-pointer",
    {
      "cursor-not-allowed text-gray-400": disabled,
      "text-green-500": shouldValidate && valid,
      "text-red-500": shouldValidate && !valid,
    },
    className
  );

  const iconWrapperClasses = classNames("flex items-center justify-center h-6 w-6 rounded-lg transition-colors duration-200", {
    "bg-indigo-800 text-white shadow-lg": checked, // Filled background and shadow when checked
    "bg-white border border-gray-300 shadow-md": !checked, // Outline and shadow when unchecked
  });

  const iconClasses = classNames(
    "transition-opacity", // Smooth opacity transition
    {
      "opacity-100": checked, // Show icon when checked
      "opacity-0": !checked, // Hide icon when unchecked
    }
  );

  const handleChange = () => {
    onChange(!checked);
  };

  return (
    <div className={containerClasses} onClick={handleChange}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        aria-required={required}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden peer" // Hide the checkbox input
      />
      <div className={iconWrapperClasses}>
        <Icon name={ICON_NAMES.checkbox_check} height={10.121} width={13.414} viewBox={"0 0 13.414 10.121"} className={iconClasses} />
      </div>
      <label htmlFor={name} className="peer-disabled:text-gray-400 cursor-pointer checkbox-label">
        {label}
      </label>
    </div>
  );
}

import { useState } from "react";
import DropdownInput from "../atoms/DropdownInput";
import DropdownItem from "../atoms/DropdownItem";
import classNames from "classnames";

export type DropdownOptionType = {
  label: string; // The text to display in the dropdown
  value: string; // The value to return on selection
};

interface DropdownProps {
  options: string[] | DropdownOptionType[];
  initialSelectedLabel?: string;
  className?: string;
  selectedOption: string | DropdownOptionType | null;
  onSelect: (value: string | DropdownOptionType) => void;
}

export function Dropdown({ options, initialSelectedLabel = "Select an option", className, selectedOption, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const classes = classNames("relative inline-block w-64", className);

  // Normalize options into a common format (objects with label and value)
  const normalizedOptions = Array.isArray(options) ? options.map((option) => (typeof option === "string" ? { label: option, value: option } : option)) : [];

  // Find the selected label based on the current selectedOption value
  const selectedLabel = typeof selectedOption === "string" ? normalizedOptions.find((option) => option.value === selectedOption)?.label || initialSelectedLabel : selectedOption?.label || initialSelectedLabel;

  return (
    <div className={classes}>
      <DropdownInput selectedLabel={selectedLabel || initialSelectedLabel} onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      {isOpen && (
        <div className="absolute z-10  bg-white border border-gray-300 rounded-lg shadow-lg w-full">
          <div className="max-h-48 overflow-y-auto">
            {normalizedOptions.map((option, index) => (
              <DropdownItem
                key={index}
                label={option.label}
                onSelect={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

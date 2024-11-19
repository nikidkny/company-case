import { useState } from "react";
import DropdownInput from "../atoms/DropdownInput";
import DropdownItem from "../atoms/DropdownItem";
import classNames from "classnames";

interface DropdownProps {
  options: string[];
  initialSelectedLabel?: string;
  className?: string;
}

export function Dropdown({
  options,
  initialSelectedLabel = "Select an option",
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(initialSelectedLabel);

  const handleSelect = (label: string) => {
    setSelectedLabel(label);
    setIsOpen(false);
  };

  const classes = classNames("relative inline-block w-64", className);
  return (
    <div className={classes}>
      <DropdownInput
        selectedLabel={selectedLabel}
        onClick={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
      />
      {isOpen && (
        <div className="absolute z-10  bg-white border border-gray-300 rounded-lg shadow-lg w-full">
          {options.map((option, index) => (
            <DropdownItem key={index} label={option} onSelect={() => handleSelect(option)} />
          ))}
        </div>
      )}
    </div>
  );
}

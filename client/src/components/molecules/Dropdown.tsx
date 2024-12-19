import { useState } from "react";
import DropdownInput from "../atoms/DropdownInput";
import DropdownItem from "../atoms/DropdownItem";
import classNames from "classnames";

// export type DropdownOptionType = {
//   label: string; // The text to display in the dropdown
//   value: string; // The value to return on selection
// };

interface DropdownProps {
  options: string[];
  initialSelectedLabel?: string;
  className?: string;
  selectedOption: string | null;
  onSelect: (value: string) => void;
}

export function Dropdown({ options, initialSelectedLabel = "Select an option", className, selectedOption, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const classes = classNames("relative inline-block", className);
  return (
    <div className={classes}>
      <DropdownInput selectedLabel={selectedOption || initialSelectedLabel} onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />

      {isOpen && (
        <div className="absolute z-10  bg-white border border-gray-300 rounded-lg shadow-lg w-full">
          <div className="max-h-48 overflow-y-auto">
            {options.map((option, index) => (
              <DropdownItem
                key={index}
                label={option}
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

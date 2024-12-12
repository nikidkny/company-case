import { useState } from "react";
import DropdownInput from "../atoms/DropdownInput";
import DropdownItem from "../atoms/DropdownItem";
import classNames from "classnames";
import OptionTag from "../atoms/OptionTag";

interface DropdownWithTagsProps {
  options: string[];
  initialSelectedLabel?: string;
  className?: string;
  selectedTags: string[];
  onTagChange: (tags: string[]) => void;
}
export const DropdownWithTags = ({ options, className, selectedTags, onTagChange }: DropdownWithTagsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSelectOption = (option: string) => {
    if (!selectedTags.includes(option)) {
      onTagChange([...selectedTags, option]);
    }
    //we can decide if we want the drop down to close after every selection or not
    // setIsOpen(false);
  };

  const handleRemoveTag = (option: string) => {
    onTagChange(selectedTags.filter((tag) => tag !== option)); // Remove the tag
  };

  const classes = classNames("relative inline-block", className);

  return (
    <>
      <div className={classes}>
        {/* dropdown */}
        <DropdownInput selectedLabel="Select one or more music genres" onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-10  bg-white border border-gray-300 rounded-lg shadow-lg w-full">
            <div className="max-h-50 overflow-y-auto">
              {options
                .filter((option) => !selectedTags.includes(option))
                .map((option) => (
                  <DropdownItem key={option} label={option} onSelect={() => handleSelectOption(option)} />
                ))}
            </div>
          </div>
        )}
      </div>
      {/* Render Selection Tags */}
      <div className="flex flex-wrap gap-2 mt-2 mb-6">
        {selectedTags.map((option) => (
          <OptionTag key={option} label={option} selected={true} onClick={() => handleRemoveTag(option)} />
        ))}
      </div>
    </>
  );
};

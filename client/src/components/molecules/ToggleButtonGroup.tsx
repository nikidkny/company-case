import { useState } from "react";
import Button from "../atoms/Button";

export default function ToggleButtonGroup() {
  const [selectedOption, setSelectedOption] = useState<"searching" | "notSearching" | null>(null);

  const handleSelect = (option: "searching" | "notSearching") => {
    setSelectedOption(option);
  };

  return (
    <div className="toggle-button-group flex flex-row">
      <Button
        buttonVariant={selectedOption === "searching" ? "primary" : "secondary"} // Highlight selected button
        buttonState="default"
        buttonLabel="Searching"
        iconPosition="none"
        onClick={() => handleSelect("searching")}
      />
      <Button
        buttonVariant={selectedOption === "notSearching" ? "primary" : "secondary"} // Highlight selected button
        buttonState="default"
        buttonLabel="Not Searching"
        iconPosition="none"
        onClick={() => handleSelect("notSearching")}
      />
    </div>
  );
}

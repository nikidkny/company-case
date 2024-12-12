import Button from "../atoms/Button";

interface ToggleButtonGroupProps {
  selectedOption: "searching" | "notSearching" | null;
  onSelect: (option: "searching" | "notSearching") => void;
}

export default function ToggleButtonGroup({ selectedOption, onSelect }: ToggleButtonGroupProps) {
  return (
    <div className="toggle-button-group flex flex-row">
      <Button
        buttonVariant={selectedOption === "searching" ? "primary" : "secondary"} // Highlight selected button
        buttonState="default"
        buttonLabel="Searching"
        iconPosition="none"
        onClick={() => onSelect("searching")}
      />
      <Button
        buttonVariant={selectedOption === "notSearching" ? "primary" : "secondary"} // Highlight selected button
        buttonState="default"
        buttonLabel="Not Searching"
        iconPosition="none"
        onClick={() => onSelect("notSearching")}
      />
    </div>
  );
}

interface Props {
  label: string;
  onSelect: () => void;
}

export default function DropdownItem({ label, onSelect }: Props) {
  return (
    <div onClick={onSelect} className="dropdown-item">
      {label}
    </div>
  );
}

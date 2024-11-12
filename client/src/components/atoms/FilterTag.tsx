import classNames from "classnames";
import { useState } from "react";

interface Props {
  label: string;
  onToggle?: (selected: boolean) => void;
}

export default function SelectionTag(props: Props) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    const newSelectedState = !selected;
    setSelected(newSelectedState);

    if (props.onToggle) {
      props.onToggle(newSelectedState);
    }
  };

  const classes = classNames(
    "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors border-none focus:outline-none text-bold",
    {
      "bg-blue-500 text-white border-none": selected,
      "text-blue-500 bg-gray-400": !selected,
    }
  );

  return (
    <button onClick={handleClick} className={classes}>
      {props.label}
    </button>
  );
}

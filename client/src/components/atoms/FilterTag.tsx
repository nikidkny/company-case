import classNames from "classnames";
import { useState } from "react";

interface Props {
  label: string;
  onToggle?: (selected: boolean) => void;
  className?: string;
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

  const classes = classNames([
    `filter-tag`,
    {
      [`filter-tag-selected`]: selected === true,
      // "text-blue-500 bg-gray-400": !selected,
    },
    props.className,
  ]);

  return (
    <button onClick={handleClick} className={classes}>
      {props.label}
    </button>
  );
}

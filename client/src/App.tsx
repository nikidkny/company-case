import "./App.css";
import Badge from "./components/atoms/Badge";
import Button from "./components/atoms/Button";
import Checkbox from "./components/atoms/Checkbox";
import DropdownItem from "./components/atoms/DropdownItem";
import Textarea from "./components/atoms/Textarea";
import FilterTag from "./components/atoms/FilterTag";
import Icon from "./components/atoms/Icon";
import Image from "./components/atoms/Image";
import Link from "./components/atoms/Link";
import ProgressBar from "./components/atoms/ProgressBar";
import RadioButton from "./components/atoms/RadioButton";
import SelectionTag from "./components/atoms/SelectionTag";
import TextInput from "./components/atoms/TextInput";
import { useState } from "react";
import RangeInput from "./components/atoms/RangeInput";
import ImageInput from "./components/atoms/ImageInput";
import Text from "./components/atoms/Text";

function App() {
  const [rangeValue, setRangeValue] = useState(50);
  const [progressValue] = useState(50);
  const [selected] = useState(false);

  // change selected to true to see the selected state

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl text-orange-500 font-bold">
        Hello, this is an orange text styled with Tailwind CSS!
      </h1>
      <Badge badgeLabel="New" badgeVariant="primary" />
      <Button buttonState="default" buttonLabel="Click me" buttonVariant="primary" />
      <Checkbox checkboxLabel="Check me" onChange={(checked) => console.log(checked)} />
      <DropdownItem />
      <FilterTag label="Filter" onRemove={() => console.log("Removed")} />
      <Icon name="" size="" color="" />
      <Image src="https://via.placeholder.com/150" alt="Placeholder" width="150" height="150" />
      <ImageInput onImageChange={(file) => console.log(file)} />
      <Link href="">Link</Link>
      <ProgressBar progress={progressValue} />
      <RangeInput value={rangeValue} onChange={(value) => setRangeValue(value)} max={100} />
      <RadioButton
        radioLabel="Radio"
        radioName="radio"
        radioValue="radio"
        onChange={(value) => console.log(value)}
      />
      <SelectionTag
        label="Selection"
        selected={selected}
        onSelect={() => console.log("Selected")}
      />
      <Text>Body</Text>
      <Text variant="h1">Heading</Text>
      <Textarea
        textareaPlaceholder="Enter text..."
        textareaValue=""
        onChange={(value) => console.log(value)}
      />
      <TextInput
        inputType="text"
        value=""
        onChange={(value) => console.log(value)}
        placeholder="Text input"
      />
    </div>
  );
}

export default App;

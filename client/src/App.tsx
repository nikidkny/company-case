import "./App.css";
// import components
import Button from "./components/atoms/Button";
import Checkbox from "./components/atoms/Checkbox";
import DropdownItem from "./components/atoms/DropdownItem";
import Textarea from "./components/atoms/Textarea";
import FilterTag from "./components/atoms/FilterTag";
import { Icon } from "./components/atoms/Icon/Icon";
import { ICON_NAMES } from "./components/atoms/Icon/IconNames";
import Image from "./components/atoms/Image";
import Link from "./components/atoms/Link";
import ProgressBar from "./components/atoms/ProgressBar";
import RadioButton from "./components/atoms/RadioButton";
import SelectionTag from "./components/atoms/SelectionTag";
import TextInput from "./components/atoms/TextInput";
import { useState } from "react";
import RangeInput from "./components/atoms/RangeInput";
import ImageInput from "./components/atoms/ImageInput";
import PostBadge from "./components/atoms/PostBadge";
import ProfileBadge from "./components/atoms/ProfileBadge";
import TextBody from "./components/atoms/TextBody";
import TextHeadline from "./components/atoms/TextHeadline";

function App() {
  const [rangeValue, setRangeValue] = useState(50);
  const [progressValue] = useState(50);
  const [selected] = useState(false);
  const [IsChecked, setChecked] = useState(true);

  // change selected to true to see the selected state
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tags = ["React", "TypeScript", "Tailwind"];

  const handleTagToggle = (tag: string, isSelected: boolean) => {
    setSelectedTags((prev) => (isSelected ? [...prev, tag] : prev.filter((t) => t !== tag)));
  };

  return (
    <div className="flex flex-col">
      <PostBadge PostBadgeType="offer" PostBadgeSize="small" />
      <PostBadge PostBadgeType="wanted" PostBadgeSize="large" />
      <ProfileBadge ProfileBadgeSize="small" ProfileBadgeType="seeking" />
      <ProfileBadge ProfileBadgeSize="large" ProfileBadgeType="not-seeking" />
      <Button
        iconPosition="none"
        buttonState="default"
        buttonLabel="Click me"
        buttonVariant="primary"
      />
      <Button
        iconPosition="none"
        buttonState="default"
        buttonLabel="Click me"
        buttonVariant="secondary"
      />
      <Button
        iconPosition="trailing"
        buttonState="default"
        buttonLabel="Click me"
        buttonVariant="primary"
        icon={ICON_NAMES.author_icon}
      />
      <Button
        iconPosition="leading"
        buttonState="disabled"
        buttonLabel="Click me"
        buttonVariant="secondary"
        icon={ICON_NAMES.author_icon}
      />
      <Checkbox name="checkbox" label="Checkbox" checked={IsChecked} onChange={setChecked} />
      <DropdownItem />
      <div className="flex space-x-2">
        {tags.map((tag) => (
          <FilterTag
            key={tag}
            label={tag}
            onToggle={(isSelected) => handleTagToggle(tag, isSelected)}
          />
        ))}
        <p>Selected Tags: {selectedTags.join(", ")}</p>
      </div>
      <Icon name={ICON_NAMES.author_icon} height={24} width={24} />
      <Image src="https://via.placeholder.com/150" alt="Placeholder" width="150" height="150" />
      <ImageInput onImageChange={(file) => console.log(file)} />
      <Link href="">Link</Link>
      <ProgressBar progress={progressValue} />
      <RangeInput value={rangeValue} onChange={setRangeValue} />
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
      <TextBody>Body</TextBody>
      <TextBody variant="strong">Strong</TextBody>
      <TextBody variant="em">Emphasis</TextBody>
      <TextBody variant="div">Div</TextBody>
      <TextBody variant="span">Span</TextBody>
      <TextBody variant="p">Paragraph</TextBody>
      <TextBody size="lg">Large</TextBody>
      <TextBody size="md">Medium</TextBody>
      <TextBody size="sm">Small</TextBody>
      <TextBody size="lg" variant="strong">
        Large Strong
      </TextBody>
      <TextBody size="md" variant="strong">
        Medium Strong
      </TextBody>
      <TextBody size="sm" variant="strong">
        Small Strong
      </TextBody>
      <TextHeadline>Headline</TextHeadline>
      <TextHeadline variant="h1">H1</TextHeadline>
      <TextHeadline variant="h2">H2</TextHeadline>
      <TextHeadline variant="h3">H3</TextHeadline>
      <TextHeadline variant="span">Span</TextHeadline>
      <TextHeadline variant="strong">Strong</TextHeadline>
      <TextHeadline variant="em">Emphasis</TextHeadline>
      <TextHeadline size="lg">Large</TextHeadline>
      <TextHeadline size="sm">Small</TextHeadline>
      <TextHeadline size="lg" variant="strong">
        Large Strong
      </TextHeadline>
      <TextHeadline size="sm" variant="strong">
        Small Strong
      </TextHeadline>
      <TextHeadline size="lg" variant="em">
        Large Emphasis
      </TextHeadline>
      <TextHeadline size="sm" variant="em">
        Small Emphasis
      </TextHeadline>
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
      <TextInput
        inputType="search"
        value=""
        onChange={(value) => console.log(value)}
        placeholder="Search input"
      />
      <TextInput
        inputType="password"
        value=""
        onChange={(value) => console.log(value)}
        placeholder="Password input"
      />
    </div>
  );
}

export default App;

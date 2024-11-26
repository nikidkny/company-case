import "./App.css";
// import components
import Button from "./components/atoms/Button";
import Checkbox from "./components/atoms/Checkbox";
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
import { Dropdown } from "./components/molecules/Dropdown";
import { useStore } from "./store/useStore";

function App() {
  const [rangeValue, setRangeValue] = useState(50);
  const [progressValue] = useState(50);
  const [selected] = useState(false);
  const [IsChecked, setChecked] = useState(false);
  const options = ["Option 1", "Option 2", "Option 3"];

  const handleCheckboxToggle = (checked: boolean) => {
    setChecked(checked);
  };
  // change selected to true to see the selected state
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tags = ["React", "TypeScript", "Tailwind"];

  const handleTagToggle = (tag: string, isSelected: boolean) => {
    setSelectedTags((prev) => (isSelected ? [...prev, tag] : prev.filter((t) => t !== tag)));
  };

  const { bears } = useStore();
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
        iconHeight={13.887}
        iconWidth={13.887}
        iconViewbox={"0 0 13.887 13.887"}
      />
      <Button
        iconPosition="leading"
        buttonState="default"
        buttonLabel="Click me"
        buttonVariant="secondary"
        icon={ICON_NAMES.author_icon}
        iconHeight={13.887}
        iconWidth={13.887}
        iconViewbox={"0 0 13.887 13.887"}
      />
      <Button
        iconPosition="trailing"
        buttonState="default"
        buttonVariant="borderless"
        icon={ICON_NAMES.author_icon}
        iconHeight={13.887}
        iconWidth={13.887}
        iconViewbox={"0 0 13.887 13.887"}
      />
      <Button
        iconPosition="top"
        buttonState="default"
        buttonVariant="primary"
        buttonLabel="Click me"
        icon={ICON_NAMES.author_icon}
        iconHeight={13.887}
        iconWidth={13.887}
        iconViewbox={"0 0 13.887 13.887"}
      />
      <Button
        iconPosition="bottom"
        buttonState="default"
        buttonVariant="primary"
        buttonLabel="Click me"
        icon={ICON_NAMES.author_icon}
        iconHeight={13.887}
        iconWidth={13.887}
        iconViewbox={"0 0 13.887 13.887"}
      />
      <Checkbox
        name="checkbox"
        label="Checkbox"
        checked={IsChecked}
        onChange={handleCheckboxToggle}
      />
      <Dropdown options={options} />
      <div className="flex space-x-2 items-center">
        {tags.map((tag) => (
          <FilterTag
            key={tag}
            label={tag}
            onToggle={(isSelected) => handleTagToggle(tag, isSelected)}
          />
        ))}
        <p>Selected Tags: {selectedTags.join(", ")}</p>
      </div>
      <Image src="https://picsum.photos/150" alt="Placeholder" width="150" height="150" />
      <ImageInput
        variant="cover"
        onImageChange={(file) => console.log("Cover image selected:", file)}
      />
      <ImageInput
        variant="profile"
        onImageChange={(file) => console.log("Profile image selected:", file)}
      />{" "}
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
      <TextHeadline variant="h1" size="sm">
        H1
      </TextHeadline>
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
      <Icon
        name={ICON_NAMES.author_icon}
        height={13.887}
        width={13.887}
        viewBox={"0 0 13.887 13.887"}
      />
      <Icon
        name={ICON_NAMES.checkbox_check}
        height={10.121}
        width={13.414}
        viewBox={"0 0 13.414 10.121"}
      />
      <Icon name={ICON_NAMES.contact_info} height={22} width={26} viewBox={"0 0 26 22"} />
      <Icon name={ICON_NAMES.delete_icon} height={20} width={16} viewBox={"0 0 16 20"} />
      <Icon
        name={ICON_NAMES.dropdown_arrow}
        height={6.718}
        width={11.263}
        viewBox={"0 0 11.263 6.718"}
      />
      <Icon name={ICON_NAMES.external_link} height={14} width={14} viewBox="0 0 14 14" />
      <Icon name={ICON_NAMES.feedback_icon} width={22} height={20} viewBox={"0 0 22 20"} />
      <Icon name={ICON_NAMES.filter_icon} width={20} height={20} viewBox={"0 0 20 20"} />
      <Icon name={ICON_NAMES.footer_facebook} height={18} width={18} viewBox={"0 0 18 18"} />
      <Icon name={ICON_NAMES.footer_instagram} height={18} width={18} viewBox={"0 0 18 18"} />
      <Icon name={ICON_NAMES.footer_linkedin} height={18} width={18} viewBox={"0 0 18 18"} />
      <Icon
        name={ICON_NAMES.footer_music}
        height={77}
        width={224.251}
        viewBox={"0 0 224.251 77.704"}
      />
      <Icon name={ICON_NAMES.help_icon} height={14.5} width={8} viewBox={"0 0 8 14.5"} />
      <Icon name={ICON_NAMES.hero_image} width={470} height={325.475} viewBox={"0 0 470 325.475"} />
      <Icon
        name={ICON_NAMES.instrument_icon}
        height={14.833}
        width={10.384}
        viewBox={"0 0 10.384 14.833"}
      />
      <Icon name={ICON_NAMES.instruments} height={32} width={36} viewBox={"0 0 36 32"} />
      <Icon name={ICON_NAMES.location_pin} height={13.887} width={10} viewBox={"0 0 10 13.887"} />
      <Icon name={ICON_NAMES.marker} height={20} width={14} viewBox={"0 0 14 20"} />
      <Icon
        name={ICON_NAMES.no_results}
        height={97.656}
        width={140.932}
        viewBox={"0 0 140.932 97.656"}
      />
      <Icon name={ICON_NAMES.person_icon} height={40} width={40} viewBox="0 0 40 40" />
      <Icon
        name={ICON_NAMES.posts_empty}
        height={120.989}
        width={110.122}
        viewBox="0 0 110.122 120.989"
      />
      <Icon name={ICON_NAMES.profile_placeholder} height={91} width={91} viewBox="0 0 91 91" />
      <Icon
        name={ICON_NAMES.profile_welcome}
        height={159.24}
        width={153.993}
        viewBox="0 0 153.993 159.24"
      />
      <Icon
        name={ICON_NAMES.quote_mark_begin}
        height={16.44}
        width={19.32}
        viewBox="0 0 19.32 16.44"
      />
      <Icon name={ICON_NAMES.quote_mark_end} height={16.5} width={19.26} viewBox="0 0 19.26 16.5" />
      <Icon name={ICON_NAMES.report_icon} height={12} width={12} viewBox="0 0 12 12" />
      <Icon name={ICON_NAMES.search_icon} height={16} width={16} viewBox="0 0 16 16" />
      <Icon name={ICON_NAMES.show_password} height={16} width={22} viewBox={"0 0 22 16"} />
      <Icon name={ICON_NAMES.image_placeholder} height={237} width={441} viewBox="0 0 441 237" />
      <div>{bears}</div>
    </div>
  );
}

export default App;

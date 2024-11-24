import { createLazyFileRoute } from "@tanstack/react-router";
import TextHeadline from "../../components/atoms/TextHeadline";
import TextInput from "../../components/atoms/TextInput";
import Button from "../../components/atoms/Button";
import ImageInput from "../../components/atoms/ImageInput";
import TextBody from "../../components/atoms/TextBody";
import Textarea from "../../components/atoms/Textarea";
import { Dropdown } from "../../components/molecules/Dropdown";
import Checkbox from "../../components/atoms/Checkbox";
import { useStore } from "../../store/useStore";
import { activeMusiciansNumberOptions } from "../../utilities/activeMusiciansNumberOptions";
import { musicSessionsFrequencyOptions } from "../../utilities/musicSessionsFrequencyOptions";
import { musicGenresOptions } from "../../utilities/musicGenresOptions";
import { DropdownWithTags } from "../../components/molecules/DropdownWithTags";

export const Route = createLazyFileRoute("/ensembles/create")({
  component: CreateEnsemblePage,
});

function CreateEnsemblePage() {
  const { name, setName, description, setDescription, webpage, setWebpage, location, setLocation, activeMusicians, setActiveMusicians, sessionFrequency, setSessionFrequency, ensembleType, setEnsembleType, genres, addGenre, removeGenre, resetForm } =
    useStore();

  const handleTagChange = (tags: string[]) => {
    const currentTags = new Set(genres);
    tags.forEach((tag) => {
      if (!currentTags.has(tag)) {
        addGenre(tag); // Add new tags
      }
    });
    currentTags.forEach((tag) => {
      if (!tags.includes(tag)) {
        removeGenre(tag); // Remove deselected tags
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    console.log({
      name,
      description,
      webpage,
      location,
      activeMusicians,
      sessionFrequency,
      ensembleType,
      genres,
    });
    //this is how we can retrieve the form data
    const formData = new FormData(e.currentTarget);
    console.log(formData.get("ensembleName"));
    //or just like this - since they are saved in the store
    console.log(name);
    resetForm();
  };

  return (
    <>
      <div className="p-6 flex flex-col justify-around gap-6 bg-gray-300">
        <TextHeadline variant="h3" size="lg">
          Create an ensemble
        </TextHeadline>
        <form onSubmit={handleSubmit} className="flex flex-col justify-around gap-6">
          <TextInput inputType="text" value={name} onChange={(value) => setName(value)} placeholder={"Ensemble's name"} id="ensembleName" name="ensembleName" className="w-auto" />
          <div>image container here //might need to be a whole component</div>
          <ImageInput onImageChange={(file) => console.log(file)} />

          {/* description */}
          <div className="flex flex-col gap-3">
            <TextBody variant="strong" size="md" className="text-blue-500">
              Description
            </TextBody>
            <Textarea textareaPlaceholder="Write a short description of your ensemble or orchestra" textareaValue={description} onChange={(value) => setDescription(value)} />
          </div>
          {/* homepage link */}
          <div className="flex flex-col gap-3">
            <TextBody variant="strong" size="md" className="text-blue-500">
              Webpage
            </TextBody>
            <TextInput inputType="text" value={webpage} onChange={(value) => setWebpage(value)} placeholder="Insert the link" id="webpage" name="webpage" className="w-auto" />
          </div>
          {/* location */}
          <div className="flex flex-col gap-3">
            <TextBody variant="strong" size="md" className="text-blue-500">
              Location
            </TextBody>
            <div className="flex flex-row gap-3">
              <TextInput inputType="text" value={location.postNumber} onChange={(value) => setLocation(value, location.city)} placeholder="Postnr." id="postNumber" name="postNumber" className="w-auto" />
              <TextInput inputType="text" value={location.city} onChange={(value) => setLocation(location.postNumber, value)} placeholder="City" id="city" name="city" className="w-auto" />
            </div>
          </div>
          {/* number of active musicians */}
          <div className="flex flex-col gap-3">
            <TextBody variant="strong" size="md" className="text-blue-500">
              Number of active musicians
            </TextBody>
            <Dropdown initialSelectedLabel="Select a number" options={activeMusiciansNumberOptions} className="w-auto" selectedOption={activeMusicians} onSelect={(value: string) => setActiveMusicians(value)} />
          </div>

          {/* sessions frequency */}
          <div className="flex flex-col gap-3">
            <TextBody variant="strong" size="md" className="text-blue-500">
              Frequency of music sessions
            </TextBody>
            <Dropdown initialSelectedLabel="Select a frequency" options={musicSessionsFrequencyOptions} selectedOption={sessionFrequency} onSelect={(value) => setSessionFrequency(value)} className="w-auto" />
          </div>

          {/* Type of ensemble */}
          <div className="flex flex-col gap-4">
            <TextBody variant="strong" size="md" className="text-blue-500">
              The ensemble plays...
            </TextBody>
            <Checkbox name="checkbox" label="Continuously" checked={ensembleType === "Continuously"} onChange={() => setEnsembleType("Continuously")} />
            <Checkbox name="checkbox" label="On a project basis" checked={ensembleType === "Project"} onChange={() => setEnsembleType("Project")} />
          </div>

          {/* music genre */}
          <div className="flex flex-col gap-3">
            <TextBody variant="strong" size="md" className="text-blue-500">
              Genres
            </TextBody>
            <DropdownWithTags
              options={musicGenresOptions}
              selectedTags={genres}
              onTagChange={(tags) => {
                handleTagChange(tags);
              }}
            />
          </div>

          <Button buttonVariant="primary" buttonLabel="Create ensemble" buttonState="default" iconPosition="top" className="w-auto m-b-6" type="submit" />
        </form>
      </div>
    </>
  );
}

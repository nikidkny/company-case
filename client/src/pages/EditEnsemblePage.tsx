import { useNavigate, useParams } from "@tanstack/react-router";
import { useEffect } from "react";

import Button from "../components/atoms/Button";
import Checkbox from "../components/atoms/Checkbox";
import Textarea from "../components/atoms/Textarea";
import TextBody from "../components/atoms/TextBody";
import TextHeadline from "../components/atoms/TextHeadline";
import TextInput from "../components/atoms/TextInput";
import { Dropdown } from "../components/molecules/Dropdown";
import { DropdownWithTags } from "../components/molecules/DropdownWithTags";
import { useFetch } from "../hooks/use-fetch";
import { EnsembleType } from "../types/EnsembleType";
import { activeMusiciansNumberOptions } from "../utilities/activeMusiciansNumberOptions";
import { musicGenresOptions } from "../utilities/musicGenresOptions";
import { musicSessionsFrequencyOptions } from "../utilities/musicSessionsFrequencyOptions";
import { useStore } from "../store/useStore";
import { getUserIdFromCookie } from "../hooks/getCookies";

export default function EditEnsemblePage() {
  const {
    name,
    setName,
    description,
    setDescription,
    webpage,
    setWebpage,
    zip,
    city,
    setZip,
    setCity,
    activeMusicians,
    setActiveMusicians,
    sessionFrequency,
    setSessionFrequency,
    isPermanent,
    setEnsembleType,
    genres,
    addGenre,
    removeGenre,
    resetForm,
  } = useStore();
  const { userId } = getUserIdFromCookie();

  const navigate = useNavigate();
  const ensemble = useStore((state) => state.ensemble);
  const { ensemblesId } = useParams({ strict: false });

  //   const { data: ensemble1, triggerFetch: triggerFetchEnsembleDetails, loading } = useFetch<EnsembleType | null>(null, ensemblesId ? `/ensembles/${ensemblesId}` : null, "GET");

  console.log(ensemble);

  const editedEnsembleData = {
    name: name || ensemble?.name,
    description: description || ensemble?.description,
    webpage: webpage || ensemble?.webpage,
    zip: zip || ensemble?.zip,
    city: city || ensemble?.city,
    memberList: ensemble?.memberList,
    createdBy: ensemble?.createdBy,
    numberOfMembers: ensemble?.memberList.length,
    createdAt: ensemble?.createdAt,
    //image: "",
    activeMusicians: activeMusicians || ensemble?.activeMusicians,
    sessionFrequency: sessionFrequency || ensemble?.sessionFrequency,
    isPermanent: isPermanent || ensemble?.isPermanent,
    genres: genres || ensemble?.genres,
  };

  const { data: editedEnsemble, triggerFetch: triggerFetchEditEnsemble, loading } = useFetch<EnsembleType | null>(null, ensemblesId ? `/ensembles/${ensemblesId}` : null, "PUT", { "Content-Type": "application/json" }, editedEnsembleData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      triggerFetchEditEnsemble();
      //   if (!editedEnsemble) {
      //     return; // Stop further execution if there's an error
      //   } else {
      //TODO: to fix this fetch - the ensemble is not getting edited
      alert("The ensemble has been edited! You will be redirected to your profile");
      navigate({
        to: "/profile/$profileId",
        params: { profileId: userId },
      });
    } catch (error) {
      alert(`Failed to save changes: ${error}`);
    } finally {
      resetForm();
    }
  };
  console.log("editedEnsemble", editedEnsemble);

  const handleTagChange = (tags: string[]) => {
    const currentTags = new Set(genres); // Get the current tags from state
    // const ensembleTags = ensemble?.genres;
    // Add new tags that are not already in the state
    tags.forEach((tag) => {
      if (!currentTags.has(tag)) {
        addGenre(tag); // Add genre to state
      }
    });

    // Remove deselected tags
    currentTags.forEach((tag) => {
      if (!tags.includes(tag)) {
        removeGenre(tag); // Remove genre from state
      }
    });
  };
  console.log("tags", genres);

  return (
    <>
      <div className="p-6 flex flex-col justify-around gap-6 bg-gray-300">
        <TextHeadline variant="h3" size="lg">
          Edit ensemble {ensemble?.name}
        </TextHeadline>
        //TODO: add validation on the form inputs
        <form onSubmit={handleSubmit} className="flex flex-col justify-around gap-6">
          <TextInput inputType="text" value={name} onChange={(value) => setName(value)} placeholder={ensemble?.name ? ensemble.name : "Ensemble's name"} id="ensembleName" name="ensembleName" className="w-auto" />

          {/* image */}
          {/* <ImageInput variant="cover" onImageChange={(file) => setImage(file)} /> */}

          {/* description */}
          <div className="flex flex-col gap-3">
            <TextBody variant="strong" size="md" className="text-blue-500">
              Description
            </TextBody>
            <Textarea textareaPlaceholder={ensemble ? ensemble?.description : "Write a short description of your ensemble or orchestra"} textareaValue={description} onChange={(value) => setDescription(value)} />
          </div>
          {/* homepage link */}
          <div className="flex flex-col gap-3">
            <TextBody variant="strong" size="md" className="text-blue-500">
              Webpage
            </TextBody>
            <TextInput inputType="text" value={webpage} onChange={(value) => setWebpage(value)} placeholder={ensemble?.webpage ? ensemble.webpage : "Insert the link"} id="webpage" name="webpage" className="w-auto" />
          </div>
          {/* location */}
          <div className="flex flex-col gap-3">
            <TextBody variant="strong" size="md" className="text-blue-500">
              Location
            </TextBody>
            <div className="flex flex-row gap-3">
              <TextInput
                inputType="text"
                value={zip}
                onChange={(value) => {
                  setZip(value);
                }}
                placeholder={ensemble?.zip ? ensemble.zip : "Zip code"}
                id="zip"
                name="zip"
                className="w-auto"
              />
              <TextInput
                inputType="text"
                value={city}
                onChange={(value) => {
                  setCity(value);
                }}
                placeholder={ensemble?.city ? ensemble.city : "City"}
                id="city"
                name="city"
                className="w-auto"
              />
            </div>
          </div>
          {/* number of active musicians */}
          <div className="flex flex-col gap-3">
            <TextBody variant="strong" size="md" className="text-blue-500">
              Number of active musicians
            </TextBody>
            <Dropdown
              initialSelectedLabel={ensemble?.activeMusicians ? ensemble.activeMusicians : "Select a number"}
              options={activeMusiciansNumberOptions}
              className="w-auto"
              selectedOption={activeMusicians}
              onSelect={(value) => {
                setActiveMusicians(value);
              }}
            />
          </div>

          {/* sessions frequency */}
          <div className="flex flex-col gap-3">
            <TextBody variant="strong" size="md" className="text-blue-500">
              Frequency of music sessions
            </TextBody>
            <Dropdown
              initialSelectedLabel={ensemble?.sessionFrequency ? ensemble.sessionFrequency : "Select a frequency"}
              options={musicSessionsFrequencyOptions}
              selectedOption={sessionFrequency}
              onSelect={(value) => {
                setSessionFrequency(value);
              }}
              className="w-auto"
            />
          </div>

          {/* Type of ensemble */}

          <div className="flex flex-col gap-4">
            <TextBody variant="strong" size="md" className="text-blue-500">
              The ensemble plays...
            </TextBody>
            <Checkbox name="checkbox" label="Continuously" checked={isPermanent === true} onChange={() => setEnsembleType(true)} />
            <Checkbox name="checkbox" label="On a project basis" checked={isPermanent === false} onChange={() => setEnsembleType(false)} />
          </div>

          {/* music genre */}
          <div className="flex flex-col gap-3">
            <TextBody variant="strong" size="md" className="text-blue-500">
              Genres
            </TextBody>
            <DropdownWithTags
              options={musicGenresOptions}
              selectedTags={ensemble?.genres ? ensemble.genres : genres}
              onTagChange={(tags) => {
                handleTagChange(tags);
              }}
            />
          </div>

          <Button buttonVariant="primary" buttonLabel="Create ensemble" buttonState={(loading && "disabled") || "default"} iconPosition="top" className="w-auto m-b-6 py-4" type="submit">
            {loading ? "Creating..." : "Create Ensemble"}
          </Button>
        </form>
      </div>
    </>
  );
}

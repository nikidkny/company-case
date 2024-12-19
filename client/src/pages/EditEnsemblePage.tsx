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

export default function EditEnsemblePage() {
  const {
    name,
    setName,
    description,
    setDescription,
    webpage,
    setWebpage,
    zip,
    // image,
    // setImage,
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

    // resetForm,
    // setObjectData,
    // objectData,
    // setEnsembles,
  } = useStore();

  //  const { user } = useStore();
  // console.log(user);
  //const navigate = useNavigate();
  const ensemble = useStore((state) => state.ensemble);
  const { ensemblesId } = useParams({ strict: false });
  //console.log(ensemblesId);
  //getting the ensemble's data

  const { data: ensemble1, triggerFetch: triggerFetchEnsembleDetails, loading } = useFetch<EnsembleType | null>(null, ensemblesId ? `/ensembles/${ensemblesId}` : null, "GET");

  console.log(ensemble);
  const handleSubmit = () => {};
  //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     //this is just when the ensemble is first created. the only member is the creator itself.
  //     const memberList = [user._id];
  //     const ensembleData = {
  //       name,
  //       description,
  //       webpage,
  //       zip,
  //       city,
  //       memberList,
  //       createdBy: user._id,
  //       numberOfMembers: memberList.length,
  //       createdAt: new Date().toLocaleString(),
  //       image: "",
  //       activeMusicians,
  //       sessionFrequency,
  //       isPermanent,
  //       genres,
  //     };

  //     setObjectData(ensembleData);
  //     setLoading(true);

  //     setTimeout(() => {
  //       triggerFetch();
  //       if (createdEnsemble.length < 1) {
  //         return; // Stop further execution if there's an error
  //       } else {
  //         alert("The ensemble has been created! You will be redirected to your profile");
  //         navigate({
  //           to: "/profile/$profileId",
  //           params: { profileId: user._id },
  //         });
  //       }
  //       resetForm();
  //     }, 2000);
  //   };

  // Reset form on component unmount
  //   useEffect(() => {
  //     return () => {
  //       // Reset when navigating away
  //       resetForm();
  //     };
  //   }, [resetForm]);

  //   useEffect(() => {
  //     console.log("Updated objectData:", objectData);
  //   }, [objectData]);

  //   const {
  //     data: createdEnsemble,
  //     error,
  //     loading,
  //     setLoading,
  //     triggerFetch,
  //     shouldFetch,
  //   } = useFetch<EnsembleType[]>(
  //     [],
  //     "/ensembles",
  //     "POST",
  //     {
  //       "Content-Type": "application/json",
  //     },
  //     objectData
  //   );

  //   console.log(loading);

  //   useEffect(() => {
  //     if (createdEnsemble.length >= 1) {
  //       console.log("Ensemble created:", createdEnsemble);
  //       setEnsembles(createdEnsemble);
  //     } else {
  //       console.log("errors", error);
  //       return;
  //     }
  //   }, [createdEnsemble, setEnsembles, error, shouldFetch]);

  // useEffect(() => {
  //   if (error) {
  //     console.error("Error creating ensemble:", error);
  //     return;
  //   }
  // }, [triggerFetch]);

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
          {/* if the ensemble is working Continuously, isPermanent is true and viceversa */}
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

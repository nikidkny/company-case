import { useEffect, useState } from "react";
import { useFetch } from "../hooks/use-fetch";
import { EnsembleType } from "../types/EnsembleType";
import { useStore } from "../store/useStore";
import TextHeadline from "../components/atoms/TextHeadline";
import TextInput from "../components/atoms/TextInput";
import TextBody from "../components/atoms/TextBody";
import Textarea from "../components/atoms/Textarea";
import { Dropdown } from "../components/molecules/Dropdown";
import { activeMusiciansNumberOptions } from "../utilities/activeMusiciansNumberOptions";
import { musicSessionsFrequencyOptions } from "../utilities/musicSessionsFrequencyOptions";
import Checkbox from "../components/atoms/Checkbox";
import { DropdownWithTags } from "../components/molecules/DropdownWithTags";
import { musicGenresOptions } from "../utilities/musicGenresOptions";
import Button from "../components/atoms/Button";
import { useNavigate } from "@tanstack/react-router";
import { getFieldErrorMessage, notEmpty, validateCity, validateForm, validateName, validateZipCode, ValidationSchema } from "../utilities/auth";
// import ImageInput from "../atoms/ImageInput";

export function CreateEnsemblePage() {
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
    resetForm,
    setObjectData,
    objectData,
    setEnsembles,
  } = useStore();

  // const userId = "6751e7b6ef87e8376bba326e";
  const { user } = useStore();
  // console.log(user);
  const navigate = useNavigate();

  const [frontendEnsembleValidationErrors, setFrontendEnsembleValidationErrors] = useState<string | string[]>([]);
  const [backendEnsembleValidationErrors, setBackendEnsembleValidationErrors] = useState<string | string[]>([]);

  const createEnsembleValidationSchema: ValidationSchema = {
    name: {
      validator: (value: string) => validateName(value, "Name"),
      required: true
    },
    description: {
      validator: (value: string) => notEmpty(value, "Description"),
    },
    zip: {
      validator: (value: string) => validateZipCode(value),
    },
    city: {
      validator: (value: string) => validateCity(value),
    },
    activeMusicians: {
      validator: (value: string) => notEmpty(value, "Musicians"),
    },
    sessionFrequency: {
      validator: (value: string) => notEmpty(value, "Frequency"),
    },
    isPermanent: {
      validator: (value: string) => notEmpty(value, "Value"),
    },
    genres: {
      validator: (value: string) => notEmpty(value, "Genre"),
    },
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //this is just when the ensemble is first created. the only member is the creator itself.
    const memberList = [user._id];
    const ensembleData = {
      name: name.trim(),
      description: description.trim(),
      webpage: webpage.trim(),
      zip: zip.trim(),
      city: city.trim(),
      memberList,
      createdBy: user._id,
      numberOfMembers: memberList.length,
      createdAt: new Date().toLocaleString(),
      image: "",
      activeMusicians,
      sessionFrequency,
      isPermanent,
      genres: genres,
    };


    const errors = validateForm(ensembleData, createEnsembleValidationSchema);
    const errorMessages = Object.values(errors);
    // If there are any errors, set them
    if (errorMessages.length > 0) {
      setFrontendEnsembleValidationErrors(errorMessages);
      return;
    }

    setObjectData(ensembleData);
    setLoading(true);


    setTimeout(() => {
      createEnsembleFetch();
      if (createdEnsemble.length < 1) {
        return; // Stop further execution if there's an error
      } else {
        alert("The ensemble has been created! You will be redirected to your profile");
        navigate({
          to: "/profile/$profileId",
          params: { profileId: user._id },
        });
      }
      resetForm();
      resetErrors();
    }, 2000);

  };

  // Reset form on component unmount
  useEffect(() => {
    return () => {
      // Reset when navigating away
      resetForm();
    };
  }, [resetForm]);

  useEffect(() => {
  }, [objectData]);

  const {
    data: createdEnsemble,
    error: createEnsembleError,
    loading,
    setLoading,
    triggerFetch: createEnsembleFetch,
    shouldFetch,
  } = useFetch<EnsembleType[]>(
    [],
    "/ensembles",
    "POST",
    {
      "Content-Type": "application/json",
    },
    objectData
  );

  useEffect(() => {
    if (createdEnsemble.length >= 1) {
      console.log("Ensemble created:", createdEnsemble);
      setEnsembles(createdEnsemble);
    } else if (createEnsembleError) {
      setBackendEnsembleValidationErrors(createEnsembleError)
      console.log("errors", createEnsembleError);
      return;
    }
  }, [createdEnsemble, setEnsembles, createEnsembleError, shouldFetch]);

  // useEffect(() => {
  //   if (error) {
  //     console.error("Error creating ensemble:", error);
  //     return;
  //   }
  // }, [triggerFetch]);

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

  const resetErrors = () => {
    setFrontendEnsembleValidationErrors([])
    setBackendEnsembleValidationErrors([])
  }

  // Combine frontend and backend errors
  const combinedErrors = [
    ...frontendEnsembleValidationErrors,
    ...backendEnsembleValidationErrors
  ];

  return (
    <>
      <div className="p-6 flex flex-col justify-around gap-6 bg-gray-300">
        <TextHeadline variant="h3" size="lg">
          Create an ensemble
        </TextHeadline>
        <form onSubmit={handleSubmit} className="flex flex-col justify-around gap-6">
          <TextInput
            inputType="text"
            value={name}
            onChange={(value) => setName(value)}
            placeholder={"Ensemble's name"}
            id="ensembleName"
            name="ensembleName"
            className="w-auto"
            isValid={!getFieldErrorMessage(combinedErrors, "name")}
            validityMsg={getFieldErrorMessage(combinedErrors, "name")}
          />

          {/* image */}
          {/* <ImageInput variant="cover" onImageChange={(file) => setImage(file)} /> */}

          {/* description */}
          <div className="flex flex-col gap-3">
            <TextBody variant="strong" size="md" className="text-blue-500">
              Description
            </TextBody>
            {getFieldErrorMessage(combinedErrors, "Description") && (
              <TextBody className="text-red-500 text-sm mt-1" >
                {getFieldErrorMessage(combinedErrors, "Description")}
              </TextBody>
            )}
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
              <TextInput
                inputType="text"
                value={zip}
                onChange={(value) => {
                  setZip(value);
                }}
                placeholder="Zip code"
                id="zip"
                name="zip"
                className="w-auto"
                isValid={!getFieldErrorMessage(combinedErrors, "Zip")}
                validityMsg={getFieldErrorMessage(combinedErrors, "Zip")}
              />
              <TextInput
                inputType="text"
                value={city}
                onChange={(value) => {
                  setCity(value);
                }}
                placeholder="City"
                id="city"
                name="city"
                className="w-auto"
                isValid={!getFieldErrorMessage(combinedErrors, "City")}
                validityMsg={getFieldErrorMessage(combinedErrors, "City")}
              />
            </div>
          </div>
          {/* number of active musicians */}
          <div className="flex flex-col gap-3">
            <TextBody variant="strong" size="md" className="text-blue-500">
              Number of active musicians
            </TextBody>
            {getFieldErrorMessage(combinedErrors, "Musician") && (
              <TextBody className="text-red-500 text-sm mt-1" >
                {getFieldErrorMessage(combinedErrors, "Musician")}
              </TextBody>
            )}
            <Dropdown
              initialSelectedLabel="Select a number"
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
            {getFieldErrorMessage(combinedErrors, "Frequency") && (
              <TextBody className="text-red-500 text-sm mt-1" >
                {getFieldErrorMessage(combinedErrors, "Frequency")}
              </TextBody>
            )}
            <Dropdown
              initialSelectedLabel="Select a frequency"
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
            {getFieldErrorMessage(combinedErrors, "Value") && (
              <TextBody className="text-red-500 text-sm mt-1" >
                {getFieldErrorMessage(combinedErrors, "Value")}
              </TextBody>
            )}
            <Checkbox name="checkbox" label="Continuously" checked={isPermanent === true} onChange={() => setEnsembleType(isPermanent === true ? null : true)} />
            <Checkbox name="checkbox" label="On a project basis" checked={isPermanent === false} onChange={() => setEnsembleType(isPermanent === false ? null : false)} />
          </div>

          {/* music genre */}
          <div className="flex flex-col gap-3">
            <TextBody variant="strong" size="md" className="text-blue-500">
              Genres
            </TextBody>
            {getFieldErrorMessage(combinedErrors, "Genre") && (
              <TextBody className="text-red-500 text-sm mt-1" >
                {getFieldErrorMessage(combinedErrors, "Genre")}
              </TextBody>
            )}
            <DropdownWithTags
              options={musicGenresOptions}
              selectedTags={genres}
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

import { useNavigate, useParams } from "@tanstack/react-router";
import TextHeadline from "../components/atoms/TextHeadline";
import { useStore } from "../store/useStore";
import TextInput from "../components/atoms/TextInput";
import TextBody from "../components/atoms/TextBody";
import Textarea from "../components/atoms/Textarea";
import { Dropdown, DropdownOptionType } from "../components/molecules/Dropdown";
import { DropdownWithTags } from "../components/molecules/DropdownWithTags";
import Button from "../components/atoms/Button";
import { musicGenresOptions } from "../utilities/musicGenresOptions";
import { useFetch } from "../hooks/use-fetch";
import { useEffect } from "react";
import { PostType } from "../types/PostType";
import { InstrumentType } from "../types/InstrumentType";
import { EnsembleType } from "../types/EnsembleType";

export default function CreateEnsemblePostPage() {
  const { ensemblesId } = useParams({ strict: false });
  const {
    user,
    setPosts,
    selectedEnsembleOption,
    setInstruments,
    postTitle,
    setPostTitle,
    postDescription,
    setPostDescription,
    postGenres,
    setPostGenres,
    removePostGenre,
    experienceRequired,
    //setExperienceRequired,
    resetPostData,
    postInstrument,
    setPostInstrument,
    instruments,
    objectData,
    setObjectData,
  } = useStore();
  const navigate = useNavigate();

  const { data: fetchedInstruments, triggerFetch: instrumentsFetch } = useFetch<InstrumentType[]>([], "/instruments", "GET");

  const { data: ensemble, triggerFetch: triggerFetchEnsembleDetails } = useFetch<EnsembleType>(
    {
      _id: "",
      name: "",
      memberList: [],
      createdBy: "",
      description: "",
      numberOfMembers: 0,
      zip: "",
      city: "",
      sessionFrequency: "",
      genres: [],
      isPermanent: false,
      //image: "",
      activeMusicians: "",
      webpage: "",
      createdAt: "",
    },
    `/ensembles/${ensemblesId}`,
    "GET"
  );

  useEffect(() => {
    if (instruments.length === 0) {
      instrumentsFetch();
    }
    if (ensemblesId) {
      triggerFetchEnsembleDetails();
      // setObjectData(null);
      // console.log("empty object data?", objectData);
    }
  }, [instruments, ensemblesId]);

  useEffect(() => {
    if (fetchedInstruments.length > 0 && JSON.stringify(instruments) !== JSON.stringify(fetchedInstruments)) {
      setInstruments(fetchedInstruments);
      // This will correctly replace the list when fetching data - avoiding duplication
    }
  }, [fetchedInstruments]);

  // console.log("selectedEnsembleOption", selectedEnsembleOption);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postData = {
      title: postTitle,
      description: postDescription,
      instrument: postInstrument.label,
      experienceRequired,
      genres: postGenres,
      createdAt: new Date().toLocaleString(),
      createdBy: user._id,
      // isReported: false,
      webpage: ensemble.webpage,
      location: `${ensemble.zip} ${ensemble.city}`,
    };
    setObjectData(postData);
    setLoading(true);

    setTimeout(() => {
      triggerFetch();
      console.log("createdPost INSIDE", createdPost);
      if (createdPost) {
        alert("The post has been created! You will be redirected to your profile");
        navigate({
          to: "/profile/$profileId",
          params: { profileId: user._id },
        });
      } else {
        return; // Stop further execution if there's an error
      }
      resetPostData();
    }, 2000);
  };

  // // Reset form on component unmount
  // useEffect(() => {
  //   return () => {
  //     // Reset when navigating away
  //     resetPostData();
  //   };
  // }, [resetPostData]);

  const {
    data: createdPost,
    error,
    loading,
    setLoading,
    triggerFetch,
    shouldFetch,
  } = useFetch<PostType[]>(
    [],
    "/posts",
    "POST",
    {
      "Content-Type": "application/json",
    },
    objectData
  );

  useEffect(() => {
    console.log("Updated objectData:", objectData);
  }, [objectData]);

  console.log("createdPost", createdPost);
  //console.log("all instruments", instruments);

  useEffect(() => {
    if (createdPost && createdPost.length >= 1) {
      console.log("Post created:", createdPost);
      setPosts(createdPost);
    } else {
      console.log("errors", error);
      return;
    }
  }, [createdPost, error, shouldFetch]);

  //normalising the intruments array into dropdown options
  const instrumentsDropdownOptions =
    instruments?.map((instrument) => ({
      value: instrument._id,
      label: instrument.name,
    })) || [];

  const handleTagChange = (tags: string[]) => {
    const currentTags = new Set(postGenres);
    tags.forEach((tag) => {
      if (!currentTags.has(tag)) {
        setPostGenres(tag); // Add new tags
      }
    });
    currentTags.forEach((tag) => {
      if (!tags.includes(tag)) {
        removePostGenre(tag); // Remove deselected tags
      }
    });
  };

  return (
    <>
      <div className="p-6 flex flex-col justify-around gap-6 bg-gray-300">
        <TextHeadline variant="h3" size="lg">
          Create post {selectedEnsembleOption.label ? `for ${selectedEnsembleOption.label}` : null}
        </TextHeadline>

        <form onSubmit={handleSubmit} className="flex flex-col justify-around gap-6">
          <TextInput inputType="text" value={postTitle} onChange={(value) => setPostTitle(value)} placeholder={"Title"} id="postTitle" name="postTitle" className="w-auto" />

          {/* description */}
          <div className="flex flex-col gap-3">
            <TextBody variant="strong" size="md" className="text-blue-500">
              Description
            </TextBody>
            <Textarea textareaPlaceholder="Write a short description for your post" textareaValue={postDescription} onChange={(value) => setPostDescription(value)} />
          </div>
          {/* instrument selection */}
          <div className="flex flex-col gap-3">
            <TextBody variant="strong" size="md" className="text-blue-500">
              Instrument
            </TextBody>
            <Dropdown initialSelectedLabel="Choose an instrument" options={instrumentsDropdownOptions} selectedOption={postInstrument} onSelect={(value) => setPostInstrument(value as DropdownOptionType)} className="w-auto" />
          </div>
          {/* location */}
          <div className="flex flex-col gap-3">
            <TextBody variant="strong" size="md" className="text-blue-500">
              Minimum experience required
            </TextBody>
            <div className="flex flex-row gap-3">//TODO: ADD experience required here</div>
          </div>

          {/* music genre */}
          <div className="flex flex-col gap-3">
            <TextBody variant="strong" size="md" className="text-blue-500">
              Genres
            </TextBody>
            <DropdownWithTags
              options={musicGenresOptions}
              selectedTags={postGenres}
              onTagChange={(tags) => {
                handleTagChange(tags);
              }}
            />
          </div>

          <Button buttonVariant="primary" buttonLabel="Create post" buttonState={(loading && "disabled") || "default"} iconPosition="top" className="w-auto m-b-6 py-4" type="submit">
            {loading ? "Creating..." : "Create post"}
          </Button>
        </form>
      </div>
    </>
  );
}

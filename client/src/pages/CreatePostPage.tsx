import { useEffect } from "react";
import Button from "../components/atoms/Button";
import TextBody from "../components/atoms/TextBody";
import TextHeadline from "../components/atoms/TextHeadline";
import { Dropdown, DropdownOptionType } from "../components/molecules/Dropdown";
import { getUserIdFromCookie } from "../hooks/getCookies";
import { useFetch } from "../hooks/use-fetch";
import { useStore } from "../store/useStore";
import { EnsembleType } from "../types/EnsembleType";
import { useLocation } from "@tanstack/react-router";

export default function CreatePostPage() {
  const { selectedEnsembleOption, setSelectedEnsembleOption, resetPostData } = useStore();
  const { userId } = getUserIdFromCookie();
  //   const navigate = useNavigate();
  const location = useLocation();
  const { data: userEnsembles, triggerFetch: fetchUserEnsembles } = useFetch<EnsembleType[] | null>(null, userId ? `/ensembles/user/${userId}` : null, "GET");

  //fetching the ensembles if the user is logged in
  useEffect(() => {
    if (userId) {
      fetchUserEnsembles();
    }
  }, [userId, fetchUserEnsembles]);

  //creating an array with the user's ensembles id and name
  const ensemblesDropdownOptions =
    userEnsembles?.map((ensemble) => ({
      value: ensemble._id,
      label: ensemble.name,
    })) || [];

  //reset selectedEnsemble state if the user doesn't want to continue with creating a post
  useEffect(() => {
    return () => {
      // Check if the user is navigating away to the "create post" page
      const nextPath = location.pathname;
      if (!nextPath.startsWith("/posts/create")) {
        resetPostData();
      }
    };
  }, [resetPostData, location]);

  console.log("ensemblesDropdownOptions", ensemblesDropdownOptions);
  console.log("selectedPostEnsemble", selectedEnsembleOption);

  return (
    <>
      <div className="p-6 flex flex-col justify-around gap-6 bg-gray-300">
        <TextHeadline variant="h3" size="lg">
          Create a post
        </TextHeadline>
        <div>
          <TextBody variant="p" size="md">
            Select the ensemble on whose behalf the posting is to be created.
          </TextBody>
          <TextBody variant="p" size="md">
            If you are about to start a new ensemble, you can create it.
          </TextBody>
        </div>
        <div className="flex flex-col gap-3">
          {userEnsembles && (
            <>
              <TextBody variant="strong" size="md" className="text-blue-500">
                My ensembles
              </TextBody>
              <Dropdown
                initialSelectedLabel="Choose an ensemble"
                options={ensemblesDropdownOptions}
                className="w-auto"
                selectedOption={selectedEnsembleOption}
                onSelect={(value) => {
                  setSelectedEnsembleOption(value as DropdownOptionType);
                }}
              />
            </>
          )}
          <Button buttonVariant="secondary" to="/ensembles/create" iconPosition="none" buttonLabel="Create new ensemble" className="no-underline w-auto mb-6"></Button>

          <Button buttonVariant="primary" to="/posts/create/$ensemblesId" params={{ ensemblesId: selectedEnsembleOption.value }} iconPosition="none" buttonLabel="Continue" className="no-underline w-auto"></Button>
        </div>
      </div>
    </>
  );
}

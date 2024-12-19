import { useEffect } from "react";
import Button from "../components/atoms/Button";
import ProfileBadge from "../components/atoms/ProfileBadge";
import TextBody from "../components/atoms/TextBody";
import TextHeadline from "../components/atoms/TextHeadline";
import { useFetch } from "../hooks/use-fetch";
import { EnsembleType } from "../types/EnsembleType";
import Image from "./../components/atoms/Image";
import RegisterInEnsembleButton from "../components/molecules/RegisterInEnsembleButton";
import { useParams } from "@tanstack/react-router";
import { User } from "../types/UserType";
import { useStore } from "../store/useStore";

export default function EnsembleDetailsPage() {
  // Get the ensembleId from the URL

  const { ensemble, setEnsemble } = useStore();
  const { ensemblesId } = useParams({ strict: false });
  const { user } = useStore();
  //console.log(user);
  const { data: fetchedEnsemble, triggerFetch: triggerFetchEnsembleDetails } = useFetch<EnsembleType | null>(null, `/ensembles/${ensemblesId}`, "GET");
  console.log("ensemble - fetched", fetchedEnsemble);

  useEffect(() => {
    if (fetchedEnsemble && ensemblesId) {
      setEnsemble(fetchedEnsemble);
    }
  }, [ensemblesId, fetchedEnsemble, setEnsemble]);
  console.log("ensemble", ensemble);
  // Get members' details (first name, last name) including the creator of the ensemble
  const { data: membersDetails, triggerFetch: triggerFetchMembersDetails } = useFetch(
    { foundMembers: [], creator: { _id: "" } },
    "/users/details",
    "POST",
    {
      "Content-Type": "application/json",
    },
    { membersIds: fetchedEnsemble?.memberList, creatorId: fetchedEnsemble?.createdBy }
  );

  console.log("membersDetails", membersDetails);

  const membersList: User[] = membersDetails.foundMembers;
  const creator: User = membersDetails.creator;

  const isUserMember = fetchedEnsemble?.memberList.includes(user._id);
  const isUserCreator = fetchedEnsemble?.createdBy.includes(user._id);
  console.log("isUserMember", isUserMember);
  console.log("isUserCreator", isUserCreator);
  //Join the ensemble
  const {
    data: registrationData,
    loading: registrationLoading,
    error: registrationError,
    triggerFetch: triggerRegisterFetch,
  } = useFetch(
    { message: "" },
    "/userEnsemble",
    "POST",
    {
      "Content-Type": "application/json",
    },
    { ensembleId: ensemblesId }
  );

  const handleAddUserToEnsemble = () => {
    triggerRegisterFetch();
    triggerFetchMembersDetails();
  };

  useEffect(() => {
    if (registrationData !== null && !registrationLoading) {
      triggerFetchEnsembleDetails();
      console.log("fetched");
    }
    // console.log("ensembles", ensemble);
  }, [registrationData, registrationLoading]);

  useEffect(() => {
    if (!fetchedEnsemble) {
      triggerFetchEnsembleDetails();
    }
    // triggerFetchCurrentUser();
  }, [fetchedEnsemble]);

  useEffect(() => {
    if (fetchedEnsemble?.memberList && fetchedEnsemble?.createdBy) {
      triggerFetchMembersDetails();
    }
  }, [fetchedEnsemble]);

  return (
    <div>
      {/* image */}
      <Image src="https://picsum.photos/600" alt="Placeholder" height={"200"} className="w-full object-cover" />

      {/* name, zip city and button */}
      <div className="flex flex-col gap-6 p-6 items-center">
        <TextHeadline variant="h2" size="sm" className="text-red-500">
          {fetchedEnsemble?.name || "No name provided"}
        </TextHeadline>
        <TextBody variant="p" size="md">
          {fetchedEnsemble?.zip} {fetchedEnsemble?.city}
        </TextBody>

        {(!isUserMember && <RegisterInEnsembleButton registrationLoading={registrationLoading} registrationError={registrationError} registrationData={registrationData} handleAddUserToEnsemble={handleAddUserToEnsemble} />) || (
          <ProfileBadge ProfileBadgeLabel="You're a member of this ensemble" ProfileBadgeSize="sm" />
        )}
        {isUserCreator && <Button type="button" buttonVariant="secondary" iconPosition="none" buttonLabel="Edit ensemble" to="/ensembles/$ensemblesId/edit" params={{ ensemblesId: fetchedEnsemble._id }} className="no-underline w-auto px-4"></Button>}
      </div>
      <div className="h-[30px] bg-gray-300 border-solid border-1 border-gray-400"></div>

      {/* description */}
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <TextBody variant="strong" size="lg" className="text-blue-500">
            Description
          </TextBody>
          <TextBody variant="p" size="md">
            {fetchedEnsemble?.description || "No description provided"}
          </TextBody>
        </div>
        <div className="flex flex-col gap-2">
          <TextBody variant="strong" size="lg" className="text-blue-500">
            Number of active musicians
          </TextBody>
          <TextBody variant="p" size="md">
            {fetchedEnsemble?.activeMusicians || "There are no active musicians at the moment"}
          </TextBody>
        </div>

        <div className="flex flex-col gap-2">
          {/*Added extra html element to see how many id are inside an ensemble */}
          <TextBody variant="strong" size="lg" className="text-blue-500">
            Members
          </TextBody>
          <div>
            {membersList.length > 0 ? (
              membersList.map((member: User, index) => (
                <TextBody key={index} variant="p" size="md">
                  {member.firstName} {member.lastName}
                </TextBody>
              ))
            ) : (
              <TextBody variant="p" size="md">
                There are no active musicians at the moment
              </TextBody>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <TextBody variant="strong" size="lg" className="text-blue-500">
            Frequency of music sessions
          </TextBody>
          <TextBody variant="p" size="md">
            {fetchedEnsemble?.sessionFrequency || "The frequency of music sessions hasn't been specified"}
          </TextBody>
        </div>

        <div className="flex flex-col gap-2">
          <TextBody variant="strong" size="lg" className="text-blue-500">
            The ensemble plays...
          </TextBody>
          <TextBody variant="p" size="md">
            {fetchedEnsemble?.isPermanent === true ? "Continuously" : "On a project basis"}
          </TextBody>
        </div>

        <div className="flex flex-col gap-2">
          <TextBody variant="strong" size="lg" className="text-blue-500">
            Genres
          </TextBody>

          <div className="flex flex-wrap gap-2">
            {fetchedEnsemble?.genres ? fetchedEnsemble.genres.map((genre, index) => <ProfileBadge key={index} ProfileBadgeLabel={genre} ProfileBadgeSize="sm" />) : "No information about genres has been provided"}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <TextBody variant="strong" size="lg" className="text-blue-500">
            Contact person
          </TextBody>
          <TextBody variant="p" size="md">
            {/* when the ensemble is created we could store the user name and last name + user id here. for now there's only user id*/}
            {creator.firstName} {creator.lastName}
          </TextBody>
          {/* button to see profile here to be added in the future */}
        </div>
      </div>

      <Button buttonVariant="secondary" buttonState="default" buttonLabel="Visit the webpage" className="no-underline w-auto m-6" size="lg" iconPosition="none" to={fetchedEnsemble?.webpage || "https://google.com"}></Button>
    </div>
  );
}

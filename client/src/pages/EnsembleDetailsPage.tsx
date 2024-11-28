import { useEffect } from "react";
import Button from "../components/atoms/Button";
import ProfileBadge from "../components/atoms/ProfileBadge";
import TextBody from "../components/atoms/TextBody";
import TextHeadline from "../components/atoms/TextHeadline";
import { useFetch } from "../hooks/use-fetch";
import { EnsembleType } from "../types/EnsembleType";
//import { User } from "../types/UserType";
import Image from "./../components/atoms/Image";
import RegisterInEnsembleButton from "../components/molecules/RegisterInEnsembleButton";

export default function EnsembleDetailsPage() {
  
  const {
    data: ensemble,
    triggerFetch,
    shouldFetch,
  } = useFetch<EnsembleType>(
    {
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
    `/ensembles/651a1e9f8f1b2c001d3b0a10`,
    "GET"
  );

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
    { ensembleId: "651a1e9f8f1b2c001d3b0a10" }
  );

  const handleAddUserToEnsemble = () => {
    triggerRegisterFetch();
  };


  useEffect(() => {
    triggerFetch();
    // console.log("ensembles", ensemble);
  }, [ensemble, shouldFetch]);

  // const { data: ensembleOwner } = useFetch<User>(
  //   {
  //     id: "",
  //     email: "",
  //   },
  //   `/users/${ensemble.createdBy}`,
  //   "GET"
  // );
  // console.log("ensembleOwner", ensembleOwner);

  return (
    <div>
      <Image src="https://picsum.photos/150" alt="Placeholder" width="150" height="150" />
      <TextHeadline variant="h2" size="sm">
        {ensemble.name || "No name provided"}
      </TextHeadline>
      <TextBody variant="p" size="md">
        {ensemble.zip} {ensemble.city}
      </TextBody>
      <RegisterInEnsembleButton
        registrationLoading={registrationLoading}
        registrationError={registrationError}
        registrationData={registrationData}
        handleAddUserToEnsemble={handleAddUserToEnsemble}
      />
      <div>
        <TextBody variant="strong" size="lg" className="text-blue-500">
          Description
        </TextBody>
        <TextBody variant="p" size="md">
          {ensemble.description || "No description provided"}
        </TextBody>
      </div>
      <div>
        <TextBody variant="strong" size="lg" className="text-blue-500">
          Number of active musicians
        </TextBody>
        <TextBody variant="p" size="md">
          {ensemble.activeMusicians || "There are no active musicians at the moment"}
        </TextBody>
        {/*Added extra html element to see how many id are inside an ensemble */}
        <TextBody variant="strong" size="lg" className="text-blue-500">
          Members
        </TextBody>
        <div>
          {ensemble.memberList.length > 0 ? (
            ensemble.memberList.map((member, index) => (
              <TextBody key={index} variant="p" size="md">
                {member}
              </TextBody>
            ))
          ) : (
            <TextBody variant="p" size="md">
              There are no active musicians at the moment
            </TextBody>
          )}
        </div>
      </div>
      <div>
        <TextBody variant="strong" size="lg" className="text-blue-500">
          Frequency of music sessions
        </TextBody>
        <TextBody variant="p" size="md">
          {ensemble.sessionFrequency || "The frequency of music sessions hasn't been specified"}
        </TextBody>
      </div>

      <div>
        <TextBody variant="strong" size="lg" className="text-blue-500">
          The ensemble plays...
        </TextBody>
        <TextBody variant="p" size="md">
          {ensemble.isPermanent === true ? "Continuously" : "On a project basis"}
        </TextBody>
      </div>

      <div>
        <TextBody variant="strong" size="lg" className="text-blue-500">
          Genres
        </TextBody>
        {/* map genres array and display ProfileBadge */}

        {ensemble.genres ? ensemble.genres.map((genre, index) => <ProfileBadge key={index} ProfileBadgeLabel={genre} ProfileBadgeSize="sm" />) : "No information about genres has been provided"}
      </div>

      <div>
        <TextBody variant="strong" size="lg" className="text-blue-500">
          Contact person
        </TextBody>
        <TextBody variant="p" size="md">
          {/* when the ensemble is created we could store the user name and last name + user id here. for now there's only user id*/}
          {ensemble.createdBy}
        </TextBody>
        {/* button to see profile here to be added in the future */}
      </div>

      <Button buttonVariant="secondary" buttonState="default" buttonLabel="Visit the webpage" className="no-underline" iconPosition="none" to={ensemble.webpage || "https://google.com"}></Button>
    </div>
  );
}

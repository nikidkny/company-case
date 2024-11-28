import Button from "../components/atoms/Button";
import TextHeadline from "../components/atoms/TextHeadline";
import TextInput from "../components/atoms/TextInput";
import ImageInput from "../components/atoms/ImageInput";
import TextBody from "../components/atoms/TextBody";
import ToggleButtonGroup from "../components/molecules/ToggleButtonGroup";
import { useStore } from "../store/useStore";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/use-fetch";
import { User } from "../types/UserType";
import { useParams } from "@tanstack/react-router";

export default function EditProfilePage() {
  const user = useStore((state) => state.user);
  const setObjectData = useStore((state) => state.setObjectData);
  const { profileId } = useParams({ strict: false });

  console.log(user);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [description, setDescription] = useState(user?.description);
  const [zip, setZip] = useState(user?.zip);
  const [city, setCity] = useState(user?.city);
  const [email, setEmail] = useState(user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);

  const userData = {
    firstName,
    lastName,
    description,
    zip,
    city,
    email,
    phoneNumber,
  };
  console.log(userData);
  const { data: editedUser, triggerFetch: userFetchTrigger } = useFetch<Partial<User> | null>(
    null,
    `/users/${profileId}`,
    "PUT",
    { "Content-Type": "application/json" },
    userData
  );

  useEffect(() => {
    if (editedUser) {
      console.log(editedUser);
    }
  }, [editedUser]);

  const handleSaveChanges = () => {
    userFetchTrigger();
  };
  return (
    <div className="edit-page-wrapper flex flex-col gap-6 p-6 ">
      <div className="back-button-wrapper flex flex-col items-start">
        <Button
          to="/profile/$profileId"
          params={{ profileId: profileId || "" }}
          buttonVariant="secondary"
          iconPosition="none"
          className="w-fit"
        >
          Back
        </Button>
      </div>
      <TextHeadline variant="h2" size="sm">
        Edit Profile
      </TextHeadline>
      <div className="edit-name-wrapper">
        <TextHeadline variant="h3" size="sm">
          Name
        </TextHeadline>
        <div className="flex flex-row">
          <TextInput
            inputType="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={firstName || ""}
            onChange={(value: string) => setFirstName(value)}
          />
          <TextInput
            inputType="text"
            placeholder="Last Name"
            id="lastName"
            name="lastName"
            value={lastName || ""}
            onChange={(value: string) => setLastName(value)}
          />
        </div>
      </div>
      <div className="edit-image-wrapper">
        <TextHeadline variant="h3" size="sm">
          Profile Image
        </TextHeadline>
        <ImageInput onImageChange={(file) => console.log(file)} />
      </div>
      <div className="edit-description-wrapper">
        <TextHeadline variant="h3" size="sm">
          Description
        </TextHeadline>
        <TextInput
          inputType="text"
          placeholder="Add a description"
          id="description"
          name="description"
          value={description || ""}
          onChange={(value: string) => setDescription(value)}
        />
      </div>
      <div className="edit-address-wrapper">
        <TextHeadline variant="h3" size="sm">
          Address
        </TextHeadline>
        <TextInput
          inputType="text"
          placeholder="ZIP"
          id="zip"
          name="zip"
          value={zip || ""}
          onChange={(value: string) => setZip(value)}
        />
        <TextInput
          inputType="text"
          placeholder="City"
          id="city"
          name="city"
          value={city || ""}
          onChange={(value: string) => setCity(value)}
        />
      </div>
      <div className="edit-contact-wrapper">
        <TextHeadline variant="h3" size="sm">
          Contact information
        </TextHeadline>
        <TextBody size="sm">
          Your email address and mobile number are only visible to others if you have marked on your
          profile that you are looking for someone to play with or if you have an active posting.
        </TextBody>
        <TextInput
          inputType="text"
          placeholder="Email"
          id="email"
          name="email"
          value={email || ""}
          onChange={(value: string) => setEmail(value)}
        />
        <TextInput
          inputType="text"
          placeholder="Phone number"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber || ""}
          onChange={(value: string) => setPhoneNumber(value)}
        />
      </div>
      <div className="edit-availability-wrapper">
        <TextHeadline variant="h3" size="sm">
          Profile status
        </TextHeadline>
        <TextBody size="sm">
          Are you currently looking for someone to play with? If you select 'not looking' your
          profile will not appear when other musicians do a search.{" "}
        </TextBody>
        <div className="">
          <ToggleButtonGroup />
        </div>
      </div>
      <div className="w-full h-full">
        <Button buttonVariant="primary" onClick={handleSaveChanges} iconPosition="none" size="lg">
          Save changes
        </Button>
      </div>
    </div>
  );
}

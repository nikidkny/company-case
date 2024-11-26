import { useState } from "react";
import Button from "../components/atoms/Button";
import TextHeadline from "../components/atoms/TextHeadline";
import TextInput from "../components/atoms/TextInput";
import mockUsers from "../../../server/src/seeder/mockUsers";
import ImageInput from "../components/atoms/ImageInput";
import TextBody from "../components/atoms/TextBody";
import ToggleButtonGroup from "../components/molecules/ToggleButtonGroup";

export default function EditProfilePage() {
  const user = mockUsers[0]; // Assuming the first user is the logged-in user

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [description, setDescription] = useState(user.description || "");
  const [zip, setZip] = useState(user.zip || "");
  const [city, setCity] = useState(user.city || "");
  const [email, setEmail] = useState(user.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");

  const handleSave = () => {
    user.firstName = firstName;
    user.lastName = lastName;
    user.description = description;
    user.zip = zip;
    user.city = city;
    user.email = email;
    user.phoneNumber = phoneNumber;
    alert("User updated");
  };

  return (
    <div className="edit-page-wrapper flex flex-col gap-6 p-6 ">
      <div className="back-button-wrapper flex flex-col items-start">
        <Button
          onClick={() => {
            // go back to profile/profileId page
            window.history.back();
          }}
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
            placeholder="First Name"
            value={firstName}
            onChange={setFirstName}
          />
          <TextInput
            inputType="text"
            placeholder="Last Name"
            value={lastName}
            onChange={setLastName}
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
          placeholder="Description"
          value={description}
          onChange={setDescription}
        />
      </div>
      <div className="edit-address-wrapper">
        <TextHeadline variant="h3" size="sm">
          Address
        </TextHeadline>
        <TextInput inputType="text" placeholder="ZIP" value={zip} onChange={setZip} />
        <TextInput inputType="text" placeholder="City" value={city} onChange={setCity} />
      </div>
      <div className="edit-contact-wrapper">
        <TextHeadline variant="h3" size="sm">
          Contact information
        </TextHeadline>
        <TextBody size="sm">
          Your email address and mobile number are only visible to others if you have marked on your
          profile that you are looking for someone to play with or if you have an active posting.
        </TextBody>
        <TextInput inputType="text" placeholder="Email" value={email} onChange={setEmail} />
        <TextInput
          inputType="text"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={setPhoneNumber}
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
        <Button buttonVariant="primary" onClick={handleSave} iconPosition="none" size="lg">
          Save changes
        </Button>
      </div>
    </div>
  );
}

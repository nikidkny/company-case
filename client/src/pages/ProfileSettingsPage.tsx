import { useState } from "react";
import mockUsers from "../../../server/src/seeder/mockUsers";
import Button from "../components/atoms/Button";
import Checkbox from "../components/atoms/Checkbox";
import TextHeadline from "../components/atoms/TextHeadline";
import TextInput from "../components/atoms/TextInput";

export default function ProfileSettingsPage() {
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  // TO DO: Replace this with the actual user id from the logged-in user from the store
  const userId = mockUsers[0]._id.toString();
  // TO DO: Define state variables for form inputs (password, and newsletter opt-in)
  // TO DO: Implement state management (store?) to manage the user's settings

  const handleChangePassword = () => {
    // TO DO: Add validation for password fields (match confirmation password, and add the same rules as the sign-up form has)
    // TO DO: Call the API to update the user's password with useFetch Post request
    console.log("Password change logic goes here");
  };

  const handleDeleteProfile = () => {
    // TO DO: Add a confirmation prompt (a modal) to confirm deletion
    // TO DO: If confirmed, call the API to delete the user's profile with useFetch Delete request
    console.log("Profile deletion logic goes here");
  };

  const handleSaveSettings = () => {
    // TO DO: Collect all settings changes ( password, newsletter opt-in)
    handleChangePassword();
    // TO DO: Call the API to save the updated user settings with useFetch Put request
    console.log("Save settings logic goes here");
  };
  return (
    <div className="settings-page-wrapper flex flex-col gap-6 p-6 ">
      <div className="back-button-wrapper flex flex-col items-start">
        <Button
          to="/profile/$profileId"
          params={{ profileId: userId }}
          buttonVariant="secondary"
          iconPosition="none"
          className="w-fit"
          buttonLabel="Back"
        ></Button>
      </div>
      <TextHeadline variant="h2" size="sm">
        Settings
      </TextHeadline>
      <div className="settings-password-wrapper flex flex-col gap-4">
        <TextHeadline variant="h3" size="sm">
          Password
        </TextHeadline>
        {/* TO DO: Update state variable on change */}
        {/* TO DO: Bind value to a state variable */}
        {!showPasswordFields && (
          <Button
            buttonVariant="secondary"
            onClick={() => setShowPasswordFields(true)}
            iconPosition="none"
            size="lg"
            buttonLabel="Change password"
          ></Button>
        )}
        {showPasswordFields && (
          <div className="flex flex-col gap-4">
            <TextInput
              inputType="password"
              id="password"
              name="password"
              placeholder="Password"
              value=""
              onChange={() => {}}
            />
            <TextInput
              inputType="password"
              placeholder="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              value=""
              onChange={() => {}}
            />
          </div>
        )}
      </div>
      <div className="settings-newsletter-wrapper">
        <TextHeadline variant="h3" size="sm">
          Newsletter
        </TextHeadline>
        <div className="flex flex-row gap-4 items-center">
          {/* TO DO: Update newsletter state*/}
          <Checkbox
            name="newsletter"
            label="Sign up for the DAOS newsletter"
            onChange={() => {}}
            required={false}
          />
        </div>
      </div>
      <div className="settings-delete-profile-wrapper">
        <TextHeadline variant="h3" size="sm">
          Profile
        </TextHeadline>
        <div>
          <Button
            buttonVariant="tertiary"
            onClick={handleDeleteProfile}
            iconPosition="none"
            size="lg"
            buttonLabel="Delete profile"
          ></Button>
        </div>
      </div>
      <div className="w-full h-full">
        <Button buttonVariant="primary" iconPosition="none" size="lg" onClick={handleSaveSettings}>
          Save settings
        </Button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { getUserIdFromCookie } from "../hooks/getCookies";
import Button from "../components/atoms/Button";
import Checkbox from "../components/atoms/Checkbox";
import TextHeadline from "../components/atoms/TextHeadline";
import TextInput from "../components/atoms/TextInput";
import { useFetch } from "../hooks/use-fetch";
import { useNavigate } from "@tanstack/react-router";

export default function ProfileSettingsPage() {
  const { user } = useStore();
  const { userId } = getUserIdFromCookie();
  const navigate = useNavigate();
  const [hasChanges, setHasChanges] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  // TO DO: Define state variables for form inputs (password, and newsletter opt-in)
  const [currentPassword, setCurrentPassword] = useState(user.password);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newsletter, setNewsletter] = useState(user.isNewsletter || false);

  const userData = {
    currentPassword,
    newPassword,
    newsletter,
  };

  useEffect(() => {
    if (user) {
      setNewsletter(user.isNewsletter || false);
    }
  }, [user]);

  const { data: updateData, triggerFetch: triggerUpdate } = useFetch(
    null,
    `/auth/update-password`,
    "POST",
    {
      "Content-Type": "application/json",
    },
    userData
  );
  const { data: updateNewsletter, triggerFetch: triggerNewsletter } = useFetch(
    null,
    `/users/${userId}`,
    "PUT",
    {
      "Content-Type": "application/json",
    },
    { isNewsletter: newsletter }
  );
  const { triggerFetch: triggerDelete } = useFetch(null, `/users/${userId}`, "DELETE");

  const { triggerFetch: triggerLogout } = useFetch(
    null,
    `/auth/logout`,
    "POST",
    {
      "Content-Type": "application/json",
    },
    null
  );
  const handleSaveSettings = () => {
    // Determine if password fields are empty
    const isPasswordFieldsEmpty =
      !currentPassword?.trim() && !newPassword.trim() && !confirmNewPassword.trim();

    if (!isPasswordFieldsEmpty) {
      if (newPassword !== confirmNewPassword) {
        alert("New passwords do not match!");
        return;
      }
      // Trigger password update only if password fields are not empty
      triggerUpdate();
      setHasChanges(false);
    } else if (newsletter !== user.isNewsletter) {
      triggerNewsletter();
      setHasChanges(false);
    } else {
      alert("No changes to save!");
    }
  };

  const handleBackButtonClick = () => {
    if (hasChanges) {
      if (window.confirm("You have unsaved changes. Are you sure you want to go back?")) {
        navigate({ to: `/profile/${userId}` });
      }
    } else {
      navigate({ to: `/profile/${userId}` });
    }
  };

  const handleDeleteProfile = () => {
    const confirmed = window.confirm("Are you sure you want to delete your profile?");
    if (confirmed) {
      triggerDelete();
      triggerLogout();
      navigate({ to: "/" });
    }
  };

  useEffect(() => {
    if (updateData) alert("Settings updated successfully!");
  }, [updateData, navigate, triggerLogout]);
  return (
    <div className="settings-page-wrapper flex flex-col gap-6 p-6 ">
      <div className="back-button-wrapper flex flex-col items-start">
        <Button
          onClick={handleBackButtonClick}
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
              id="currentPassword"
              name="currentPassword"
              placeholder="Current Password"
              value={currentPassword || ""}
              onChange={(value) => setCurrentPassword(value)}
            />
            <TextInput
              inputType="password"
              id="newPassword"
              name="newPassword"
              placeholder="New Password"
              value={newPassword}
              onChange={(value) => {
                setNewPassword(value);
                setHasChanges(true);
              }}
            />
            <TextInput
              inputType="password"
              placeholder="Confirm New Password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(value) => {
                setConfirmNewPassword(value);
                setHasChanges(true);
              }}
            />
          </div>
        )}
      </div>
      <div className="settings-newsletter-wrapper">
        <TextHeadline variant="h3" size="sm">
          Newsletter
        </TextHeadline>
        <div className="flex flex-row gap-4 items-center">
          <Checkbox
            name="newsletter"
            label="Sign up for the DAOS newsletter"
            onChange={() => {
              setNewsletter(!newsletter);
              setHasChanges(true);
            }}
            checked={newsletter}
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
          Save changes
        </Button>
      </div>
    </div>
  );
}

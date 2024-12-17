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
  // TODO: validation for password fields - like login/signup
  // TODO: hash password before sending to server
  const { user } = useStore();
  const { userId } = getUserIdFromCookie();
  const navigate = useNavigate();
  const [hasChanges, setHasChanges] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [currentPassword, setCurrentPassword] = useState(user.password);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newsletter, setNewsletter] = useState(user.isNewsletter || false);
  // State for delete password popup
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserPassword, setDeleteUserPassword] = useState("");

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

  const {
    data: updateData,
    error: updateError,
    triggerFetch: triggerUpdate,
  } = useFetch(
    null,
    `/auth/update-password`,
    "POST",
    {
      "Content-Type": "application/json",
    },
    userData
  );
  const { triggerFetch: triggerNewsletter } = useFetch(
    null,
    `/users/${userId}`,
    "PUT",
    {
      "Content-Type": "application/json",
    },
    { isNewsletter: newsletter }
  );

  const { triggerFetch: triggerDelete } = useFetch(null, `/auth/${userId}`, "DELETE");

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
      alert("Newsletter settings updated successfully!");
      setHasChanges(false);
    } else {
      alert("No changes to save!");
    }
  };
  useEffect(() => {
    // Clear password fields and show alert after update is successful
    if (updateData) {
      alert("Settings updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setShowPasswordFields(false);
    }
    // Show alert if there is an error updating the password
    // TODO: add more specific error messages, and change error type to {message: string}
    if (updateError) {
      if (updateError.includes("Current password is incorrect")) {
        alert("The current password you entered is incorrect. Please try again.");
      } else {
        alert("Error updating password. Please try again.");
      }
    }
  }, [updateData, updateError]);

  const handleBackButtonClick = () => {
    if (hasChanges) {
      if (window.confirm("You have unsaved changes. Are you sure you want to go back?")) {
        navigate({ to: `/profile/${userId}` });
      }
    } else {
      navigate({ to: `/profile/${userId}` });
    }
  };

  //TODO: test for any error and go thorught the logic slowly and implemente backend validation
  const handleDeleteProfile = () => {
    setShowDeleteModal(true); // Open delete profile modal
  };

  const handleDeleteSubmit = async () => {
    if (!deleteUserPassword.trim()) {
      alert("Please enter your password to confirm.");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete your profile?");
    if (confirmed) {
      triggerDelete();
      triggerLogout();
      navigate({ to: "/" });
      setShowDeleteModal(false); // Close modal after profile deletion
      alert("Profile deleted successfully!");
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false); // Close modal if user cancels
    setDeleteUserPassword(""); // Clear the password input field
  };

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

          {/* Delete Profile Modal */}
          {showDeleteModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <TextHeadline variant="h3" size="sm">
                  Confirm Deletion
                </TextHeadline>
                <TextInput
                  inputType="password"
                  id="deletePassword"
                  name="deletePassword"
                  placeholder="Enter your password"
                  value={deleteUserPassword}
                  onChange={(value) => setDeleteUserPassword(value)}
                />
                <div className="modal-actions flex gap-4 pt-2">
                  <Button
                    buttonVariant="primary"
                    size="lg"
                    iconPosition="none"
                    onClick={handleDeleteSubmit}
                    buttonLabel="Confirm"
                  />
                  <Button
                    buttonVariant="secondary"
                    size="lg"
                    iconPosition="none"
                    onClick={handleDeleteCancel}
                    buttonLabel="Cancel"
                  />
                </div>
              </div>
            </div>
          )}
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

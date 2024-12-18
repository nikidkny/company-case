import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { getUserIdFromCookie } from "../hooks/getCookies";
import Button from "../components/atoms/Button";
import Checkbox from "../components/atoms/Checkbox";
import TextHeadline from "../components/atoms/TextHeadline";
import TextInput from "../components/atoms/TextInput";
import { useFetch } from "../hooks/use-fetch";
import { useNavigate } from "@tanstack/react-router";
import { getFieldErrorMessage, hashPassword } from "../utilities/auth";
import TextBody from "../components/atoms/TextBody";
import ChangePassword from "../components/molecules/ChangePassword";

export default function ProfileSettingsPage() {
  // TODO: validation for password fields - like login/signup
  // TODO: do not show the userId in the url

  const { user } = useStore();
  const { userId } = getUserIdFromCookie();
  const navigate = useNavigate();
  const [hasChanges, setHasChanges] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordToSend, setCurrentPasswordTosend] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordToSend, setNewPasswordTosend] = useState("");

  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [confirmNewPasswordToSend, setConfirmNewPasswordTosend] = useState("");

  const [newsletter, setNewsletter] = useState(user.isNewsletter || false);

  // State for delete password popup
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteUserPassword, setDeleteUserPassword] = useState("");
  const [deleteUserPasswordToSend, setDeleteUserPasswordToSend] = useState({
    password: "",
  });
  // State for errors
  const [frontendProfileValidationErrors, setFrontendProfileValidationErrors] = useState<string | string[]>([]);
  const [backendProfileValidationErrors, setBackendEProfileValidationErrors] = useState<string | string[]>([]);

  const userData = {
    currentPassword: currentPasswordToSend,
    newPassword: newPasswordToSend,
    newsletter,
  };

  useEffect(() => {
    if (user) {
      setNewsletter(user.isNewsletter || false);
    }
  }, [user]);


  // Hash passwords when they change
  useEffect(() => {
    if (currentPassword.trim()) {
      setCurrentPasswordTosend(hashPassword(currentPassword.trim()));
    } else {
      setCurrentPasswordTosend("");
    }
  }, [currentPassword]);

  useEffect(() => {
    if (newPassword.trim()) {
      setNewPasswordTosend(hashPassword(newPassword.trim()));
    } else {
      setNewPasswordTosend("");
    }
  }, [newPassword]);

  const {
    data: passwordUpdateData,
    error: passwordUpdateError,
    triggerFetch: triggerUpdate,
  } = useFetch(
    null,
    `/auth/password`,
    "PUT",
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

  const handleSaveSettings = () => {
    resetErrors();

    const errors: string[] = [];

    // Check if current password is empty, and add error if it is
    if (!currentPassword.trim() && (newPassword.trim() || confirmNewPassword.trim())) {
      errors.push("Current password cannot be empty");
    }

    // Check if new password is empty, and add error if it is
    if (!newPassword.trim() && currentPassword.trim()) {
      errors.push("New password cannot be empty");
    }

    // Check if confirm new password is empty, and add error if it is
    if (!confirmNewPassword.trim() && newPassword.trim()) {
      errors.push("Confirm password cannot be empty");
    }

    // Ensure that all passwords are at least 8 characters long
    if (currentPassword.trim() && currentPassword.length < 8) {
      errors.push("Current password must be at least 8 characters");
    }

    if (newPassword.trim() && newPassword.length < 8) {
      errors.push("New password must be at least 8 characters");
    }

    if (confirmNewPassword.trim() && confirmNewPassword.length < 8) {
      errors.push("Confirm password must be at least 8 characters");
    }

    // If there are any errors, set them
    if (errors.length > 0) {
      setFrontendProfileValidationErrors(errors);
      return;
    }

    if (!(!currentPassword?.trim() && !newPassword.trim() && !confirmNewPassword.trim())) {
      if (newPassword.trim() === currentPassword.trim()) {
        setFrontendProfileValidationErrors(["New password cannot be the same as current password"])
        return;
      }
      if (newPassword.trim() !== confirmNewPassword.trim()) {
        setFrontendProfileValidationErrors(["Password do not match"])
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
      resetErrors();
    }
  };

  useEffect(() => {
    // Clear password fields and show alert after update is successful
    if (passwordUpdateData) {
      alert("Settings updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setShowPasswordFields(false);
    }
    // Show alert if there is an error updating the password
    //current TODO: error like login/signup in displaying error with isValidityMsg
    if (passwordUpdateError) {
      if (passwordUpdateError.includes("Current password is incorrect")) {
        alert("The current password you entered is incorrect. Please try again.");
      } else {
        alert("Error updating password. Please try again.");
      }
    }
  }, [passwordUpdateData, passwordUpdateError]);

  const handleBackButtonClick = () => {
    if (hasChanges) {
      if (window.confirm("You have unsaved changes. Are you sure you want to go back?")) {
        navigate({ to: `/profile/${userId}` });
      }
    } else {
      navigate({ to: `/profile/${userId}` });
    }
  };

  // *** Delete Profile ***
  const deleteFetch = useFetch(null, `/auth/${userId}`, "DELETE", {
    "Content-Type": "application/json",
  }, deleteUserPasswordToSend);

  // Opens the modal
  const handleDeleteProfile = () => {
    resetErrors()
    setIsModalOpen(true);
  };

  //Check if password is long enough, and triggers the deleteFetch
  const handleDeleteSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    resetErrors();

    if (!deleteUserPassword.trim()) {
      setFrontendProfileValidationErrors(["Password cannot be empty"]);
      return;
    }

    if (deleteUserPassword.length < 8) {
      setFrontendProfileValidationErrors(["Password must be at least 8 characters"]);
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete your profile?");
    if (confirmed) {
      deleteFetch.triggerFetch();
    }
  };

  //Handles the cancel button
  const handleDeleteCancel = () => {
    setDeleteUserPasswordToSend({ password: "" });
    setDeleteUserPassword("");
    resetErrors();
    setIsModalOpen(false);
  };

  // Automatically hash and set deleteUserPasswordToSend whenever deleteUserPassword changes
  useEffect(() => {
    if (deleteUserPassword.trim()) {
      setDeleteUserPasswordToSend({ password: hashPassword(deleteUserPassword.trim()) });
    } else {
      setDeleteUserPasswordToSend({ password: "" });
    }
  }, [deleteUserPassword]);

  // handles delte user api response
  useEffect(() => {
    if (deleteFetch.error) {
      setBackendEProfileValidationErrors(deleteFetch.error);
    } else if (deleteFetch.data) {
      resetErrors();
      setDeleteUserPassword("")
      setDeleteUserPasswordToSend({ password: "" })
      setIsModalOpen(false); // Close modal after profile deletion
      alert("Profile deleted successfully!");
      navigate({ to: "/" });
    }
  }, [deleteFetch.data, deleteFetch.error])

  // Reset form data
  useEffect(() => {
    setConfirmNewPassword("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setDeleteUserPassword("");
    resetErrors();
  }, [location]);


  // Reset errors whenever the modal opens or closes
  useEffect(() => {
    if (!isModalOpen) {
      resetErrors();
    }
  }, [isModalOpen]);

  // Combine frontend and backend errors
  const combinedErrors = [
    ...frontendProfileValidationErrors,
    ...backendProfileValidationErrors,
    // ...(loginError.length ? loginError : []),  // current TODO: implement same for changing password
  ];

  const resetErrors = () => {
    setFrontendProfileValidationErrors([]);
    setBackendEProfileValidationErrors([])
  }

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
      <ChangePassword
        showPasswordFields={showPasswordFields}
        setShowPasswordFields={setShowPasswordFields}
        currentPassword={currentPassword}
        newPassword={newPassword}
        confirmNewPassword={confirmNewPassword}
        setCurrentPassword={setCurrentPassword}
        setNewPassword={setNewPassword}
        setConfirmNewPassword={setConfirmNewPassword}
        setHasChanges={setHasChanges}
        combinedErrors={combinedErrors}
      />
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
          {isModalOpen && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
              <div className="flex flex-col gap-6 items-center bg-white p-6 rounded-lg shadow-lg w-120">
                <TextHeadline variant="h3" size="sm">
                  Confirm Deletion
                </TextHeadline>

                {/* Form for Deleting Profile */}
                <form onSubmit={handleDeleteSubmit}>
                  <TextInput
                    inputType="password"
                    id="deletePassword"
                    name="deletePassword"
                    placeholder="Enter your password"
                    className="w-80"
                    value={deleteUserPassword}
                    onChange={(value) => setDeleteUserPassword(value)}
                    isValid={!(combinedErrors.length > 0)}
                    validityMsg={combinedErrors[0]}
                    required={true}
                  />
                  {combinedErrors && (
                    <TextBody className="text-red-500 text-sm mt-1" >{getFieldErrorMessage(combinedErrors, 'User not found')}</TextBody>
                  )}
                  <div className="modal-actions flex gap-4 pt-2">
                    <Button
                      buttonVariant="primary"
                      size="lg"
                      iconPosition="none"
                      type="submit"
                      buttonLabel="Confirm"

                    />
                    <Button
                      buttonVariant="secondary"
                      size="lg"
                      iconPosition="none"
                      type="button"
                      onClick={handleDeleteCancel}
                      buttonLabel="Cancel"
                    />
                  </div>
                </form>
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

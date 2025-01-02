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
import { getUserIdFromCookie } from "../hooks/getCookies";
import { useNavigate } from "@tanstack/react-router";
import {
  getFieldErrorMessage,
  validateCity,
  validateEmail,
  validateForm,
  validateName,
  validatePhoneNumber,
  validateZipCode,
  ValidationSchema,
} from "../utilities/auth";

export default function EditProfilePage() {
  const { user, setObjectData, objectData } = useStore();
  const { userId } = getUserIdFromCookie();
  const navigate = useNavigate();
  const [hasChanges, setHasChanges] = useState(false);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [description, setDescription] = useState(user.description);
  const [zip, setZip] = useState(user.zip);
  const [city, setCity] = useState(user.city);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [isAvailable, setIsAvailable] = useState(user.isAvailable);

  const [frontendProfileEditValidationErrors, setFrontendProfileEditValidationErrors] = useState<
    string | string[]
  >([]);
  const [backendProfileEditValidationErrors, setBackendEditProfileValidationErrors] = useState<
    string | string[]
  >([]);

  // const userData = {
  //   firstName,
  //   lastName,
  //   description,
  //   zip,
  //   city,
  //   email,
  //   phoneNumber,
  //   isAvailable,
  // };
  const {
    triggerFetch: userFetchTrigger,
    error: userFetchError,
    data: userFetchData,
  } = useFetch<Partial<User> | null>(
    null,
    userId ? `/users/${userId}` : null,
    "PUT",
    { "Content-Type": "application/json" },
    objectData
  );
  // populate the data from the user object
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setDescription(user.description);
      setZip(user.zip);
      setCity(user.city);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
      setIsAvailable(user.isAvailable);
      setHasChanges(false);
    }
  }, [user]);

  const editProfileInfoValidationSchema: ValidationSchema = {
    firstName: {
      validator: (value: string) => validateName(value, "First name"),
      required: true,
    },
    lastName: {
      validator: (value: string) => validateName(value, "Last name"),
      required: true,
    },
    email: {
      validator: (value: string) => validateEmail(value),
    },
    phoneNumber: {
      validator: (value: string) => validatePhoneNumber(value),
    },
    zip: {
      validator: (value: string) => validateZipCode(value),
    },
    city: {
      validator: (value: string) => validateCity(value),
    },
  };

  const handleSaveChanges = async () => {
    if (hasChanges) {
      // Prepare the user data to validate
      const userDataToValidate = {
        firstName,
        lastName,
        description,
        zip,
        city,
        email,
        phoneNumber,
      };
      try {
        resetErrors();
        // check what fields are optional and empty and remove them from the payload
        console.log("zip", user.zip);
        console.log("zip field", zip);
        // did the field change? if no don't include it in payload to validate
        // if yes include it in payload to validate

        if (user.firstName !== firstName) {
          userDataToValidate.firstName = firstName;
        }
        if (user.lastName !== lastName) {
          userDataToValidate.lastName = lastName;
        }
        if (user.description !== description) {
          userDataToValidate.description = description;
        }
        if (user.zip !== zip || zip !== undefined || zip !== "") {
          userDataToValidate.zip = zip;
        }
        if (user.city !== city) {
          userDataToValidate.city = city;
        }
        if (user.email !== email) {
          userDataToValidate.email = email;
        }
        if (user.phoneNumber !== phoneNumber) {
          userDataToValidate.phoneNumber = phoneNumber;
        }
        // // Manually trim each field before validation
        // userDataToValidate.lastName = lastName?.trim();
        // userDataToValidate.description = description?.trim();
        // userDataToValidate.zip = zip?.trim();
        // userDataToValidate.city = city?.trim();
        // userDataToValidate.email = email?.trim();
        // userDataToValidate.phoneNumber = phoneNumber?.trim();

        console.log(userDataToValidate);
        const errors = validateForm(userDataToValidate, editProfileInfoValidationSchema);
        const errorMessages = Object.values(errors);
        // If there are any errors, set them
        if (errorMessages.length > 0) {
          setFrontendProfileEditValidationErrors(errorMessages);
          return;
        }
        setObjectData(userDataToValidate);
        await userFetchTrigger();
      } catch (error) {
        if (error instanceof Error) {
          alert(`Failed to save changes: ${error.message}`);
        } else {
          alert("An unknown error occurred.");
        }
      }
    } else {
      alert("No changes detected.");
    }
  };

  // Handling error for update password
  useEffect(() => {
    // Show alert if there is an error updating the password
    if (userFetchError) {
      setBackendEditProfileValidationErrors(userFetchError!);
    }
    // Clear password fields and show alert after update is successful
    if (userFetchData) {
      setHasChanges(false);
      resetErrors();
      alert("Settings updated successfully!");
    }
  }, [userFetchError, userFetchData]);

  const handleBackButtonClick = () => {
    if (hasChanges) {
      if (window.confirm("You have unsaved changes. Are you sure you want to go back?")) {
        navigate({ to: `/profile/${userId}` });
      }
    } else {
      navigate({ to: `/profile/${userId}` });
    }
  };

  const resetErrors = () => {
    setBackendEditProfileValidationErrors([]);
    setFrontendProfileEditValidationErrors([]);
  };

  // Combine frontend and backend errors
  const combinedErrors = [
    ...frontendProfileEditValidationErrors,
    ...backendProfileEditValidationErrors,
  ];

  return (
    <div className="edit-page-wrapper flex flex-col gap-6 p-6 ">
      <div className="back-button-wrapper flex flex-col items-start">
        <Button
          onClick={handleBackButtonClick}
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
      <div className="edit-name-wrapper flex flex-col gap-4">
        <TextHeadline variant="h3" size="sm">
          Name
        </TextHeadline>
        <div className="flex flex-row ">
          <TextInput
            required={true}
            inputType="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={firstName || ""}
            onChange={(value) => {
              setFirstName(value);
              setHasChanges(true);
            }}
            className="w-full"
            isValid={!getFieldErrorMessage(combinedErrors, "First name")}
            validityMsg={getFieldErrorMessage(combinedErrors, "First name")}
          />
          <TextInput
            inputType="text"
            placeholder="Last Name"
            id="lastName"
            name="lastName"
            value={lastName || ""}
            onChange={(value: string) => {
              setLastName(value);
              setHasChanges(true);
            }}
            className="w-full"
            isValid={!getFieldErrorMessage(combinedErrors, "Last name")}
            validityMsg={getFieldErrorMessage(combinedErrors, "Last name")}
            required={true}
          />
        </div>
      </div>
      <div className="edit-image-wrapper flex flex-col gap-4">
        <TextHeadline variant="h3" size="sm">
          Profile Image
        </TextHeadline>
        <ImageInput variant="profile" onImageChange={(file) => console.log(file)} />
      </div>
      <div className="edit-description-wrapper flex flex-col gap-4">
        <TextHeadline variant="h3" size="sm">
          Description
        </TextHeadline>
        <TextInput
          inputType="text"
          placeholder="Add a description"
          id="description"
          name="description"
          value={description || ""}
          onChange={(value: string) => {
            setDescription(value);
            setHasChanges(true);
          }}
        />
      </div>
      <div className="edit-address-wrapper flex flex-col gap-4">
        <TextHeadline variant="h3" size="sm">
          Address
        </TextHeadline>
        <div className="flex flex-row ">
          <TextInput
            inputType="text"
            placeholder="ZIP"
            id="zip"
            name="zip"
            value={zip === undefined ? "" : zip}
            onChange={(value: string) => {
              setZip(value);
              setHasChanges(true);
            }}
            className="w-full"
            isValid={!getFieldErrorMessage(combinedErrors, "Zip")}
            validityMsg={getFieldErrorMessage(combinedErrors, "Zip")}
          />
          <TextInput
            inputType="text"
            placeholder="City"
            id="city"
            name="city"
            value={city || ""}
            onChange={(value: string) => {
              setCity(value);
              setHasChanges(true);
            }}
            className="w-full"
            isValid={!getFieldErrorMessage(combinedErrors, "City")}
            validityMsg={getFieldErrorMessage(combinedErrors, "City")}
          />
        </div>
      </div>
      <div className="edit-contact-wrapper flex flex-col gap-4">
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
          onChange={(value: string) => {
            setEmail(value);
            setHasChanges(true);
          }}
          isValid={!getFieldErrorMessage(combinedErrors, "email")}
          validityMsg={getFieldErrorMessage(combinedErrors, "email")}
          required={true}
        />
        <TextInput
          inputType="text"
          placeholder="Phone number"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber || ""}
          onChange={(value: string) => {
            setPhoneNumber(value);
            setHasChanges(true);
          }}
          isValid={!getFieldErrorMessage(combinedErrors, "Phone")}
          validityMsg={getFieldErrorMessage(combinedErrors, "Phone")}
        />
      </div>
      <div className="edit-availability-wrapper flex flex-col gap-4">
        <TextHeadline variant="h3" size="sm">
          Profile status
        </TextHeadline>
        <TextBody size="sm">
          Are you currently looking for someone to play with? If you select 'not looking' your
          profile will not appear when other musicians do a search.
        </TextBody>
        <div className="">
          <ToggleButtonGroup
            selectedOption={isAvailable ? "searching" : "notSearching"}
            onSelect={(option) => {
              setIsAvailable(option === "searching");
              setHasChanges(true);
            }}
          />
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

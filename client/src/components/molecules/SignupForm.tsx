import TextInput from "../atoms/TextInput";
import Button from "../atoms/Button"; 
import { getFieldErrorMessage } from "../../utilities/auth";
import Checkbox from "../atoms/Checkbox";

interface SignupFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    birthdate: string;
    isAvailable: boolean;
  };
  onChange: (name: string, value: string | boolean) => void;
  onSubmit: (formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    birthdate: string;
    isAvailable: boolean;
  }) => void;
  errorMessages: string[] | null;
}

export default function SignupForm({
  formData,
  onChange,
  onSubmit,
  errorMessages,
}: SignupFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // Pass formData to parent component's handler
  };

  return (
    <div className="flex flex-col">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[80vw] p-4 space-y-4 bg-white rounded-md"
      >
        <TextInput
          inputType="text"
          value={formData.firstName}
          onChange={(value) => onChange("firstName", value)}
          placeholder="First Name"
          id="firstName"
          name="firstName"
          isValid={!getFieldErrorMessage(errorMessages, "First name")}
          validityMsg={getFieldErrorMessage(errorMessages, "First name")}
          required={true}
        />

        <TextInput
          inputType="text"
          value={formData.lastName}
          onChange={(value) => onChange("lastName", value)}
          placeholder="Last Name"
          id="lastName"
          name="lastName"
          isValid={!getFieldErrorMessage(errorMessages, "Last name")}
          validityMsg={getFieldErrorMessage(errorMessages, "Last name")}
          required={true}
        />

        <TextInput
          inputType="email"
          value={formData.email}
          onChange={(value) => onChange("email", value)}
          placeholder="Email"
          id="email"
          name="email"
          isValid={!getFieldErrorMessage(errorMessages, "Email")}
          validityMsg={getFieldErrorMessage(errorMessages, "Email")}
          required={true}
        />

        <TextInput
          inputType="password"
          value={formData.password}
          onChange={(value) => onChange("password", value)}
          placeholder="Password"
          id="password"
          name="password"
          isValid={!getFieldErrorMessage(errorMessages, "Password")}
          validityMsg={getFieldErrorMessage(errorMessages, "Password")}
          required={true}
        />

        <TextInput
          inputType="password"
          value={formData.confirmPassword}
          onChange={(value) => onChange("confirmPassword", value)}
          placeholder="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          isValid={!getFieldErrorMessage(errorMessages, "Confirm")}
          validityMsg={
            getFieldErrorMessage(errorMessages, "match") ||
            getFieldErrorMessage(errorMessages, "Confirm")
          }
          required={true}
        />

        <TextInput
          inputType="date"
          value={formData.birthdate}
          onChange={(value) => onChange("birthdate", value)}
          placeholder="Birthdate"
          id="birthdate"
          name="birthdate"
          isValid={!getFieldErrorMessage(errorMessages, "Birthdate")}
          validityMsg={getFieldErrorMessage(errorMessages, "Birthdate")}
          required={true}
        />

        <Checkbox
          name="isAvailable"
          label="Available for contact"
          checked={formData.isAvailable}
          onChange={(checked) => onChange("isAvailable", checked)}
          required={false}
          shouldValidate={false}
        />

        <Button
          buttonState="default"
          buttonVariant="primary"
          buttonLabel="Sign Up"
          iconPosition="none"
        />
      </form>
    </div>
  );
}

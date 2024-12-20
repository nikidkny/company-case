import TextHeadline from "../atoms/TextHeadline";
import TextInput from "../atoms/TextInput";
import Button from "../atoms/Button";
import TextBody from "../atoms/TextBody";
import { getFieldErrorMessage } from "../../utilities/auth";

interface LoginFormProps {
  formData: { email: string; password: string };
  onChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  errorMessages: string[] | null;
}

export default function LoginForm({
  formData,
  onChange,
  onSubmit,
  errorMessages
}: LoginFormProps) {

  // Use the existing function to find the error message for the login form
  const displayErrorMessage = getFieldErrorMessage(
    errorMessages,
    "User not found"
  ) || getFieldErrorMessage(errorMessages, "Invalid credentials");

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={onSubmit} className="flex flex-col w-[93vw] p-4 space-y-4 bg-white rounded-md">
        <TextHeadline variant="h1" size="lg">
          Login
        </TextHeadline>

        <div className="w-80">
          <TextInput
            inputType="email"
            value={formData.email}
            onChange={(value) => onChange("email", value)}
            placeholder="Enter your email"
            id="email"
            name="email"
            isValid={!displayErrorMessage}
            required={true}
          />
        </div>

        <div className="w-80">
          <TextInput
            inputType="password"
            value={formData.password}
            onChange={(value) => onChange("password", value)}
            placeholder="Enter your password"
            id="password"
            name="password"
            isValid={!displayErrorMessage}
            required={true}
          />
        </div>

        {displayErrorMessage && (
          <TextBody className="text-red-500 text-sm mt-1" >{errorMessages}</TextBody>
        )}

        <Button buttonState="default" buttonVariant="primary" buttonLabel="Login" iconPosition="none" />
      </form>
    </div>
  );
}

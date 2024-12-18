import TextHeadline from "../atoms/TextHeadline";
import TextInput from "../atoms/TextInput";
import Button from "../atoms/Button";
import TextBody from "../atoms/TextBody";
import { getCustomErrorMessage } from "../../utilities/auth";

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

  // Check if 'User not found' is in error messages, and display a custom message
  // Error mapping for custom messages
  const errorMap = {
    "User not found": "Invalid credentials",
    "Invalid credentials": "Invalid credentials",
    // Add more mappings if necessary
  };

  // Use the utility function to get the custom error message
  const displayErrorMessage = getCustomErrorMessage(errorMessages, errorMap);

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

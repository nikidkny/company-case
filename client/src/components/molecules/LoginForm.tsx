import TextHeadline from "../atoms/TextHeadline";
import TextInput from "../atoms/TextInput";
import Button from "../atoms/Button";
import { getFieldErrorMessage } from "../../utilities/errorUtils";

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
    const displayErrorMessage = errorMessages?.includes("User not found")
    ? "Invalid credentials"
    : null;

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
            isValid={!getFieldErrorMessage(errorMessages, 'empty')}
            validityMsg={getFieldErrorMessage(errorMessages, 'Credential')|| getFieldErrorMessage(errorMessages, 'Email') || undefined}
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
            isValid={!getFieldErrorMessage(errorMessages, 'empty')}
            validityMsg={getFieldErrorMessage(errorMessages, 'Credential') || getFieldErrorMessage(errorMessages, 'Password') || undefined}
            required={true}
          />
        </div>

        {displayErrorMessage && (
          <div className="text-red-500 text-sm mt-2">{displayErrorMessage}</div>
        )}

        <Button buttonState="default" buttonVariant="primary" buttonLabel="Login" iconPosition="none" />
      </form>
    </div>
  );
}

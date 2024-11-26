import TextHeadline from "../atoms/TextHeadline";
import TextInput from "../atoms/TextInput";
import Button from "../atoms/Button";

interface LoginFormProps {
  formData: { email: string; password: string };
  onChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export default function LoginForm({
  formData,
  onChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={onSubmit}
        className="flex flex-col w-[93vw] p-4 space-y-4 bg-white rounded-md"
      >
        <TextHeadline variant="h1" size="lg">
          Login
        </TextHeadline>

        <div className="w-80">
          <TextInput
            inputType="email"
            value={formData.email}
            onChange={(value) => onChange("email", value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="w-80">
          <TextInput
            inputType="password"
            value={formData.password}
            onChange={(value) => onChange("password", value)}
            placeholder="Enter your password"
          />
        </div>

        <Button
          buttonState="default"
          buttonVariant="primary"
          buttonLabel="Login"
          iconPosition="none"
        />
      </form>
    </div>
  );
}

// SignupForm.tsx
import TextInput from "../atoms/TextInput"; // Assuming you've already imported TextInput
import Button from "../atoms/Button"; // Assuming you've already imported Button

// Update the interface to include formData
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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function SignupForm({ formData, onChange, onSubmit }: SignupFormProps) {
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   onSubmit(formData); // Pass formData to parent component's handler
  // };

  return (
    <div className="flex flex-col">
      <form onSubmit={onSubmit} className="flex flex-col w-[80vw] p-4 space-y-4 bg-white rounded-md">
        <TextInput inputType="text" value={formData.firstName} onChange={onChange} placeholder="First Name" id="firstName" name="firstName" />

        <TextInput inputType="text" value={formData.lastName} onChange={onChange} placeholder="Last Name" id="lastName" name="lastName" />

        <TextInput inputType="email" value={formData.email} onChange={onChange} placeholder="Email" id="email" name="email" />

        <TextInput inputType="password" value={formData.password} onChange={onChange} placeholder="Password" id="password" name="password" />

        <TextInput inputType="password" value={formData.confirmPassword} onChange={onChange} placeholder="Confirm Password" id="confirmPassword" name="confirmPassword" />

        <TextInput inputType="date" value={formData.birthdate} onChange={onChange} placeholder="Birthdate" id="birthdate" name="birthdate" />

        <div className="w-80 flex items-center space-x-2">
          <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={onChange} className="h-5 w-5" />
          <label htmlFor="isAvailable" className="text-gray-700">
            Available for contact
          </label>
        </div>

        <Button buttonState="default" buttonVariant="primary" type="submit" buttonLabel="Sign Up" iconPosition="none" />
      </form>
    </div>
  );
}

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
  onChange: (name: string, value: string | boolean) => void;
  onSubmit: (formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    birthdate: string;
    isAvailable: boolean
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

  // Helper function to get the error message for each field
  const getFieldErrorMessage = (fieldName: string): string | null => {
    if (!errorMessages) return null;

    // Loop through error messages to find the one corresponding to the field
    for (const msg of errorMessages) {
      // Check if the error message contains the field name (case-insensitive)
      if (msg.toLowerCase().includes(fieldName.toLowerCase())) {
        return msg; // Return the first matching error message
      }
    }
    return null; // Return null if no matching error message is found
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit} className="flex flex-col w-[80vw] p-4 space-y-4 bg-white rounded-md">
        <TextInput
          inputType="text"
          value={formData.firstName}
          onChange={(value) => onChange("firstName", value)}
          placeholder="First Name"
          id="firstName"
          name="firstName"
          isValid={!getFieldErrorMessage('First name')}
          validityMsg={getFieldErrorMessage('First name') || undefined}
        />

        <TextInput
          inputType="text"
          value={formData.lastName}
          onChange={(value) => onChange("lastName", value)}
          placeholder="Last Name"
          id="lastName"
          name="lastName"
          isValid={!getFieldErrorMessage('Last name')}
          validityMsg={getFieldErrorMessage('Last name') || undefined}
        />

        <TextInput
          inputType="email"
          value={formData.email}
          onChange={(value) =>
            onChange("email", value)}
          placeholder="Email"
          id="email"
          name="email"
          isValid={!getFieldErrorMessage('Email')}
          validityMsg={getFieldErrorMessage('Email') || undefined}
        />

        <TextInput
          inputType="password"
          value={formData.password}
          onChange={(value) => onChange("password", value)}
          placeholder="Password"
          id="password"
          name="password"
          isValid={!getFieldErrorMessage('Password')}
          validityMsg={getFieldErrorMessage('Password') || undefined}
          />

        <TextInput 
        inputType="password" 
        value={formData.confirmPassword} 
        onChange={(value) => onChange("confirmPassword", value)} 
        placeholder="Confirm Password" 
        id="confirmPassword" 
        name="confirmPassword" 
        />

        <TextInput 
        inputType="date" 
        value={formData.birthdate} 
        onChange={(value) => onChange("birthdate", value)} 
        placeholder="Birthdate" 
        id="birthdate" 
        name="birthdate" 
        isValid={!getFieldErrorMessage('Birthdate')}
        validityMsg={getFieldErrorMessage('Birthdate') || undefined}
        />

        <div className="w-80 flex items-center space-x-2">
          <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={(e) => onChange("isAvailable", e.target.checked)} className="h-5 w-5" />
          <label htmlFor="isAvailable" className="text-gray-700">
            Available for contact
          </label>
        </div>

        <Button buttonState="default" buttonVariant="primary" buttonLabel="Sign Up" iconPosition="none" />
      </form>
    </div>
  );
}

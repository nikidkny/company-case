import { useState } from "react";
import TextInput from "../atoms/TextInput"; // Assuming you've already imported TextInput
import Button from "../atoms/Button"; // Assuming you've already imported Button

export default function SignupForm() {
    //TODO: empty after finishing testing
  const [formData, setFormData] = useState({
    firstName: "Andrea",
    lastName: "Di Claudio",
    email: "andrea@gmail.com",
    password: "password",
    confirmPassword: "password",
    birthdate: "",
    isAvailable: true,
  });

  const handleChange = (name: string, value: string | boolean) => {
    if (name === "birthdate" && typeof value === "string") {
      const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(value);
      if (isValidDate) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      if (response.ok) {
        alert("Signup successful!");
      } else {
        const error = await response.json();
        alert(`Signup failed: ${error.message}`);
      }
    } catch (err) {
      console.error("Error during signup", err);
    }
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
          onChange={(value) => handleChange("firstName", value)}
          placeholder="First Name"
        />

        <TextInput
          inputType="text"
          value={formData.lastName}
          onChange={(value) => handleChange("lastName", value)}
          placeholder="Last Name"
        />

        <TextInput
          inputType="email"
          value={formData.email}
          onChange={(value) => handleChange("email", value)}
          placeholder="Email"
        />

        <TextInput
          inputType="password"
          value={formData.password}
          onChange={(value) => handleChange("password", value)}
          placeholder="Password"
        />

        <TextInput
          inputType="password"
          value={formData.confirmPassword}
          onChange={(value) => handleChange("confirmPassword", value)}
          placeholder="Confirm Password"
        />

        <TextInput
          inputType="date"
          value={formData.birthdate}
          onChange={(value) => handleChange("birthdate", value)}
          placeholder="Birthdate"
        />

        <div className="w-80 flex items-center space-x-2">
          <input
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={(e) => handleChange("isAvailable", e.target.checked)}
            className="h-5 w-5"
          />
          <label htmlFor="isAvailable" className="text-gray-700">
            Available for contact
          </label>
        </div>

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

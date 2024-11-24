import { useState } from "react";
import TextHeadline from "../atoms/TextHeadline";
import TextInput from "../atoms/TextInput";
import Button from "../atoms/Button";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Login successful!");
      } else {
        const error = await response.json();
        alert(`Login failed: ${error.message}`);
      }
    } catch (err) {
      console.error("Error during login", err);
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[93vw] p-4 space-y-4 bg-white rounded-md "
      >
        <TextHeadline variant="h1" size="lg">
          Login
        </TextHeadline>

        <div className="w-80">
          <TextInput
            inputType="email"
            value={formData.email}
            onChange={(value) => handleChange("email", value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="w-80">
          <TextInput
            inputType="password"
            value={formData.password}
            onChange={(value) => handleChange("password", value)}
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

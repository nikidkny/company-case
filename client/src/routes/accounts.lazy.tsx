import React, { useState, useEffect } from "react";
import { createLazyFileRoute, useLocation, useNavigate } from "@tanstack/react-router";
import { jwtDecode } from "jwt-decode";
import { useStore } from "../store/useStore";
import LoginForm from "../components/molecules/LoginForm";
import SignupForm from "../components/molecules/SignupForm";
import { useFetch } from "../hooks/use-fetch";

export const Route = createLazyFileRoute("/accounts")({
  component: AccountsPage,
});

function AccountsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const intent = searchParams.get("intent"); // Get the query parameter 'intent'
  const navigate = useNavigate(); // To handle navigation
  // const currentUser = useStore((state) => state.user);

  // Zustand store setters for managing user state and login status
  const setUser = useStore((state) => state.setUser);
  const setLoginStatus = useStore((state) => state.setLoginStatus);

  // State to manage login form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State to manage signup form data
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
    isAvailable: false,
  });

  // State to hold validation error messages for the signup form
  const [validationErrors, setValidationErrors] = useState<string | string[]>([]);

  // API hooks for login and signup
  const loginFetch = useFetch(
    null,
    "/auth/login",
    "POST",
    {
      "Content-Type": "application/json",
    },
    formData
  );

  const signupFetch = useFetch(
    null,
    "/auth/signup",
    "POST",
    {
      "Content-Type": "application/json",
    },
    signupData
  );

  // Generalized change handler for both forms
  const handleChange = (name: string, value: string | boolean) => {
    if (intent === "register") {
      // Update signup form data
      setSignupData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      // Update login form data
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Function to validate signup form data
  const validateForm = (formData: typeof signupData) => {
    const errors: { [key: string]: string } = {};
    const nameRegex = /^[A-Za-z\s]+$/;

    // Validate first and last name (letters only)
    if (!nameRegex.test(formData.firstName.trim())) {
      errors.firstName = "First name must contain only letters";
    }
    if (!nameRegex.test(formData.lastName.trim())) {
      errors.lastName = "Last name must contain only letters";
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Invalid email format";
    }

    // Validate birthdate - check if it's a valid date and if the user is at least 18
    const birthdate = new Date(formData.birthdate);
    if (isNaN(birthdate.getTime())) {
      errors.birthdate = "Invalid birthdate";
    } else {
      const today = new Date();
      const age = today.getFullYear() - birthdate.getFullYear();
      if (age < 18 || (age === 18 && today < new Date(birthdate.setFullYear(today.getFullYear())))) {
        errors.birthdate = "Invalid birthdate. You must be at least 18 years old";
      }
    }

    // Validate password length
    if (formData.password.trim().length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors; // Return an object with error messages
  };

  // Handle login form submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginFetch.triggerFetch();
  };

  // Handle signup form submission
  const handleSignupSubmit = (formData: typeof signupData) => {
    // Trim all inputs before validation
    const trimmedData = {
      ...formData,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      confirmPassword: formData.confirmPassword.trim(),
    };

    // Validate form data
    const errors = validateForm(trimmedData); // Assuming validateForm returns an object like { field: errorMessage }

    // Convert errors object into an array of error messages
    const errorMessages = Object.values(errors);

    if (errorMessages.length > 0) {
      setValidationErrors(errorMessages); // Set validation errors as an array
      return;
    }

    setValidationErrors([]); // Clear previous validation errors

    // Update the signupData state with trimmed values
    setSignupData(trimmedData);

    // Trigger fetch with the updated state
    signupFetch.triggerFetch();
  };

  // Combine frontend and backend errors
  const combinedErrors = [...validationErrors, ...(signupFetch.error || [])];

  useEffect(() => {
    if (loginFetch.data) {
      const cookies = document.cookie.split("; ");
      const accessTokenCookie = cookies.find((cookie) => cookie.startsWith("accessToken="));

      if (accessTokenCookie) {
        const accessToken = accessTokenCookie.split("=")[1];
        const decodedToken = jwtDecode(accessToken);

        setUser(decodedToken); // Update user data in state
        setLoginStatus(true); // Set login status to true
      }

      alert("Login successful! You will be redirected to the home page :)");
      navigate({ to: "/" });
    } else if (loginFetch.error) {
      console.log("Error", loginFetch.error);

    }
  }, [loginFetch.data, loginFetch.error, navigate, setUser, setLoginStatus]);

  // Handle effects for login API response
  useEffect(() => {
    if (signupFetch.error) {
      if (signupFetch.error.includes("User already exists")) {
        alert(`Email already in use. Try to log in instead.`);
        navigate({ to: "/accounts", search: { intent: "login" } });
      }
    } else if (signupFetch.data) {
      alert("Signup successful!  You will be riderected to the login page :)");
      // Reset signup form data and error messages
      setSignupData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthdate: "",
        isAvailable: false,
      });

      navigate({ to: "/accounts", search: { intent: "login" } });
    }
  }, [signupFetch.data, signupFetch.error]);

  return (
    <div>
      {intent === "register" && (
        <SignupForm
          formData={signupData}
          onChange={handleChange}
          onSubmit={handleSignupSubmit}
          errorMessages={combinedErrors}
        />
      )}
      {intent === "login" && (
        <LoginForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleLoginSubmit}
          errorMessages={loginFetch.error}
        />
      )}
      {!intent && <p>Please select login or register from the navigation.</p>}
    </div>
  );
}

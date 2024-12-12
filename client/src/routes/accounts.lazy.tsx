import React, { useState, useEffect } from "react";
import { createLazyFileRoute, useLocation, useNavigate } from "@tanstack/react-router";
import { useStore } from "../store/useStore";
import LoginForm from "../components/molecules/LoginForm";
import SignupForm from "../components/molecules/SignupForm";
import { useFetch } from "../hooks/use-fetch";
import { getUserIdFromCookie } from "../hooks/getCookies";
import { User } from "../types/UserType";

export const Route = createLazyFileRoute("/accounts")({
  component: AccountsPage,
});

function AccountsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const intent = searchParams.get("intent"); // Get the query parameter 'intent'
  const navigate = useNavigate(); // To handle navigation
  const { userId } = getUserIdFromCookie();
  const { setUser, setLoginStatus } = useStore();
  const { data: fetchedUser, triggerFetch: userFetchTrigger } = useFetch<User>({ _id: "" }, userId !== null ? `/users/${userId}` : null, "GET");

  // State to hold validation error messages for the signup form
  const [validationErrors, setValidationErrors] = useState<string | string[]>([]);
  const [loginError, setLoginError] = useState<string | string[]>([]); 

  // Function to validate signup form data
  const validateForm = (signupFormData: typeof signupData) => {
    const errors: { [key: string]: string } = {};
    if (signupFormData) {
      const nameRegex = /^[A-Za-z\s]+$/;

      // Validate first and last name (letters only)
      if (!nameRegex.test(signupFormData.firstName.trim())) {
        errors.firstName = "First name must contain only letters";
      } else if (signupFormData.firstName.trim().length < 2) {
        errors.firstName = "First name must be at least 2 characters";
      }

      if (!nameRegex.test(signupFormData.lastName.trim())) {
        errors.lastName = "Last name must contain only letters";
      } else if (signupFormData.lastName.trim().length < 2) {
        errors.lastName = "Last name must be at least 2 characters";
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(signupFormData.email.trim())) {
        errors.email = "Invalid email format";
      }

      // Validate birthdate - check if it's a valid date and if the user is at least 18
      const birthdate = new Date(signupFormData.birthdate);
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
      if (signupFormData.password.trim().length < 8) {
        errors.password = "Password must be at least 8 characters";
      }

      // Check if passwords match
      if (signupFormData.password !== signupFormData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    }
    return errors;
  };

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
      setLoginData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  /*Signup*/
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


  // API hooks for signup
  const signupFetch = useFetch(
    null,
    "/auth/signup",
    "POST",
    {
      "Content-Type": "application/json",
    },
    signupData
  );

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

  // Handle effects for signup API response
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

  /*Login*/
  // State to manage login form data
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // API hooks for login
  const loginFetch = useFetch(
    null,
    "/auth/login",
    "POST",
    {
      "Content-Type": "application/json",
    },
    loginData
  );

  // Handle login form submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trim all inputs for login
    const trimmedData = {
      email: loginData.email.trim(),
      password: loginData.password.trim(),
    };

    // Update the state with trimmed data (optional, if you need state to reflect trimmed values)
    setLoginData(trimmedData);

    // Trigger login fetch with the trimmed data
    loginFetch.triggerFetch();
  };

  // TODO: Check if the following useEffect is neeed it. Seems to work even without it.
  /*
  useEffect(() => {
    if (loginFetch.data && userId) {
      userFetchTrigger();
    }
    if (loginFetch.error) {
      console.error(loginFetch.error)
      setLoginError(loginFetch.error);
    }
  }, [loginFetch.data, loginFetch.error, navigate]);
  */

  // Handle effects for login API response
  useEffect(() => {
   if (loginFetch.data && fetchedUser) {
      setUser({
        _id: fetchedUser._id,
        firstName: fetchedUser.firstName ? fetchedUser.firstName.charAt(0).toUpperCase() + fetchedUser.firstName.slice(1).toLowerCase() : "",
        lastName: fetchedUser.lastName ? fetchedUser.lastName.charAt(0).toUpperCase() + fetchedUser.lastName.slice(1).toLowerCase() : "",
        email: fetchedUser.email || "",
        description: fetchedUser.description ? fetchedUser.description.charAt(0).toUpperCase() + fetchedUser.description.slice(1).toLowerCase() : "",
        birthdate: fetchedUser.birthdate ? new Date(fetchedUser.birthdate) : undefined,
        isAvailable: fetchedUser.isAvailable || false,
        city: fetchedUser.city ? fetchedUser.city.charAt(0).toUpperCase() + fetchedUser.city.slice(1).toLowerCase() : "",
        zip: fetchedUser.zip || "",
        phoneNumber: fetchedUser.phoneNumber || "",
        image: fetchedUser.image || "",
        // show the last logged in date if it is available, otherwise show the created at date
        lastLoggedIn: fetchedUser.lastLoggedIn ? new Date(fetchedUser.lastLoggedIn) : undefined,
        createdAt: fetchedUser.createdAt ? new Date(fetchedUser.createdAt) : undefined,
        isNewsletter: fetchedUser.isNewsletter || false,
        isDeleted: fetchedUser.isDeleted || false,
      });

      // Update user data in state
      setLoginStatus(true); // Set login status to true
      alert("Login successful! You will be riderected to the home page :)");
      navigate({ to: "/" });
    } else if (loginFetch.error) {
      console.log(loginFetch.error);
      
      if (loginFetch.error.includes("Invalid credentials from logged in user")) {
        console.log("SHOULD BE LOGGEDOUT");
        
      }
      setLoginError(loginFetch.error);
    }
  }, [loginFetch.data, loginFetch.error, navigate,fetchedUser]);

  // Combine frontend and backend errors
  const combinedErrors = [
    ...validationErrors,  // Frontend validation errors
    ...(intent === "register" && signupFetch.error ? signupFetch.error : []),  // Backend errors for register
    ...(intent === "login" && loginError.length ? loginError : []),  // Backend errors for login
  ];

  // Reset form data on intent change (switch between register and login)
  useEffect(() => {
    setSignupData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthdate: "",
      isAvailable: false,
    });

    setLoginData({
      email: "",
      password: "",
    });

    setValidationErrors([]); // Clear any validation errors
    setLoginError([]);
  }, [location, intent]); 

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
          formData={loginData}
          onChange={handleChange}
          onSubmit={handleLoginSubmit}
          errorMessages={combinedErrors}
        />
      )}

      {!intent && <p>Please select login or register from the navigation.</p>}
    </div>
  );
}

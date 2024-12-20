import React, { useState, useEffect } from "react";
import { createLazyFileRoute, useLocation, useNavigate } from "@tanstack/react-router";
import { useStore } from "../store/useStore";
import LoginForm from "../components/molecules/LoginForm";
import SignupForm from "../components/molecules/SignupForm";
import { useFetch } from "../hooks/use-fetch";
import { getUserIdFromCookie } from "../hooks/getCookies";
import { User } from "../types/UserType";
import { hashPassword, validateBirthdate, validateEmail, validateForm, validateName, validatePassword, ValidationSchema } from "../utilities/auth";

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
  const [frontendAccountValidationErrors, setFrontendAccountValidationErrors] = useState<string | string[]>([]);
  // State to hold validation error messages for the login form
  const [loginError, setLoginError] = useState<string | string[]>([]);

  // Specify ValidationSchema
  const signupValidationSchema: ValidationSchema = {
    firstName: {
      validator: (value: string) => validateName(value, "First name"),
      required: true,
    },
    lastName: {
      validator: (value: string) => validateName(value, "Last name"),
      required: true,
    },
    email: {
      validator: (value: string) => validateEmail(value),
      required: true,
    },
    password: {
      validator: (value: string) => validatePassword(value),
      required: true,
    },
    confirmPassword: {
      validator: (value: string, formData: any) => 
        value !== formData.password ? "Passwords do not match" : undefined,
      required: true,
    },
    birthdate: {
      validator: (value: string) => validateBirthdate(value),
      required: true,
    },
  };

  // Redirect to home if user is logged in
  useEffect(() => {
    if (userId) {
      navigate({ to: "/" });
    }
  }, [userId, navigate]);

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

  // Define the state for sending the data
  const [singupDataToSend, setSignupDataToSend] = useState({
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
    singupDataToSend
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
    const errors = validateForm(trimmedData, signupValidationSchema);
    // Convert errors object into an array of error messages
    const errorMessages = Object.values(errors);

    if (errorMessages.length > 0) {
      setFrontendAccountValidationErrors(errorMessages); // Set validation errors as an array
      return;
    }

    setFrontendAccountValidationErrors([]); // Clear previous validation errors

    // Hash the password before sending
    const hashedPassword = hashPassword(trimmedData.password);
    const hashedConfirmPassword = hashPassword(trimmedData.confirmPassword);

    // Prepare data to send to the backend
    const dataToSend = {
      ...trimmedData,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
    };

    // Trigger fetch with the updated state
    setSignupDataToSend(dataToSend);
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
      setSignupDataToSend({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthdate: "",
        isAvailable: false,
      })

      navigate({ to: "/accounts", search: { intent: "login" } });
    }
  }, [signupFetch.data, signupFetch.error]);

  /*Login*/
  // State to manage login form data
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Define the state for sending the data
  const [loginDataToSend, setLoginDataToSend] = useState({
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
    loginDataToSend
  );

  // Handle login form submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trim all inputs for login
    const trimmedData = {
      email: loginData.email.trim(),
      password: loginData.password.trim(),
    };

    const hashedPassword = hashPassword(trimmedData.password);

    const dataToSend = {
      ...trimmedData,
      password: hashedPassword
    }

    // Update the state with trimmed data (optional, if you need state to reflect trimmed values)
    setLoginDataToSend(dataToSend);

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
      setLoginError(loginFetch.error);
    }
  }, [loginFetch.data, loginFetch.error, navigate, fetchedUser]);

  // Combine frontend and backend errors
  const combinedErrors = [
    ...frontendAccountValidationErrors,  // Frontend validation errors
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
    setSignupDataToSend({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthdate: "",
      isAvailable: false,
    })

    setLoginData({
      email: "",
      password: "",
    });
    setLoginDataToSend({
      email: "",
      password: "",
    });

    // Clear any validation errors
    setFrontendAccountValidationErrors([]);
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

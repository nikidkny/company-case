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
  const { data: fetchedUser, triggerFetch: userFetchTrigger } = useFetch<User>({}, userId !== null ? `/users/${userId}` : null, "GET");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
    isAvailable: false,
  });

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

  const handleChange = (name: string, value: string | boolean) => {
    if (intent === "register") {
      setSignupData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginFetch.triggerFetch();
  };

  const handleSignupSubmit = async (formData: typeof signupData) => {
    signupFetch.triggerFetch();
  };

  //TODO: check if the user already has an access token
  useEffect(() => {
    if (loginFetch.data && userId) {
      userFetchTrigger();
    }
    if (loginFetch.error) {
      alert(`Login failed: ${loginFetch.error}`);
    }
  }, [loginFetch.data, loginFetch.error, navigate]);

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
    }
  }, [fetchedUser]);

  useEffect(() => {
    if (signupFetch.error) {
      if (signupFetch.error.includes("User already exists")) {
        alert(`Email already in use. Try to log in instead.`);
        navigate({ to: "/accounts", search: { intent: "login" } });
      } else {
        alert(`Signup failed: ${signupFetch.error}`);
      }
    } else if (signupFetch.data) {
      alert("Signup successful!  You will be riderected to the login page :)");
      navigate({ to: "/accounts", search: { intent: "login" } });
    }
  }, [signupFetch.data, signupFetch.error]);

  return (
    <div>
      {intent === "register" && <SignupForm formData={signupData} onChange={handleChange} onSubmit={handleSignupSubmit} />}
      {intent === "login" && <LoginForm formData={formData} onChange={handleChange} onSubmit={handleLoginSubmit} />}
      {!intent && <p>Please select login or register from the navigation.</p>}
    </div>
  );
}

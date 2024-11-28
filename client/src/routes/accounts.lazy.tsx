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
  const setUser = useStore((state) => state.setUser);
  const setLoginStatus = useStore((state) => state.setLoginStatus);

  const [formData, setFormData] = useState({
    email: "andrea@gmail.com", // TODO: Empty this before production
    password: "password",
  });

  const [signupData, setSignupData] = useState({
    firstName: "Andrea",
    lastName: "Di Claudio",
    email: "andrea@gmail.com",
    password: "password",
    confirmPassword: "password",
    birthdate: "",
    isAvailable: true,
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
    if (loginFetch.data) {
      const cookies = document.cookie.split("; ");
      const accessTokenCookie = cookies.find((cookie) => cookie.startsWith("accessToken="));

      if (accessTokenCookie) {
        const accessToken = accessTokenCookie.split("=")[1];
        const decodedToken = jwtDecode(accessToken);

        setUser(decodedToken); // Update user data in state
        setLoginStatus(true); // Set login status to true
      }

      alert("Login successful! You will be riderected to the home page :)");
      navigate({ to: "/" });
    }

    if (loginFetch.error) {
      alert(`Login failed: ${loginFetch.error}`);
    }
  }, [loginFetch.data, loginFetch.error, navigate, setUser, setLoginStatus]);

  useEffect(() => {
    if (signupFetch.error) {
      if (signupFetch.error.includes("User already exists")) {
        alert(`User Already Exists. You will be riderected to the login page :) `);
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

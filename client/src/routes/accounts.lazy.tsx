import React, { useState } from "react";
import { createLazyFileRoute, useLocation } from "@tanstack/react-router";
import { jwtDecode } from "jwt-decode";
import { useStore } from "../store/useStore";
import LoginForm from "../components/molecules/LoginForm";
import SignupForm from "../components/molecules/SignupForm";

export const Route = createLazyFileRoute("/accounts")({
  component: AccountsPage,
});

function AccountsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const intent = searchParams.get("intent"); // Get the query parameter 'intent'

  // Access the updated Auth state from the store
  const setAccessToken = useStore((state) => state.setAccessToken);
  // const accessTokenSlice = useStore((state) => state.accessTokenSlice); // Track the current accessToken
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

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        const cookies = document.cookie.split("; ");
        const accessTokenCookie = cookies.find((cookie) => cookie.startsWith("accessToken="));

        if (accessTokenCookie) {
          const accessToken = accessTokenCookie.split("=")[1];

          setAccessToken(accessToken); // Update state

          const decodedToken = jwtDecode(accessToken);
          setUser(decodedToken); // Update user data in state
          setLoginStatus(true); // Set login status to true
        }

        alert("Login successful!");
      } else {
        const error = await response.json();
        alert(`Login failed: ${error.message}`);
      }
    } catch (err) {
      console.error("Error during login", err);
    }
  };

  const handleSignupSubmit = async (formData: typeof signupData) => {
    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
    <div>
      {intent === "register" && <SignupForm formData={signupData} onChange={handleChange} onSubmit={handleSignupSubmit} />}
      {intent === "login" && <LoginForm formData={formData} onChange={handleChange} onSubmit={handleLoginSubmit} />}
      {!intent && <p>Please select login or register from the navigation.</p>}
    </div>
  );
}

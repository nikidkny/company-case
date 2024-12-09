import React, { useState } from "react";
import { createLazyFileRoute, useLocation, useNavigate } from "@tanstack/react-router";
import { useStore } from "../store/useStore";
import LoginForm from "../components/molecules/LoginForm";
import SignupForm from "../components/molecules/SignupForm";
import { useAuth } from "../hooks/use-auth";
import TextBody from "../components/atoms/TextBody";

export const Route = createLazyFileRoute("/accounts")({
  component: AccountsPage,
});

function AccountsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const intent = searchParams.get("intent"); // Get the query parameter 'intent'
  const navigate = useNavigate(); // To handle navigation

  const currentUser = useStore((state) => state.currentUser);

  const { handleLogin, handleSignup, error } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  console.log("currentUser", currentUser);
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
    isAvailable: false,
  });

  // const loginFetch = useFetch(
  //   null,
  //   "/auth/login",
  //   "POST",
  //   {
  //     "Content-Type": "application/json",
  //   },
  //   formData
  // );

  // const signupFetch = useFetch(
  //   null,
  //   "/auth/signup",
  //   "POST",
  //   {
  //     "Content-Type": "application/json",
  //   },
  //   signupData
  // );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (intent === "register") {
      setSignupData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (intent === "register") {
      console.log("signupData", signupData);
      await handleSignup(signupData);
      if (!error) {
        alert("Signup successful! Redirecting...");
        navigate({ to: "/accounts", search: { intent: "login" } });
      }
    } else {
      console.log("login", formData);
      await handleLogin(formData);
      if (!error) {
        alert("Login successful! Redirecting...");
        navigate({ to: "/" });
      }
    }
  };

  return (
    <div>
      {intent === "register" && <SignupForm formData={signupData} onChange={handleChange} onSubmit={handleSubmit} />}
      {intent === "login" && <LoginForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />}
      {!intent && <TextBody variant="p">Please select login or register from the navigation.</TextBody>}
      {/* {error && (
        <TextBody variant="p" className="text-red-500">
          {error}
        </TextBody>
      )} */}
      {/* {loading && <TextBody variant="p">Loading...</TextBody>} */}
    </div>
  );
}

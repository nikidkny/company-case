import React from "react";
import { Navigate } from "@tanstack/react-router";
import { useStore } from "../store/useStore";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  //TODO: save cookie
  const setLoginStatus = useStore((state) => state.setLoginStatus);

  const isAuthenticated = document.cookie.includes("accessToken");

  if (!isAuthenticated) {
    setLoginStatus(false);

    return (
      <Navigate
        to="/accounts"
        search={{ intent: "login" }}
        replace={true}
      />
    ); // Redirect to login page if not authenticated
  }

  // If authenticated, render the children (protected content)
  return <>{children}</>;
};

export default AuthGuard;

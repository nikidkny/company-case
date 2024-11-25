import React from "react";
import { Navigate } from "@tanstack/react-router";
// import jwt_decode from "jwt-decode"; // Optional: for decoding the JWT and checking expiration

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const isAuthenticated = document.cookie.includes("authCode");

  if (!isAuthenticated) {
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

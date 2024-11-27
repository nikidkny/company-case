import React, { useEffect, useState } from "react";
import { Navigate } from "@tanstack/react-router";
import { useStore } from "../store/useStore";
import { jwtDecode } from "jwt-decode";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const setUser = useStore((state) => state.setUser);
  const setLoginStatus = useStore((state) => state.setLoginStatus);

  const [isLoading, setIsLoading] = useState(true); // Prevent redirect until check is complete

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const accessTokenCookie = cookies.find((cookie) =>
      cookie.startsWith("accessToken=")
    );

    if (accessTokenCookie) {
      const accessToken = accessTokenCookie.split("=")[1];

      try {
        const decodedToken = jwtDecode(accessToken) as Record<string, any>;
        setUser(decodedToken);
        setLoginStatus(true);
      } catch (error) {
        console.error("Invalid token:", error);
        setUser(null);
        setLoginStatus(false);
      }
    } else {
      setUser(null);
      setLoginStatus(false);
    }

    setIsLoading(false); // Authentication check is complete
  }, [setUser, setLoginStatus]);

  const isAuthenticated = useStore((state) => state.loginStatus);

  if (isLoading) {
    return <div>Loading...</div>; // Optional: A spinner or loading state
  }

  if (!isAuthenticated) {
    return (
      <Navigate to="/accounts" search={{ intent: "login" }} replace={true} />
    );
  }

  return <>{children}</>;
};

export default AuthGuard;

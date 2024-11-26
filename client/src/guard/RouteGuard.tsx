import React, { useEffect } from "react";
import { Navigate } from "@tanstack/react-router";
import { useStore } from "../store/useStore";
import { jwtDecode } from "jwt-decode";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const setAccessToken = useStore((state) => state.setAccessToken);
  const setUser = useStore((state) => state.setUser);
  const setLoginStatus = useStore((state) => state.setLoginStatus);

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const accessTokenCookie = cookies.find((cookie) =>
      cookie.startsWith("accessToken=")
    );

    if (accessTokenCookie) {
      const accessToken = accessTokenCookie.split("=")[1];
      setAccessToken(accessToken);

      try {
        const decodedToken = jwtDecode(accessToken) as Record<string, any>;
        setUser(decodedToken); // Optional: set user details if needed
        setLoginStatus(true);
      } catch (error) {
        console.error("Invalid token:", error);
        setAccessToken(null);
        setUser(null);
        setLoginStatus(false);
      }
    } else {
      setAccessToken(null);
      setUser(null);
      setLoginStatus(false);
    }
  }, [setAccessToken, setUser, setLoginStatus]);

  const isAuthenticated = !!useStore((state) => state.accessTokenSlice);

  if (!isAuthenticated) {
    return (
      <Navigate to="/accounts" search={{ intent: "login" }} replace={true} />
    );
  }

  return <>{children}</>;
};

export default AuthGuard;

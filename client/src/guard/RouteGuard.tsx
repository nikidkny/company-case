import React, { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { getUserIdFromCookie } from "../hooks/getCookies";
import { useFetch } from "../hooks/use-fetch";
import { User } from "../types/UserType";
import HomePage from "../pages/HomePage";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { userId, decodedToken } = getUserIdFromCookie();
  const { setUser, resetUser, setLoginStatus, loginStatus } = useStore();
  const { data: fetchedUser, triggerFetch: userFetchTrigger } = useFetch<User>({}, userId !== null ? `/users/${userId}` : null, "GET");

  //setting the authenticated user and storing it
  useEffect(() => {
    if (userId) {
      userFetchTrigger();
    } else {
      return;
    }
  }, [userId, userFetchTrigger]);

  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser);
    } else {
      resetUser();
    }
  }, [fetchedUser]);

  useEffect(() => {
    if (decodedToken) {
      try {
        setUser(fetchedUser);
        setLoginStatus(true);
      } catch (error) {
        console.error("Invalid token:", error);
        resetUser();
        setLoginStatus(false);
      }
    } else {
      resetUser();
      setLoginStatus(false);
    }
    setIsLoading(false); // Authentication check is complete
  }, [fetchedUser]);

  if (isLoading) {
    return <div>Loading...</div>; // Optional: A spinner or loading state
  }

  if (!loginStatus) {
    return <HomePage />;
  }

  return <>{children}</>;
};

export default AuthGuard;

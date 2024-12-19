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
  const { data: fetchedUser, triggerFetch: userFetchTrigger } = useFetch<User>({ _id: "" }, userId !== null ? `/users/${userId}` : null, "GET");

  //setting the authenticated user and storing it in store
  useEffect(() => {
    //if the user is logged in and there's cookies for them - fetching the user data
    if (userId) {
      //get user data
      userFetchTrigger();
    } else {
      return;
    }
  }, [userId, userFetchTrigger]);

  useEffect(() => {
    //if the user data has been fetched and the tokens are present - store the user data
    if (decodedToken && fetchedUser) {
      try {
        setUser(fetchedUser);
        setLoginStatus(true);
      } catch (error) {
        console.error("Couldn't retrieve user", error);
        resetUser();
        setLoginStatus(false);
      }
    } else {
      resetUser();
      setLoginStatus(false);
    }
    setIsLoading(false);
  }, [fetchedUser]);

  //optionally added - should get some love if we want to use it
  if (isLoading) {
    return <div>Loading...</div>;
  }
  //when the user is not logged in, this is showing them the default homepage
  if (!loginStatus) {
    return <HomePage />;
  }

  return <>{children}</>;
};

export default AuthGuard;

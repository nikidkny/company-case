import { useEffect, useState } from "react";
import { User } from "../types/UserType";
import { useStore } from "../store/useStore";
import { useFetch } from "./use-fetch";

type Credentials = {
  email: string;
  password: string;
};

type SignupData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthdate: string;
  isAvailable: boolean;
};

export function useAuth() {
  const currentUser = useStore((state) => state.currentUser);
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const setLoginStatus = useStore((state) => state.setLoginStatus);
  const logout = useStore((state) => state.logout);
  const [fetchBody, setFetchBody] = useState<unknown | null>(null);

  // Fetch user from token
  const fetchUser = useFetch<User | null>(null, "/auth/me", "GET", { "Content-Type": "application/json" });

  const loginUser = useFetch<{ token: string } | null>(null, "/auth/login", "POST", { "Content-Type": "application/json" }, fetchBody);

  const signupUser = useFetch<{ token: string } | null>({ token: "" }, "/auth/signup", "POST", { "Content-Type": "application/json" }, fetchBody);

  // Function to login user
  const handleLogin = async (credentials: Credentials) => {
    setFetchBody(credentials);
    console.log("credentials", credentials); // Set the body to send in the request
    loginUser.triggerFetch();
  };

  // Function to signup user
  const handleSignup = async (signupData: SignupData) => {
    setFetchBody(signupData); // Set the body to send in the request
    signupUser.triggerFetch();
  };

  // Function to fetch current user
  const fetchCurrentUser = () => {
    fetchUser.triggerFetch();
    console.log("fetch user data", fetchUser.data);
  };

  // Logout function
  const handleLogout = () => {
    document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "refreshCode=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    logout();
  };

  useEffect(() => {
    if (fetchUser.data) {
      setLoginStatus(true);
      setCurrentUser(fetchUser.data);
    }
  }, [fetchUser.data, setCurrentUser, setLoginStatus]);

  useEffect(() => {
    if (loginUser.data?.token) {
      console.log("loginuser data", loginUser.data);
      document.cookie = `accessToken=${loginUser.data.token}; path=/`;
      fetchCurrentUser();
    }
  }, [loginUser.data]);

  useEffect(() => {
    if (signupUser.data?.token) {
      document.cookie = `accessToken=${signupUser.data.token}; path=/`;
      fetchCurrentUser();
    }
  }, [signupUser.data]);

  return {
    currentUser,
    isLoggedIn: !!currentUser,
    loading: fetchUser.loading || loginUser.loading || signupUser.loading,
    error: fetchUser.error || loginUser.error || signupUser.error,
    fetchCurrentUser,
    handleLogin,
    handleSignup,
    handleLogout,
  };
}

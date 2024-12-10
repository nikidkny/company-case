import { useEffect, useRef } from "react";
import { useFetch } from "../hooks/use-fetch";
import { User } from "../types/UserType";
import { useStore } from "../store/useStore";

//fetches a user based on id
export function useUser(userId?: string) {
  // const [loading, setLoading] = useState(false);
  //const [error, setError] = useState<string | null>(null);
  //const [message, setMessage] = useState<string | null>(null); // State for success messages
  //const [fetchedUser, setFetchedUser] = useState<User | null>(null); // The final user object
  const { user, setUser, resetUser } = useStore();
  //const setLoginStatus = useStore((state) => state.setLoginStatus);

  const { data: fetchedUser, triggerFetch: userFetchTrigger } = useFetch<User>({}, userId ? `/users/${userId}` : null, "GET");

  const previousUserIdRef = useRef<string | undefined>(userId);

  useEffect(() => {
    // Only trigger fetch if userId has changed
    if (userId && userId !== previousUserIdRef.current) {
      userFetchTrigger();
      previousUserIdRef.current = userId;
    } else if (!userId) {
      resetUser();
    }
  }, [userId, userFetchTrigger, resetUser]);

  useEffect(() => {
    if (fetchedUser) {
      setUser({
        _id: fetchedUser._id,
        firstName: fetchedUser.firstName ? fetchedUser.firstName.charAt(0).toUpperCase() + fetchedUser.firstName.slice(1).toLowerCase() : "",
        lastName: fetchedUser.lastName ? fetchedUser.lastName.charAt(0).toUpperCase() + fetchedUser.lastName.slice(1).toLowerCase() : "",
        email: fetchedUser.email || "",
        description: fetchedUser.description ? fetchedUser.description.charAt(0).toUpperCase() + fetchedUser.description.slice(1).toLowerCase() : "",
        birthdate: fetchedUser.birthdate ? new Date(fetchedUser.birthdate) : undefined,
        isAvailable: fetchedUser.isAvailable || false,
        city: fetchedUser.city ? fetchedUser.city.charAt(0).toUpperCase() + fetchedUser.city.slice(1).toLowerCase() : "",
        zip: fetchedUser.zip || "",
        phoneNumber: fetchedUser.phoneNumber || "",
        image: fetchedUser.image || "",
        // show the last logged in date if it is available, otherwise show the created at date
        lastLoggedIn: fetchedUser.lastLoggedIn ? new Date(fetchedUser.lastLoggedIn) : new Date(),
        createdAt: fetchedUser.createdAt ? new Date(fetchedUser.createdAt) : undefined,
        isNewsletter: fetchedUser.isNewsletter || false,
        isDeleted: fetchedUser.isDeleted || false,
      });
    }
  }, [fetchedUser, setUser]);
  console.log("fetched", fetchedUser);
  console.log("user", user);
  return { user, userFetchTrigger };
}

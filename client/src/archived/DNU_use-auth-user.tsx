import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export function useAuthUser() {
  const [userId, setUserId] = useState("");
  const [decodedToken, setDecodedToken] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const getUserIdFromCookie = () => {
      const cookies = document.cookie.split("; ");
      const authCodeCookie = cookies.find((cookie) => cookie.startsWith("accessToken="));
      if (authCodeCookie) {
        try {
          const token = authCodeCookie.split("=")[1];
          const decoded: Record<string, any> = jwtDecode(token);
          setUserId(decoded?.id || null);
          setDecodedToken(decoded);
        } catch (error) {
          console.error("Failed to decode token:", error);
          setUserId("");
          setDecodedToken(null);
        }
      } else {
        setUserId("");
        setDecodedToken(null);
      }
    };

    getUserIdFromCookie();
  }, []);

  return { userId, decodedToken };
}

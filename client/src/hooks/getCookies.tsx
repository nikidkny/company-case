import { jwtDecode } from "jwt-decode";

//utility function to retrieve userId and decodedToken from the cookies in the browser
export const getUserIdFromCookie = () => {
  let userId;
  let decodedToken;
  const cookies = document.cookie.split("; ");
  const authCodeCookie = cookies.find((cookie) => cookie.startsWith("accessToken="));
  //if the accessToken is present
  if (authCodeCookie) {
    try {
      const token = authCodeCookie.split("=")[1];
      const decoded: Record<string, any> = jwtDecode(token);
      userId = decoded?.id || null;
      decodedToken = decoded;
    } catch (error) {
      console.error("Failed to decode token:", error);
      decodedToken = null;
      userId = null;
    }
  } else {
    decodedToken = null;
    userId = null;
  }
  return { userId, decodedToken };
};

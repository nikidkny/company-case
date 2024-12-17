import CryptoJS from "crypto-js"

// Function to hash the password using SHA256
  export const hashPassword = (password: string): string => {
    return CryptoJS.SHA256(password).toString();
  };
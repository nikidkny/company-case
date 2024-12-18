import CryptoJS from "crypto-js"

// Function to hash the password using SHA256
  export const hashPassword = (password: string): string => {
    return CryptoJS.SHA256(password).toString();
  };

  // Function to get an array of messages and an array of error to map and return the error message that matches the errorMap
  export const getCustomErrorMessage = (
    errorMessages: string[] | null,
    errorMap: Record<string, string>
  ): string | null => {
    if (!errorMessages) return null;
  
    for (const error of errorMessages) {
      if (errorMap[error]) {
        return errorMap[error];
      }
    }
    return null;
  };
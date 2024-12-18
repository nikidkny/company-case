import CryptoJS from "crypto-js"

// Function to hash the password using SHA256
  export const hashPassword = (password: string): string => {
    return CryptoJS.SHA256(password).toString();
  };

// The getFieldErrorMessage function matches specific field error messages by a substring of the message that corresponds to the field name, allowing correct validation for each field.
export const getFieldErrorMessage = (errorMessages: string[] | null, errorSubstring: string): string | undefined => {
  if (!errorMessages) return undefined;
  const lowerCaseField = errorSubstring.toLowerCase();
  // Match the field name in the error messages
  return errorMessages.find((msg) => msg.toLowerCase().includes(lowerCaseField)) || undefined;
};

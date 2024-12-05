// The getFieldErrorMessage function matches specific field error messages by a substring of the message that corresponds to the field name, allowing correct validation for each field.
export const getFieldErrorMessage = (errorMessages: string[] | null, errorSubstring: string): string | null => {
  if (!errorMessages) return null;
  const lowerCaseField = errorSubstring.toLowerCase();
  // Match the field name in the error messages
  return errorMessages.find((msg) => msg.toLowerCase().includes(lowerCaseField)) || null;
};

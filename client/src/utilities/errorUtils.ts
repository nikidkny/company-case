export const getFieldErrorMessage = (errorMessages: string[] | null, fieldName: string): string | null => {
    if (!errorMessages) return null;
    const lowerCaseField = fieldName.toLowerCase();
    // Match the field name in the error messages
    return errorMessages.find((msg) => msg.toLowerCase().includes(lowerCaseField)) || null;
  };
  
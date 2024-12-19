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


type ValidationRule = {
  validator: (value: any, formData?: FormFields) => string | undefined; // A validation function that returns an error message or undefined if valid
  required?: boolean;
};

export type FormFields = {
  [key: string]: any;
};

export type ValidationSchema = {
  [key: string]: ValidationRule;
};


// General validateForm function
export const validateForm = (
  formData: FormFields,
  validationSchema: ValidationSchema
) => {
  const errors: { [key: string]: string } = {};

  // Loop through the fields in the validation schema
  for (const field in validationSchema) {
    const value = formData[field];
    const { validator, required } = validationSchema[field];

    // Check if the field is required and empty
    if (required && (value === "" || value === undefined)) {
      errors[field] = `${field} is required.`;
      continue;
    }

    // Use the validator with formData if it requires formData
    const error = validator.length === 2
      ? validator(value, formData) // Call with formData if needed
      : validator(value);          // Call without formData for normal validation

    if (error) {
      errors[field] = error; // Dynamically assign error based on the validator
    }
  }

  return errors;
};

// Name validation
export const validateName = (name: string, fieldName: string) => {
  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(name.trim())) {
    return `${fieldName} must contain only letters`;
  } else if (name.trim().length < 2) {
    return `${fieldName} must be at least 2 characters`;
  }
};

// Email validation
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return "Invalid email format";
  }
};

// Password validation
export const validatePassword = (password: string) => {
  if (password.trim().length < 8) {
    return "Password must be at least 8 characters";
  }
};

// Birthdate validation
export const validateBirthdate = (birthdate: string) => {
  const birthDateObj = new Date(birthdate);
  if (isNaN(birthDateObj.getTime())) {
    return "Invalid birthdate";
  } else {
    const today = new Date();
    const age = today.getFullYear() - birthDateObj.getFullYear();
    if (age < 18 || (age === 18 && today < new Date(birthDateObj.setFullYear(today.getFullYear())))) {
      return "Invalid birthdate. You must be at least 18 years old";
    }
  }
};

// Phone number validation
export const validatePhoneNumber = (phoneNumber: string) => {
  const phoneNumberRegex = /^[0-9]+$/;

  if (!phoneNumberRegex.test(phoneNumber.trim())) {
    return `Phone number must contain only numbers`;
  } else if (phoneNumber.trim().length !== 8) {
    return `Phone number must be exactly 8 digits`;
  }
};

// Zip code validation
export const validateZipCode = (zipCode: string) => {
  const zipCodeRegex = /^[0-9]+$/;

  if (!zipCodeRegex.test(zipCode.trim())) {
    return `Zip code must contain only numbers`;
  } else if (zipCode.trim().length !== 4) {
    return `Zip code must be exactly 4 digits`;
  }
};

const cities = [
  "New York", "Los Angeles", "London", "Tokyo", "Paris", "Berlin", "Sydney",
  "Moscow", "Dubai", "Shanghai", "Beijing", "Mumbai", "São Paulo", "Mexico City",
  "Cairo", "Buenos Aires", "Istanbul", "Rome", "Bangkok", "Lagos", "Rio de Janeiro",
  "Jakarta", "Lahore", "Kolkata", "Chennai", "Lima", "Tehran", "Hong Kong",
  "Singapore", "Riyadh", "Baghdad", "Seoul", "Karachi", "Dhaka", "Kuala Lumpur",
  "Manila", "Cape Town", "Nairobi", "Melbourne", "Tunis", "Santiago", "Miami",
  "San Francisco", "Madrid", "Bangalore", "Chengdu", "Baku", "Tashkent", "Dallas",
  "Toronto", "Athens", "Barcelona", "Stockholm", "Helsinki", "Milan", "Vienna",
  "Prague", "Budapest", "Warsaw", "Kiev", "Los Angeles", "Rio de Janeiro", "Berlin",
  "Osaka", "Brisbane", "Buenos Aires", "Chicago", "Mexico City", "Rome", "Istanbul", "Copenhagen"
];

export const validateCity = (city: string) => {
  // Check if the city is in the cities array
  const cityExists = cities.includes(city.trim());

  if (!cityExists) {
    return "Invalid city.";
  }
};
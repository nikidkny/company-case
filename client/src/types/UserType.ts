export type User = {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  description?: string;
  birthdate?: Date;
  isAvailable?: boolean;
  city?: string;
  zip?: string;
  phoneNumber?: string;
  image?: string;
  lastLoggedIn?: Date;
  createdAt?: Date;
  isNewsletter?: boolean;
  isDeleted?: boolean;
};

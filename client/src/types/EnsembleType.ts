export type EnsembleType = {
  id: string;
  name: string;
  description: string;
  webpage: string;
  zip: string;
  city: string;
  image?: File | null;
  activeMusicians: string | null;
  sessionFrequency: string | null;
  isPermanent: boolean | null;
  genres: string[];
};

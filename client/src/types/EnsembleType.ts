export type EnsembleType = {
  name: string;
  description: string;
  webpage: string;
  zip: string;
  city: string;
  numberOfMembers: number;
  memberList: string[];
  image?: File | null;
  activeMusicians: string | null;
  sessionFrequency: string | null;
  isPermanent: boolean | null;
  genres: string[];
  createdBy: string;
  createdAt: string;
};

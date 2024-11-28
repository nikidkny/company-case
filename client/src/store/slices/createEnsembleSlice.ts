import { StateCreator } from "zustand";

export interface CreateEnsembleState {
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
  createdBy: string;

  // Actions
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setWebpage: (webpage: string) => void;
  setZip: (zip: string) => void;
  setCity: (city: string) => void;
  setImage?: (image: File | null) => void;
  setActiveMusicians: (activeMusicians: string) => void;
  setSessionFrequency: (sessionFrequency: string) => void;
  setEnsembleType: (isPermanent: boolean | null) => void;
  addGenre: (genre: string) => void;
  removeGenre: (genre: string) => void;
  setCreatedBy: (createdBy: string) => void;
  resetForm: () => void;
}

export const createEnsembleSlice: StateCreator<CreateEnsembleState, [], [], CreateEnsembleState> = (set) => ({
  // Initial state
  name: "",
  description: "",
  webpage: "",
  zip: "",
  city: "",
  image: null,
  activeMusicians: null,
  sessionFrequency: null,
  isPermanent: null,
  genres: [],
  createdBy: "",

  // Actions
  setName: (name) => set(() => ({ name })),
  setDescription: (description) => set(() => ({ description })),
  setWebpage: (webpage) => set(() => ({ webpage })),
  setZip: (zip) =>
    set(() => ({
      zip,
    })),
  setCity: (city) =>
    set(() => ({
      city,
    })),
  setImage: (image) =>
    set(() => ({
      image,
    })),
  setActiveMusicians: (activeMusicians) => set(() => ({ activeMusicians })),
  setSessionFrequency: (sessionFrequency) => set(() => ({ sessionFrequency })),
  setEnsembleType: (isPermanent) => set(() => ({ isPermanent })),
  addGenre: (genre) =>
    set((state) => ({
      genres: [...state.genres, genre],
    })),
  removeGenre: (genre) =>
    set((state) => ({
      genres: state.genres.filter((g) => g !== genre),
    })),
  setCreatedBy: (createdBy) =>
    set(() => ({
      createdBy,
    })),
  resetForm: () =>
    set(() => ({
      name: "",
      description: "",
      webpage: "",
      zip: "",
      city: "",
      image: null,
      activeMusicians: null,
      sessionFrequency: null,
      isPermanent: null,
      genres: [],
    })),
});

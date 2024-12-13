import { StateCreator } from "zustand";
import { EnsembleType } from "../../types/EnsembleType";

export interface CreateEnsembleState {
  name: string;
  description: string;
  webpage: string;
  zip: string;
  city: string;
  image?: File | null;
  activeMusicians: string;
  sessionFrequency: string;
  isPermanent: boolean | null;
  genres: string[];
  ensembles: EnsembleType[];

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
  // Accept both a single ensemble and an array because sometimes we might need to reset the ensembles
  setEnsembles: (ensembles: EnsembleType | EnsembleType[]) => void;
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
  activeMusicians: "",
  sessionFrequency: "",
  isPermanent: null,
  genres: [],
  ensembles: [],

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

  setEnsembles: (ensembles: EnsembleType | EnsembleType[]) =>
    set((state) => {
      if (Array.isArray(ensembles)) {
        // If it's an array, append it to the current ensemble list
        return { ensembles: [...state.ensembles, ...ensembles] };
      } else {
        // If it's a single ensemble, append it to the list
        return { ensembles: [...state.ensembles, ensembles] };
      }
    }),
  resetForm: () =>
    set(() => ({
      name: "",
      description: "",
      webpage: "",
      zip: "",
      city: "",
      image: null,
      activeMusicians: "",
      sessionFrequency: "",
      isPermanent: null,
      genres: [],
    })),
});

import { StateCreator } from "zustand";

export interface CreateEnsembleState {
  name: string;
  description: string;
  webpage: string;
  location: {
    postNumber: string;
    city: string;
  };
  activeMusicians: string | null;
  sessionFrequency: string | null;
  isPermanent: boolean | null;
  genres: string[];

  // Actions
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setWebpage: (webpage: string) => void;
  setLocation: (postNumber: string, city: string) => void;
  setActiveMusicians: (activeMusicians: string) => void;
  setSessionFrequency: (sessionFrequency: string) => void;
  setEnsembleType: (isPermanent: boolean | null) => void;
  addGenre: (genre: string) => void;
  removeGenre: (genre: string) => void;
  resetForm: () => void;
}

export const createEnsembleSlice: StateCreator<CreateEnsembleState, [], [], CreateEnsembleState> = (set) => ({
  // Initial state
  name: "",
  description: "",
  webpage: "",
  location: {
    postNumber: "",
    city: "",
  },
  activeMusicians: null,
  sessionFrequency: null,
  isPermanent: null,
  genres: [],

  // Actions
  setName: (name) => set(() => ({ name })),
  setDescription: (description) => set(() => ({ description })),
  setWebpage: (webpage) => set(() => ({ webpage })),
  setLocation: (postNumber, city) =>
    set(() => ({
      location: { postNumber, city },
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
  resetForm: () =>
    set(() => ({
      ensembleName: "",
      description: "",
      webpage: "",
      location: { postNumber: "", city: "" },
      activeMusicians: null,
      sessionFrequency: null,
      isPermanent: null,
      genres: [],
    })),
});

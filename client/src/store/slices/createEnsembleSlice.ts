import { StateCreator } from "zustand";

type EnsembleType = "Continuously" | "Project" | null;

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
  ensembleType: EnsembleType;
  genres: string[];

  // Actions
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setWebpage: (webpage: string) => void;
  setLocation: (postNumber: string, city: string) => void;
  setActiveMusicians: (number: string) => void;
  setSessionFrequency: (frequency: string) => void;
  setEnsembleType: (type: EnsembleType) => void;
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
  ensembleType: null,
  genres: [],

  // Actions
  setName: (name) => set(() => ({ name })),
  setDescription: (description) => set(() => ({ description })),
  setWebpage: (webpage) => set(() => ({ webpage })),
  setLocation: (postNumber, city) =>
    set(() => ({
      location: { postNumber, city },
    })),
  setActiveMusicians: (number) => set(() => ({ activeMusicians: number })),
  setSessionFrequency: (frequency) => set(() => ({ sessionFrequency: frequency })),
  setEnsembleType: (type) => set(() => ({ ensembleType: type })),
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
      ensembleType: null,
      genres: [],
    })),
});

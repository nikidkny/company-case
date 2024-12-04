import { StateCreator } from "zustand";
import { EnsembleType } from "../../types/EnsembleType";

export interface EnsemblesState {
  ensembles: EnsembleType[];
  setEnsembles: (ensembles: EnsembleType | EnsembleType[]) => void; // Accept both a single ensemble and an array
}

export const ensemblesSlice: StateCreator<EnsemblesState, [], [], EnsemblesState> = (set) => ({
  ensembles: [],
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
});

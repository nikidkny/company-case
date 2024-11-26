import { StateCreator } from "zustand";
import { EnsembleType } from "../../types/EnsembleType";

export interface EnsemblesState {
  ensembles: EnsembleType[];
  setEnsembles: (ensemble: EnsembleType) => void;
}

export const ensemblesSlice: StateCreator<EnsemblesState, [], [], EnsemblesState> = (set) => ({
  ensembles: [],
  setEnsembles: (ensemble: EnsembleType) => set((state) => ({ ensembles: [...state.ensembles, ensemble] })),
});

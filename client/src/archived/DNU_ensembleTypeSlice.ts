import { StateCreator } from "zustand";

type EnsembleType = "Continuously" | "Project" | null;

export interface EnsembleTypeState {
  ensembleType: EnsembleType;
  setEnsembleType: (type: EnsembleType) => void;
}

export const createEnsembleTypeSlice: StateCreator<EnsembleTypeState, [], [], EnsembleTypeState> = (set) => ({
  ensembleType: null,
  setEnsembleType: (type) => set(() => ({ ensembleType: type })),
});

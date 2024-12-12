import { StateCreator } from "zustand";
import { DropdownOptionType } from "../../components/molecules/Dropdown";

// export interface selectedEnsembleOption {
//   value: string;
//   label: string;
// }

export interface CreatePostState {
  selectedEnsembleOption: DropdownOptionType;

  // Actions
  setSelectedEnsembleOption: (selectedEnsembleOption: DropdownOptionType) => void;

  // resetForm: () => void;
}

export const createPostSlice: StateCreator<CreatePostState, [], [], CreatePostState> = (set) => ({
  // Initial state
  selectedEnsembleOption: { value: "", label: "" },

  // Actions
  setSelectedEnsembleOption: (selectedEnsembleOption) => set(() => ({ selectedEnsembleOption })),

  // Reset action
  resetSelectedPostEnsemble: () => set(() => ({ selectedEnsembleOption: { value: "", label: "" } })),
});

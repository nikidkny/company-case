import { StateCreator } from "zustand";
export interface GenresDropdownState {
  selectedOptions: string[];
  addOption: (option: string) => void;
  removeOption: (option: string) => void;
}

export const createGenresDropdownSlice: StateCreator<GenresDropdownState, [], [], GenresDropdownState> = (set) => ({
  selectedOptions: [],
  addOption: (option) =>
    set((state) => ({
      selectedOptions: [...state.selectedOptions, option],
    })),
  removeOption: (option) =>
    set((state) => ({
      selectedOptions: state.selectedOptions.filter((opt) => opt !== option),
    })),
});

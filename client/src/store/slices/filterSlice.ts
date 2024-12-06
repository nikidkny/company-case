import { StateCreator } from "zustand";

export interface FilterSliceState {
  filterOption: string | null;
  // Actions
  setFilterOption: (filterOption: string | null) => void;
}

export const filterSlice: StateCreator<FilterSliceState, [], [], FilterSliceState> = (set) => ({
  // Initial state
  filterOption: null,
  // Actions
  setFilterOption: (filterOption) => set(() => ({ filterOption })),
});

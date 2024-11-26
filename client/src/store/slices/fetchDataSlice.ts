import { StateCreator } from "zustand";

export interface FetchDataState<T = unknown> {
  objectData: T;
  loading: boolean;
  error: string;

  // Actions
  setObjectData: (data: T) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

export const createFetchDataSlice: StateCreator<FetchDataState, [], [], FetchDataState> = (set) => ({
  // Initial states
  objectData: null,
  loading: false,
  error: "",

  // Actions
  setObjectData: (objectData) => set(() => ({ objectData })),
  setLoading: (loading) => set(() => ({ loading: loading })),
  setError: (error) => set(() => ({ error })),
});

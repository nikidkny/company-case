import { StateCreator } from "zustand";

export interface FetchDataState<T = unknown> {
  data: T;
  loading: boolean;
  error: string;

  // Actions
  setData: (data: T) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

export const createFetchDataSlice: StateCreator<FetchDataState, [], [], FetchDataState> = (set) => ({
  // Initial states
  data: null,
  loading: false,
  error: "",

  // Actions
  setData: (data) => set(() => ({ data })),
  setLoading: (loading) => set(() => ({ loading: loading })),
  setError: (error) => set(() => ({ error })),
});

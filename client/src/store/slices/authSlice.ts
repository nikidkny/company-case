import { StateCreator } from "zustand";

export interface AuthState {
  accessTokenSlice: string | null;
  user: Record<string, any> | null; //TODO: add type for user
  setAccessToken: (accessTokenSlice: string | null) => void; 
  setUser: (user: Record<string, any> | null) => void;
}

export const createAuthSlice: StateCreator<AuthState, [], [], AuthState> = (set: any): AuthState => ({
  accessTokenSlice: null,
  user: null,
  setAccessToken: (accessTokenSlice: string | null) => set({ accessTokenSlice }), 
  setUser: (user: Record<string, any> | null) => set({ user }),
});

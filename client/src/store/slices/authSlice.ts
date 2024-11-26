import { StateCreator } from "zustand";
import { User } from "../../types/UserType";

export interface AuthState {
  accessTokenSlice: string | null;
  user: User | null;
  setAccessToken: (accessTokenSlice: string | null) => void; 
  setUser: (user: Record<string, any> | null) => void;
}

export const createAuthSlice: StateCreator<AuthState, [], [], AuthState> = (set: any): AuthState => ({
  accessTokenSlice: null,
  user: null,
  setAccessToken: (accessTokenSlice: string | null) => set({ accessTokenSlice }), 
  setUser: (user: Record<string, any> | null) => set({ user }),
});

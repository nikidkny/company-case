import { StateCreator } from "zustand";
import { User } from "../../types/UserType";

export interface AuthState {
  user: User | null; // Store decoded user data
  setUser: (user: Record<string, any> | null) => void;
}

export const createAuthSlice: StateCreator<AuthState, [], [], AuthState> = (set: any): AuthState => ({
  user: null,
  setUser: (user: Record<string, any> | null) => set({ user }),
});

import { StateCreator } from "zustand";
import { User } from "../../types/UserType";

export interface AuthState {
  user: User; // Store decoded user data
  setUser: (user: User) => void;
  resetUser: () => void;
}

export const createAuthSlice: StateCreator<AuthState, [], [], AuthState> = (set): AuthState => ({
  user: {},
  setUser: (user: User) => set({ user }),
  resetUser: () => set(() => ({})),
});

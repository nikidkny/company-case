import { StateCreator } from "zustand";
import { User } from "../../types/UserType";

export interface CurrentUserState {
  currentUser: User | null; // Store decoded user data
  loginStatus: boolean;
  setCurrentUser: (currentUser: User | null) => void;
  setLoginStatus: (loginStatus: boolean) => void;
  logout: () => void;
}

export const createCurrentUserSlice: StateCreator<CurrentUserState, [], [], CurrentUserState> = (set): CurrentUserState => ({
  currentUser: null,
  loginStatus: false,
  setCurrentUser: (currentUser) => set({ currentUser }),
  setLoginStatus: (loginStatus) => set({ loginStatus }),
  logout: () => set({ currentUser: null, loginStatus: false }),
});

import { StateCreator } from "zustand";
import { User } from "../../types/UserType";
import { InstrumentType } from "../../types/InstrumentType";

export interface AuthState {
  user: User; // Store decoded user data
  instruments: InstrumentType[];
  setUser: (user: User) => void;
  setInstruments: (instruments: InstrumentType[]) => void;
  resetUser: () => void;
}

export const createAuthSlice: StateCreator<AuthState, [], [], AuthState> = (set): AuthState => ({
  user: { _id: "" },
  instruments: [],
  setUser: (user: User) => set({ user }),
  setInstruments: (instruments) => set({ instruments }),
  resetUser: () => set(() => ({})),
});

import { create } from "zustand";
import { createPopUpSlice, PopUpState } from "./slices/popUpSlice";
import { createToggleMenuSlice, MenuState } from "./slices/toggleMenuSlice";
import { createLoginStatusSlice, LoginStatusState } from "./slices/logInStatusSlice";
import { createAuthSlice, AuthState } from "./slices/authSlice";

// Combined store type
interface BearState {
  bears: number;
  increase: (by: number) => void;
}

interface Store
  extends BearState,
    MenuState,
    LoginStatusState,
    PopUpState,
    AuthState {}

export const useStore = create<Store>((set, ...args) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
  ...createPopUpSlice(set),
  ...createToggleMenuSlice(set),
  ...createLoginStatusSlice(set),
  ...createAuthSlice(set, ...args), // Add the updated Auth slice here
}));

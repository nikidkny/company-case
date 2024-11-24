import { create } from "zustand";
import { createPopUpSlice, PopUpState } from "./slices/popUpSlice";
import { createToggleMenuSlice, MenuState } from "./slices/toggleMenuSlice";
import { createLoginStatusSlice, LoginStatusState } from "./slices/logInStatusSlice";

import { createEnsembleSlice, CreateEnsembleState } from "./slices/createEnsembleSlice";

interface BearState {
  bears: number;
  increase: (by: number) => void;
}
// Combined store type, add other types for the additional slices
interface Store extends BearState, MenuState, LoginStatusState, CreateEnsembleState, PopUpState {}

export const useStore = create<Store>((set, ...args) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
  ...createPopUpSlice(set), // PopUp state slice any additional slices can be added following this syntax
  ...createToggleMenuSlice(set),
  ...createLoginStatusSlice(set),
  ...createEnsembleSlice(set, ...args),
}));

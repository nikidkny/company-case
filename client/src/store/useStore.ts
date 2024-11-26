import { create } from "zustand";
import { createPopUpSlice, PopUpState } from "./slices/popUpSlice";
import { createToggleMenuSlice, MenuState } from "./slices/toggleMenuSlice";
import { createLoginStatusSlice, LoginStatusState } from "./slices/logInStatusSlice";
import { createAuthSlice, AuthState } from "./slices/authSlice";
import { createEnsembleSlice, CreateEnsembleState } from "./slices/createEnsembleSlice";
// import { createFetchDataSlice, FetchDataState } from "./slices/DNU_fetchDataSlice";
import { ensemblesSlice, EnsemblesState } from "./slices/ensemblesSlice";
import { createFetchDataSlice, FetchDataState } from "./slices/fetchDataSlice";

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

// Combined store type, add other types for the additional slices
interface Store extends BearState, MenuState, LoginStatusState, CreateEnsembleState, FetchDataState, EnsemblesState, PopUpState, AuthState {}

export const useStore = create<Store>((set, ...args) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
  ...createPopUpSlice(set),
  ...createToggleMenuSlice(set),
  ...createLoginStatusSlice(set),
  ...createAuthSlice(set, ...args), // Add the updated Auth slice here
  ...createEnsembleSlice(set, ...args),
  ...createFetchDataSlice(set, ...args),
  ...ensemblesSlice(set, ...args),
}));

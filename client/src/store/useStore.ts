import { create } from "zustand";
import { createPopUpSlice, PopUpState } from "./slices/popUpSlice";
import { createToggleMenuSlice, MenuState } from "./slices/toggleMenuSlice";
import { createLoginStatusSlice, LoginStatusState } from "./slices/logInStatusSlice";
import { createAuthSlice, AuthState } from "./slices/authSlice";
import { createEnsembleSlice, CreateEnsembleState } from "./slices/createEnsembleSlice";
// import { createFetchDataSlice, FetchDataState } from "./slices/DNU_fetchDataSlice";
import { ensemblesSlice, EnsemblesState } from "./slices/ensemblesSlice";
import { createFetchDataSlice, FetchDataState } from "./slices/fetchDataSlice";
import { filterSlice, FilterSliceState } from "./slices/filterSlice";

// Combined store type, add other types for the additional slices
interface Store extends MenuState, LoginStatusState, CreateEnsembleState, FetchDataState, EnsemblesState, PopUpState, FilterSliceState, AuthState {}

export const useStore = create<Store>((set, ...args) => ({
  ...createPopUpSlice(set),
  ...createToggleMenuSlice(set),
  ...createLoginStatusSlice(set),
  ...createAuthSlice(set, ...args), // Add the updated Auth slice here
  ...createEnsembleSlice(set, ...args),
  ...createFetchDataSlice(set, ...args),
  ...ensemblesSlice(set, ...args),
  ...filterSlice(set, ...args),
}));

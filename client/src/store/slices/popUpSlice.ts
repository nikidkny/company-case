import { create } from "zustand";

export interface PopUpState {
  popUp: boolean;
  setPopUp: (popUp: boolean) => void;
}

export const createPopUpSlice = create<PopUpState>()((set) => ({
  popUp: false,
  setPopUp: (popUp: boolean) => set({ popUp }),
}));

export interface PopUpState {
  popUp: boolean;
  setPopUp: (popUp: boolean) => void;
}

export const createPopUpSlice = (set: any) => ({
  popUp: false,
  setPopUp: (popUp: boolean) => set({ popUp }),
});

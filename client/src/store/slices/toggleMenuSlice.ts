export interface MenuState {
  isMenuOpen: boolean;
  setIsMenuOpen: () => void;
}

export const createToggleMenuSlice = (set: (fn: (state: MenuState) => MenuState) => void) => ({
  isMenuOpen: false,
  setIsMenuOpen: () =>
    set((state: MenuState) => ({
      // Toggle the isMenuOpen state
      isMenuOpen: !state.isMenuOpen,
      setIsMenuOpen: state.setIsMenuOpen,
    })),
});

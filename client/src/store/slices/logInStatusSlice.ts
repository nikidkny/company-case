export interface LoginStatusState {
  loginStatus: boolean;
  setLoginStatus: (loginStatus: boolean) => void;
}

export const createLoginStatusSlice = (set: any) => ({
  loginStatus: false,
  setLoginStatus: (loginStatus: boolean) => set({ loginStatus }),
});

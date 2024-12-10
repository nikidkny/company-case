export const clearCookies = () => {
  const cookies = document.cookie.split(";");
  cookies.forEach((cookie) => {
    const cookieName = cookie.split("=")[0].trim();
    // Set each cookie to expire in the past
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
  });
};

export const logoutUser = (setLoginStatus: (status: boolean) => void, resetUser: () => void) => {
  clearCookies();
  setLoginStatus(false);
  resetUser();
  //window.location.reload(); // Force reload to update UI and clear cookies
};

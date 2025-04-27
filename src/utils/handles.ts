export const saveToLocalStorage = (
  firstName: string,
  lastName: string,
  email: string,
  accessToken: string,
  refreshToken: string
) => {
  localStorage.clear();
  localStorage.setItem("firstName", firstName);
  localStorage.setItem("lastName", lastName);
  localStorage.setItem("email", email);
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("username", firstName);
};

export const login = token => ({
  type: "LOGIN",
  token
});

export const logout = () => ({
  type: "LOGOUT"
});

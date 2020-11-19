import * as types from "../types/authorize";

export const login = (email, password) => ({
  type: types.LOGIN,
  email,
  password,
});

export const setAuthData = (token) => ({
  type: types.SET_AUTH_DATA,
  token,
});

export const setError = (error) => ({
  type: types.SET_ERROR,
  error,
});

export const resetError = () => ({
  type: types.RESET_ERROR,
});

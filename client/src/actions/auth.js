import { AUTH, LOGOUT } from '../constants/actionTypes';

export const authenticate = (result, token) => ({
  type: AUTH,
  payload: { result, token },
});

export const logout = () => ({
  type: LOGOUT,
});

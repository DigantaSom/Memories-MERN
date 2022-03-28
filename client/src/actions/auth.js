import * as api from '../api';
import { AUTH, LOGOUT } from '../constants/actionTypes';

export const signUp = (formData, navigate) => async dispatch => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({
      type: AUTH,
      payload: data,
    });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

export const signIn = (formData, navigate) => async dispatch => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({
      type: AUTH,
      payload: data,
    });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

export const authenticate = (result, token) => ({
  type: AUTH,
  payload: { result, token },
});

export const logout = () => ({
  type: LOGOUT,
});

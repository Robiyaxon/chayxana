import api from "../../utilities/api.js";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./types.js";

export const login = (body) => async (dispatch) => {
  try {
    const res = await api.post(`/auth/login/web`, body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(checkToken(3600));
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};


export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const checkToken = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
      console.log("token expired");
    }, expirationTime * 1000);
  };
};
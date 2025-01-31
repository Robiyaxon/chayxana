import {
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGOUT,
    LOGIN_FAIL,
  } from "../actions/types";
  
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    data: null,
    error: null
  };
  
  const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          data: payload,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          token: payload,
          isAuthenticated: true,
          loading: false,
          data: payload,
        };
      case LOGIN_FAIL:
      case LOGOUT:
        return {
          token: null,
          isAuthenticated: false,
          loading: false,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
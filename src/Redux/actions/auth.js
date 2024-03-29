import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
} from "./types";

import {Register, Login, Logout} from "../../services/auth.service";

export const register = (first_name, last_name, email, phone_number, password) => (dispatch) => {
return Register(first_name, last_name, email, phone_number, password).then(
  (response) => {
    dispatch({
      type: REGISTER_SUCCESS,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });

    return Promise.resolve();
  },
  (error) => {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();

    dispatch({
      type: REGISTER_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  }
);
};

export const login = (first_name, last_name, password) => (dispatch) => {
return Login(first_name, last_name, password).then(
  (data) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: data },
    });

    return Promise.resolve();
  },
  (error) => {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();

    dispatch({
      type: LOGIN_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  }
);
};

export const logout = () => (dispatch) => {
Logout();

dispatch({
  type: LOGOUT,
});
};
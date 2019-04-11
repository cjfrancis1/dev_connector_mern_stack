import axios from "../config/axios.config";
import { History } from "history";
import jwt_decode from "jwt-decode";

import MyThunkDispatch from "../customTypes/MyThunkDispatch";
import IClientRegister from "../interfaces/ClientRegister.interface";
import Types from "./types";
import IClientLogin from "../interfaces/ClientLogin.interface";
import setAuthToken from "../utils/setAuthToken";

// Register User
export const registerUser = (userData: IClientRegister, history: History) => (
  dispatch: MyThunkDispatch
) => {
  dispatch(clearErrors());
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = (userData: IClientLogin) => (
  dispatch: MyThunkDispatch
) => {
  dispatch(clearErrors());
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded: {}) => {
  return {
    type: Types.SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => (dispatch: MyThunkDispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken();
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Clear errors
export const clearErrors = () => {
  return {
    type: Types.CLEAR_ERRORS
  };
};

import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_ERRORS,
  UPDATE_IMAGE
} from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  dispatch(clearErrors());

  axios
    .post("/api/users/register", userData)
    .then(result => {
      history.push("/login");
    })
    .catch(err => {
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Resend User Account Verification Email
export const verifyUser = userData => dispatch => {
  axios
    .post("/api/confirmation/resend", userData)
    .then(result => {})
    .catch(err => {
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Reset User Password through email method
export const resetPassword = (userData, history, token) => dispatch => {
  dispatch(clearErrors());

  axios
    .post(`/api/passwordChange/${token}`, userData)
    .then(result => {
      history.push("/login");
    })
    .catch(err => {
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Change User Password from profile settings
export const changePassword = userData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/passwordChange/profile/password", userData)

    .catch(err => {
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Send Password Change Email
export const sendPasswordChangeEmail = userData => dispatch => {
  dispatch(clearErrors());

  axios
    .post("/api/passwordChange/user/send", userData)
    .then(result => {})
    .catch(err => {
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// update image state of authenticated user
export const updateAvatar = avatarData => dispatch => {
  return dispatch({
    type: UPDATE_IMAGE,
    payload: avatarData
  });
};

//Login - Get User Token
export const loginUser = userData => dispatch => {
  dispatch(clearErrors());

  axios
    .post("/api/users/login", userData)
    .then(res => {
      //Save to local storage
      const { token } = res.data;

      //Set token  to local storage
      localStorage.setItem("jwtToken", token);
      //Set token to auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//log user out
export const logoutUser = () => dispatch => {
  //remove token from local storage
  localStorage.removeItem("jwtToken");
  //Remove the auth header for future requests
  setAuthToken(false);
  // Set current user to empty object which will also set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

//Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

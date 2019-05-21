import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_ERRORS,
  UPDATE_IMAGE,
  UPDATE_HANDLE
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
***REMOVED***

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
***REMOVED***

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
***REMOVED***

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
***REMOVED***

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
***REMOVED***

// update image state of authenticated user
export const updateAvatar = avatarData => dispatch => {
  //Save avatar url to local storage so that it persists over browser refreshes
  localStorage.setItem("avatar", avatarData);
  return dispatch({
    type: UPDATE_IMAGE,
    payload: avatarData
  });
***REMOVED***

// update image state of authenticated user
export const updateHandle = handleData => dispatch => {
  //Save handle url to local storage so that it persists over browser refreshes
  localStorage.setItem("handle", handleData);
  return dispatch({
    type: UPDATE_HANDLE,
    payload: handleData
  });
***REMOVED***

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

      //set avatar
      dispatch(updateAvatar(decoded.avatar));

      //set handle
      dispatch(updateHandle(""));
    })
    .catch(err => {
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
***REMOVED***

//Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  ***REMOVED***
***REMOVED***

//log user out
export const logoutUser = () => dispatch => {
  //remove token from local storage
  localStorage.removeItem("jwtToken");

  //remove avatar url from local storage
  localStorage.removeItem("avatar");

  //remove handle from local storage
  localStorage.removeItem("handle");

  //Remove the auth header for future requests
  setAuthToken(false);
  // Set current user to empty object which will also set isAuthenticated to false

  dispatch(setCurrentUser({}));
  window.location.href = "/login";
***REMOVED***

//Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  ***REMOVED***
***REMOVED***

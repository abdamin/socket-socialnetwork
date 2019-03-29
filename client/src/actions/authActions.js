import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
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

//Login - Get User Token
export const loginUser = userData => dispatch => {
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
  //Remove the auth header for future requests
  setAuthToken(false);
  // Set current user to empty object which will also set isAuthenticated to false
  dispatch(setCurrentUser({}));
***REMOVED***

import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILES
} from "./types";

//Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
***REMOVED***

//Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  ***REMOVED***
***REMOVED***

//Profile Loading
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  ***REMOVED***
***REMOVED***

export const createProfile = profileData => dispatch => {
  dispatch(clearErrors());

  axios
    .post("/api/profile", profileData)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
***REMOVED***

export const createSocialLinks = socialData => dispatch => {
  dispatch(clearErrors());

  axios
    .post("/api/profile/social", socialData)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
***REMOVED***

//add Experience
export const addExperience = expData => dispatch => {
  dispatch(clearErrors());

  axios.post("/api/profile/experience", expData).catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  });
***REMOVED***

//add Education
export const addEducation = educData => dispatch => {
  dispatch(clearErrors());

  axios.post("/api/profile/education", educData).catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  });
***REMOVED***

//delete experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
***REMOVED***

//delete education
export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
***REMOVED***

//get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: null
      });
    });
***REMOVED***

//get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILES,
        payload: null
      });
    });
***REMOVED***

//delete Account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete("/api/profile")
      .then(res => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        });
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  }
***REMOVED***

//Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  ***REMOVED***
***REMOVED***

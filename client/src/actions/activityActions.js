import axios from "axios";
import { GET_ACTIVITIES, ACTIVITY_LOADING } from "./types";

//get all user activities by profileId
export const getActivities = id => dispatch => {
  dispatch(setActivityLoading());
  axios
    .get(`/api/activity/profile/${id}`)
    .then(res => {
      dispatch({
        type: GET_ACTIVITIES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ACTIVITIES,
        payload: null
      });
    });
***REMOVED***

//Profile Loading
export const setActivityLoading = () => {
  return {
    type: ACTIVITY_LOADING
  ***REMOVED***
***REMOVED***

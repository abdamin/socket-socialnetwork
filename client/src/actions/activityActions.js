import axios from "axios";
import { GET_ACTIVITIES, ACTIVITY_LOADING } from "./types";

//get all user activities by handle
export const getActivities = handle => dispatch => {
  dispatch(setActivityLoading());
  axios
    .get(`/api/activity/handle/${handle}`)
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
};

//Profile Loading
export const setActivityLoading = () => {
  return {
    type: ACTIVITY_LOADING
  };
};

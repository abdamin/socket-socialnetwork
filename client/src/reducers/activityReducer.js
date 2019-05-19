import {
  GET_ACTIVITIES,
  CLEAR_ACTIVITIES,
  ACTIVITY_LOADING
} from "../actions/types";

const initialState = {
  activities: null,
  loading: false
***REMOVED***

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
        loading: false
      ***REMOVED***

    case CLEAR_ACTIVITIES:
      return {
        ...state,
        activities: null,
        loading: false
      ***REMOVED***
    case ACTIVITY_LOADING:
      return {
        ...state,
        loading: true
      ***REMOVED***
    default:
      return state;
  }
}

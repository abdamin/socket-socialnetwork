import {
  PROFILE_LOADING,
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
***REMOVED***

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      ***REMOVED***
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      ***REMOVED***
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      ***REMOVED***
    default:
      return state;
  }
}

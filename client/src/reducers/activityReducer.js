import {
  GET_ACTIVITIES,
  CLEAR_ACTIVITIES,
  ACTIVITY_LOADING
} from "../actions/types";

const initialState = {
  activities: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
        loading: false
      };

    case CLEAR_ACTIVITIES:
      return {
        ...state,
        activities: null,
        loading: false
      };
    case ACTIVITY_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

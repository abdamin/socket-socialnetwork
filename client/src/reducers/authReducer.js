import { SET_CURRENT_USER, UPDATE_IMAGE } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {},
  avatar: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case UPDATE_IMAGE:
      return {
        ...state,
        avatar: action.payload
      };
    default:
      return state;
  }
}

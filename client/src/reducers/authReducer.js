import {
  SET_CURRENT_USER,
  UPDATE_IMAGE,
  UPDATE_HANDLE
} from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {},
  updatedAvatar: "",
  handle: ""
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
        updatedAvatar: action.payload
      };
    case UPDATE_HANDLE:
      return {
        ...state,
        handle: action.payload
      };
    default:
      return state;
  }
}

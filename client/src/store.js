import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  //so that we can use the redux chrome extension
  compose(
    applyMiddleware(...middleware),
    //could commented out so that the app can run on browsers other than chrome
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;

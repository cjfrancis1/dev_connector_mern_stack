import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];
const reduxDevtoolsExtension =
  (window as any) /* tslint:disable-line */
    .__REDUX_DEVTOOLS_EXTENSION__ /* tslint:disable-next-line */ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__();
const store = reduxDevtoolsExtension
  ? createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(...middleware),
        reduxDevtoolsExtension
      )
    )
  : createStore(rootReducer, initialState, applyMiddleware(...middleware));

export default store;

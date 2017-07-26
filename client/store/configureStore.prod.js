import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { reducer as toastr } from "react-redux-toastr";
import activities from "../services/activities/reducer";

const rootReducer = combineReducers({
  toastr,
  activities
});

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunk))
  );
  return store;
}

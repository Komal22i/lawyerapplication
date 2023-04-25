import { combineReducers } from "redux";
import bookingReducer from "./bookingReducer";

const rootReducer = combineReducers({
  bookingReducer: bookingReducer,
});

export default rootReducer;

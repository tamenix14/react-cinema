import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import LoadingReducer from "./reducers/LoadingReducer";
import FilmReducer from "./reducers/FilmReducer";
import TheaterReducer from "./reducers/TheaterReducer";
import UserReducer from "./reducers/UserReducer";
import TicketReducer from "./reducers/TicketReducer";

const rootReducer = combineReducers({
  // State ứng dụng
  LoadingReducer,
  FilmReducer,
  TheaterReducer,
  UserReducer,
  TicketReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

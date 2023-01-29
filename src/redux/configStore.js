import { combineReducers, createStore } from "redux";
import FilmReducer from "./reducers/FilmReducer";

const rootReducer = combineReducers({
  //reducer khai báo tại đây
  FilmReducer,
});

export const store = createStore(rootReducer);

export default store;
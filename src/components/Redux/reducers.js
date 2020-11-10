import { combineReducers } from "redux";
import { SET_SEARCH_TERM, ADD_DATA_FETCHED } from "./actions";

const searchTerm = (state = "", action) => {
  if (action.type === SET_SEARCH_TERM) {
    return action.payload;
  }
  return state;
};

const dataFetched = (state = {}, action) => {
  if (action.type === ADD_DATA_FETCHED) {
    return Object.assign({}, state, {
      [action.payload.searchTerm]: action.payload.dataFetched,
    });
  }
  return state;
};

const rootReducer = combineReducers({ searchTerm, dataFetched });

export default rootReducer;

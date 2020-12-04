import { combineReducers } from "redux";
import {
  SET_SEARCH_TERM,
  ADD_ALL_RECIPE,
  ADD_RECIPE_DETAILS,
  SET_CATEGORY,
} from "./actions";

const searchTerm = (state = "", action) => {
  if (action.type === SET_SEARCH_TERM) {
    return action.payload;
  }
  return state;
};

const category = (state = "", action) => {
  if (action.type === SET_CATEGORY) {
    return action.payload;
  }
  return state;
};

const allRecipe = (state = {}, action) => {
  if (action.type === ADD_ALL_RECIPE) {
    return Object.assign({}, state, {
      [action.payload.recipeCategory]: action.payload.recipes,
    });
  }
  return state;
};

const fetchedRecipe = (state = {}, action) => {
  if (action.type === ADD_RECIPE_DETAILS) {
    return Object.assign({}, state, {
      [action.payload.idMeal]: action.payload,
    });
  }
  return state;
};

const rootReducer = combineReducers({
  searchTerm,
  category,
  allRecipe,
  fetchedRecipe,
});

export default rootReducer;

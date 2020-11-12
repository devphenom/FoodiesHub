import axios from "axios";
import {
  SET_SEARCH_TERM,
  ADD_DATA_FETCHED,
  ADD_RECIPE_DETAILS,
} from "./actions";

export function setSearchTerm(searchTerm) {
  return { type: SET_SEARCH_TERM, payload: searchTerm };
}

export function addDataFetched(searchTerm, dataFetched) {
  return {
    type: ADD_DATA_FETCHED,
    payload: { searchTerm, dataFetched },
  };
}

export function addRecipeDetails(fetchedRecipe) {
  return { type: ADD_RECIPE_DETAILS, payload: fetchedRecipe };
}

export function fetchRecipeDetails(idMeal) {
  return (dispatch) => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
      // .then((res) => console.log(res.data.meals[0]))
      .then((res) => dispatch(addRecipeDetails(res.data.meals[0])))
      .catch((error) => console.error(error));
  };
}

export function getAPIData() {
  return (dispatch, getState) => {
    let curState = getState();
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${curState.searchTerm}`
      )
      .then((res) =>
        dispatch(addDataFetched(curState.searchTerm, res.data.meals))
      )
      .catch((error) => console.error("axios error", error));
  };
}

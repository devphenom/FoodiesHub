import axios from "axios";
import {
  SET_SEARCH_TERM,
  SET_CATEGORY,
  ADD_ALL_RECIPE,
  SET_VISIBLE,
  ADD_RECIPE_DETAILS,
} from "./actions";

// SearchTerm
export function setSearchTerm(searchTerm) {
  return { type: SET_SEARCH_TERM, payload: searchTerm };
}

// Categories
export function setCategory(categories) {
  return { type: SET_CATEGORY, payload: categories };
}

// Visible
export function setVisible(visible) {
  return { type: SET_VISIBLE, payload: visible };
}
// Visible Calculation
export function setSetVisible(visible) {
  return (dispatch, getState) => {
    if (visible) {
      console.log(visible);
      let visibleState = getState().visible;
      dispatch(setVisible(visible + visibleState));
    } else {
      dispatch(setVisible(30));
    }
  };
}
// Add all Recipe
export function addAllRecipe(objKey, objVal) {
  return { type: ADD_ALL_RECIPE, payload: { objKey, objVal } };
}

// Add All Recipe
export function queryAPI() {
  return async (dispatch) => {
    // await axios.interceptors.response.use((response) => response.data);
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const { categories } = await response.data;
    const strCategories = await categories.map(
      ({ strCategory }) => strCategory
    );
    // console.log(categories);
    dispatch(addAllRecipe("categories", strCategories));
    const strCat = strCategories.map(async (category) => {
      const resp = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await resp.data;
      return { [category]: data.meals };
    });
    await Promise.all(strCat).then((prom) =>
      dispatch(addAllRecipe("allRecipe", prom))
    );
    // console.log(prom)
  };
}

// Details
export function addRecipeDetails(fetchedRecipe) {
  return { type: ADD_RECIPE_DETAILS, payload: fetchedRecipe };
}

export function fetchRecipeDetails(idMeal) {
  return async (dispatch, getState) => {
    // await axios.interceptors.response.use((response) => response.data);
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );
    const { meals } = await response.data;
    dispatch(addRecipeDetails(meals[0]));
    // console.log(response);
  };
}

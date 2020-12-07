import axios from "axios";
import {
  SET_SEARCH_TERM,
  SET_CATEGORY,
  ADD_ALL_RECIPE,
  SET_VISIBLE,
  // ADD_RECIPE_DETAILS,
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
export function addAllRecipe(recipeCategory, recipes) {
  return { type: ADD_ALL_RECIPE, payload: { recipeCategory, recipes } };
}

// Add All Recipe
export function queryAPI() {
  return async (dispatch) => {
    await axios.interceptors.response.use((response) => response.data);
    const { categories } = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const strCategories = await categories.map(
      ({ strCategory }) => strCategory
    );
    strCategories.forEach((category) => {
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(({ meals }) => dispatch(addAllRecipe(category, meals)));
    });
  };
}

// FetchedData
// export function addDataFetched(searchTerm, dataFetched) {
//   return {
//     type: ADD_DATA_FETCHED,
//     payload: { searchTerm, dataFetched },
//   };
// }

// export function getAPIData() {
//   return (dispatch, getState) => {
//     let curState = getState();
//     axios
//       .get(
//         `https://www.themealdb.com/api/json/v1/1/search.php?s=${curState.searchTerm}`
//       )
//       .then((res) =>
//         dispatch(addDataFetched(curState.searchTerm, res.data.meals))
//       )
//       .catch((error) => console.error("axios error", error));
//   };
// }

// // Details
// export function addRecipeDetails(fetchedRecipe) {
//   return { type: ADD_RECIPE_DETAILS, payload: fetchedRecipe };
// }

// export function fetchRecipeDetails(idMeal) {
//   return (dispatch, getState) => {
//     const apiData = getState().dataFetched[getState().searchTerm]
//       ? getState().dataFetched[getState().searchTerm]
//       : [];
//     // console.log(apiData);
//     const fetchedRecipe = apiData.find((obj) => obj.idMeal === idMeal) || "";
//     if (fetchedRecipe) {
//       dispatch(addRecipeDetails(fetchedRecipe));
//     } else {
//       axios
//         .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
//         // .then((res) => console.log(res.data.meals[0]))
//         .then((res) => dispatch(addRecipeDetails(res.data.meals[0])))
//         .catch((error) => console.error(error));
//     }
//   };
// }

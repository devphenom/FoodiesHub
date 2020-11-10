import axios from "axios";
import { SET_SEARCH_TERM, ADD_DATA_FETCHED } from "./actions";

export function setSearchTerm(searchTerm) {
  return { type: SET_SEARCH_TERM, payload: searchTerm };
}

export function addDataFetched(searchTerm, dataFetched) {
  return {
    type: ADD_DATA_FETCHED,
    payload: { searchTerm, dataFetched },
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

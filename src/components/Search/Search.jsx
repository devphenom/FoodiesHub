import React, { useEffect } from "react";
import { connect } from "react-redux";

import Navbar from "../Navbar/Navbar";
import SearchCard from "./SearchCard";
import {
  queryAPI,
  setCategory,
  setSearchTerm,
  setSetVisible,
} from "../Redux/actionCreators";
import "./Search.css";

const Search = (props) => {
  useEffect(() => {
    !props.recipeCategories.length && props.testingRed();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Navbar search />
      {/* handleSort={handleSort} apiData={apiData} sort={sort}  */}
      <section className="d-md-none">
        <div className="container-fluid py-3">
          <div className="row mx-auto align-items-center">
            <div className="row">
              <div className="col-md-4">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      @
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control search-input search-input-mobile"
                    value={props.searchTerm}
                    onChange={props.handleSearchTerm}
                    placeholder="search meal..."
                    aria-label="search meal"
                    aria-describedby="search meal"
                  />
                </div>
              </div>
              <div className="col-md-4 ml-auto d-flex">
                <div
                  className={`search-item mr-2 ${!props.sort ? "active" : ""}`}
                  onClick={() => {
                    props.handleSort(props.apiData);
                  }}
                >
                  <i className="fas fa-sort-alpha-down" aria-hidden="true"></i>
                </div>
                <select
                  className="form-control"
                  id="category"
                  placeholder="Filter by Category"
                  onChange={props.handleFilter}
                  onBlur={props.handleFilter}
                  value={props.category}
                  disabled={!props.recipeCategories.length}
                >
                  <option value="">Filter by Category</option>
                  {props.recipeCategories.map((category) => (
                    <option value={category} key={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* {renderSpinner()} */}
      <section>
        <div className="container-fluid">
          {/* {console.log(props.allRecipe)} */}
          <div className="row py-5 mx-auto">
            {props.allRecipe &&
              props.allRecipe
                .filter(
                  (meal) =>
                    `${meal.strMeal}`
                      .toUpperCase()
                      .indexOf(props.searchTerm.toUpperCase()) >= 0
                )
                .slice(0, props.visible)
                .map((meal) => <SearchCard i={meal} key={meal.idMeal} />)}
          </div>
          <div className="row py-5 mx-auto">
            <div className="col-md-6 mx-auto text-center">
              {props.visible < props.allRecipe.length && (
                <button
                  className="btn btn-outline-orange mx-auto text-center rounded-pill px-4 py-2"
                  onClick={props.loadMore}
                >
                  SHOW MORE
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  let allRecipe = [];
  let recipeCategories = [];
  for (let key in state.allRecipe) {
    recipeCategories.push(key);
  }
  if (!state.category) {
    for (let key in state.allRecipe) {
      let val = state.allRecipe[key];
      allRecipe.push(...val);
    }
  } else {
    allRecipe = [];
    let val = state.allRecipe[state.category];
    allRecipe.push(...val);
  }

  return {
    searchTerm: state.searchTerm,
    allRecipe,
    recipeCategories,
    visible: state.visible,
  };
};

const mapDispatchToProps = (dispatch) => ({
  testingRed() {
    dispatch(queryAPI());
  },
  handleFilter(e) {
    dispatch(setCategory(e.target.value));
    dispatch(setSetVisible());
  },
  handleSearchTerm(e) {
    dispatch(setSearchTerm(e.target.value));
    dispatch(setSetVisible());
  },
  loadMore() {
    dispatch(setSetVisible(20));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);

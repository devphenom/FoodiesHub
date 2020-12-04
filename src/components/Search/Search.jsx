import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// import Navbar from "../Navbar/Navbar";
import SearchCard from "./SearchCard";
import { queryAPI, setCategory } from "../Redux/actionCreators";
import "./Search.css";

const Search = (props) => {
  const [list, setList] = useState([]);
  const launchGetAPI = (e) => {
    e && e.preventDefault();
    if (props.apiData) {
      //   setApiData(props.apiData);
      if (!props.apiData.hasOwnProperty(props.searchTerm)) {
        props.getAPI();
      }
    }
  };

  useEffect(() => {
    launchGetAPI();
    !props.recipeCategories.length && props.testingRed();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {/* <Navbar search /> */}
      {/* handleSort={handleSort} apiData={apiData} sort={sort}  */}
      <section className="d-md-none">
        <div className="container-fluid py-3">
          <div className="row mx-auto align-items-center">
            <div className="search-item">
              <i className="fas fa-filter" aria-hidden="true"></i>
            </div>
            <div
              className={`search-item mx-2 `} //${!sort ? "active" : ""}
              //   onClick={() => handleSort(apiData)}
            >
              <i className="fas fa-sort-alpha-down" aria-hidden="true"></i>
            </div>
            <div className="">
              <input
                placeholder="&#xF002; search meal..."
                type="text"
                className="form-control search-input search-input-mobile"
                id="search meal"
                aria-describedby="search meal"
                value={props.searchTerm}
                onChange={props.handleSearchChange}
              />
            </div>
            <div>
              <select
                name="category"
                id="category"
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
      </section>
      {/* {renderSpinner()} */}
      <section>
        <div className="container-fluid">
          {/* {console.log(props.allRecipe)} */}
          <div className="row py-5 mx-auto">
            {props.allRecipe &&
              props.allRecipe.map((i) => <SearchCard i={i} key={i.idMeal} />)}
          </div>
          {/* <div className="row py-5 mx-auto">
            <div className="col-md-6 mx-auto text-center">
              {visible < apiData.length && (
                <button
                  className="btn btn-outline-orange mx-auto text-center rounded-pill px-4 py-2"
                  onClick={loadMore}
                >
                  SHOW MORE
                </button>
              )}
            </div>
          </div> */}
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  testingRed() {
    dispatch(queryAPI());
  },
  handleFilter(e) {
    dispatch(setCategory(e.target.value));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Search);

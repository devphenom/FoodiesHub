import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";

import Navbar from "../Navbar/Navbar";
import SearchCard from "./SearchCard";
import {
  queryAPI,
  setCategory,
  setSearchTerm,
  setSetVisible,
} from "../Redux/actionCreators";
import "./Search.css";
import { imagesLoaded } from "./ImageLoading";

const Search = (props) => {
  const [recipeArr, setRecipeArr] = useState("");
  const [sort, setSort] = useState(true);
  const [loading, setLoading] = useState(true);

  // Imageloading
  const [imgLoading, setImgLoading] = useState(true);
  let galleryElement;
  const handleImageChange = () => setImgLoading(!imagesLoaded(galleryElement));
  const renderSpinner = () => {
    if (imgLoading) {
      return (
        <section className="loading-spinner py-5">
          <div className="container-fluid py-5">
            <div className="row py-5 justify-content-center align-items-center">
              <div className="col-12 text-center mx-auto py-5">
                <h3>Loading Recipe Thumbnails...</h3>
                <div className="spinner">
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
    return null;
  };

  // sort
  const handleSort = (arr) => {
    setSort(!sort);
    if (sort) {
      if (arr.length > 1) {
        let sorted = [...arr].sort((a, b) => {
          var nameA = a.strMeal.toUpperCase(); // ignore upper and lowercase
          var nameB = b.strMeal.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        setRecipeArr(sorted);
      }
    } else {
      setRecipeArr(props.allRecipe);
    }
  };

  // generate all recipe
  useEffect(() => {
    !props.recipeCategories.length && props.fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // reset recipe to state everytime recipeReduxState changes
  useEffect(() => {
    setRecipeArr(props.allRecipe);
    recipeArr && setLoading(false);
    // console.log(props.allRecipe);
    setSort(true);
  }, [props.allRecipe, recipeArr]);

  // check if still fetching api
  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <Spinner
          animation="border"
          variant="warning"
          style={{ width: "10rem", height: "10rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  return (
    <>
      {/* {setLoading(false)} */}
      <Navbar
        search
        handleSort={handleSort}
        recipeArr={recipeArr}
        sort={sort}
      />
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
                  className={`search-item mx-2 ${!sort ? "active" : ""}`}
                  onClick={() => handleSort(recipeArr)}
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
          <div
            className="row py-5 mx-auto"
            ref={(element) => {
              galleryElement = element;
            }}
          >
            {renderSpinner()}
            {recipeArr &&
              recipeArr
                .filter(
                  (meal) =>
                    `${meal.strMeal}`
                      .toUpperCase()
                      .indexOf(props.searchTerm.toUpperCase()) >= 0
                )
                .slice(0, props.visible)
                .map((meal) => (
                  <SearchCard
                    i={meal}
                    key={meal.idMeal}
                    handleImageChange={handleImageChange}
                  />
                ))}
          </div>
          <div className="row py-5 mx-auto">
            <div className="col-md-6 mx-auto text-center">
              {props.visible < recipeArr.length && (
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
    </>
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
  fetchData() {
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

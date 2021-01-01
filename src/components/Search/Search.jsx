import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
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

const Search = (props) => {
  // Redux Hooks
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm);
  const visible = useSelector((state) => state.visible);
  const category = useSelector((state) => state.category);
  const categories = useSelector((state) => state.allRecipe.categories);
  const allRecipe = useSelector((state) => state.allRecipe.allRecipe);

  const fetchData = useCallback(() => dispatch(queryAPI()), [dispatch]);
  const handleFilter = useCallback(
    (e) => {
      dispatch(setCategory(e.target.value));
      dispatch(setSetVisible());
    },
    [dispatch]
  );
  const handleSearchTerm = useCallback(
    (e) => {
      dispatch(setSearchTerm(e.target.value));
      dispatch(setSetVisible());
    },
    [dispatch]
  );
  const loadMore = useCallback(() => dispatch(setSetVisible(20)), [dispatch]);

  // React state
  const [recipeArr, setRecipeArr] = useState("");
  const [sort, setSort] = useState(true);
  const [loading, setLoading] = useState(true);

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
      setRecipeArr(func(allRecipe, category));
    }
  };

  // generate all recipe
  useEffect(() => {
    !categories && fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // function
  const func = (allRecipe, caegory) => {
    let fetchedRecipe = [];
    // const { allRecipe } = allRecipe;
    if (allRecipe) {
      if (category) {
        allRecipe.forEach((obj) => {
          for (let key in obj) {
            if (key === category) {
              let val = obj[key];
              fetchedRecipe.push(...val);
            }
          }
        });
      } else {
        fetchedRecipe = [];
        allRecipe.forEach((obj) => {
          for (let key in obj) {
            let val = obj[key];
            fetchedRecipe.push(...val);
          }
        });
      }
    }
    return fetchedRecipe;
  };
  // reset recipe to state everytime recipeReduxState changes
  useEffect(() => {
    setRecipeArr(func(allRecipe, category));
    allRecipe && setLoading(false);
    // console.log();
    setSort(true);
  }, [category, allRecipe]); //eslint-disable-line react-hooks/exhaustive-deps

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
                    value={searchTerm}
                    onChange={handleSearchTerm}
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
                  onChange={handleFilter}
                  onBlur={handleFilter}
                  value={category}
                  // disabled={!categories.length}
                >
                  <option value="">Filter by Category</option>
                  {categories &&
                    categories.map((category) => (
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
      <section>
        <div className="container-fluid">
          <div className="row py-5 mx-auto">
            {recipeArr &&
              recipeArr
                .filter(
                  (meal) =>
                    `${meal.strMeal}`
                      .toUpperCase()
                      .indexOf(searchTerm.toUpperCase()) >= 0
                )
                .slice(0, visible)
                .map((meal) => <SearchCard i={meal} key={meal.idMeal} />)}
          </div>
          <div className="row py-5 mx-auto">
            <div className="col-md-6 mx-auto text-center">
              {visible < recipeArr.length && (
                <button
                  className="btn btn-outline-orange mx-auto text-center rounded-pill px-4 py-2"
                  onClick={loadMore}
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

export default Search;

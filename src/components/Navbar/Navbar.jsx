import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@reach/router";

import { setSearchTerm, setCategory } from "../Redux/actionCreators";
import "./Navbar.css";

const Navbar = (props) => {
  // Redux
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm);
  const recipeCategories = useSelector((state) => state.allRecipe.categories);
  const category = useSelector((state) => state.category);
  const handleFilter = useCallback(
    (e) => dispatch(setCategory(e.target.value)),
    [dispatch]
  );
  const handleSearchTerm = useCallback(
    (e) => dispatch(setSearchTerm(e.target.value)),
    [dispatch]
  );

  let navItems;
  if (props.search) {
    navItems = (
      <div
        id="navbarLinks"
        className="navbar-collapse collapse text-center text-mineshaft"
      >
        <ul className="navbar-nav ml-auto mr-5 align-items-center">
          <li
            className={`search-item mx-2 ${!props.sort ? "active" : ""}`}
            onClick={() => {
              props.handleSort(props.recipeArr);
            }}
          >
            <i className="fas fa-sort-alpha-down" aria-hidden="true"></i>
          </li>
          <li className="mx-2">
            <select
              className="form-control search-input"
              id="category"
              placeholder="Filter by Category"
              onChange={handleFilter}
              onBlur={handleFilter}
              value={category}
              // disabled={!recipeCategories.length}
            >
              <option value="">Filter by Category</option>
              {recipeCategories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </li>
          <li className=" mx-2">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  @
                </span>
              </div>
              <input
                type="text"
                className="form-control search-input"
                value={searchTerm}
                onChange={handleSearchTerm}
                placeholder="search meal..."
                aria-label="search meal"
                aria-describedby="search meal"
              />
            </div>
          </li>
        </ul>
      </div>
    );
  } else
    navItems = (
      <>
        <button
          className="navbar-toggler p-2 my-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarLinks"
          aria-controls="navbarLinks"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <div className="animated-icon3">
            <span />
            <span />
            <span />
          </div>
        </button>

        <div
          id="navbarLinks"
          className="navbar-collapse collapse text-center text-mineshaft"
        >
          <ul className="navbar-nav ml-auto mr-5">
            <li className="nav-item mx-2">
              <Link to="/create-recipe" className="nav-link">
                Create Recipe
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/favourites" className="nav-link">
                Favourites
              </Link>
            </li>
          </ul>
        </div>
      </>
    );

  return (
    <nav className="navbar navbar-expand-sm navbar-light shadow-sm px-lg-3  py-3 scrolling-navbar">
      {/* <!-- navbar brand --> */}
      <Link to="/" className="navbar-brand text-orange ml-md-5">
        <strong>FoodiesHUB</strong>
      </Link>
      {navItems}
    </nav>
  );
};

export default Navbar;

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { setSearchTerm, setCategory } from "../Redux/actionCreators";
import "./Navbar.css";

const Navbar = (props) => {
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
              props.handleSort(props.apiData);
            }}
          >
            <i className="fas fa-sort-alpha-down" aria-hidden="true"></i>
          </li>
          <li className="mx-2">
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
                value={props.searchTerm}
                onChange={props.handleSearchTerm}
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
const mapStateToProps = (state) => {
  let recipeCategories = [];
  for (let key in state.allRecipe) {
    recipeCategories.push(key);
  }

  return {
    searchTerm: state.searchTerm,
    recipeCategories,
  };
};
const mapDispatchToProps = (dispatch) => ({
  handleSearchTerm(e) {
    dispatch(setSearchTerm(e.target.value));
  },
  handleFilter(e) {
    dispatch(setCategory(e.target.value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

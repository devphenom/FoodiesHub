import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { setSearchTerm, getAPIData } from "../Redux/actionCreators";
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
          <li className="search-item mx-2">
            <i className="fas fa-filter" aria-hidden="true"></i>
          </li>
          <li className="search-item mx-2">
            <i className="fas fa-sort-alpha-down" aria-hidden="true"></i>
          </li>
          <li className=" mx-2">
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg input"
                id="search meal"
                aria-describedby="search meal"
                placeholder="search meal..."
                value={props.searchTerm}
                onChange={props.handleSearchChange}
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
    <nav className="navbar navbar-expand-sm navbar-light shadow-sm px-lg-3 scrolling-navbar">
      {/* <!-- navbar brand --> */}
      <Link to="/" className="navbar-brand text-orange ml-md-5">
        <strong>FoodiesHUB</strong>
      </Link>
      {navItems}
    </nav>
  );
};
const mapStateToProps = (state) => ({ searchTerm: state.searchTerm });
const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSearchChange(e) {
    dispatch(setSearchTerm(e.target.value));
    dispatch(getAPIData());
  },
  getAPI() {
    dispatch(getAPIData());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

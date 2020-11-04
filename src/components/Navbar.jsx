import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-expand-sm navbar-light bg-light shadow-sm px-lg-3 scrolling-navbar">
    {/* <!-- navbar brand --> */}
    <Link to="/" className="navbar-brand ml-5 text-main">
      <strong>
        Foodies<span className="text-p">HUB</span>
      </strong>
    </Link>
    {/* <!-- nav toggler --> */}
    <button
      className="navbar-toggler p-2 m-2"
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
    {/* <!-- nav links --> */}
    <div id="navbarLinks" className="navbar-collapse collapse text-center">
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
  </nav>
);

export default Navbar;

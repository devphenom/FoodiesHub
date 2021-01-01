import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, navigate } from "@reach/router";

import { setSearchTerm, setCategory } from "../Redux/actionCreators";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
const Home = (props) => {
  const dispatch = useDispatch();

  // Redux
  const searchTerm = useSelector((state) => state.searchTerm);
  const handleSearchChange = useCallback(
    (e) => dispatch(setSearchTerm(e.target.value)),
    [dispatch]
  );
  const handleClear = useCallback(() => {
    dispatch(setSearchTerm(""));
    dispatch(setCategory(""));
  }, [dispatch]);

  // Navigate
  const handleRedirect = (e) => {
    e.preventDefault();
    searchTerm && navigate(`/search`);
  };

  return (
    <>
      <Navbar />
      <header className="header d-flex align-items-center py-2">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-4 mx-auto text-center py-3 d-md-none">
              <form
                className=""
                onSubmit={handleRedirect}
                style={{ position: "relative" }}
              >
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control input"
                    placeholder="search meal..."
                    aria-label="Search meal by name"
                    aria-describedby="search meal by name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <Link to={`/search`} className="input-group-append">
                    <span className="input-group-text button" id="basic-addon2">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </span>
                  </Link>
                </div>
              </form>
              <img
                src={require("../../imgs/cooking.svg")}
                alt="cooking"
                className="img-fluid w-75"
              />
            </div>
            <div className="col-md-6 mx-auto">
              <form
                className="py-4 d-none d-md-block"
                onSubmit={handleRedirect}
                style={{ position: "relative" }}
              >
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control input"
                    placeholder="search meal..."
                    aria-label="Search meal by name"
                    aria-describedby="Search meal by name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <div onClick={handleRedirect} className="input-group-append">
                    <span className="input-group-text button" id="basic-addon2">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </span>
                  </div>
                </div>
              </form>
              <h1 className="font-weight-bold text-center text-md-left text-mineshaft py-1 home-h1">
                Find a <span className="text-orange">recipe</span> <br /> to
                suit your <span className="text-orange">taste.</span>{" "}
              </h1>
              <p className="text-justify text-dustygray">
                Culpa nulla tempor esse consequat aliqua non ad ad enim
                proident. Ullamco qui irure mollit aliquip officia voluptate
                veniam ex aliqua. Velit ullamco et ut anim ut.
              </p>
              <Link
                to="/search"
                onClick={handleClear}
                className="btn btn-orange px-4 py-2 my-1 rounded-pill mr-3"
              >
                Browse All
              </Link>
              <Link
                to="/create"
                className="btn btn-outline-orange px-4 py-2 ml-2 my-1 rounded-pill"
              >
                Create Recipe
              </Link>
            </div>
            <div className="col-md-4 mx-auto py-5 py-md-0 d-none d-md-block">
              <img
                src={require("../../imgs/cooking.svg")}
                alt="barbecue"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Home;

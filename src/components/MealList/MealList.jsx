import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { setSearchTerm, getAPIData } from "../Redux/actionCreators";
import "./MealList.css";

function imagesLoaded(parentNode) {
  const imgElements = [...parentNode.querySelectorAll("img")];
  for (let i = 0; i < imgElements.length; i += 1) {
    const img = imgElements[i];
    if (!img.complete) {
      return false;
    }
  }
  return true;
}

const MealList = (props) => {
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);

  const launchGetAPI = (e) => {
    e && e.preventDefault();
    if (props.apiData) {
      if (!props.apiData.hasOwnProperty(props.searchTerm)) {
        props.getAPI();
      }
    }
  };

  useEffect(() => {
    let unmounted = false; // eslint-disable-line no-unused-vars
    launchGetAPI();
    setSearching(true);
    return () => (unmounted = true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderSpinner = () => {
    if (props.apiData.length > 0) {
      if (!loading) {
        return null;
      }
      return (
        <section className="loading-spinner py-5">
          <div className="container-fluid py-5">
            <div className="row py-5">
              <div className="col-12 text-center mx-auto py-5">
                <div className="spinner">
                  <h3>Loading...</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  };

  let galleryElement;
  const handleLoadChange = () => setLoading(!imagesLoaded(galleryElement));

  const renderAllItems = (result) => {
    if (result.length > 0) {
      return result.map((i) => (
        <Link key={i.idMeal} className="mx-auto" to={`/details/${i.idMeal}`}>
          <div
            className="card mx-1 my-3 shadow mealCard border-0"
            style={{ width: "18rem" }}
          >
            <img
              src={i.strMealThumb}
              className="card-img-top mealcard-img"
              alt={i.strMeal}
              onLoad={handleLoadChange}
              onError={handleLoadChange}
            />
            <div className="card-body m-2 row align-items-center">
              <h4 className="card-title font-weight-bold">{i.strMeal}</h4>
              <span className="text-right mt-3 ml-auto">
                <i className="far fa-heart fa-2x "></i>
              </span>
            </div>
          </div>
        </Link>
      ));
    } else {
      return <h5 className="col-10 mx-auto text-center">No result found</h5>;
    }
  };

  return (
    <div style={{ minHeight: "80vh" }}>
      <section>
        <div className="container-fluid py-3">
          <div className="row text-center mx-auto">
            <div className="col-12">
              <h2 className="font-weight-bold text-p">
                Make your own food, Stay at{" "}
                <span className="text-main text-uppercase"> home</span>
              </h2>
              <div className="underline d-md-none"></div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-4">
              <h5
                className={`${
                  !props.searchTerm ? "d-none" : null
                } text-center text-sec mx-auto font-weight-bold`}
              >
                {searching ? "Searching" : "Search"} result for{" "}
                <span className=" text-main text-uppercase">
                  {props.searchTerm}
                </span>
              </h5>
            </div>
            <div className="col-md-6 mx-auto">
              {props.apiData && console.log(props.apiData)}````
              <form className="py-4" onSubmit={launchGetAPI}>
                <div className="input-group mb-3 input-border rounded">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search meal"
                    aria-label="Search meal"
                    aria-describedby="basic-addon2"
                    value={props.searchTerm}
                    onChange={props.handleSearchChange}
                  />
                  <div onClick={launchGetAPI} className="input-group-append">
                    <span className="input-group-text button" id="basic-addon2">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {renderSpinner()}
      <section>
        <div className="container-fluid">
          <div
            className="row py-5 mx-auto"
            ref={(element) => {
              return (galleryElement = element);
            }}
          >
            {props.apiData && renderAllItems(props.apiData)}
            {/* console.log(props.apiData[props.searchTerm].meals) */}
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  const apiData = state.dataFetched[state.searchTerm]
    ? state.dataFetched[state.searchTerm]
    : {};
  return {
    searchTerm: state.searchTerm,
    apiData,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSearchChange(e) {
    dispatch(setSearchTerm(e.target.value));
    dispatch(getAPIData());
  },
  getAPI() {
    dispatch(getAPIData());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MealList);

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { setSearchTerm, getAPIData } from "../Redux/actionCreators";
import Navbar from "../Navbar/Navbar";
import "./Search.css";

// function imagesLoaded(parentNode) {
//   const imgElements = [...parentNode.querySelectorAll("img")];
//   for (let i = 0; i < imgElements.length; i += 1) {
//     const img = imgElements[i];
//     if (!img.complete) {
//       return false;
//     }
//   }
//   return true;
// }

const MealList = (props) => {
  // const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState("");
  const [sort, setSort] = useState(true);
  console.log(apiData, props.apiData);

  const launchGetAPI = (e) => {
    e && e.preventDefault();
    if (props.apiData) {
      setApiData(props.apiData);
      if (!props.apiData.hasOwnProperty(props.searchTerm)) {
        props.getAPI();
      }
    }
  };

  const handleSort = (arr) => {
    setSort(!sort);
    console.log(apiData);
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
        setApiData(sorted);
      }
    } else {
      setApiData(props.apiData);
    }
  };

  useEffect(() => {
    let unmounted = false; // eslint-disable-line no-unused-vars
    launchGetAPI();
    return () => (unmounted = true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // let unmounted = false; // eslint-disable-line no-unused-vars
    setApiData(props.apiData);
    // return () => (unmounted = true);
  }, [props.apiData]);

  // const renderSpinner = () => {
  //   if (props.apiData.length > 0) {
  //     if (!loading) {
  //       return null;
  //     }
  //     return (
  //       <section className="loading-spinner py-5">
  //         <div className="container-fluid py-5">
  //           <div className="row py-5">
  //             <div className="col-12 text-center mx-auto py-5">
  //               <div className="spinner">
  //                 <h3>Loading...</h3>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </section>
  //     );
  //   }
  // };

  // let galleryElement;
  // const handleLoadChange = () => setLoading(!imagesLoaded(galleryElement));

  // const renderAllItems = (result) => {
  //   if (result.length > 0) {
  //     return result.map((i) => (
  //       <div key={i.idMeal} className="mx-auto">
  //         <div
  //           className="card mx-1 my-3 shadow mealCard border-0"
  //           style={{ width: "18rem" }}
  //         >
  //           <Link to={`/details/${i.idMeal}`}>
  //             <img
  //               src={i.strMealThumb}
  //               className="card-img-top mealcard-img"
  //               alt={i.strMeal}
  //               onLoad={handleLoadChange}
  //               onError={handleLoadChange}
  //             />
  //           </Link>
  //           <div className="card-body my-2 mx-3">
  //             <div className="row align-items-center justify-content-between mb-2">
  //               <Link to={`/details/${i.idMeal}`}>
  //                 <h3 className="card-title font-weight-bold mb-0 text-orange">
  //                   {i.strMeal}
  //                 </h3>
  //               </Link>
  //               <div className="">
  //                 <i className="far fa-heart fa-2x "></i>
  //               </div>
  //             </div>
  //             <div className="row align-items-center justify-content-between mt-2">
  //               <p>Category: {i.strCategory}</p>
  //               <p>Area: {i.strArea}</p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     ));
  //   } else {
  //     return <h5 className="col-10 mx-auto text-center">No result found</h5>;
  //   }
  // };

  return (
    <div>
      <Navbar search handleSort={handleSort} apiData={apiData} sort={sort} />
      <section className="d-md-none">
        <div className="container-fluid py-3">
          <div className="row mx-auto align-items-center">
            <div className="search-item">
              <i className="fas fa-filter" aria-hidden="true"></i>
            </div>
            <div
              className={`search-item mx-2 ${!sort ? "active" : ""}`}
              onClick={() => handleSort(apiData)}
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
          </div>
        </div>
      </section>
      {/* {renderSpinner()} */}
      <section>
        <div className="container-fluid">
          <div className="row py-5 mx-auto">
            {apiData.length > 1 &&
              apiData.map((i) => (
                <div key={i.idMeal} className="mx-auto">
                  <div
                    className="card mx-1 my-3 shadow mealCard border-0"
                    style={{ width: "18rem" }}
                  >
                    <Link to={`/details/${i.idMeal}`}>
                      <img
                        src={i.strMealThumb}
                        className="card-img-top mealcard-img"
                        alt={i.strMeal}
                        // onLoad={handleLoadChange}
                        // onError={handleLoadChange}
                      />
                    </Link>
                    <div className="card-body my-2 mx-3">
                      <div className="row align-items-center justify-content-between mb-2">
                        <Link to={`/details/${i.idMeal}`}>
                          <h3 className="card-title font-weight-bold mb-0 text-orange">
                            {i.strMeal}
                          </h3>
                        </Link>
                        <div className="">
                          <i className="far fa-heart fa-2x "></i>
                        </div>
                      </div>
                      <div className="row align-items-center justify-content-between mt-2">
                        <p>Category: {i.strCategory}</p>
                        <p>Area: {i.strArea}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* <div
            className="row py-5 mx-auto"
            ref={(element) => {
              return (galleryElement = element);
            }}
          >
            {props.apiData && renderAllItems(props.apiData)}
          </div> */}
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

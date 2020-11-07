import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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

const MealList = ({ propsData }) => {
  const [searchItem] = useState(propsData.search);
  const [dataFetched, setDataFetched] = useState([]);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(propsData.search, searchItem);
    // eslint-disable-next-line no-unused-vars
    let unmounted = false;
    setSearching(true);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`)
      .then((res) => {
        console.log(res.data.meals);
        setDataFetched(res.data.meals || "");
        setSearching(false);
      })
      .catch((error) =>
        alert("failed to fetch data. kindly check your internet connection")
      );
    return () => (unmounted = true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSpinner = () => {
    if (dataFetched.length > 0) {
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
        <Link
          className="card mx-auto my-3 shadow mealCard border-0"
          style={{ width: "18rem" }}
          key={i.idMeal}
        >
          <img
            src={i.strMealThumb}
            className="card-img-top mealcard-img"
            alt="..."
            onLoad={handleLoadChange}
            onError={handleLoadChange}
          />
          <div className="card-body my-2">
            <h5 className="card-title font-weight-bold">{i.strMeal}</h5>
            <div className="text-right mt-3">
              <i className="far fa-heart fa-2x "></i>
            </div>
            <div className="row">
              <p className="bg-white px-3 py-2">
                Category:{" "}
                <span className="font-weight-bold">{i.strCategory}</span>
              </p>
              <p className="bg-white px-3 py-2 m-2">
                Area: <span className="font-weight-bold">{i.strArea}</span>
              </p>
            </div>
          </div>
        </Link>
      ));
    } else if (typeof result === "string") {
      return <h5 className="col-10 mx-auto text-center">No result found</h5>;
    }
  };

  return (
    <div style={{ minHeight: "80vh" }}>
      {renderSpinner()}
      <section>
        <div className="container-fluid">
          <div
            className="row py-5 mx-auto"
            ref={(element) => {
              return (galleryElement = element);
            }}
          >
            <div className="col-12">
              <h3 className="text-center mx-auto font-weight-bold">
                {searching ? "Searching" : "Search"} result for{" "}
                <span className="text-primary text-uppercase">
                  {searchItem}
                </span>
              </h3>
            </div>
            {renderAllItems(dataFetched)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MealList;

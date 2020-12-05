import React from "react";
import { Link } from "react-router-dom";

const SearchCard = ({ i }) => (
  <div className="mx-auto">
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
        <div className="d-flex align-items-center justify-content-between mb-2">
          <Link to={`/details/${i.idMeal}`}>
            <h3 className="card-title font-weight-bold mb-0 text-orange">
              {i.strMeal}
            </h3>
          </Link>
          <div className="">
            <i className="far fa-heart fa-2x "></i>
          </div>
        </div>
        <div className="row align-items-center justify-content-between mt-2"></div>
      </div>
    </div>
  </div>
);

export default SearchCard;

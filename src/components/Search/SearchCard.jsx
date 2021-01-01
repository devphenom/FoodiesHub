import React from "react";
import { Link } from "@reach/router";

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
          loading="lazy"
        />
      </Link>
      <div className="card-body my-2 mx-3">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <Link to={`/details/${i.idMeal}`}>
            <h5 className="card-title font-weight-bold mb-0 text-orange">
              {i.strMeal}
            </h5>
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

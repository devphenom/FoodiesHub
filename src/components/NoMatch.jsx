import React from "react";
import { Link } from "@reach/router";

const NoMatch = () => {
  return (
    <header>
      <div className="container-fluid py-5">
        <div className="row mx-auto align-items-center">
          <div className="col-md-6 text-center">
            <h1 className="display-1">
              {" "}
              Opps! <br /> Page not found
            </h1>
            <Link to="/" className="btn btn-outline-orange px-4 py-3">
              Go to homepage
            </Link>
          </div>
          <div className="col-md-6 text-center">
            <img
              src={require("../imgs/breakfast.svg")}
              alt="Error"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NoMatch;

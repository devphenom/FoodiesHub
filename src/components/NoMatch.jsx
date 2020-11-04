import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h1> Opps! Page not found</h1>
            <Link to="/">Go to homepage</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NoMatch;

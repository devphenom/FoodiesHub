import React from "react";
import Spinner from "react-bootstrap/Spinner";

const SpinnerDiv = () => (
  <div
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "100vh" }}
  >
    <Spinner
      animation="border"
      variant="warning"
      style={{ width: "10rem", height: "10rem" }}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
);

export default SpinnerDiv;

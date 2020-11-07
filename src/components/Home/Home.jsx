import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = (props) => {
  const handleSearchChange = (e) => {
    props.setSearch(e.target.value);
    console.log(props.search);
  };
  const handleRedirect = (e) => {
    props.setSearch(e.target.value);
    props.history.push(`/search`);
  };

  return (
    <header className="header d-flex align-items-center py-5">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-4 mx-auto py-3 py-md-0 d-md-none">
            <img
              src={require("../../imgs/barbecue.svg")}
              alt="barbecue"
              className="img-fluid flip"
            />
          </div>
          <div className="col-md-6 col-sm-10 mx-auto">
            <form className="py-4 d-md-none" onSubmit={handleRedirect}>
              <div className="input-group mb-3 input-border rounded">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search meal"
                  aria-label="Search meal"
                  aria-describedby="basic-addon2"
                  value={props.search}
                  onChange={handleSearchChange}
                />
                <Link to={`/search`} className="input-group-append">
                  <span className="input-group-text button" id="basic-addon2">
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </span>
                </Link>
              </div>
            </form>
            <h1 className="display-2 font-weight-bold text-justify text-md-center text-main py-1">
              <strong>
                Find a <span className="text-sec">RECIPE</span> to suit your
                taste.
              </strong>
            </h1>
            <p className=" text-justify text-p">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              quae laborum nesciunt vel modi obcaecati dicta. Architecto, harum!
              Architecto, quae culpa voluptatibus eos ratione incidunt officiis
              at sint totam commodi.
            </p>
            <form className="py-4 d-none d-md-block" onSubmit={handleRedirect}>
              <div className="input-group mb-3 input-border rounded">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search meal"
                  aria-label="Search meal"
                  aria-describedby="basic-addon2"
                  value={props.search}
                  onChange={handleSearchChange}
                />
                <Link to={`/search`} className="input-group-append">
                  <span className="input-group-text button" id="basic-addon2">
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </span>
                </Link>
              </div>
            </form>
          </div>
          <div className="col-md-4 mx-auto py-5 py-md-0 d-none d-md-block">
            <img
              src={require("../../imgs/barbecue.svg")}
              alt="barbecue"
              className="img-fluid flip"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Home;

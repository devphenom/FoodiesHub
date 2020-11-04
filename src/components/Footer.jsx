import React from "react";

const Footer = () => (
  <footer className="mb-0">
    <div className="container-fluid">
      <div className="row">
        <div className="col text-center">
          <h6 className="text-p">
            {" "}
            <i className="far fa-copyright" aria-hidden="true"></i> Developed by{" "}
            <a
              href="https://devphenom.github.io/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="pointer text-main font-weight-bold"
            >
              Ali Abdulsamad T.
            </a>{" "}
            with <i className="fas fa-heart" aria-hidden="true"></i>{" "}
          </h6>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

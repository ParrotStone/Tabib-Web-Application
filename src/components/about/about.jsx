import React from "react";
import logo from "../../images/tabib-logo.png";
import { Link } from "react-router-dom";
import "./about.css";

const AboutContent = () => {
  return (
    <React.Fragment>
      <div
        className="row mt-n4"
        style={{ height: "110px", background: "#344b58" }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col" style={{ marginLeft: "90px" }}>
              <img
                src={logo}
                alt="Tabib Logo"
                style={{ width: "140px", height: "140px" }}
              />
            </div>
            <div className="col mr-5 text-right" style={{ marginTop: "55px" }}>
              <Link className="mx-3 nav-header-link" to="/">
                Home
              </Link>
              <Link className="mx-3 nav-header-link" to="/about">
                About
              </Link>
              <Link className="mx-3 nav-header-link" to="/login">
                Sign In
              </Link>
              <button
                className="btn btn-sm ml-3"
                style={{ background: "#12a2f9" }}
              >
                <Link className="mx-3" to="/signup">
                  Register
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container d-flex flex-column justify-content-center align-items-center about-nav"
        style={{
          height: "450px"
        }}
      >
        <h1>Tabib About Info</h1>
        <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
          eveniet incidunt eaque. Dolores unde nesciunt asperiores assumenda,
          numquam id rem nihil nobis maxime ab possimus recusandae ullam et,
          esse praesentium saepe sed quos perspiciatis error magni. Illo
          voluptate excepturi, possimus?
        </p>
      </div>
    </React.Fragment>
  );
};

export default AboutContent;

import React from "react";
import Logo from "../common/logo";
import ContentSlider from "./contentSlider";
import Navbar from "./navbar";
import IconSlider from "./iconSlider";
import { Link } from "react-router-dom";

const HomePg = () => {
  return (
    <React.Fragment>
      <div id="full-pg">
        <div className="container h-100">
          <Logo />
          <ContentSlider />
          <div className="get-started">
            <button className="btn bg-white btn-lg text-upper py-2">
              <Link to="/signup" style={{ color: "#222222" }}>
                Get Started
              </Link>
            </button>
          </div>
        </div>
      </div>

      <div className="overlay mt-4">
        <div className="container">
          <Navbar />
          <IconSlider />
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePg;

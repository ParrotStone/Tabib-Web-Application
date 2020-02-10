import React from "react";
import Logo from "../common/logo";
import ContentSlider from "./contentSlider";
import Navbar from "./navbar";
import IconSlider from "./iconSlider";

function HomePg() {
  return (
    <React.Fragment>
      <div className="container">
        <Logo />
        <ContentSlider />

        <div className="get-started">
          <button className="btn bg-white btn-lg text-upper py-2">
            Get Started
          </button>
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
}

export default HomePg;

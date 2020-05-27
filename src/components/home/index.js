import React from "react";
import Logo from "../common/Logo";
import ContentSlider from "./ContentSlider";
import Navbar from "./Navbar";
import IconSlider from "./IconSlider";
import HomeDiagnosis from "../home-diagnosis/index";
import { Link } from "react-router-dom";

import auth from "../../services/AuthService";

const HomePg = () => {
  if (auth.getCurrentUser()) return <HomeDiagnosis />;
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

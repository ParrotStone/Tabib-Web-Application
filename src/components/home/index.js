import React from "react";
import ContentSlider from "./ContentSlider";
import Navbar from "./Navbar";
import IconSlider from "./IconSlider";
import HomeDiagnosis from "../home-diagnosis/index";

import auth from "../../services/AuthService";

const HomePg = () => {
  if (auth.getCurrentUser()) return <HomeDiagnosis />;
  return (
    <React.Fragment>
      <div className="overlay"></div>
      <Navbar />
      <div className="sliders-container">
        <div className="container-fluid">
          <div className="row flex-row-reverse align-items-center">
            <div className="offset-1 col-5 text-center">
              <IconSlider />
            </div>
            <div className="col px-5">
              <ContentSlider />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePg;

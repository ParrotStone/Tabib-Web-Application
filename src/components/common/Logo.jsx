import React from "react";
import logo from "../../images/tabib-logo.png";

const Logo = props => {
  return (
    <div className="row mt-n4 ml-n5 logo-container">
      <div className="col-4">
        <a href="/">
          <img src={logo} alt="Tabib Logo" className="logo" />
        </a>
      </div>
    </div>
  );
};

export default Logo;

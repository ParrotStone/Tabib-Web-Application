import React from "react";
import { Link } from "react-router-dom";
import Logo from "../common/Logo";

const Background = (props) => {
  return (
    <div className="bg-capsule">
      <div className="container">
        <Link to="/">
          <Logo />
        </Link>
      </div>
    </div>
  );
};

export default Background;

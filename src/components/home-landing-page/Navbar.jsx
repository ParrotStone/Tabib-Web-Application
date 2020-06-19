import React from "react";
import { Link } from "react-router-dom";
import Logo from "../common/Logo";

const Navbar = (props) => {
  return (
    <nav>
      <div className="container">
        <div className="row">
          <div className="col">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="col text-right">
            <ul className="mt-4">
              <Link className="btn btn-light text-upper mr-2" to="/get-started">
                Get Started
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

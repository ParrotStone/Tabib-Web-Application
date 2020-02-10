import React from "react";
import { Link } from "react-router-dom";

const Navbar = props => {
  return (
    <div className="row mt-4 text-right">
      <div className="col-5 offset-7">
        <Link to="/" className="text-upper mr-4">
          Home
        </Link>
        <Link to="/about" className="text-upper mr-4">
          About
        </Link>
        <Link to="/login" className="text-upper mr-4">
          Sign In
        </Link>
        <Link to="/signup" className="btn bg-white text-upper mr-4">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

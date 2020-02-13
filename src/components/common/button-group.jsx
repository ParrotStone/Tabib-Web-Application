import React from "react";
import { Link } from "react-router-dom";

const BtnGroup = ({ signupSelected, signinSelected }) => {
  let classesSignup = "btn ";
  let classesSignin = "btn ";
  if (signupSelected && !signinSelected) classesSignup += "btn-selected";
  else classesSignin += "btn-selected";
  return (
    <React.Fragment>
      <div className="btn-group-custom">
        <button className={classesSignin}>
          <Link to="/login">Sign In</Link>
        </button>
        <button className={classesSignup}>
          <Link to="/signup">Sign Up</Link>
        </button>
      </div>
    </React.Fragment>
  );
};

export default BtnGroup;

import React from "react";
import { Link } from "react-router-dom";

const ButtonGroup = ({ signupSelected, signinSelected }) => {
  let classesSignup = "btn ";
  let classesSignin = "btn ";
  if (signupSelected && !signinSelected) classesSignup += "btn-selected";
  else classesSignin += "btn-selected";
  return (
    <React.Fragment>
      <div className="btn-group-custom">
        <Link to="/login">
          <button className={classesSignin}>Sign In</button>
        </Link>
        <Link to="/signup">
          <button className={classesSignup}>Sign Up</button>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default ButtonGroup;

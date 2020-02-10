import React from "react";

const BtnGroup = props => {
  return (
    <React.Fragment>
      <div className="btn-group-custom">
        <button className="btn btn-selected">Sign In</button>
        <button className="btn">Sign Up</button>
      </div>
    </React.Fragment>
  );
};

export default BtnGroup;

import React from "react";

const ButtonGroup = ({
  fstBtnText,
  sndBtnText,
  isFirstSelected,
  setFirstSelected,
}) => {
  return (
    <React.Fragment>
      <div className="btn-group-custom">
        <span
          className={`btn-indicator ${
            isFirstSelected ? "btn-selected-first" : "btn-selected-second"
          }`}
        ></span>
        <button
          className={`${isFirstSelected ? "btn-selected" : ""}`}
          onClick={() => setFirstSelected(true)}
        >
          {fstBtnText}
        </button>
        <button
          className={`${!isFirstSelected ? "btn-selected" : ""}`}
          onClick={() => setFirstSelected(false)}
        >
          {sndBtnText}
        </button>
      </div>
    </React.Fragment>
  );
};

export default ButtonGroup;

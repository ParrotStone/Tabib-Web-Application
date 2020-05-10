import React from "react";

const ButtonGroup = ({
  fstBtnText,
  sndBtnText,
  isOneSelected,
  setOneSelected,
}) => {
  const [selected, setSelected] = React.useState(true);

  return (
    <React.Fragment>
      <div className="btn-group-custom">
        <span
          className={`btn-indicator ${
            selected && isOneSelected
              ? "btn-selected-first"
              : "btn-selected-second"
          }`}
        ></span>
        <button
          className={`${selected ? "btn-selected" : ""}`}
          onClick={() => setSelected(true) || setOneSelected(true)}
        >
          {fstBtnText}
        </button>
        <button
          className={`${!selected && !isOneSelected ? "btn-selected" : ""}`}
          onClick={() => setSelected(false) || setOneSelected(false)}
        >
          {sndBtnText}
        </button>
      </div>
    </React.Fragment>
  );
};

export default ButtonGroup;

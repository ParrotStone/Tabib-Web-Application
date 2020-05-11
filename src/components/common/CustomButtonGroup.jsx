import React from "react";

const ButtonGroup = ({
  fstBtnText,
  sndBtnText,
  isFirstSelected,
  setFirstSelected,
  setAlarms,
}) => {
  const [selected, setSelected] = React.useState(true);

  return (
    <React.Fragment>
      <div className="btn-group-custom">
        <span
          className={`btn-indicator ${
            selected && isFirstSelected
              ? "btn-selected-first"
              : "btn-selected-second"
          }`}
        ></span>
        <button
          className={`${selected ? "btn-selected" : ""}`}
          onClick={() => setSelected(true) || setFirstSelected(true)}
        >
          {fstBtnText}
        </button>
        <button
          className={`${!selected && !isFirstSelected ? "btn-selected" : ""}`}
          onClick={() => setSelected(false) || setFirstSelected(false)}
        >
          {sndBtnText}
        </button>
      </div>
    </React.Fragment>
  );
};

export default ButtonGroup;

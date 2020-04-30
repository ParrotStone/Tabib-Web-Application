import React from "react";

const ProgressBar = ({ currentStep, handleProgressChange }) => {
  // Represents the number of the steps
  const steps = [1, 2, 3, 4];

  return (
    <>
      <div className="progress-wrapper">
        {steps.map((step) => (
          <span
            key={step}
            onClick={handleProgressChange}
            className={`progress-span ${
              currentStep >= step ? "current-step" : ""
            }`}
            id={step}
          ></span>
        ))}
      </div>
    </>
  );
};

export default ProgressBar;

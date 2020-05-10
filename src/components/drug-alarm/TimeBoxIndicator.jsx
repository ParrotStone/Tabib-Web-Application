import React from "react";
import { getCurrTimeInTwelveFormat } from "../../utils.js";

const TimeBoxIndicator = ({ setOpen, time }) => {
  const currentTime = getCurrTimeInTwelveFormat(time);

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center w-25 mx-auto py-4 text-primary border-primary"
        style={{ border: "2px solid", borderRadius: "20px", cursor: "pointer" }}
        onClick={() => setOpen(true)}
      >
        <h1 className="m-0">{currentTime}</h1>
      </div>
    </>
  );
};

export default TimeBoxIndicator;

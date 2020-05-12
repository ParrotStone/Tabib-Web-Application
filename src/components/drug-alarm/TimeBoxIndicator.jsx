import React from "react";
import { getCurrTimeInTwelveFormat } from "../../utils.js";

const styles = { border: "2px solid", borderRadius: "20px", cursor: "pointer" };
const classes =
  "d-flex justify-content-center align-items-center w-25 mx-auto py-4 text-primary border-primary";

const TimeBoxIndicator = ({ setOpen, time, opened }) => {
  return (
    <>
      <div className={classes} style={styles} onClick={() => setOpen(true)}>
        <h1 className="m-0">
          {opened
            ? getCurrTimeInTwelveFormat(time)
            : getCurrTimeInTwelveFormat(new Date())}
        </h1>
      </div>
    </>
  );
};

export default TimeBoxIndicator;

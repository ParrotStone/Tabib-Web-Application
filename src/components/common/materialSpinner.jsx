import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const MaterialSpinner = (props) => {
  return (
    <div>
      <CircularProgress
        variant="indeterminate"
        disableShrink
        style={{ animationDuration: "500ms" }}
        {...props}
      />
    </div>
  );
};

export default MaterialSpinner;

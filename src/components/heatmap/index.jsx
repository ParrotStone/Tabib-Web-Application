import React from "react";
// import Map from "./map";
import Map1 from "./heatmap-1";
import Map2 from "./heatmap-2";
import Map3 from "./heatmap-3";
// import { Link } from "react-router-dom";

const HeatMap1 = (props) => {
  return (
    <React.Fragment>
      <Map1 />
    </React.Fragment>
  );
};

const HeatMap2 = (props) => {
  return (
    <React.Fragment>
      <Map2 />
    </React.Fragment>
  );
};

const HeatMap3 = (props) => {
  return (
    <React.Fragment>
      <Map3 />
    </React.Fragment>
  );
};

export default { HeatMap1, HeatMap2, HeatMap3 };

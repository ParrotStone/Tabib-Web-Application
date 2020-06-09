import React from "react";
import robo from "../../images/robo-ico-white.svg";
import skin from "../../images/skin-detection-white.svg";
import alarm from "../../images/drug-alarm-white.svg";
import map from "../../images/density-map-white.svg";
import search from "../../images/disease-search-white.svg";

const IconSlider = (props) => {
  return (
    <div
      id="icon-slider"
      className="carousel slide"
      data-ride="carousel"
      data-pause="false"
    >
      <div className="carousel-inner d-flex align-items-center h-100">
        <div className="carousel-item active">
          <img src={robo} alt="Robo Doctor" />
        </div>
        <div className="carousel-item">
          <img src={alarm} alt="Drug Alarm" />
        </div>
        <div className="carousel-item">
          <img src={skin} alt="Skin Detection" />
        </div>
        <div className="carousel-item">
          <img src={map} alt="Density Map" />
        </div>
        <div className="carousel-item">
          <img src={search} alt="Disease Info Search" />
        </div>
      </div>
    </div>
  );
};

export default IconSlider;

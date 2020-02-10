import React from "react";
import robo from "../../images/robo-ico-white.svg";
import skin from "../../images/skin-detection-white.svg";
import alarm from "../../images/drug-alarm-white.svg";

const IconSlider = props => {
  return (
    <div
      id="icon-slider"
      className="carousel slide"
      data-ride="carousel"
      data-pause="false"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="row mt-5">
            <div className="col-5 offset-7">
              <img src={robo} alt="Robo Doctor" />
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="row mt-5">
            <div className="col-5 offset-7">
              <img src={alarm} alt="Drug Alarm" />
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="row mt-5">
            <div className="col-5 offset-7">
              <img src={skin} alt="Skin Detection" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconSlider;

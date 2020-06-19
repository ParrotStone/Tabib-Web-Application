import React from "react";
import Carousel from "react-bootstrap/Carousel";
import robo from "../../images/robo-ico-white.svg";
import skin from "../../images/skin-detection-white.svg";
import alarm from "../../images/drug-alarm-white.svg";
import map from "../../images/density-map-white.svg";
import search from "../../images/disease-search-white.svg";

const IconSlider = (props) => {
  return (
    <Carousel controls={false} indicators={false} pause={false} interval={4000}>
      <Carousel.Item>
        <div className="h-400px d-flex justify-content-center align-items-center">
          <img src={robo} alt="Robo Doctor" />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="h-400px d-flex justify-content-center align-items-center">
          <img src={alarm} alt="Drug Alarm" />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="h-400px d-flex justify-content-center align-items-center">
          <img src={skin} alt="Skin Detection" />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="h-400px d-flex justify-content-center align-items-center">
          <img src={map} alt="Density Map" />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="h-400px d-flex justify-content-center align-items-center">
          <img src={search} alt="Disease Info Search" />
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default IconSlider;

import React from "react";
import Carousel from "react-bootstrap/Carousel";

const ContentSlider = (props) => {
  return (
    <Carousel controls={false} indicators={false} pause={false}>
      <Carousel.Item>
        <div className="h-400px d-flex flex-column justify-content-center px-4">
          <h1>Tabib Bot</h1>
          <p className="lead">
            Tabib is a virtual doctor that can help you predict your disease
            based on your symptoms and find you the best possible treatment.
          </p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="h-400px d-flex flex-column justify-content-center px-4">
          <h1>Drug Alarm</h1>
          <p className="lead">
            Tabib will always remind you to take your medicines based on your
            medicine schedule.
          </p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="h-400px d-flex flex-column justify-content-center px-4">
          <h1>Skin Detection</h1>
          <p className="lead">
            You can also take a picture of an infected area on your skin and we
            will predict the disease for you.
          </p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="h-400px d-flex flex-column justify-content-center px-4">
          <h1>COVID-19 Density Map</h1>
          <p className="lead">
            We provide a COVID-19 density map showing the number of affected
            cases in each of Egypt's governorates.
          </p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="h-400px d-flex flex-column justify-content-center px-4">
          <h1>Disease Info Summary</h1>
          <p className="lead">
            You can quickly look up information any disease and get a summary
            with the detailed symptoms and the available treatments.
          </p>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default ContentSlider;

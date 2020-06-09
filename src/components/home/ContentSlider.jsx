import React from "react";

// The d-flex align-items-center (down there on the carousel-inner) ensures that the content is in the middle and so when the height collapses, it will collapse on the content and no notice in the height will be noticed(remove the respective classes to see the difference). Another solution is to set a height for the carousel-inner part and have the thing in the middle(using flex as well), thus, the height remains consistent and can have all the content in it without changing. The icon-sldier contains the same classes just for consistency(both sliders' content is required to be in the middle anyway)

const ContentSlider = (props) => {
  return (
    <div
      id="content-slider"
      className="carousel slide"
      data-ride="carousel"
      data-pause="false"
    >
      <div className="carousel-inner d-flex align-items-center h-100">
        <div className="carousel-item active">
          <h1>Tabib Bot</h1>
          <p>
            Tabib is a virtual doctor that can help you predict your disease
            based on your symptoms and find you the best possible treatment
          </p>
        </div>
        <div className="carousel-item">
          <h1>Drug Alarm(s)</h1>
          <p>
            Tabib will always remind you to take your medicines based on your
            medicine schedule
          </p>
        </div>
        <div className="carousel-item">
          <h1>Skin Detection</h1>
          <p>
            You can also take a picture of an infected area on your skin and we
            will predict the disease for you
          </p>
        </div>
        <div className="carousel-item">
          <h1>COVID-19 Density Map</h1>
          <p>
            We provide a COVID-19 density map showing the number of affected
            cases in each of Egypt's governorates
          </p>
        </div>
        <div className="carousel-item">
          <h1>Disease Info Summary</h1>
          <p>
            You can quickly look up information any disease and get a summary
            with the detailed symptoms and the available treatments
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentSlider;

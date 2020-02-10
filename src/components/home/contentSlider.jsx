import React from "react";

const ContentSlider = props => {
  return (
    <div
      id="main-content"
      className="carousel slide mt-5 ml-n5"
      data-ride="carousel"
      data-pause="false"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="content mt-nl5">
            <h1 className="display-4">Tabib Bot</h1>
            <p>
              Tabib is a virtual doctor that can help you predict your disease
              based on your symptoms and find the best possible treatment
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <div className="content mt-nl5">
            <h1 className="display-4">Drug Alarm</h1>
            <p>
              Tabib will always remind you to take your medicines based on your
              medicine schedule
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <div className="content mt-nl5">
            <h1 className="display-4">Skin Detection</h1>
            <p>
              You can also take a picture of an infected area on your skin and
              we will predict the disease for you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSlider;

import React from "react";
import MessageBox from "./common/messageBox";

class DiagnosisBox extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MessageBox message={"What do you want to do?!"} />
        <div className="btn-action">
          <button className="btn btn-outline-info d-block mb-3">
            Speak to Tabib Bot
          </button>
          <button className="btn btn-outline-info d-block">
            Skin Detection
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default DiagnosisBox;

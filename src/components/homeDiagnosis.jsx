import React from "react";
import Background from "./common/background";
import UserArea from "./userArea";
import DiagnosisBox from "./diagnosisBox";

class HomeDiagnosis extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Background />
        <div className="reg-box mt-3 main-diag">
          <UserArea />
          <DiagnosisBox />
        </div>
      </React.Fragment>
    );
  }
}

export default HomeDiagnosis;

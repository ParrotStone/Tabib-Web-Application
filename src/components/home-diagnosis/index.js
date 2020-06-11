import React from "react";
import Background from "../common/Background";
import UserArea from "./UserArea";
import DiagnosisBox from "./DiagnosisBox";

class HomeDiagnosis extends React.Component {
  render() {
    return (
      <>
        <Background />
        <div className="box main-diag">
          <UserArea />
          <DiagnosisBox />
        </div>
      </>
    );
  }
}

export default HomeDiagnosis;

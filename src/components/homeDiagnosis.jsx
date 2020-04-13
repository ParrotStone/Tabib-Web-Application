import React from "react";
import Background from "./common/background";
import UserArea from "./userArea";
import DiagnosisBox from "./diagnosisBox";

import auth from "../services/authService";

class HomeDiagnosis extends React.Component {
  render() {
    const user = auth.getCurrentUser();

    return (
      <React.Fragment>
        <Background />
        <div className="box mt-4 main-diag">
          <UserArea user={user} />
          <DiagnosisBox />
        </div>
      </React.Fragment>
    );
  }
}

export default HomeDiagnosis;

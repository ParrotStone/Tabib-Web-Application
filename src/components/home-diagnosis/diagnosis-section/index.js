import React from "react";
import SideOptions from "./SideOptions";
import DiagnosisBox from "./DiagnosisBox";

class DiagnosisSection extends React.Component {
  render() {
    return (
      <>
        <div className="box whole-diag-box">
          <SideOptions setIsProfileShown={this.props.setIsProfileShown} />
          <DiagnosisBox />
        </div>
      </>
    );
  }
}

export default DiagnosisSection;

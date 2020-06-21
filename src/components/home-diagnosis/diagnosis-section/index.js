import React, { useState } from "react";
import SideOptions from "./SideOptions";
import DiagnosisBox from "./DiagnosisBox";

const DiagnosisSection = ({ setIsProfileShown }) => {
  const [showDiseasePopup, setShowDiseasePopup] = useState(false);
  const [requestedDiseaseInfo, setRequestedDiseaseInfo] = useState("");

  const showDiseaseInfo = (showPopup, requestedDiseaseName) => {
    setShowDiseasePopup(showPopup);
    setRequestedDiseaseInfo(requestedDiseaseName);
  };

  return (
    <>
      <div className="box whole-diag-box">
        <SideOptions
          showDiseasePopup={showDiseasePopup}
          setShowDiseasePopup={setShowDiseasePopup}
          requestedDiseaseInfo={requestedDiseaseInfo}
          showDiseaseInfo={showDiseaseInfo}
          setIsProfileShown={setIsProfileShown}
        />
        <DiagnosisBox showDiseaseInfo={showDiseaseInfo} />
      </div>
    </>
  );
};

export default DiagnosisSection;

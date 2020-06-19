import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Background from "../common/Background";
import DiagnosisSection from "./diagnosis-section/index";
import Profile from "./profile/Profile";

const HomeDiagnosis = (props) => {
  const [isProfileShown, setIsProfileShown] = React.useState(false);
  return (
    <>
      <Background />
      <TransitionGroup component={null}>
        <CSSTransition
          key={isProfileShown}
          in={true}
          appear={true}
          timeout={500}
          classNames="fade-in"
        >
          {isProfileShown ? (
            <Profile setIsProfileShown={setIsProfileShown} />
          ) : (
            <DiagnosisSection setIsProfileShown={setIsProfileShown} />
          )}
        </CSSTransition>
      </TransitionGroup>
    </>
  );
};

export default HomeDiagnosis;

import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Background from "../common/Background";
import CustomButtonGroup from "../common/CustomButtonGroup";
import LoginBox from "./login/index";
import SignupBox from "./signup/index";

const UsrAuth = (props) => {
  const [isLoginSelected, setIsLoginSelected] = useState(true);
  return (
    <>
      <Background />
      <div className="box">
        <div className="container d-flex justify-content-center">
          <CustomButtonGroup
            fstBtnText="Sign In"
            sndBtnText="Sign Up"
            isFirstSelected={isLoginSelected}
            setFirstSelected={setIsLoginSelected}
          />
        </div>
        <TransitionGroup component={null}>
          <CSSTransition
            key={isLoginSelected}
            in={true}
            appear={true}
            timeout={500}
            classNames="fade-in"
          >
            {isLoginSelected ? <LoginBox /> : <SignupBox />}
          </CSSTransition>
        </TransitionGroup>
      </div>
    </>
  );
};

export default UsrAuth;

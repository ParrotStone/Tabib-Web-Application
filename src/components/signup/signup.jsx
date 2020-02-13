import React from "react";
import BtnGroup from "../common/button-group";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import PersonalInfoForm from "./formPersonalInfo";
import ProgressBar from "../common/progressBar";

class SignupBox extends React.Component {
  state = {
    step: 1,
    name: "",
    gender: "",
    birthdate: "",
    phoneNum: "",
    oldDiseases: "",
    smokingCheckBox: false,
    weight: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  // Proceed to the next step
  nextStep = () => {
    this.setState({ step: this.state + 1 });
  };

  // Go back to previous step
  prevStep = () => {
    this.setState({ step: this.state - 1 });
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  getMarkup = () => {
    switch (this.state.step) {
      case 1:
        return <PersonalInfoForm />;
      case 2:
        return;
      case 3:
        return;
    }
  };

  render() {
    // Customize the colors of the form
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: "#12a2f9"
        }
      }
    });

    return (
      <ThemeProvider theme={theme}>
        <div className="reg-box">
          <div className="container d-flex justify-content-center">
            <BtnGroup signupSelected={true} signinSelected={false} />
          </div>
          {this.getMarkup()}
        </div>
      </ThemeProvider>
    );
  }
}

export default SignupBox;

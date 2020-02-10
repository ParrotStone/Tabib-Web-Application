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
    birthdate: {},
    phoneNum: "",
    oldDiseases: "",
    smokingCheckBox: false,
    weight: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  prevStep = () => {
    this.setState({ step: this.state + 1 });
  };

  prevStep = () => {
    this.setState({ step: this.state - 1 });
  };

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
            <BtnGroup />
          </div>
          {this.getMarkup()}
        </div>
      </ThemeProvider>
    );
  }
}

export default SignupBox;

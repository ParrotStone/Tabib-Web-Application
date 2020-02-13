import React from "react";
import BtnGroup from "../common/button-group";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import PersonalInfoForm from "./formPersonalInfo";
import HealthInfo from "./formHealthInfo";
import EmailInfo from "./emailInfo";

class SignupBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 3,
      name: "",
      gender: "",
      birthdate: this.getDateFormat(new Date()),
      phoneNum: "",
      prevDiseases: "",
      smokingCheckBox: false,
      weight: "",
      email: "",
      password: "",
      showPassword: false,
      confirmPassword: ""
    };
  }

  getDateFormat(timeDate) {
    return timeDate.toISOString().split("T")[0];
  }

  // Proceed to the next step
  nextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  // Go back to previous step
  prevStep = () => {
    this.setState({ step: this.state - 1 });
  };

  // Handle fields change
  handleChange = event => {
    // The date picker return the a date obj when a change event fires off
    // The condition down here is to deal w/ this specific case and get the date separate from the time
    if (!event.target) {
      this.setState({ birthdate: this.getDateFormat(event) });
      return;
    }

    // Check if the event raised was from an type checkbox w/ checked property
    if (event.target.checked !== undefined) {
      this.setState({ smokingCheckBox: event.target.checked });
      return;
    }

    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  getMarkup = () => {
    const {
      name,
      gender,
      birthdate,
      phoneNum,
      prevDiseases,
      smokingCheckBox,
      weight,
      email,
      password,
      confirmPassword
    } = this.state;

    const inputFields = {
      name,
      gender,
      birthdate,
      phoneNum,
      prevDiseases,
      smokingCheckBox,
      weight,
      email,
      password,
      confirmPassword
    };

    switch (this.state.step) {
      case 1:
        return (
          <PersonalInfoForm
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={inputFields}
          />
        );
      case 2:
        return (
          <HealthInfo
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={inputFields}
            handleChange={this.handleChange}
          />
        );
      case 3:
        return (
          <EmailInfo
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={inputFields}
            handleChange={this.handleChange}
          />
        );
      default:
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

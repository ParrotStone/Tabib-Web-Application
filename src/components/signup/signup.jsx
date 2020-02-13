import React from "react";
import BtnGroup from "../common/button-group";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import PersonalInfoForm from "./formPersonalInfo";

class SignupBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      name: "",
      gender: "",
      birthdate: this.getDateFormat(new Date()),
      phoneNum: "",
      oldDiseases: "",
      smokingCheckBox: false,
      weight: "",
      email: "",
      password: "",
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

    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  getMarkup = () => {
    const {
      name,
      gender,
      birthdate,
      phoneNum,
      oldDiseases,
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
      oldDiseases,
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
        return <h1>Next step2</h1>;
      case 3:
        return <h1>Next step3</h1>;
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

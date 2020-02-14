import React from "react";
import BtnGroup from "../common/button-group";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import PersonalInfoForm from "./formPersonalInfo";
import HealthInfo from "./formHealthInfo";
import EmailInfo from "./emailInfo";
import ProgressBar from "../common/progressBar";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class SignupBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
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

  // Handle the progress bar change
  handleProgressChange = ev => {
    // Getting the last num of the id to identify the steps
    const desiredStep = Number(ev.target.id);
    this.setState({ step: desiredStep });
  };

  handleSubmit = () => {
    if (this.state.step < 3) {
      this.nextStep();
      return;
    }

    // Call the back end and re-direct towards the homie
    console.log("Here's the date");
  };

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
    if (event.target.type === "checkbox") {
      this.setState({ smokingCheckBox: event.target.checked });
      return;
    }

    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  // Handle the password visibility icon
  handlePasswordVis = event => {
    this.setState({ showPassword: !this.state.showPassword });
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
      confirmPassword,
      showPassword
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
      confirmPassword,
      showPassword
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
            handlePasswordVis={this.handlePasswordVis}
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
          <TransitionGroup component={null}>
            <CSSTransition
              key={this.state.step}
              in={true}
              timeout={500}
              appear={true}
              classNames="slide"
            >
              {this.getMarkup()}
            </CSSTransition>
          </TransitionGroup>
          <div className="submit-wrapper">
            <div className="container mt-4">
              <ProgressBar
                currentStep={this.state.step}
                handleProgressChange={this.handleProgressChange}
              />
            </div>
            <button
              className="btn signup-btn d-block mt-3 mx-auto"
              onClick={this.handleSubmit}
            >
              Sign up
            </button>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default SignupBox;

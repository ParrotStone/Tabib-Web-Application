import React from "react";
import BtnGroup from "../common/button-group";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { ValidatorForm } from "react-material-ui-form-validator";
import PersonalInfoForm from "./formPersonalInfo";
import HealthInfo from "./formHealthInfo";
import DemographicsInfo from "./formDemographics";
import EmailInfo from "./formEmailInfo";
import ProgressBar from "../common/progressBar";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import http from "../../services/httpService";
import config from "../../config.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

class SignupBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 4,
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      profile: {
        gender: "male",
        birthdate: new Date(),
        phoneNum: "",
        prevDiseases: "",
        smokingCheckBox: false,
        weight: 0,
        height: 0,
        country: "",
        city: "",
      },
      errors: {},
    };
  }

  getDateFormat(timedate) {
    return timedate.toISOString().split("T")[0];
  }

  // Notification Method -> Extract it later into utils JS file
  notify = (notificationType, msg) => {
    // Notification alert for the user
    toast[notificationType](msg, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      closeOnClick: false,
      hideProgressBar: true,
      pauseOnHover: false,
    });
  };

  // Handle the progress bar change event
  handleProgressChange = (ev) => {
    if (!this.validate()) {
      this.notify("info", "Please check your input again!");
      return;
    }

    // Getting the last num of the id to identify the steps
    const desiredStep = Number(ev.target.id);
    this.setState({ step: desiredStep });
  };

  handleSubmit = async (ev) => {
    // Prevent proceeding to the next step --- unless there're no errors whatsoever in the current step
    if (!this.validate()) {
      ev.preventDefault();
      this.notify("info", "Please check your input again!");
      return;
    }

    if (this.state.step < 4) {
      this.nextStep();
      return;
    }

    let {
      email,
      username: name,
      password,
      confirmPassword: conffPassword,
      profile: {
        gender,
        birthdate: dateOfBirth,
        phoneNum: phone,
        prevDiseases,
        smokingCheckBox: smoking,
        weight,
        height,
        country,
        city,
      },
    } = this.state;

    dateOfBirth = this.getDateFormat(dateOfBirth);

    const data = {
      email,
      name,
      password,
      conffPassword,
      profile: {
        gender,
        dateOfBirth,
        phone,
        prevDiseases,
        smoking,
        weight,
        height,
        country,
        city,
      },
    };

    const endPoint = `${config.apiEndpoint}api/accounts/register/`;
    // Register a user here, and then redirect him to the damn (homie OR the login page)
    // Call the back end and re-direct towards the homie
    try {
      const { data: response } = await http.post(endPoint, data);
      console.log(response);
    } catch (ex) {
      console.log(ex.response);
    }
  };

  // Proceed to the next step
  nextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  // Go back to previous step
  prevStep = () => {
    this.setState({ step: this.state - 1 });
  };

  validate = () => {
    const data = this.state;
    const { profile: profileData } = data;

    // Check if it's a valid date object
    if (
      !profileData["birthdate"] ||
      isNaN(profileData["birthdate"].getFullYear()) ||
      profileData["birthdate"].getFullYear() > new Date().getFullYear()
    ) {
      this.setState({ errors: { birthdate: true } });
    } else {
      const errors = this.state.errors;
      delete errors["birthdate"];
      this.setState({ errors });
    }

    // => false -> there are errors
    // => true -> there are NO errors
    return !Object.keys(this.state.errors).length;
  };

  handleDateChange = (date) => {
    // The date picker return the a date obj when a change event fires off(that what the Material Date Picker does, 3rd party library)
    // Sets it in the full format(time & date), and only extracts the date components when submitting the form to the back-end API
    const profile = { ...this.state.profile };
    profile["birthdate"] = date;
    this.setState({ profile });
  };

  // When the user clicks on the next step except the current one(before it) OR the submit button(sign-up button in this case)
  // Check if the custom inputs(date in this case) is validated --- Do the same w/ other inputs as well

  // Handle fields change
  handleChange = (event) => {
    if (event.target.type === "checkbox") {
      const profile = { ...this.state.profile };
      profile["smokingCheckBox"] = event.target.checked;
      this.setState({ profile });
      return;
    }

    const propertyName = event.target.name;
    const value = event.target.value;

    // Check if the property is part of the profile data
    if (this.state.profile.hasOwnProperty([propertyName])) {
      const profile = { ...this.state.profile };
      profile[propertyName] = value;
      this.setState({ profile });
    } else {
      this.setState({ [propertyName]: value });
    }
  };

  // Handle the password visibility icon
  handlePasswordVis = (event) => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  renderStep = () => {
    switch (this.state.step) {
      case 1:
        return (
          <PersonalInfoForm
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleDateChange={this.handleDateChange}
            values={this.state}
          />
        );
      case 2:
        return (
          <HealthInfo
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={this.state}
            handleChange={this.handleChange}
          />
        );
      case 3:
        return (
          <DemographicsInfo
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={this.state}
            handleChange={this.handleChange}
          />
        );
      case 4:
        return (
          <EmailInfo
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={this.state}
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
          main: "#12a2f9",
        },
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <div className="box">
          <div className="container d-flex justify-content-center">
            <BtnGroup signupSelected={true} signinSelected={false} />
          </div>
          <ValidatorForm instantValidate onSubmit={this.handleSubmit}>
            <TransitionGroup component={null}>
              <CSSTransition
                key={this.state.step}
                in={true}
                timeout={500}
                appear={true}
                classNames="slide"
              >
                {this.renderStep()}
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
                type="submit"
              >
                Sign up
              </button>
            </div>
          </ValidatorForm>
        </div>
      </ThemeProvider>
    );
  }
}

export default SignupBox;

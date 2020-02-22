import React from "react";
import BtnGroup from "../common/button-group";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import PersonalInfoForm from "./formPersonalInfo";
import HealthInfo from "./formHealthInfo";
import DemographicsInfo from "./formDemographics";
import EmailInfo from "./formEmailInfo";
import ProgressBar from "../common/progressBar";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Joi from "@hapi/joi";

import http from "../../services/httpService";
import config from "../../config.json";
// import { ToastContainer } from "react-toastify";

class SignupBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      profile: {
        gender: "",
        birthdate: this.getDateFormat(new Date()),
        phoneNum: "",
        prevDiseases: "",
        smokingCheckBox: false,
        weight: "",
        height: "",
        country: "",
        city: ""
      },
      errors: {}
    };

    // The only current(at the time) valid way of extracting the keys of the schema object since relying on the internals of Joi is hacky and can result in future errors -- this way is safer
    this.validators = {
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: {
            allow: [
              "com",
              "net",
              "io",
              "info",
              "gov",
              "edu",
              "us",
              "uk",
              "org",
              "info",
              "tech",
              "dev"
            ]
          }
        })
        .required()
        .label("Email"),
      username: Joi.string()
        .alphanum()
        .min(4)
        .max(150)
        .required()
        .label("Username"),
      // A regex that matches passwords w/ at least one letter, symbol, and digit, between (8-128) characters
      password: Joi.string()
        .pattern(
          new RegExp(
            "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#? ]{8,128}$"
          )
        )
        .required()
        .label("Password"),
      confirmPassword: Joi.ref("password"),
      phoneNum: Joi.string()
        // A regex that would matches regular phone number along w/ country codes as well
        .pattern(
          new RegExp(
            "^(\\(?\\+\\d{2}\\)?)?\\s?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4,}$"
          )
        )
        .required()
        .label("Phone Number"),
      country: Joi.string()
        .required()
        .label("Country"),
      city: Joi.string()
        .required()
        .label("City")
    };

    this.schema = Joi.object(this.validators);
  }

  getDateFormat(timeDate) {
    return timeDate.toISOString().split("T")[0];
  }

  // Handle the progress bar change event
  handleProgressChange = ev => {
    // Getting the last num of the id to identify the steps
    const desiredStep = Number(ev.target.id);
    this.setState({ step: desiredStep });
  };

  handleSubmit = async () => {
    if (this.state.step < 4) {
      this.nextStep();
      return;
    }

    if (this.validate()) return;

    const endPoint = `${config.apiEndpoint}/accounts/register`;
    // Call the back end and re-direct towards the homie
    const { data: response } = await http.post(endPoint, this.inputFields);
    console.log(response);
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
    const {
      email,
      username,
      password,
      confirmPassword,
      profile: { phoneNum, country, city }
    } = this.state;

    const {
      error: { details }
    } = this.schema.validate(
      { email, username, password, confirmPassword, phoneNum, country, city },
      { abortEarly: false }
    );

    const errors = { ...this.state.errors };
    details.forEach(error => {
      errors[error.path[0]] = error.message;
    });

    this.setState({ errors });

    return Object.keys(errors).length;
  };

  validatePropertyInput = element => {
    const validationOpts = { abortEarly: true };
    const schema = Joi.object({
      [element.name]: this.validators[element.name]
    });

    const { error } = schema.validate(
      { [element.name]: element.value },
      validationOpts
    );

    return !error ? undefined : error.details[0];
  };

  // Handle fields change
  handleChange = event => {
    // Validation goes here...
    if (event.target) {
      const target = event.target;
      const errors = { ...this.state.errors };
      const error = this.validatePropertyInput(target);

      if (error) errors[target.name] = error.message;
      else delete errors[target.name];

      this.setState({ errors });
    }

    // The date picker return the a date obj when a change event fires off(At least that what the Material Date Picker does)
    // The condition down here is put to deal w/ this specific case and get the date separate from the time
    if (!event.target) {
      const profile = { ...this.state.profile };
      profile["birthdate"] = this.getDateFormat(event);
      this.setState({ profile });
      return;
    }

    // Check if the event raised was from an type checkbox w/ checked property
    if (event.target.type === "checkbox") {
      const profile = { ...this.state.profile };
      profile["smokingCheckBox"] = event.target.checked;
      this.setState({ profile });
      return;
    }

    const propertyName = event.target.name;
    const value = event.target.value;

    event.persist();

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
  handlePasswordVis = event => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  getMarkup = () => {
    switch (this.state.step) {
      case 1:
        return (
          <PersonalInfoForm
            nextStep={this.nextStep}
            handleChange={this.handleChange}
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

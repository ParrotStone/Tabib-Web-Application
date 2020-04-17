import React from "react";
import { Redirect } from "react-router-dom";
import BtnGroup from "../common/button-group";
import { ValidatorForm } from "react-material-ui-form-validator";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PersonalInfoForm from "./formPersonalInfo";
import HealthInfo from "./formHealthInfo";
import DemographicsInfo from "./formDemographics";
import EmailInfo from "./formEmailInfo";
import ProgressBar from "../common/progressBar";

import userService from "../../services/userService";
import auth from "../../services/authService";
import utils from "../../utils.js";

class SignupBox extends React.Component {
  constructor(props) {
    super(props);

    // Configure this later, when integrating the Privacy-Policy/Terms-of-use, and of course once the re-defined homepage has been created/integrated
    // // Calculating the minimum year(allowed for birthdate value) to dis-allow users less than 13 years old(COPPA law)
    // this.maxDateToRegister = new Date(`12-31-${new Date().getFullYear() - 13}`);

    this.state = {
      step: 1,
      email: "",
      username: "",
      password: "",
      showPassword: false,
      profile: {
        gender: "M",
        birthdate: new Date(),
        phoneNum: "",
        prevDiseases: "",
        smokingCheckBox: false,
        weight: 0,
        height: 0,
        country: "",
        city: "",
      },
      isSubmitting: false,
      errors: {},
    };
  }

  // Handle the progress bar change event
  handleProgressChange = (ev) => {
    // If the form is invalid show info msg and not proceed to the next step
    // The handleSubmit method will handle the next step(not previous step)
    if (ev.target.id > this.state.step) {
      // Dispatching an event
      // Hacky way to dispatch the event(changing its type since React relies on Synthetic events and not native events)
      // Replace below code w/ a more robust one later -- The event dispatched/passed here is not really a form submission one and thus, this code is kinda obselete -- Figure it out quickly before release
      ev.type = "submit";
      this.form.submit(ev);
      return;
    }

    // Getting the last num of the id to identify the steps
    const desiredStep = Number(ev.target.id);
    this.setState({ step: desiredStep });
  };

  formatUserData = () => {
    let {
      email,
      username: name,
      password,
      profile: {
        gender,
        birthdate: dateOfBirth,
        phoneNum: phone,
        smokingCheckBox: smoking,
        weight,
        height,
        country,
        city,
      },
    } = this.state;

    dateOfBirth = utils.getDateFormat(dateOfBirth);
    console.log(dateOfBirth);
    // Adding the Egypt country code for the phone number
    phone = "20" + phone;

    return {
      email,
      name,
      password,
      conffPassword: password,
      profile: {
        gender,
        dateOfBirth,
        phone,
        smoking,
        weight,
        height,
        country,
        city,
      },
    };
  };

  handleSubmit = async (ev) => {
    ev.preventDefault();

    // Prevent proceeding to the next step -- unless there're no errors whatsoever in the current step
    if (this.validateDate()) {
      utils.notify("info", "Please check your inputs again!");
      return;
    }

    if (this.state.step < 4) {
      this.nextStep();
      return;
    }

    const userData = this.formatUserData();
    this.setState({ isSubmitting: true });

    // Register a user here, and then redirect him to the damn (homie OR the login page)
    try {
      // const {
      //   data: { email, password },
      // } = await userService.register(userData);
      const response = await userService.register(userData);
      const email = response.data.email;
      const password = response.data.password;
      const loginRes = await auth.login({ email, password });
      console.log(response);
      console.log(loginRes);
      //       const {
      //   data: { access, refresh },
      // } = await auth.login({ response.data.email, response.data.password });

      const usrRes = await userService.getUserProfile(
        loginRes.data.access,
        loginRes.data.refresh
      );

      console.log(usrRes);

      localStorage.setItem("access-token", loginRes.data.access);
      localStorage.setItem("refresh-token", loginRes.data.refresh);
      localStorage.setItem("user", JSON.stringify(usrRes.data));
      this.setState({ isSubmitting: false });

      // Figure out how to add the message below correcly(commented because the damn waiting(after the submitting spinner icon disappear) will enter the main page instantly, thus, the alert below is absolete -- Solve it correctly(probably after the user has already arrived at the homepage))
      // utils.notify("success", "Registered Successfully!");

      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = ex.response.data;
        const errorsMsg = this.extractErrors(errors);
        this.setState({ isSubmitting: false });
        utils.notify("error", errorsMsg);
      }
    }
  };

  // Extract errors from response obj(given it's an expected error)
  // In case of multiple errors, it's configured to report either (profile/other-data) errors -- and so, it doesn't show all the errors at once, for UX convenience...Nothing more or less.
  // Extract this function later
  extractErrors = (errors) => {
    let errorsMsg = "";
    if (errors["profile"]) {
      const { profile } = errors;
      for (const key in profile) {
        errorsMsg += `${profile[key][0]}\n`;
      }
    } else {
      for (const key in errors) {
        errorsMsg += `${errors[key][0]}\n`;
      }
    }

    return errorsMsg;
  };

  // Proceed to the next step
  nextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  // Go back to previous step
  prevStep = () => {
    this.setState({ step: this.state - 1 });
  };

  validateDate = () => {
    const {
      profile: { birthdate },
    } = this.state;

    // const isEligible =
    //   new Date().getFullYear() - this.maxDateToRegister.getFullYear() >= 13;

    const errors = this.state.errors;

    // Check if it's a valid date object -- Modify this condition w/ a newer better validation later
    if (
      !birthdate ||
      isNaN(birthdate.getFullYear()) ||
      birthdate.getFullYear() > new Date().getFullYear()
    ) {
      errors["birthdate"] = true;
      this.setState({ errors });
    } else {
      delete errors["birthdate"];
      this.setState({ errors });
    }

    return errors["birthdate"];
  };

  handleDateChange = (date) => {
    // The date picker return the a date obj when a change event fires off(that what the Material Date Picker does, 3rd party library)
    // Sets it in the full format(time & date), and only extracts the date components when submitting the form to the back-end API
    const profile = { ...this.state.profile };
    profile["birthdate"] = date;
    this.setState({ profile });
  };

  // When the user clicks on the next step except the current one(before it) OR the submit button(sign-up button in this case)

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
            maxDateToRegister={this.maxDateToRegister}
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
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    const { step, isSubmitting } = this.state;

    return (
      <div className="box">
        <div className="container d-flex justify-content-center">
          <BtnGroup signupSelected={true} signinSelected={false} />
        </div>
        <ValidatorForm
          instantValidate
          onSubmit={this.handleSubmit}
          ref={(ele) => (this.form = ele)}
          autoComplete="on"
        >
          <TransitionGroup component={null}>
            <CSSTransition
              key={step}
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
                currentStep={step}
                handleProgressChange={this.handleProgressChange}
              />
            </div>
            <button
              className="btn custom-submit-btn d-block mt-3 mx-auto"
              type="submit"
              disabled={isSubmitting}
            >
              <span className={`${isSubmitting ? "d-none" : "d-block"}`}>
                Sign up
              </span>
              <div
                className={`${
                  isSubmitting ? "spinner-border spinner-border-sm" : "d-none"
                }`}
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </button>
          </div>
        </ValidatorForm>
      </div>
    );
  }
}

export default SignupBox;

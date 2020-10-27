import React from 'react';
import { Redirect } from 'react-router-dom';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import FormPersonalInfo from './FormPersonalInfo';
import FormHealthInfo from './FormHealthInfo';
import FormDemographicsInfo from './FormDemographicsInfo';
import FormEmailInfo from './FormEmailInfo';
import ProgressBar from '../../common/ProgressBar';
import MaterialSpinner from '../../common/MaterialSpinner';

import userService from '../../../services/UserService';
import auth from '../../../services/AuthService';
import utils from '../../../utils.js';

class SignupBox extends React.Component {
  constructor(props) {
    super(props);

    // Configure this later, when integrating the Privacy-Policy/Terms-of-use, and of course once the re-defined homepage has been created/integrated
    // // Calculating the minimum year(allowed for birthdate value) to dis-allow users less than 13 years old(COPPA law)
    // this.maxDateToRegister = new Date(`12-31-${new Date().getFullYear() - 13}`);

    this.state = {
      step: 1,
      email: '',
      username: '',
      password: '',
      showPassword: false,
      profile: {
        gender: 'M',
        birthdate: new Date(),
        phoneNum: '',
        smokingCheckBox: false,
        weight: 0,
        height: 0,
        country: 'Egypt',
        city: 'Alexandria',
      },
      isSubmitting: false,
      errors: {},
    };
  }

  // Handle the progress bar change event
  handleProgressChange = (ev) => {
    // If the form is invalid show info msg and don't proceed to the next step
    // The handleSubmit method will handle the next step(not previous step(s))
    if (ev.target.id > this.state.step) {
      this.form.submit();
      return;
    }

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
    // Adding the Egypt country code for the phone number
    phone = '20' + phone;

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
    // Prevent proceeding to the next step -- unless there're no errors whatsoever in the current step(date input field)
    if (this.validateDate()) {
      utils.notify('info', 'Please check your inputs again!');
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
      const {
        data: { email, password },
      } = await userService.register(userData);
      const {
        data: { access, refresh },
      } = await auth.login({ email, password });

      const { data: user } = await userService.getUserProfile(access, refresh);

      utils.persistUserDetails(access, refresh, user);
      this.setState({ isSubmitting: false });

      // Figure out how to add the message below correcly(commented because the damn waiting(after the submitting spinner icon disappear) will enter the main page instantly, thus, the alert below is absolete -- Solve it correctly(probably after the user has already arrived at the homepage))
      // utils.notify("success", "Registered Successfully!");

      window.location = '/';
    } catch (ex) {
      // Revert the state to its original state.(Helps with whether the error was expected or not)
      this.setState({ isSubmitting: false });
      utils.reportUserErrors(ex);
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
      errors['birthdate'] = true;
      this.setState({ errors });
    } else {
      delete errors['birthdate'];
      this.setState({ errors });
    }

    return errors['birthdate'];
  };

  handleDateChange = (date) => {
    // The date picker return the a date obj when a change event fires off(that what the Material Date Picker does, 3rd party library)
    // Sets it in the full format(time & date), and only extracts the date components when submitting the form to the back-end API
    const profile = { ...this.state.profile };
    profile['birthdate'] = date;
    this.setState({ profile });
  };

  // Handle fields change
  handleChange = ({ target }) => {
    const profile = { ...this.state.profile };
    const propertyName = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    // Check if the property is part of the profile data(obj)
    if (this.state.profile.hasOwnProperty([propertyName])) {
      profile[propertyName] = value;
      this.setState({ profile });
      return;
    }

    this.setState({ [propertyName]: value });
  };

  // Handle the password visibility icon
  handlePasswordVis = (event) => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  renderStep = () => {
    switch (this.state.step) {
      case 1:
        return (
          <FormPersonalInfo
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleDateChange={this.handleDateChange}
            values={this.state}
            maxDateToRegister={this.maxDateToRegister}
          />
        );
      case 2:
        return (
          <FormHealthInfo
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={this.state}
            handleChange={this.handleChange}
          />
        );
      case 3:
        return (
          <FormDemographicsInfo
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={this.state}
            handleChange={this.handleChange}
          />
        );
      case 4:
        return (
          <FormEmailInfo
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
    if (auth.getCurrentUser()) return <Redirect to='/' />;

    const { step, isSubmitting } = this.state;
    return (
      <ValidatorForm
        instantValidate
        onSubmit={this.handleSubmit}
        ref={(ele) => (this.form = ele)}
        autoComplete='on'
      >
        <TransitionGroup component={null}>
          <CSSTransition
            key={step}
            in={true}
            appear={true}
            timeout={500}
            classNames='fade-in'
          >
            <React.Fragment>
              {this.renderStep()}
              <div className='mt-5'>
                <ProgressBar
                  currentStep={step}
                  handleProgressChange={this.handleProgressChange}
                />
                <button
                  className='btn custom-submit-btn d-block mt-3 mx-auto'
                  type='submit'
                  disabled={isSubmitting}
                >
                  <span className={`${isSubmitting ? 'd-none' : 'd-block'}`}>
                    {step >= 4 ? 'Sign up' : 'Next'}
                  </span>
                  <MaterialSpinner
                    size={20}
                    thickness={4}
                    className={`mx-3 ${
                      isSubmitting ? 'd-block' : 'd-none'
                    } text-white`}
                  />
                </button>
              </div>
            </React.Fragment>
          </CSSTransition>
        </TransitionGroup>
      </ValidatorForm>
    );
  }
}

export default SignupBox;

import React from "react";
import ButtonGroup from "../common/ButtonGroup";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Grid from "@material-ui/core/Grid";
import EmailIcon from "@material-ui/icons/Email";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import LockIcon from "@material-ui/icons/Lock";
import { Redirect, Link } from "react-router-dom";
import MaterialSpinner from "../common/MaterialSpinner";
import auth from "../../services/AuthService";
import userService from "../../services/UserService";
import { reportUserErrors } from "../../utils.js";

class LoginBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      showPassword: false,
      isSubmitting: false,
    };
  }

  handleSubmit = async () => {
    this.setState({ isSubmitting: true });
    const { email, password } = this.state;

    try {
      // const {
      //   data: { access, refresh },
      // } = await auth.login({ email, password });
      const response = await auth.login({ email, password });
      // const { data: user } = await userService.getUserProfile(access, refresh);
      const usrResponse = await userService.getUserProfile(
        response.data.access,
        response.data.refresh
      );
      console.log(response);
      console.log(usrResponse);

      localStorage.setItem("access-token", response.data.access);
      localStorage.setItem("refresh-token", response.data.refresh);
      localStorage.setItem("user", JSON.stringify(usrResponse.data));
      this.setState({ isSubmitting: false });

      // Find a better a way to redirect the user using the(history(the location(pathname stuff)) obj provided by React Router DOM) -- (this.props.history here resolves to undefined(find out why))
      window.location = "/";
    } catch (ex) {
      // Revert the state to its original state.
      this.setState({ isSubmitting: false });
      reportUserErrors(ex);
    }
  };

  // Handle fields change
  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  // Handle the password visibility icon
  handlePasswordVis = (event) => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    const { email, password, showPassword, isSubmitting } = this.state;

    return (
      <div className="box">
        <div className="container d-flex justify-content-center">
          <ButtonGroup signupSelected={false} signinSelected={true} />
        </div>
        <div
          className="container-fluid d-flex flex-column justify-content-center align-items-center"
          style={{ height: "90%" }}
        >
          <ValidatorForm
            instantValidate
            onSubmit={this.handleSubmit}
            className="w-100"
            autoComplete="on"
          >
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item className="w-100">
                <TextValidator
                  id="email"
                  label="Email"
                  name="email"
                  fullWidth
                  autoComplete="email"
                  onChange={this.handleChange}
                  value={email}
                  type="email"
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "This field is required",
                    "Please enter a valid email",
                  ]}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end" className="mt-5">
              <Grid item className="w-100">
                <TextValidator
                  id="password"
                  label="Password"
                  name="password"
                  fullWidth
                  autoComplete="current-password"
                  onChange={this.handleChange}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={this.handlePasswordVis}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid>
              <button
                className="btn custom-submit-btn d-block mt-5 mx-auto"
                type="submit"
                disabled={isSubmitting}
              >
                <span className={`${isSubmitting ? "d-none" : "d-block"}`}>
                  Log in
                </span>
                <MaterialSpinner
                  size={20}
                  thickness={4}
                  className={`mx-3 ${
                    isSubmitting ? "d-block" : "d-none"
                  } text-white`}
                />
              </button>
              <Link
                className="d-block mx-auto mt-3 text-center pass-reset-link"
                to="reset-password"
              >
                Forgot Password?
              </Link>
            </Grid>
          </ValidatorForm>
        </div>
      </div>
    );
  }
}

export default LoginBox;

import React from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Grid from "@material-ui/core/Grid";
import EmailIcon from "@material-ui/icons/Email";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import LockIcon from "@material-ui/icons/Lock";
import FormControl from "@material-ui/core/FormControl";

class EmailInfo extends React.Component {
  componentDidMount() {
    console.log(this.props.values["password"]);
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      return value === this.props.values["password"];
    });
  }

  render() {
    const {
      email,
      password,
      showPassword,
      confirmPassword,
    } = this.props.values;

    const { handleChange, handlePasswordVis } = this.props;

    return (
      <React.Fragment>
        <div className="container-fluid mt-3">
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item className="w-100">
              <TextValidator
                id="email"
                label="Email"
                name="email"
                fullWidth
                onChange={handleChange}
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
            <small className="form-text text-muted input-info w-100 ml-2 text-left">
              We'll never share your email with anyone else
            </small>
          </Grid>
          <Grid container spacing={1} alignItems="flex-end" className="mt-4">
            <Grid item className="w-100">
              <TextValidator
                id="password"
                label="Password"
                name="password"
                fullWidth
                onChange={handleChange}
                value={password}
                type={showPassword ? "text" : "password"}
                validators={[
                  "required",
                  "minStringLength:8",
                  // A regex that matches passwords w/ at least one letter, symbol, and a digit, between (8-128) character length
                  "matchRegexp:^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#? ]{8,128}$",
                  "maxStringLength:128",
                ]}
                errorMessages={[
                  "This field is required",
                  "Password length must be at least 8 characters",
                  "Password must contain at least one letter, symbol and a digit",
                  "Password maximum length cannot exceed 128 characters",
                ]}
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
                        onClick={handlePasswordVis}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="flex-end" className="mt-5">
            <Grid item className="w-100">
              <TextValidator
                id="confirm-password"
                label="Confirm Password"
                name="confirmPassword"
                fullWidth
                onChange={handleChange}
                value={confirmPassword}
                type={showPassword ? "text" : "password"}
                validators={[
                  "required",
                  "minStringLength:8",
                  // A regex that matches passwords w/ at least one letter, symbol, and a digit, between (8-128) character length
                  "matchRegexp:^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#? ]{8,128}$",
                  "maxStringLength:128",
                  "isPasswordMatch",
                ]}
                errorMessages={[
                  "This field is required",
                  "Password length must be at least 8 characters",
                  "Password must contain at least one letter, symbol and a digit",
                  "Password maximum length cannot exceed 128 characters",
                  "Password don't match",
                ]}
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
                        onClick={handlePasswordVis}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default EmailInfo;

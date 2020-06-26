import React from "react";
import { TextValidator } from "react-material-ui-form-validator";
import Grid from "@material-ui/core/Grid";
import EmailIcon from "@material-ui/icons/Email";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import LockIcon from "@material-ui/icons/Lock";

class FormEmailInfo extends React.Component {
  render() {
    const { email, password, showPassword } = this.props.values;
    const { handleChange, handlePasswordVis } = this.props;

    return (
      <React.Fragment>
        <div className="container-fluid" style={{ marginTop: "70px" }}>
          <Grid container spacing={1} alignItems="flex-end" className="mt-5">
            <Grid item className="w-100">
              <TextValidator
                id="email"
                label="Email"
                name="email"
                fullWidth
                autoComplete="email"
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
          <Grid container spacing={1} alignItems="flex-end" className="mt-5">
            <Grid item className="w-100">
              <TextValidator
                id="password"
                label="Password"
                name="password"
                fullWidth
                autoComplete="new-password"
                onChange={handleChange}
                value={password}
                type={showPassword ? "text" : "password"}
                validators={[
                  "required",
                  "minStringLength:8",
                  // A regex that matches passwords w/ at least one letter, symbol, and a digit, between (8-128) character length
                  "matchRegexp:^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@_$!'\"`^%*#?&\\-])[A-Za-z\\d@_$'\"`^!%*#?&\\- ]{8,128}$",
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
        </div>
      </React.Fragment>
    );
  }
}

export default FormEmailInfo;

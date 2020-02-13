import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import EmailIcon from "@material-ui/icons/Email";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import LockIcon from "@material-ui/icons/Lock";

class EmailInfo extends React.Component {
  render() {
    const {
      email,
      password,
      showPassword,
      confirmPassword
    } = this.props.values;

    return (
      <React.Fragment>
        <div className="container-fluid mt-5">
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <EmailIcon color="primary" />
            </Grid>
            <Grid item style={{ width: "400px" }}>
              <TextField
                id="email"
                label="Email"
                name="email"
                fullWidth
                onChange={this.props.handleChange}
                defaultValue={email}
                type="email"
              />
            </Grid>
            <small className="form-text text-muted input-info">
              We'll never share your email with anyone else
            </small>
          </Grid>
          <Grid container spacing={1} alignItems="flex-end" className="mt-4">
            <Grid item>
              <LockIcon color="primary" />
            </Grid>
            <Grid item style={{ width: "400px" }}>
              <TextField
                id="password"
                type={showPassword ? "text" : "password"}
                defaultValue={password}
                label="Password"
                fullWidth
                onChange={this.props.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={this.props.handleChange}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="flex-end" className="mt-4">
            <Grid item>
              <LockIcon color="primary" />
            </Grid>
            <Grid item style={{ width: "400px" }}>
              <TextField
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                defaultValue={confirmPassword}
                label="Confirm Password"
                fullWidth
                onChange={this.props.handleChange}
              />
            </Grid>
          </Grid>
          <button
            className="btn signup-btn d-block mt-4 mx-auto"
            onClick={() => this.props.nextStep()}
          >
            Sign up
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default EmailInfo;

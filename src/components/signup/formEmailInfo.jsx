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
import FormControl from "@material-ui/core/FormControl";

class EmailInfo extends React.Component {
  render() {
    const {
      email,
      password,
      showPassword,
      confirmPassword
    } = this.props.values;

    const { handleChange, handlePasswordVis } = this.props;

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
                onChange={handleChange}
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
            <Grid item>
              <FormControl style={{ width: "390px" }}>
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  defaultValue={password}
                  label="Password"
                  name="password"
                  fullWidth
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handlePasswordVis}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="flex-end" className="mt-4">
            <Grid item>
              <LockIcon color="primary" />
            </Grid>
            <Grid item>
              <FormControl style={{ width: "390px" }}>
                <InputLabel htmlFor="standard-adornment-password">
                  Confirm Password
                </InputLabel>
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  defaultValue={confirmPassword}
                  label="Confirm Password"
                  fullWidth
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handlePasswordVis}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default EmailInfo;

import React from "react";
import BtnGroup from "../common/button-group";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
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
import { Link } from "react-router-dom";

class SigninBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      showPassword: false
    };
  }

  handleSubmit = () => {
    // Call the back end and re-direct towards the homie
    console.log("Here's the data");
  };

  // Handle fields change
  handleChange = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  // Handle the password visibility icon
  handlePasswordVis = event => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const { email, password, showPassword } = this.state;

    // Customize the colors of the form
    // Trying to assemble the theme customization in one place for more maintainbility(in the index.js(the root file))
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: "#12a2f9"
        }
      }
    });

    return (
      <ThemeProvider theme={theme}>
        <div className="box">
          <div className="container d-flex justify-content-center">
            <BtnGroup signupSelected={false} signinSelected={true} />
          </div>
          <div
            className="container-fluid d-flex flex-column justify-content-center align-items-center"
            style={{ height: "90%" }}
          >
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
                  onChange={this.handleChange}
                  defaultValue={email}
                  type="email"
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end" className="mt-5">
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
                    onChange={this.handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={this.handlePasswordVis}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid>
              <button
                className="btn signup-btn d-block mt-5 mx-auto"
                onClick={this.handleSubmit}
              >
                Log in
              </button>
              <Link
                className="d-block mx-auto mt-3 text-center pass-reset-link"
                to="reset-password"
              >
                Forgot Password?
              </Link>
            </Grid>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default SigninBox;

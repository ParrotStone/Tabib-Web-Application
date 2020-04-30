import React from "react";
import "date-fns";
import { TextValidator } from "react-material-ui-form-validator";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import PhoneIcon from "@material-ui/icons/Phone";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class FormPersonalInfo extends React.Component {
  render() {
    const {
      username,
      profile: { gender, birthdate, phoneNum },
    } = this.props.values;

    // const { maxDateToRegister } = this.props;

    return (
      <React.Fragment>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="container-fluid d-flex flex-column align-items-center mt-3">
            <Grid container spacing={1} alignItems="center">
              <Grid item className="w-100">
                <TextValidator
                  id="username"
                  label="Username"
                  name="username"
                  fullWidth
                  validators={["required", "isString", "minStringLength:4"]}
                  errorMessages={[
                    "This field is required",
                    "Username must be a valid text",
                    "Username length must be a minimum of 4 characters",
                  ]}
                  onChange={this.props.handleChange}
                  value={username}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              direction="row"
              alignItems="center"
              className="mt-4"
            >
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={gender}
                onChange={this.props.handleChange}
                className="d-flex flex-row justify-content-between w-100 ml-2"
              >
                <FormControlLabel
                  value="M"
                  control={<Radio color="primary" />}
                  label="Male"
                />
                <FormControlLabel
                  value="F"
                  control={<Radio color="primary" />}
                  label="Female"
                />
              </RadioGroup>
            </Grid>
            <Grid container spacing={1} direction="column">
              <Grid item className="w-100">
                <KeyboardDatePicker
                  className="mt-3"
                  format="MM/dd/yyyy"
                  margin="normal"
                  fullWidth
                  disableFuture
                  maxDateMessage={`Date cannot exceed ${new Date().getFullYear()}`}
                  id="date-picker-dialog"
                  label="Birthdate"
                  name="birthdate"
                  value={birthdate}
                  onChange={this.props.handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} className="mt-4" alignItems="center">
              <Grid item className="w-100">
                <TextValidator
                  id="phoneNum"
                  label="Phone Number"
                  name="phoneNum"
                  value={phoneNum}
                  onChange={this.props.handleChange}
                  type="tel"
                  validators={[
                    "required",
                    "isNumber",
                    "matchRegexp:^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$",
                  ]}
                  errorMessages={[
                    "This field is required",
                    "Invalid input format",
                    "Phone number must be in (xxx-xxx-xxxx) format",
                  ]}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="start">(+20)</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </MuiPickersUtilsProvider>
      </React.Fragment>
    );
  }
}

export default FormPersonalInfo;

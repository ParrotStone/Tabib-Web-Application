import React from "react";
import { TextValidator } from "react-material-ui-form-validator";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class FormPersonalInfo extends React.Component {
  render() {
    const {
      username,
      profile: { gender, birthdate },
    } = this.props.values;

    // const { maxDateToRegister } = this.props;

    return (
      <React.Fragment>
        <div className="container-fluid d-flex flex-column align-items-center mt-4">
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
            className="mt-5"
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
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className="mt-5"
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
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default FormPersonalInfo;

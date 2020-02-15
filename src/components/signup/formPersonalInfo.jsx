import React from "react";
import "date-fns";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import PhoneIcon from "@material-ui/icons/Phone";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class PersonalInfoForm extends React.Component {
  render() {
    const { username, gender, birthdate, phoneNum } = this.props.values;
    return (
      <React.Fragment>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="container-fluid d-flex flex-column align-items-center mt-3">
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <AccountCircle color="primary" />
              </Grid>
              <Grid item style={{ width: "400px" }}>
                <TextField
                  id="username"
                  label="Username"
                  name="username"
                  fullWidth
                  onChange={this.props.handleChange}
                  defaultValue={username}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              direction="row"
              alignItems="center"
              className="mt-4"
              style={{ width: "440px" }}
            >
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={gender}
                onChange={this.props.handleChange}
                className="d-flex flex-row justify-content-between w-100 ml-3"
              >
                <FormControlLabel
                  value="male"
                  control={<Radio color="primary" />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio color="primary" />}
                  label="Female"
                />
              </RadioGroup>
            </Grid>
            <Grid
              container
              spacing={1}
              direction="column"
              style={{ width: "420px" }}
            >
              <Grid item>
                <KeyboardDatePicker
                  className="mt-4 ml-2"
                  format="MM/dd/yyyy"
                  margin="normal"
                  fullWidth={true}
                  id="date-picker-dialog"
                  label="Birthdate"
                  name="birthdate"
                  value={birthdate}
                  onChange={this.props.handleChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end" className="mt-3">
              <Grid item>
                <PhoneIcon color="primary" />
              </Grid>
              <Grid item style={{ width: "400px" }}>
                <TextField
                  id="phoneNum"
                  label="Phone Number"
                  name="phoneNum"
                  value={phoneNum}
                  onChange={this.props.handleChange}
                  type="tel"
                  fullWidth
                />
              </Grid>
            </Grid>
          </div>
        </MuiPickersUtilsProvider>
      </React.Fragment>
    );
  }
}

export default PersonalInfoForm;

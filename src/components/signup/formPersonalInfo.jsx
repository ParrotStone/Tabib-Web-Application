import React from "react";
import "date-fns";
// import { makeStyles } from "@material-ui/core/styles";
// import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

class PersonalInfoForm extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="container-fluid d-flex justify-content-center mt-4">
            <Grid
              container
              spacing={1}
              direction="column"
              alignItems="flex-center"
              style={{ width: "400px" }}
            >
              <Grid item>
                <AccountCircle color="primary" />
              </Grid>
              <Grid item style={{ width: "350px" }}>
                <TextField
                  id="input-with-icon-grid"
                  label="Name"
                  fullWidth={true}
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={1}
              direction="column"
              alignItems="flex-center"
              style={{ width: "400px" }}
            >
              <Grid item>
                <KeyboardDatePicker
                  // style={{ width: "350px" }}
                  className="mt-4"
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  fullWidth={true}
                  id="date-picker-inline"
                  label="Birthdate"
                  value={this.props.birthdate}
                  onChange={this.handleChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
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

export default PersonalInfoForm;

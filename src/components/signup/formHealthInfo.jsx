import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";

import InputAdornment from "@material-ui/core/InputAdornment";

class HealthInfo extends React.Component {
  render() {
    const { prevDiseases, smokingCheckBox, weight } = this.props.values;

    return (
      <React.Fragment>
        <div className="container-fluid mt-5">
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AddIcon color="primary" />
            </Grid>
            <Grid item style={{ width: "400px" }}>
              <TextField
                id="old-diseases"
                label="Previous Diseases"
                name="prevDiseases"
                fullWidth
                onChange={this.props.handleChange}
                defaultValue={prevDiseases}
              />
            </Grid>
            <small className="form-text text-muted input-info">
              Add here previous diseases separated with commas
            </small>
          </Grid>
          <Grid
            container
            spacing={1}
            alignItems="flex-end"
            className="mt-4 ml-2"
          >
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Smoking"
              value={smokingCheckBox}
              onChange={this.props.handleChange}
              labelPlacement="end"
            />
          </Grid>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <FitnessCenterIcon color="primary" />
            </Grid>
            <Grid item style={{ width: "400px" }}>
              <TextField
                id="weight"
                label="Weight"
                name="weight"
                fullWidth
                onChange={this.props.handleChange}
                defaultValue={weight}
                type="number"
                InputProps={{
                  inputProps: { min: 1, max: 300 },
                  endAdornment: (
                    <InputAdornment position="end">Kg</InputAdornment>
                  )
                }}
              />
            </Grid>
            <small className="form-text text-muted input-info">
              Type in your weight in Kilos(kg) OR Pounds(lbs)
            </small>
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

export default HealthInfo;

import React from "react";
import { TextValidator } from "react-material-ui-form-validator";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import InputAdornment from "@material-ui/core/InputAdornment";

class FormHealthInfo extends React.Component {
  render() {
    const {
      profile: { prevDiseases, smokingCheckBox, weight },
    } = this.props.values;

    return (
      <React.Fragment>
        <div className="container-fluid mt-5">
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item className="w-100">
              <TextValidator
                id="old-diseases"
                label="Previous Diseases"
                name="prevDiseases"
                fullWidth
                validators={["isString"]}
                errorMessages={["Input must be a valid text"]}
                onChange={this.props.handleChange}
                value={prevDiseases}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AddIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <small className="form-text text-muted input-info ml-2 w-100 text-left">
              Add here previous diseases separated by commas
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
              checked={smokingCheckBox}
              onChange={this.props.handleChange}
              labelPlacement="end"
            />
          </Grid>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item className="w-100 mt-4">
              <TextValidator
                id="weight"
                label="Weight"
                name="weight"
                fullWidth
                validators={[
                  "required",
                  "isNumber",
                  "minNumber:1",
                  "maxNumber:130",
                ]}
                errorMessages={[
                  "This field is required",
                  "Input must be a valid number",
                  "Weight must be larger than 1Kg",
                  "Weight must be less than 130Kg",
                ]}
                onChange={this.props.handleChange}
                value={weight ? weight : ""}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FitnessCenterIcon color="primary" />
                    </InputAdornment>
                  ),
                  inputProps: { min: 1, max: 130 },
                  endAdornment: (
                    <InputAdornment position="end">Kg</InputAdornment>
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

export default FormHealthInfo;

import React from "react";
import { TextValidator } from "react-material-ui-form-validator";
import Grid from "@material-ui/core/Grid";
import HeightIcon from "@material-ui/icons/Height";
import InputAdornment from "@material-ui/core/InputAdornment";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocationCityIcon from "@material-ui/icons/LocationCity";

class FormDemographicsInfo extends React.Component {
  render() {
    const {
      profile: { height, country, city },
      errors: {
        height: heightErrMsg,
        country: countryErrMsg,
        city: cityErrMsg,
      },
    } = this.props.values;

    return (
      <React.Fragment>
        <div className="container-fluid mt-4">
          <Grid
            container
            spacing={1}
            alignItems={heightErrMsg ? "center" : "flex-end"}
          >
            <Grid item className="w-100">
              <TextValidator
                id="height"
                label="Height"
                name="height"
                fullWidth
                error={heightErrMsg && true}
                helperText={heightErrMsg}
                onChange={this.props.handleChange}
                validators={[
                  "required",
                  "isNumber",
                  "minNumber:40",
                  "maxNumber:220",
                ]}
                errorMessages={[
                  "This field is required",
                  "Height must be a valid number",
                  "Height value cannot be lower than 40Cm",
                  "Height value cannot exceed 220Cm",
                ]}
                value={height ? height : ""}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HeightIcon color="primary" />
                    </InputAdornment>
                  ),
                  inputProps: { min: 40, max: 220 },
                  endAdornment: (
                    <InputAdornment position="end">Cm</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            spacing={1}
            alignItems={countryErrMsg ? "center" : "flex-end"}
            className="mt-5"
          >
            <Grid item className="w-100">
              <TextValidator
                id="country"
                label="Country"
                name="country"
                fullWidth
                error={countryErrMsg && true}
                helperText={countryErrMsg}
                onChange={this.props.handleChange}
                value={country}
                validators={["required", "isString"]}
                errorMessages={[
                  "This field is required",
                  "Input must be a valid text",
                ]}
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid
              container
              spacing={1}
              alignItems={cityErrMsg ? "center" : "flex-end"}
              className="ml-1 mt-5"
            >
              <Grid item className="w-100">
                <TextValidator
                  id="city"
                  label="City"
                  name="city"
                  fullWidth
                  error={cityErrMsg && true}
                  helperText={cityErrMsg}
                  onChange={this.props.handleChange}
                  value={city}
                  validators={["required", "isString"]}
                  errorMessages={[
                    "This field is required",
                    "Input must be a valid text",
                  ]}
                  type="text"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationCityIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default FormDemographicsInfo;

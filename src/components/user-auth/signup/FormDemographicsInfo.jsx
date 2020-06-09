import React from "react";
import { TextValidator } from "react-material-ui-form-validator";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import HeightIcon from "@material-ui/icons/Height";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import { countries, egyptGovernorates } from "../../../CountriesGovernorates";

class FormDemographicsInfo extends React.Component {
  render() {
    const {
      profile: { height, country, city },
    } = this.props.values;
    const isCountryEgypt = country === "Egypt";
    const isEgyptianCity = egyptGovernorates.find(
      (egCity) => egCity.toUpperCase() === city.toUpperCase()
    );
    const isEgyCitySelected = isEgyptianCity ? city : "Alexandria";
    const cityFieldVal = isEgyptianCity ? "" : city;
    const cityValue = isCountryEgypt ? isEgyCitySelected : cityFieldVal;

    return (
      <React.Fragment>
        <div className="container-fluid mt-4">
          <Grid container spacing={1}>
            <Grid item className="w-100">
              <TextValidator
                id="height"
                label="Height"
                name="height"
                fullWidth
                onChange={this.props.handleChange}
                validators={[
                  "required",
                  "isNumber",
                  "minNumber:40",
                  "maxNumber:260",
                ]}
                errorMessages={[
                  "This field is required",
                  "Height must be a valid number",
                  "Height value cannot be lower than 40Cm",
                  "Height value cannot exceed 260Cm",
                ]}
                value={height ? height : ""}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HeightIcon color="primary" />
                    </InputAdornment>
                  ),
                  inputProps: { min: 40, max: 260 },
                  endAdornment: (
                    <InputAdornment position="end">Cm</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} className="mt-5">
            <Grid item className="w-100">
              <TextField
                id="country"
                label="Country"
                name="country"
                select
                fullWidth
                helperText={"Please choose your country"}
                onChange={this.props.handleChange}
                value={country}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              >
                {countries.map((country, index) => (
                  <MenuItem key={index} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid container spacing={1} className="ml-1 mt-4">
              <Grid item className="w-100">
                <TextValidator
                  id="city"
                  label="City"
                  name="city"
                  select={isCountryEgypt}
                  fullWidth
                  helperText={"Please choose your governorate/city"}
                  onChange={this.props.handleChange}
                  value={cityValue}
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationCityIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                >
                  {isCountryEgypt &&
                    egyptGovernorates.map((governorate, index) => (
                      <MenuItem key={index} value={governorate}>
                        {governorate}
                      </MenuItem>
                    ))}
                </TextValidator>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default FormDemographicsInfo;

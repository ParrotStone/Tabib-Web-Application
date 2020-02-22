import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import HeightIcon from "@material-ui/icons/Height";
import InputAdornment from "@material-ui/core/InputAdornment";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocationCityIcon from "@material-ui/icons/LocationCity";

class DemographicsInfo extends React.Component {
  render() {
    const {
      profile: { height, country, city },
      errors: { country: countryErrMsg, city: cityErrMsg }
    } = this.props.values;

    return (
      <React.Fragment>
        <div className="container-fluid mt-5">
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <HeightIcon color="primary" />
            </Grid>
            <Grid item style={{ width: "400px" }}>
              <TextField
                id="height"
                label="Height"
                name="height"
                fullWidth
                onChange={this.props.handleChange}
                defaultValue={height}
                type="number"
                InputProps={{
                  inputProps: { min: 40, max: 220 },
                  endAdornment: (
                    <InputAdornment position="end">Cm</InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} alignItems="flex-end" className="mt-3">
            <Grid item>
              <LocationOnIcon color="primary" />
            </Grid>
            <Grid item style={{ width: "400px" }}>
              <TextField
                id="country"
                label="Country"
                name="country"
                fullWidth
                error={countryErrMsg && true}
                helperText={countryErrMsg}
                onChange={this.props.handleChange}
                defaultValue={country}
                type="text"
              />
            </Grid>

            <Grid
              container
              spacing={1}
              alignItems="flex-end"
              className="ml-1 mt-3"
            >
              <Grid item>
                <LocationCityIcon color="primary" />
              </Grid>
              <Grid item style={{ width: "400px" }}>
                <TextField
                  id="city"
                  label="City"
                  name="city"
                  fullWidth
                  error={cityErrMsg && true}
                  helperText={cityErrMsg}
                  onChange={this.props.handleChange}
                  defaultValue={city}
                  type="text"
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default DemographicsInfo;

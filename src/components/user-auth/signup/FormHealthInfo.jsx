import React from 'react';
import { TextValidator } from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';
import PhoneIcon from '@material-ui/icons/Phone';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import InputAdornment from '@material-ui/core/InputAdornment';

class FormHealthInfo extends React.Component {
  render() {
    const {
      profile: { phoneNum, smokingCheckBox, weight },
    } = this.props.values;

    return (
      <React.Fragment>
        <div className='container-fluid mt-5'>
          <Grid container spacing={1} className='mt-4' alignItems='center'>
            <Grid item className='w-100'>
              <TextValidator
                id='phoneNum'
                label='Phone Number'
                name='phoneNum'
                value={phoneNum}
                onChange={this.props.handleChange}
                type='tel'
                validators={[
                  'required',
                  'isNumber',
                  'matchRegexp:^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$',
                ]}
                errorMessages={[
                  'This field is required',
                  'Invalid input format',
                  'Phone number must be in (xxx-xxx-xxxx) format',
                ]}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PhoneIcon color='primary' />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='start'>(+20)</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            alignItems='flex-end'
            className='mt-5 ml-2'
          >
            <FormControlLabel
              name='smokingCheckBox'
              control={<Checkbox color='primary' />}
              label='Smoking'
              checked={smokingCheckBox}
              onChange={this.props.handleChange}
              labelPlacement='end'
            />
          </Grid>
          <Grid container spacing={1} alignItems='flex-end'>
            <Grid item className='w-100 mt-4'>
              <TextValidator
                id='weight'
                label='Weight'
                name='weight'
                fullWidth
                validators={[
                  'required',
                  'isNumber',
                  'minNumber:3',
                  'maxNumber:250',
                ]}
                errorMessages={[
                  'This field is required',
                  'Input must be a valid number',
                  'Weight must be larger than 3Kg',
                  'Weight must be less than 250Kg',
                ]}
                onChange={this.props.handleChange}
                value={weight ? weight : ''}
                type='number'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <FitnessCenterIcon color='primary' />
                    </InputAdornment>
                  ),
                  inputProps: { min: 3, max: 250 },
                  endAdornment: (
                    <InputAdornment position='end'>Kg</InputAdornment>
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

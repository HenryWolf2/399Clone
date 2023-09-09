import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import instance from '../api/api_instance';
import MenuItem from '@mui/material/MenuItem';

const spectrumCalibrationOptions = [
  {
    value: 'Automatic',
    label: 'Automatic',
  },
  {
    value: 'Manual',
    label: 'Manual',
  },
  {
    value: 'None',
    label: 'None',
  }
];

const yesNo = [
  {
    value: 'Yes',
    label: 'Yes',
  },
  {
    value: 'No',
    label: 'No',
  }
]

const hyperfineCoarse = [
  {
    value: 'Hyperfine',
    label: 'Hyperfine',
  },
  {
    value: 'Coarse',
    label: 'Coarse',
  }
]

const PostForm = () => {
    const [bound_filename, setBoundSpectrumFile] = useState("")
    const [compounds_list_filename, setCompoundDescriptionFile] = useState("")
    const [adducts_filename, setStandardAdductsFile] = useState("")
    const [tolerance, setTolerance] = useState("")
    const [peak_height, setMinimumPeakHeight] = useState("")
    const [minimumMassDifference, setMinimumMassDifference] = useState("")
    const [calibrate, setSpectrumCalibration] = useState("")
    const [spectrumCalibrationValue, setSpectrumCalibrationValue] = useState("")
    const [only_best, setReturnPeaksDetected] = useState("")
    const [max_adducts, setMaximumUnique] = useState("")
    const [valence, setCoordinationNumber] = useState("")
    const [min_primaries, setMinimumProteinNumber] = useState("")
    const [max_primaries, setMaximumProteinNumber] = useState("")
    const [patternGenerationMethod, setPatternGenerationMethod] = useState("")


    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = {
            bound_filename: bound_filename,
            compounds_list_filename: compounds_list_filename,
            adducts_filename: adducts_filename,
            tolerance: tolerance,
            peak_height: peak_height,
            minimumMassDifference: minimumMassDifference,
            calibrate: calibrate,
            spectrumCalibrationValue: spectrumCalibrationValue,
            only_best: only_best,
            max_adducts: max_adducts,
            valence: valence,
            min_primaries: min_primaries,
            max_primaries: max_primaries,
            patternGenerationMethod: patternGenerationMethod
        }
        try{
        await instance({
            url: "/post/create/data",
            method: "POST",
            data: data
          }).then((res) => {
            //redirect to profile page
            //save token in axios, add authorization to header
            console.log(res);
          });
        } catch(e){
            //display error message (username or password incorrect)
            //clear the password field
            console.error(e)
        }
    }

    return(
        <React.Fragment>
        <form onSubmit ={handleSubmit} action={<Link to="/post/create/data" />}>  
        <Stack spacing={2}>          
                <p className="form-description">Note: all files must be excel spreadsheets ('.csv' or '.xlsx')</p>
                <p className="form-description">Choose file for deconvoluted mass spectrum of adducted protein sample</p>
                <TextField
                type="file"
                style = {{width: 400, textAlign: "center",}}
                inputProps={{accept:".csv, .xlsx"}}
                margin="normal"
                required
                size="large"
                name="boundSpectrumFile"
                autoFocus
                onChange={e => setBoundSpectrumFile(e.target.value)}
                />
                <p className="form-description">Choose file for compound description and constraints</p>
                <TextField
                type="file"
                style = {{width: 400, textAlign: "center",}}
                inputProps={{accept:".csv, .xlsx"}}
                margin="normal"
                required
                size="large"
                name="compoundDescriptionFile"
                onChange={e => setCompoundDescriptionFile(e.target.value)}
                />
                <p className="form-description">Choose file for standard adduct description and constraints (or do not upload and use default)</p>
                <TextField
                type="file"
                style = {{width: 400, textAlign: "center",}}
                inputProps={{accept:".csv, .xlsx"}}
                margin="normal"
                size="large"
                name="standardAdductsFile"
                onChange={e => setStandardAdductsFile(e.target.value)}
                />
                <h3>Peak Search</h3>
                <TextField
                margin="normal"
                style = {{width: 140, textAlign: "center",}}
                required
                size="large"
                label="Mass Tolerance"
                name="tolerance"
                type="number"
                inputProps={{step: "0.1"}}
                defaultValue="3.1"
                onChange={e => setTolerance(e.target.value)}
                />
                <TextField
                margin="normal"
                style = {{width: 170, textAlign: "center",}}
                required
                size="large"
                name="minimumPeakHeight"
                label="Minimum Peak Height"
                type="number"
                defaultValue="0.01"
                inputProps={{step: "0.01"}}
                onChange={e => setMinimumPeakHeight(e.target.value)}
                />
                <TextField
                margin="normal"
                style = {{width: 350, textAlign: "center",}}
                required
                size="large"
                label="Minimum mass difference between two protein adducts"
                name="minimumMassDifference"
                type="number"
                inputProps={{step: "0.5"}}
                defaultValue="4.0"
                onChange={e => setMinimumMassDifference(e.target.value)}
                />
                <div className="side-by-side">
                  <TextField
                    margin="normal"
                    style = {{width: 250, textAlign: "center",}}
                    select
                    required
                    size="large"
                    label="Re-calibration of mass spectrum"
                    name="spectrumCalibration"
                    defaultValue="Automatic"
                    onChange={e => setSpectrumCalibration(e.target.value)}
                  >
                    {spectrumCalibrationOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                  margin="normal"
                  required
                  size="large"
                  label="Re-calibration of mass spectrum"
                  name="spectrumCalibrationValue"
                  type="number"
                  inputProps={{step: "0.5"}}
                  defaultValue="1.0"
                  onChange={e => setSpectrumCalibrationValue(e.target.value)}
                  />
                </div>
                <TextField
                  margin="normal"
                  style = {{width: 430, textAlign: "center",}}
                  select
                  required
                  size="large"
                  label="Return all peaks detected (Even those without any feasible species)"
                  name="returnPeaksDetected"
                  defaultValue="Yes"
                  onChange={e => setReturnPeaksDetected(e.target.value)}
                >
                  {yesNo.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <h3>Feasible Set</h3>
                <TextField
                margin="normal"
                style = {{width: 250, textAlign: "center",}}
                required
                size="large"
                label="Maximum unique standard adducts"
                name="maximumUnique"
                type="number"
                inputProps={{step: "1"}}
                defaultValue="2"
                onChange={e => setMaximumUnique(e.target.value)}
                />
                <TextField
                margin="normal"
                style = {{width: 220, textAlign: "center",}}
                required
                size="large"
                label="Coordination number of metal"
                name="coordinationNumber"
                type="number"
                inputProps={{step: "1"}}
                defaultValue="4"
                onChange={e => setCoordinationNumber(e.target.value)}
                />
                <TextField
                margin="normal"
                style = {{width: 220, textAlign: "center",}}
                required
                size="large"
                label="Minimum number of proteins"
                name="minimumProteinNumber"
                type="number"
                inputProps={{step: "1"}}
                defaultValue="1"
                onChange={e => setMinimumProteinNumber(e.target.value)}
                />
                <TextField
                margin="normal"
                style = {{width: 220, textAlign: "center",}}
                required
                size="large"
                label="Maximum number of proteins"
                name="maximumProteinNumber"
                type="number"
                inputProps={{step: "1"}}
                defaultValue="1"
                onChange={e => setMaximumProteinNumber(e.target.value)}
                />
                <TextField
                  margin="normal"
                  style = {{width: 240, textAlign: "center",}}
                  select
                  required
                  size="large"
                  label="Isotope pattern generation method"
                  name="patternGenerationMethod"
                  defaultValue="Hyperfine"
                  onChange={e => setPatternGenerationMethod(e.target.value)}
                >
                  {hyperfineCoarse.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Button
                type="submit"
                size="large"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style = {{margin: 30}}
                >
                Create Post
                </Button>
        </Stack>
        </form>
        </React.Fragment>
    )
}

export default PostForm;
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
    const [boundSpectrumFile, setBoundSpectrumFile] = useState("")
    const [compoundDescriptionFile, setCompoundDescriptionFile] = useState("")
    const [standardAdductsFile, setStandardAdductsFile] = useState("")
    const [massTolerance, setMassTolerance] = useState("")
    const [minimumPeakHeight, setMinimumPeakHeight] = useState("")
    const [minimumMassDifference, setMinimumMassDifference] = useState("")
    const [spectrumCalibration, setSpectrumCalibration] = useState("")
    const [spectrumCalibrationValue, setSpectrumCalibrationValue] = useState("")
    const [returnPeaksDetected, setReturnPeaksDetected] = useState("")
    const [maximumUnique, setMaximumUnique] = useState("")
    const [coordinationNumber, setCoordinationNumber] = useState("")
    const [minimumProteinNumer, setMinimumProteinNumber] = useState("")
    const [maximumProteinNumber, setMaximumProteinNumber] = useState("")
    const [patternGenerationMethod, setPatternGenerationMethod] = useState("")


    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = {
            boundSpectrumFile: boundSpectrumFile,
            compoundDescriptionFile: compoundDescriptionFile,
            standardAdductsFile: standardAdductsFile,
            massTolerance: massTolerance,
            minimumPeakHeight: minimumPeakHeight,
            minimumMassDifference: minimumMassDifference,
            spectrumCalibration: spectrumCalibration,
            spectrumCalibrationValue: spectrumCalibrationValue,
            returnPeaksDetected: returnPeaksDetected,
            maximumUnique: maximumUnique,
            coordinationNumber: coordinationNumber,
            minimumProteinNumer: minimumProteinNumer,
            maximumProteinNumber: maximumProteinNumber,
            patternGenerationMethod: patternGenerationMethod
        }
        try{
        await instance({
            url: "/post/",
            method: "POST",
            data: data
          }).then((res) => {
            
          });
        } catch(e){
            //display error message (username or password incorrect)
            console.error(e)
        }
    }

    return(
        <React.Fragment>
        <form onSubmit ={handleSubmit} action={<Link to="/public-data" />}>  
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
                name="massTolerance"
                type="number"
                inputProps={{step: "0.1"}}
                defaultValue="3.1"
                onChange={e => setMassTolerance(e.target.value)}
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
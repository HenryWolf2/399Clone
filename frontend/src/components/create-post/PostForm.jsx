import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import instance from '../api/api_instance';
import MenuItem from '@mui/material/MenuItem';
import { Navigate, useNavigate } from 'react-router-dom';

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

const trueFalse = [
  {
    value: 'True',
    label: 'True',
  },
  {
    value: 'False',
    label: 'False',
  }
]

const PostForm = () => {
    const [isFormVisible, setIsFormVisible] = useState(true)

    const [analysis_id, setAnalysisID] = useState("")
    const navigate = useNavigate();

    const [bounds_file, setBoundSpectrumFile] = useState("")
    const [compounds_file, setCompoundDescriptionFile] = useState("")
    const [adducts_file, setStandardAdductsFile] = useState("")
    const [tolerance, setTolerance] = useState("3.1")
    const [peak_height, setMinimumPeakHeight] = useState("0.01")
    const [calibrate, setSpectrumCalibration] = useState("Automatic")
    const [only_best, setReturnPeaksDetected] = useState("False")
    const [max_adducts, setMaximumUnique] = useState("2")
    const [valence, setCoordinationNumber] = useState("4")
    const [min_primaries, setMinimumProteinNumber] = useState("1")
    const [max_primaries, setMaximumProteinNumber] = useState("1")
    const [data_publicity, setDataPublic] = useState("True")

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [summary, setSummary] = useState("")
    const [publicity, setPostPublic] = useState("True")

    const handleSubmit1 = async (event) => {
      event.preventDefault();
      setIsFormVisible(false)
      const formData = new FormData();
      formData.append("bounds_file", bounds_file);
      formData.append("compounds_file", compounds_file);
      formData.append("adducts_file", adducts_file);
      formData.append("tolerance", tolerance);
      formData.append("peak_height", peak_height);
      formData.append("calibrate", calibrate);
      formData.append("only_best", only_best);
      formData.append("max_adducts", max_adducts);
      formData.append("valence", valence);
      formData.append("min_primaries", min_primaries);
      formData.append("max_primaries", max_primaries);
      formData.append("data_publicity", data_publicity);

      try{
        await instance.post('/post/create/data', formData, {
            // url: "/post/create/data",
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(
            (res) => {
              setAnalysisID(res.data.analysis_id)
            }
          );
        } catch(e){
            //display error message (username or password incorrect)
            console.error(e)
        }
  }

  const handleSubmit2 = async (event) => {
    event.preventDefault();
    let data = {
        title: title,
        description: description,
        summary: summary,
        publicity: publicity,
        analysis_id: analysis_id
    }
    try{
    await instance({
        url: "/post/create",
        method: "POST",
        data: data
      }).then((res) => {
        //needs to navigate to the profile page once up
        console.log(res)
        navigate("/");
      });
    } catch(e){
        console.error(e)
    }
}

    return(
        <React.Fragment>
        {isFormVisible && (
        <form onSubmit ={handleSubmit1} encType="multipart/form-data">  
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
                onChange={e => setBoundSpectrumFile(e.target.files[0])}
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
                onChange={e => setCompoundDescriptionFile(e.target.files[0])}
                />
                <p className="form-description">Choose file for standard adduct description and constraints (or do not upload and use default)</p>
                <TextField
                type="file"
                style = {{width: 400, textAlign: "center",}}
                inputProps={{accept:".csv, .xlsx"}}
                margin="normal"
                required
                size="large"
                name="standardAdductsFile"
                onChange={e => setStandardAdductsFile(e.target.files[0])}
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
                defaultValue={3.1}
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
                defaultValue={0.01}
                inputProps={{step: "0.01"}}
                onChange={e => setMinimumPeakHeight(e.target.value)}
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
                </div>
                <TextField
                  margin="normal"
                  style = {{width: 430, textAlign: "center",}}
                  select
                  required
                  size="large"
                  label="Return all peaks detected (Even those without any feasible species)"
                  name="returnPeaksDetected"
                  defaultValue={"True"}
                  onChange={e => setReturnPeaksDetected(e.target.value)}
                >
                  {trueFalse.map((option) => (
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
                defaultValue={2}
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
                defaultValue={4}
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
                defaultValue={1}
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
                defaultValue={1}
                onChange={e => setMaximumProteinNumber(e.target.value)}
                />
                <TextField
                  margin="normal"
                  style = {{width: 230, textAlign: "center",}}
                  select
                  required
                  size="large"
                  label="Set data to public?"
                  name="setDataPublic"
                  defaultValue="True"
                  onChange={e => setDataPublic(e.target.value)}
                >
                  {trueFalse.map((option) => (
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
        )}

        {!isFormVisible && (
        <form onSubmit ={handleSubmit2} encType="multipart/form-data">  
        <Stack spacing={2}>          
                <h3>Comment your post</h3>
                <TextField
                margin="normal"
                style = {{width: 140, textAlign: "center",}}
                required
                size="large"
                label="Title"
                name="title"
                type="text"
                onChange={e => setTitle(e.target.value)}
                />
                <TextField
                id="outlined-multiline-static"
                label="Write a description of your post"
                multiline
                rows={4}
                onChange={e => setDescription(e.target.value)}
                />
                <TextField
                id="outlined-multiline-static"
                label="Write a summary of your post"
                multiline
                rows={4}
                onChange={e => setSummary(e.target.value)}
                />
                <TextField
                  margin="normal"
                  style = {{width: 230, textAlign: "center",}}
                  select
                  required
                  size="large"
                  label="Set post to public?"
                  name="setPostPublic"
                  defaultValue="True"
                  onChange={e => setPostPublic(e.target.value)}
                >
                  {trueFalse.map((option) => (
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
                Submit post
                </Button>
        </Stack>
        </form>
        )}
        </React.Fragment>
    )
}

export default PostForm;
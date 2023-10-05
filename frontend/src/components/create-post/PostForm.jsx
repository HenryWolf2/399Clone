import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import instance from '../api/api_instance';
import MenuItem from '@mui/material/MenuItem';
import { Navigate, useNavigate } from 'react-router-dom';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';

const steps = ['Post files', 'Peak search settings', 'Feasible set settings', 'Post description']

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

const publicPrivate = [
  {
    value: 'True',
    label: 'Public',
  },
  {
    value: 'False',
    label: 'Private',
  }
]

const yesNo = [
  {
    value: 'True',
    label: 'Yes',
  },
  {
    value: 'False',
    label: 'No',
  }
]

const PostForm = () => {
    const [activeStep, setActiveStep] = useState(0)

    const [tags, setTags] = useState([]);

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
    const [publicity, setPostPublic] = useState("True")
    const [post_pic, setPostImageFile] = useState("")

    const handleSubmit1 = async (event) => {
      event.preventDefault();
      setActiveStep(3)
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
    // let data = {
    //     title: title,
    //     description: description,
    //     publicity: publicity,
    //     analysis_id: analysis_id,
    //     tags: tags
    // }
    const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("publicity", publicity);
      formData.append("analysis_id", analysis_id);
      formData.append("tags", tags);
      formData.append("post_pic", post_pic);
    try{
    await instance.post('/post/create', formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        //needs to navigate to the profile page once up
        console.log(res)
        navigate("/");
      });
    } catch(e){
        console.error(e)
    }
}
  const handleNext = () => {
    if (bounds_file == '' || compounds_file == '' || adducts_file == '') {
      alert("Please upload all files")
      return;
    }
    else{
      setActiveStep(activeStep + 1)
    }
    
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleAddTag = (event, newTag) => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

    return(
        <React.Fragment>
          <Box sx={{ width: '100%' }}>
            <Stepper 
            activeStep={activeStep}
            >
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step 
                  key={label} 
                  sx={{
                    '& .MuiStepIcon-root.Mui-completed': {
                      color: '#02AEEC', // circle color (COMPLETED)
                    },
                    '& .MuiStepIcon-root.Mui-active':
                      {
                        color: '#02AEEC', // Just text label (COMPLETED)
                      },
                    '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                      {
                        color: 'common.white', // Just text label (ACTIVE)
                      },
                    '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                      fill: 'white', // circle's number (ACTIVE)
                    },
                  }}
                  {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
              </React.Fragment>
            )}
          </Box>
        
        <form id="form1" onSubmit ={handleSubmit1} encType="multipart/form-data">  
        <Stack spacing={2}>
                {activeStep == 0 && (
                  <div>
                  <h6>Upload your files</h6>
                  <div className = "File-div">
                  <p className="form-description" >Note: all files must be excel spreadsheets ('.csv' or '.xlsx')</p>
                  <p className="form-description">Choose file for deconvoluted mass spectrum of adducted protein sample</p>
                  <TextField
                  type="file"
                  className = "Upload-file"
                  inputProps={{accept:".csv, .xlsx"}}
                  margin="normal"
                  required
                  size="large"
                  name="boundSpectrumFile"
                  autoFocus
                  onChange={e => setBoundSpectrumFile(e.target.files[0])}
                  />
                  {bounds_file && (
                    <Chip
                    sx={{ bgcolor: '#02AEEC', color: 'white', width: 150 }}
                    key={bounds_file.name}
                    label={bounds_file.name}
                  />
                  )}
                  <p className="form-description">Choose file for compound description and constraints</p>
                  <TextField
                  type="file"
                  inputProps={{accept:".csv, .xlsx"}}
                  margin="normal"
                  required
                  size="large"
                  name="compoundDescriptionFile"
                  onChange={e => setCompoundDescriptionFile(e.target.files[0])}
                  />
                  {compounds_file && (
                    <Chip
                    sx={{ bgcolor: '#02AEEC', color: 'white', width: 150 }}
                    key={compounds_file.name}
                    label={compounds_file.name}
                  />
                  )}
                  <p className="form-description">Choose file for standard adduct description and constraints (or do not upload and use default)</p>
                  <TextField
                  type="file"
                  inputProps={{accept:".csv, .xlsx"}}
                  margin="normal"
                  required
                  size="large"
                  name="standardAdductsFile"
                  onChange={e => setStandardAdductsFile(e.target.files[0])}
                  />
                  {adducts_file && (
                    <Chip
                    sx={{ bgcolor: '#02AEEC', color: 'white', width: 150 }}
                    key={adducts_file.name}
                    label={adducts_file.name}
                  />
                  )}
                  </div>
                  </div>
                )}
                {activeStep == 1 && (
                  <div>
                <h6>Set your peak search settings</h6>
                <div className = "Grid-container"> 
                <TextField
                margin="normal"
                required
                autoFocus
                size="large"
                label="Mass Tolerance"
                name="tolerance"
                type="number"
                inputProps={{step: "0.1", min: "0"}}
                value = {tolerance}
                onChange={e => setTolerance(e.target.value)}
                />
                <TextField
                margin="normal"
                required
                size="large"
                name="minimumPeakHeight"
                label="Minimum Peak Height"
                type="number"
                value={peak_height}
                inputProps={{step: "0.01", min: "0"}}
                onChange={e => setMinimumPeakHeight(e.target.value)}
                />
                  <TextField
                    margin="normal"
                    select
                    required
                    size="large"
                    label="Re-calibration of mass spectrum"
                    name="spectrumCalibration"
                    value={calibrate}
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
                  select
                  required
                  size="large"
                  label="Return all peaks detected"
                  name="returnPeaksDetected"
                  value={only_best}
                  onChange={e => setReturnPeaksDetected(e.target.value)}
                >
                  {yesNo.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                </div>
                </div>
                )}
                {activeStep == 2 && (
                  <div>
                <h6>Set your feasible set settings</h6>
                <div className = "Grid-container"> 
                <TextField
                margin="normal"
                required
                autoFocus
                size="large"
                label="Maximum unique standard adducts"
                name="maximumUnique"
                type="number"
                inputProps={{step: "1", min: "0"}}
                value={max_adducts}
                onChange={e => setMaximumUnique(e.target.value)}
                />
                <TextField
                margin="normal"
                required
                size="large"
                label="Coordination number of metal"
                name="coordinationNumber"
                type="number"
                inputProps={{step: "1", min: "0"}}
                value={valence}
                onChange={e => setCoordinationNumber(e.target.value)}
                />
                <TextField
                margin="normal"
                required
                size="large"
                label="Minimum number of proteins"
                name="minimumProteinNumber"
                type="number"
                inputProps={{step: "1", min: "1"}}
                value={min_primaries}
                onChange={e => setMinimumProteinNumber(e.target.value)}
                />
                <TextField
                margin="normal"
                required
                size="large"
                label="Maximum number of proteins"
                name="maximumProteinNumber"
                type="number"
                inputProps={{step: "1", min: "1"}}
                value={max_primaries}
                onChange={e => setMaximumProteinNumber(e.target.value)}
                />
                </div>
                <TextField
                  margin="normal"
                  style={{ width: 300 }}
                  select
                  required
                  size="large"
                  label="Set data to public?"
                  name="setDataPublic"
                  value={data_publicity}
                  onChange={e => setDataPublic(e.target.value)}
                >
                  {publicPrivate.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                </div>
                )}
        </Stack>
        </form>
        {activeStep == 3 && (
        <form id="form2" onSubmit ={handleSubmit2} encType="multipart/form-data">  
        <Stack spacing={2}>          
                <h6>Describe your post</h6>
                <div>
                <TextField
                margin="normal"
                style={{ width: 700 }}
                required
                autoFocus
                size="large"
                label="Title"
                name="title"
                value={title}
                type="text"
                onChange={e => setTitle(e.target.value)}
                />
                <br />
                <TextField
                id="outlined-multiline-static"
                label="Write a description of your post"
                style={{ width: 700 }}
                required
                value={description}
                multiline
                rows={4}
                onChange={e => setDescription(e.target.value)}
                />
                <p className="form-description">Write your tag and press Enter to add</p>
                <div className = "Tag-input">
                <Autocomplete
                  multiple
                  freeSolo
                  options={[]}
                  renderTags={(value, getTagProps) =>
                    value.map((tag, index) => (
                      <Chip
                        sx={{ bgcolor: '#02AEEC', color: 'white' }}
                        key={tag}
                        label={tag}
                        onDelete={() => handleDeleteTag(tag)}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      style={{ width: 700 }}
                      label="Tags"
                      // placeholder="Enter tags"
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          handleAddTag(event, event.target.value);
                          event.target.value = '';
                          event.preventDefault();
                        }
                      }}
                    />
                  )}
                />
                </div>
                <p className="form-description"> Choose a post image and set the post publicity</p>
                <div className="Grid-container2">
                <TextField
                  type="file"
                  inputProps={{accept:".png, .jpg, .jpeg"}}
                  margin="normal"
                  required
                  size="large"
                  name="postImageFile"
                  onChange={e => setPostImageFile(e.target.files[0])}
                  />
                <TextField
                  margin="normal"
                  style = {{width: 300, textAlign: "left",}}
                  select
                  className = "Floater"
                  required
                  size="large"
                  value={publicity}
                  label="Publicity"
                  name="setPostPublic"
                  defaultValue="True"
                  onChange={e => setPostPublic(e.target.value)}
                >
                  {publicPrivate.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                </div>
                </div>
        </Stack>
        </form>
        )}
        <div className="Movement-buttons">
        {(activeStep == 0) && (
        <p></p>
        )}
        {(activeStep == 1 || activeStep == 2 || activeStep == 3) && (
        <Button
          size="medium"
          className = "Back-button"
          hidden = {activeStep == 1}
          variant="outlined"
          sx={{ mt: 3, mb: 2 }}
          style = {{margin: 30}}
          onClick = {handleBack}
          >Back</Button>
        )}
        {(activeStep == 0 || activeStep == 1) && (
          <Button
        size="medium"
        className = "Next-button"
        variant="contained"
        sx={{ mt: 0, mb: 1 }}
        style = {{margin: 30}}
        onClick = {handleNext}
        >Next</Button>
      )}
      {(activeStep == 2) && (
        <Button
        type="submit"
        form="form1"
        className = "Next-button"
        size="large"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        style = {{margin: 30}}
        >
        Send Data
        </Button>
      )}
      {(activeStep == 3) && (
        <div className = "Submit-button">
        <Button
        className = "Next-button"
        type="submit"
        form="form2"
        size="large"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        style = {{margin: 30}}
        >
        Submit post
        </Button>
        </div>
      )}
        </div>
        </React.Fragment>
    )
}

export default PostForm;
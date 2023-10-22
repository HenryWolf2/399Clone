import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import instance from '../api/api_instance';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import ProfilePicture from '../individual-posts/profile';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';

const steps = ['Analysis files', 'Peak search settings', 'Feasible set settings', 'Analysis description']

const spectrumCalibrationOptions = [
  {
    value: 'Automatic',
    label: 'Automatic',
  },
  {
    value: 'Manual',
    label: 'Manual',
  },
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

const onOff = [
  {
    value: 'on',
    label: 'On',
  },
  {
    value: 'off',
    label: 'Off'
  }
]

const PostForm = () => {
    const [activeStep, setActiveStep] = useState(0)

    const [tags, setTags] = useState([]);
    const [collaboratorsList, setCollaborators] = useState([]);
    const [collaboratorIDs] = useState([]);

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
    const [data_publicity, setDataPublic] = useState("False")
    const [multi_protein, setMultiProtein] = useState("off")
    const [manual_calibration, setManualCalibration] = useState("0")

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [publicity, setPostPublic] = useState("False")
    const [userID, setUserID] = useState("")

    const [date] = useState(new Date());
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}`;

    const [post_pic, setPostImageFile] = useState("")
    const [imgSrc, setImgSrc] = useState()

    const [error, setError] = useState(false);

    const handleFileUpload = (e) => {
      const post_pic = e.target.files[0]
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result);
      };
      reader.readAsDataURL(post_pic);
    }

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
      formData.append("multi_protein", multi_protein);
      formData.append("manual_calibration", manual_calibration);

      try{
        await instance.post('/post/create/data', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(
            (res) => {
              setAnalysisID(res.data.analysis_id)
            }
          );
        } catch(e){
            console.error(e)
        }
  }

  const handleSubmit2 = async (event) => {
    event.preventDefault();
    await Promise.all(collaboratorsList.map(username => 
      instance.get('/user/check_username', {
          params: {
              username: username
          }
      })
      .then(response => {
          let reply = Object.values(response.data)[0];
          collaboratorIDs.push(reply);
      })
      .catch(error => {
          console.error(error);
      })
  ));

    const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("publicity", publicity);
      formData.append("analysis_id", analysis_id);
      formData.append("tags", JSON.stringify(tags));
      formData.append("post_pic", post_pic);
      formData.append("collaborators", JSON.stringify(collaboratorIDs));

    try{
    await instance.post('/post/create', formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        navigate("/profile");
      });
    } catch(e){
        console.error(e)
    }
}
  const handleNext = () => {
    if (bounds_file === '' || compounds_file === '' || adducts_file === '') {
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

  const checkCollaborators = (newValue) => {
    instance.get('/user/check_username', {
      params: {
        username: newValue[newValue.length - 1]
      }
    })
    .then(function (response) {
      let reply = Object.values(response.data)[0];
    if (reply !== -1 || newValue.length === 0){
      setCollaborators(newValue)
      setError(false)
    }
    else {
      setError(true)
    }
    })
    .catch(function(error) {
      console.error(error)
    })
  }

  useEffect(() => {
    async function GetProfileInformation() {
      try{ 
        await instance ({
          url: "/profile/get",
          method: "GET",          
      }).then((res) => {
        setUserID(res.data.id)
      });
      } catch(e) {
        console.error(e)
      }
    }
    GetProfileInformation();
    } ,
    []
  );

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
                      color: '#02AEEC', 
                    },
                    '& .MuiStepIcon-root.Mui-active':
                      {
                        color: '#02AEEC', 
                      },
                    '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                      {
                        color: 'common.white', 
                      },
                    '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                      fill: 'white', 
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
                {activeStep === 0 && (
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
                {activeStep === 1 && (
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
                  disabled={calibrate === "Automatic"}
                margin="normal"
                size="large"
                name="manualCalibration"
                label="Manual Calibration (Only if manual chosen)"
                type="number"
                inputProps={{step: "0.5", min: "0"}}
                onChange={e => setManualCalibration(e.target.value)}
                />
                </div>
                <TextField
                  margin="normal"
                  sx = {{width: '300px'}}
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
                )}
                {activeStep === 2 && (
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
                <TextField
                  margin="normal"
                  select
                  required
                  size="large"
                  label="Set for multiple proteins?"
                  name="multiProtein"
                  value={multi_protein}
                  onChange={e => setMultiProtein(e.target.value)}
                >
                  {onOff.map((option) => (
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
                </div>
                )}
        </Stack>
        </form>
        {activeStep === 3 && (
        <form id="form2" onSubmit ={handleSubmit2} encType="multipart/form-data">  
        <Stack spacing={2}>          
                <h6>Describe your analysis</h6>
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
                label="Write a description of your analysis"
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
                  onChange={(event, newValue) => {
                    setTags(newValue);}}
                  renderTags={(value, getTagProps) =>
                    value.map((tag, index) => (
                      <Chip
                        sx={{ bgcolor: '#02AEEC', color: 'white' }}
                        key={tag}
                        label={tag}
                        onDelete = {() =>{
                          handleDeleteTag(tag);
                        }}
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
                <p className="form-description"> Choose a cover image and set the analysis publicity</p>
                <div className="Grid-container2">
                <TextField
                  type="file"
                  inputProps={{accept:".png, .jpg, .jpeg"}}
                  margin="normal"
                  required
                  size="large"
                  name="postImageFile"
                  onChange={e => {
                    setPostImageFile(e.target.files[0]);
                    handleFileUpload(e);}}
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
                <p className="form-description">Write the usernames of your collaborators and press Enter to add</p>
                <Autocomplete
                  className = "Margin-top"
                  key={error ? 'error' : 'no-error'}
                  multiple
                  freeSolo
                  options={[]}
                  value={collaboratorsList}
                  onChange={(event, newValue) => {
                    checkCollaborators(newValue)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Enter usernames"
                      placeholder="Usernames"
                      error ={error}
                      helperText={error ? "Username does not exist" : ""}
                    />
                  )}
                />
                </div>
                <h6>Preview your analysis here</h6>
                  <Box sx={{ width: '700px', bgcolor: '#FFFFFF', borderRadius: '10px', padding: "10px 0px 10px 0px", boxShadow: 5 }}>
                    <Box sx={{ my: 3, mx: 2, margin: "0px" }}>
                      <Grid container alignItems="center" >
                      

                        <Grid item sx={{margin: "0px 0px 0px 20px"}}>
                          <ProfilePicture author={userID}/>
                        </Grid>
                        <Grid item xs sx={{padding: '0px 0px 0px 10px'}}>
                          <Typography gutterBottom variant="h6" component="div" sx={{marginBottom: "0px", color: 'black', textAlign: 'left'}}>
                            {formattedDate} { publicity === "True" &&( <PublicIcon />)} {publicity === "False" && (<LockIcon />)}
                          </Typography>
                        </Grid>

                        <Grid item sx={{margin: "0px 20px 0px 0px"}}>
                        </Grid>
                      </Grid>
                      <Typography gutterBottom variant="h4" component="div" sx={{margin: "0px 20px 0px 20px", color: 'black', textAlign: 'left'}}>
                            { title }
                      </Typography>
                      <Typography color="text.secondary" variant="body2" sx={{margin: "0px 20px 0px 20px", color: 'black', textAlign: 'left'}}>
                        { description.slice(0,250) }...
                      </Typography>
                      {imgSrc && <img src={ imgSrc } className="Post-image" alt="logo" style={{padding: '10px 0px 10px 0px'}}/>}
                      <div>
                        {tags.slice(0, 6).map((item, index) => (
                        <Chip key={index} label={item} sx={{ bgcolor: '#02AEEC', color: 'white', float: 'left', margin: '5px'}} />
                        ))}
                      </div> 
                    </Box>
                  </Box>
        </Stack>
        </form>
        )}
        <div className="Movement-buttons">
        {(activeStep === 0) && (
        <p></p>
        )}
        {(activeStep === 1 || activeStep === 2 || activeStep === 3) && (
        <Button
          size="medium"
          className = "Back-button"
          hidden = {activeStep === 1}
          variant="outlined"
          sx={{ mt: 3, mb: 2 }}
          style = {{margin: 30, color: '#02AEEC' }}
          onClick = {handleBack}
          >Back</Button>
        )}
        {(activeStep === 0 || activeStep === 1) && (
          <Button
        size="medium"
        className = "Next-button"
        variant="contained"
        sx={{ mt: 0, mb: 1, backgroundColor: '#02AEEC'}}
        style = {{margin: 30}}
        onClick = {handleNext}
        >Next</Button>
      )}
      {(activeStep === 2) && (
        <Button
        type="submit"
        form="form1"
        className = "Next-button"
        size="large"
        variant="contained"
        sx={{ mt: 3, mb: 2, backgroundColor: '#02AEEC' }}
        style = {{margin: 30}}
        >
        Send Data
        </Button>
      )}
      {(activeStep === 3) && (
        <div className = "Submit-button">
        <Button
        className = "Next-button"
        type="submit"
        form="form2"
        size="large"
        variant="contained"
        sx={{ mt: 3, mb: 2, backgroundColor: '#02AEEC'}}
        style = {{margin: 30}}
        >
        Submit Analysis
        </Button>
        </div>
      )}
        </div>
        </React.Fragment>
    )
}

export default PostForm;
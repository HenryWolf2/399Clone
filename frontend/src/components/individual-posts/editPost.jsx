import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import instance from '../api/api_instance';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import EditGroupCard from './EditGroupCard';
import {Button, Chip} from '@mui/material';
import UserDetails from './userDetails';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default function EditPopup({ open, setOpen, handleClose, allData }) {
  const [value, setValue] = useState(0);
  const [groupIDs, setGroupIDs] = useState([]);
  const [analysisContent, setAnalysisContent] = useState([])
  const [collaborators, setCollaborators] = useState([])

  const [tags, setTags] = useState([]);
  const [error, setError] = useState(false);

  const [checkboxStates, setCheckboxStates] = useState({});

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

  const handleAddTag = (event, newTag) => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
    var index = allData.tags.indexOf(tagToDelete);
    if (index !== -1) {
      allData.tags.splice(index, 1);
    }
  };

  const handleGroupChanges = async (event) => {
    event.preventDefault();
    console.log(checkboxStates)
    for (let id in checkboxStates) {
      if (id !== "") {
        if (checkboxStates[id] === true) {
          const formData = new FormData();
          formData.append("group_id", id);
          formData.append("post_id", allData.id);
  
          try{
            await instance.post('/post/add_to_group', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
            } catch(e){
                console.error(e)
            }
        } else {
          console.log(checkboxStates[id], id, allData.id)
          try{
            await instance.delete('/groups/post/delete', {
              data: {
                group_id: id,
                post_id: allData.id,
              },
              headers: {
                'Content-Type': 'application/json',
                // Add any other headers if needed (e.g., authentication headers)
              },
            });
            } catch(e){
                console.error(e)
            }
        }
      }
    }
    setOpen(false);
  }


  useEffect(() => {
    async function getGroupInformation() {
      try {
        const response = await instance({
          url: "/group/landing",
          method: "GET",
        });
        setGroupIDs(response.data.users_groups);
      } catch (error) {
        console.error("Error fetching group information:", error);
      }
    };
  
    getGroupInformation();
  }, []);
  
  useEffect(() => {
    async function getAnalysisDetails() {
      try {
        const response = await instance({
          url: "/post/get/config",
          method: "GET",
          params: { analysis_id: allData.associated_results },
        });
        setAnalysisContent(response.data);
      } catch (error) {
        console.error("Error fetching analysis details:", error);
      }
    };
  
    getAnalysisDetails();
  }, [allData.associated_results]);

  let arrayDataItems = groupIDs.map((group_id) =>  <Grid item key={group_id} xs={6} sx={{ paddingTop: "0px", marginBottom: "20px"}}> <EditGroupCard group_id={group_id} post_id={allData.id}  setCheckboxStates={setCheckboxStates} checkboxStates={checkboxStates}/> </Grid>); 

  let stringPublicity = ""
  if (allData.publicity === false) {
    stringPublicity = "False"
  } else {
    stringPublicity = "True"
  }

//   let collaboratorNames = []

//   if (allData.collaborators != undefined) {
//     const requests = allData.collaborators.map(id =>
//       instance({
//         url: "/user/info",
//         method: "GET",
//         params: { user_id: id }
//       }).then(res => res.data)
//     );
    
//     Promise.all(requests)
//       .then(users => {
//         setCollaborators(users); // array of user data
//         collaboratorNames = users.map(user => user.username);
//       })
//       .catch(e => {
//         console.error(e);
//       });
// }
  

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth >
      <Box sx={{ display: 'flex', flexDirection: 'row', height: 500}}>
        <Box sx={{ width: 150, backgroundColor: '#f0f0f0' }}>
          <Tab label="Contributors" onClick={() => setValue(0)} sx={{ borderBottom: 1, borderColor: 'divider', width: 150, alignItems: "flex-start", height: 125 }} />
          <Tab label="Groups" onClick={() => setValue(1)} sx={{ borderBottom: 1, borderColor: 'divider', width: 150, alignItems: "flex-start", height: 125 }} />
          <Tab label="Peak Search Settings" onClick={() => setValue(2)} sx={{ borderBottom: 1, borderColor: 'divider', width: 150, alignItems: "flex-start", textAlign: 'left', height: 125 }} />
          <Tab label="Content" onClick={() => setValue(3)} sx={{ borderBottom: 1, borderColor: 'divider', width: 150, alignItems: "flex-start", height: 125 }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <TabPanel value={value} index={0}>
            <h3>Edit your Contributors</h3>
            <Autocomplete
                  className = "Margin-top"
                  key={error ? 'error' : 'no-error'}
                  multiple
                  freeSolo
                  defaultValue={[]}
                  // onChange={(event, newValue) => {
                  //   checkCollaborators(newValue)
                  // }}
                  renderTags={(value, getTagProps) =>
                    value.map((username, index) => (
                      <Chip
                        sx={{ bgcolor: '#02AEEC', color: 'white' }}
                        key={username}
                        label={username}
                        onDelete = {() =>{
                           handleDeleteTag(username);
                         }}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
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
          </TabPanel>

          <TabPanel value={value} index={1} sx={{ margin: 20 }}>
            <h3>Add your Post to your Groups</h3>

            <Grid container spacing={2} sx={{marginTop: '20px', marginBottom: '20px', maxHeight: '300px', overflowY: "scroll"}}>
              {arrayDataItems}
              
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" sx={{ width: "30%", marginBottom: "0px", float: "right", backgroundColor:"#04ADEB" }} onClick={handleGroupChanges}>
                  Submit Groups
                </Button>
              </Grid>

           
          </TabPanel>

          <TabPanel value={value} index={2}>
            <div style = {{maxHeight:"410px", overflow:"scroll"}}>
            <h3>Edit your Peak Search Settings</h3>
            <TextField
                margin="normal"
                required
                autoFocus
                size="large"
                label="Mass Tolerance"
                sx={{ width: '48%', float: 'left' }}
                name="tolerance"
                type="number"
                inputProps={{step: "0.1", min: "0"}}
                value = {analysisContent.tolerance}
                // onChange={e => setTolerance(e.target.value)}
                />
                <TextField
                margin="normal"
                required
                size="large"
                sx={{ width: '48%', float: 'right' }}
                name="minimumPeakHeight"
                label="Minimum Peak Height"
                type="number"
                value={analysisContent.peak_height}
                inputProps={{step: "0.01", min: "0"}}
                // onChange={e => setMinimumPeakHeight(e.target.value)}
                />
                  <TextField
                    margin="normal"
                    select
                    sx={{ width: '48%', float: 'left' }}
                    required
                    size="large"
                    label="Re-calibration of Mass Spectrum"
                    name="spectrumCalibration"
                    value={analysisContent.calibrate}
                    // onChange={e => setSpectrumCalibration(e.target.value)}
                  >
                    {spectrumCalibrationOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                  disabled={analysisContent.calibrate === "Automatic"}
                margin="normal"
                size="large"
                value={analysisContent.calibrate}
                sx={{ width: '48%', float: 'right' }}
                name="manualCalibration"
                label="Manual Calibration (Only if manual chosen)"
                type="number"
                inputProps={{step: "0.5", min: "0"}}
                // onChange={e => setManualCalibration(e.target.value)}
                />
                <TextField
                  margin="normal"
                  sx = {{width: '48%'}}
                  select
                  required
                  size="large"
                  label="Return all Peaks Detected"
                  name="returnPeaksDetected"
                  value={analysisContent.only_best}
                  
                  // onChange={e => setReturnPeaksDetected(e.target.value)}
                >
                  {yesNo.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
            <h3>Edit your Feasible Set Settings</h3>
                <TextField
                margin="normal"
                required
                autoFocus
                size="large"
                sx={{ width: '48%', float: 'left' }}
                label="Maximum unique standard adducts"
                name="maximumUnique"
                type="number"
                inputProps={{step: "1", min: "0"}}
                value={analysisContent.max_adducts}
                // onChange={e => setMaximumUnique(e.target.value)}
                />
                <TextField
                margin="normal"
                required
                size="large"
                sx={{ width: '48%', float: 'right' }}
                label="Coordination number of metal"
                name="coordinationNumber"
                type="number"
                inputProps={{step: "1", min: "0"}}
                value={analysisContent.valence}
                // onChange={e => setCoordinationNumber(e.target.value)}
                />
                <TextField
                margin="normal"
                required
                size="large"
                sx={{ width: '48%', float: 'left' }}
                label="Minimum number of proteins"
                name="minimumProteinNumber"
                type="number"
                inputProps={{step: "1", min: "1"}}
                value={analysisContent.min_primaries}
                // onChange={e => setMinimumProteinNumber(e.target.value)}
                />
                <TextField
                margin="normal"
                required
                size="large"
                sx={{ width: '48%', float: 'right' }}
                label="Maximum number of proteins"
                name="maximumProteinNumber"
                type="number"
                inputProps={{step: "1", min: "1"}}
                value={analysisContent.max_primaries}
                // onChange={e => setMaximumProteinNumber(e.target.value)}
                />
                <TextField
                  margin="normal"
                  select
                  required
                  size="large"
                  sx={{ width: '48%', float: 'left' }}
                  label="Set for multiple proteins?"
                  name="multiProtein"
                  value={analysisContent.multi_protein}
                  // onChange={e => setMultiProtein(e.target.value)}
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
                  sx={{ width: '48%', float: 'right', marginBottom: '32px' }}
                  label="Data Publicity"
                  name="setDataPublic"
                  value={analysisContent.data_publicity}
                  // onChange={e => setDataPublic(e.target.value)}
                >
                  {publicPrivate.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                
                </div>
                <Button variant="contained" sx={{ width: "30%", marginBottom: "0px", float: "right", backgroundColor:"#04ADEB", marginTop:"10px" }} onClick={handleGroupChanges}>
                    Submit Content
                </Button>
          </TabPanel>

          <TabPanel value={value} index={3} >
          <div >
            <h3>Edit your Analysis Content</h3>
            
              <TextField
                label="Title"
                value={allData.title}
                fullWidth
                variant="outlined"
                style={{marginTop: '20px'}}
              />
              

              <TextField
                label="Description"
                value={allData.description}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                style={{marginTop: '20px'}}
              />
              <div className = "Tag-input">
              <Autocomplete
                  multiple
                  freeSolo
                  value={allData.tags}
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
                      // placeholder="Enter tags"
                      onKeyDown={(event) => {
                        // if (event.key === 'Enter') {
                        //   handleAddTag(event, event.target.value);
                        //   event.target.value = '';
                        //   event.preventDefault();
                        // }
                      }}
                    />
                  )}
                />
                </div>
                

              <TextField
                  type="file"
                  inputProps={{accept:".png, .jpg, .jpeg"}}
                  margin="normal"
                  required
                  size="large"
                  name="postImageFile"
                  // onChange={e => {
                  //   setPostImageFile(e.target.files[0]);
                  //   handleFileUpload(e);}}
                  />


              <TextField
                  margin="normal"
                  sx={{ width: '48%', float: 'right' }}
                  select
                  className = "Floater"
                  required
                  size="large"
                  
                  label="Post Publicity"
                  name="setPostPublic"
                  defaultValue={stringPublicity}
                  //onChange={e => setPostPublic(e.target.value)}
                >
                  {publicPrivate.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

              

            </div>
            <Button variant="contained" sx={{ width: "30%", marginBottom: "0px", float: "right", backgroundColor:"#04ADEB", marginTop:"10px" }} onClick={handleGroupChanges}>
                Submit Content
            </Button>
          </TabPanel>
        </Box>
      </Box>
    </Dialog>
  );
};
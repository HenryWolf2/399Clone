import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
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
import { useNavigate } from 'react-router-dom';
import {CircularProgress} from '@mui/material';

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
  const navigate = useNavigate() 
  const [value, setValue] = useState(0);
  const [groupIDs, setGroupIDs] = useState([]);
  const [analysisContent, setAnalysisContent] = useState([])
  const [collaboratorsList, setCollaborators] = useState([])
  const [collaboratorIDs, setCollaboratorIDs] = useState([]);
  const [tags, setTags] = useState(allData.tags);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [publicity, setPostPublic] = useState("")

  const [checkboxStates, setCheckboxStates] = useState({});

  const [tolerance, setTolerance] = useState("3.1")
  const [peak_height, setMinimumPeakHeight] = useState("0.01")
  const [calibrate, setSpectrumCalibration] = useState("Automatic")
  const [only_best, setReturnPeaksDetected] = useState("")
  const [max_adducts, setMaximumUnique] = useState("2")
  const [valence, setCoordinationNumber] = useState("4")
  const [min_primaries, setMinimumProteinNumber] = useState("1")
  const [max_primaries, setMaximumProteinNumber] = useState("1")
  const [data_publicity, setDataPublic] = useState("")
  const [multi_protein, setMultiProtein] = useState("off")
  const [manual_calibration, setManualCalibration] = useState("0")

  const [isLoading, setIsLoading] = useState(false);

  const handleContentSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (collaboratorsList !== undefined) {
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
    }
    let final_publicity = ""
    if (publicity !== "") {
      final_publicity = publicity
    } else {
      final_publicity = stringPublicity
    }
    console.log(tags)

    if (tags === undefined) {
      console.log("hello ?")
      console.log(allData)
      setTags(allData.tags)
      console.log(tags)
    }
  try {
    await instance.put('/post/edit', {
      post_id: allData.id,
      title: title,
      description: description,
      publicity: final_publicity,
      tags: tags,
      collaborators: collaboratorIDs,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch(e) {
    console.error(e)
  }
  setOpen(false);
  window.location.reload(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try{
      await instance.delete('post/delete', {
        data: {
          post_id: allData.id,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      } catch(e){
          console.error(e)
      }
      navigate("/")
    }
    

  const handleAnalysisChanges = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let final_data_publicity = ""
    if (data_publicity === "True" || data_publicity === "true" || data_publicity === true) {
      final_data_publicity = true
    } else {
      final_data_publicity = false
    }
    try {
      await instance.put('/post/edit/config', {
        analysis_id: allData.associated_results,
        tolerance: tolerance,
        peak_height: peak_height,
        multi_protein: multi_protein,
        only_best: only_best,
        calibrate: calibrate,
        min_primaries: min_primaries,
        max_primaries: max_primaries,
        max_adducts: max_adducts,
        valence: valence,
        publicity: final_data_publicity,
        manual_calibration: manual_calibration
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch(e) {
      console.error(e)
    }
    setOpen(false);
    window.location.reload(false);
  }

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
    },
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
    if (tags !== undefined && newTag && !tags.includes(newTag)) {
      console.log("here")
      setTags(prevTags => [...prevTags, newTag]);
    }
    console.log(tags)
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags((prevTags) => prevTags.filter(tag => tag !== tagToDelete));
  };

  const handleGroupChanges = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    for (let id in checkboxStates) {
      if (id !== "") {
        if (checkboxStates[id] === true) {
          const formData = new FormData();
          formData.append("post_id", allData.id);
          formData.append("group_id", id);

          try{
          await instance.post('/post/add_to_group', formData,{
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }).then((res) => {  });
          } catch(e){
              console.error(e)
          }

        } else {
          try{
            await instance.delete('/groups/post/delete', {
              data: {
                group_id: id,
                post_id: allData.id,
              },
              headers: {
                'Content-Type': 'application/json',
              },
            });
            } catch(e){
                console.error(e)
            }
        }
      }
    }
    setOpen(false);
    window.location.reload(false);
  }

  const checkCollaborators = (newValue) => {
    instance.get('/user/check_username', {
      params: {
        username: newValue[newValue.length - 1]
      }
    }).then(function (response) {
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

  const collaboratorsArray = allData.collaborators;
  
  useEffect(() => {
    async function GetIndividualInformation(user_id) {
      try{ 
        await instance ({
          url: "user/info",
          method: "GET",
          params: { 
            user_id: user_id 
          }
        }).then((res) => {
          setCollaborators(prevUsers => [...prevUsers, res.data.username]);
        });
      } catch(e) {
        console.error(e)
      }
    }

    Promise.all(collaboratorsArray?.map(user_id => GetIndividualInformation(user_id)) || [])
  }, [collaboratorsArray]);

  useEffect(() => {
    if (allData.tags) {
      setTags(allData.tags);
    }
  }, [allData.tags]);

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
    if (allData.associated_results !== undefined ) {

    
    async function getAnalysisDetails() {
      try {
        const response = await instance({
          url: "/post/get/config",
          method: "GET",
          params: { analysis_id: allData.associated_results },
        });
        setAnalysisContent(response.data);
        setTolerance(response.data.tolerance)
        setMinimumPeakHeight(response.data.peak_height)
        setSpectrumCalibration(response.data.calibrate)
        setManualCalibration(response.data.manual_calibration || "")
        setReturnPeaksDetected(response.data.only_best)
        setMaximumUnique(response.data.max_adducts)
        setCoordinationNumber(response.data.valence)
        setMinimumProteinNumber(response.data.min_primaries)
        setMaximumProteinNumber(response.data.max_primaries)
        setMultiProtein(response.data.multi_protein)
        setDataPublic(response.data.data)
      } catch (error) {
        console.error("Error fetching analysis details:", error);
      }
    };
    
    getAnalysisDetails();
  }}, [allData.associated_results]);

  let arrayDataItems = groupIDs.map((group_id) =>  <Grid item key={group_id} xs={6} sx={{ paddingTop: "0px", marginBottom: "20px"}}> <EditGroupCard group_id={group_id} post_id={allData.id}  setCheckboxStates={setCheckboxStates} checkboxStates={checkboxStates}/> </Grid>); 

  let stringPublicity = ""
  if (allData.publicity === false) {
    stringPublicity = "False"
  } else {
    stringPublicity = "True"
  }

  let stringDataPublicity = ""
  if (data_publicity === false) {
    stringDataPublicity = "False"
  } else {
    stringDataPublicity = "True"
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth >
      <Box sx={{ display: 'flex', flexDirection: 'row', height: 500}}>
        <Box sx={{ width: 150, backgroundColor: '#f0f0f0' }}>
          <Tab label="Groups" onClick={() => setValue(0)} sx={{ borderBottom: 1, borderColor: 'divider', width: 150, alignItems: "flex-start", height: 125 }} />
          <Tab label="Peak Search Settings" onClick={() => setValue(1)} sx={{ borderBottom: 1, borderColor: 'divider', width: 150, alignItems: "flex-start", textAlign: 'left', height: 125 }} />
          <Tab label="Content" onClick={() => setValue(2)} sx={{ borderBottom: 1, borderColor: 'divider', width: 150, alignItems: "flex-start", height: 125 }} />
          <Tab label="Delete Post" onClick={() => setValue(3)} sx={{ borderBottom: 1, borderColor: 'divider', width: 150, alignItems: "flex-start", height: 62.5, backgroundColor: 'red', fontWeight: 'bold', marginTop: 7.8 }} />
        </Box>
        <Box sx={{ flex: 1 }}>

          <TabPanel value={value} index={0} sx={{ margin: 20 }}>
            <h3>Add your Post to your Groups</h3>

            <Grid container spacing={2} sx={{marginTop: '20px', marginBottom: '20px', maxHeight: '300px', overflowY: "scroll"}}>
              {arrayDataItems}
              
            </Grid>
            <Grid item xs={12}>
                {isLoading ? (
                    <CircularProgress sx={{float: "right"}} />
                ) : (
                  <Button variant="contained" sx={{ width: "30%", marginBottom: "0px", float: "right", backgroundColor:"#04ADEB" }} onClick={handleGroupChanges}>
                  Submit Groups
                </Button>
                )}
            </Grid>

           
          </TabPanel>

          <TabPanel value={value} index={1}>
            <div style = {{maxHeight:"410px", overflow:"scroll"}}>
            <h3>Edit your Peak Search Settings</h3>
            <TextField
                margin="normal"
                required
                size="large"
                label="Mass Tolerance"
                sx={{ width: '48%', float: 'left' }}
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
                sx={{ width: '48%', float: 'right' }}
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
                  sx={{ width: '48%', float: 'left' }}
                  required
                  size="large"
                  label="Re-calibration of Mass Spectrum"
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
                  value={manual_calibration}
                  sx={{ width: '48%', float: 'right' }}
                  name="manualCalibration"
                  label="Manual Calibration (Only if manual chosen)"
                  type="number"
                  inputProps={{step: "0.5", min: "0"}}
                  onChange={e => setManualCalibration(e.target.value)}
                  />
                <TextField
                  margin="normal"
                  sx = {{width: '48%'}}
                  select
                  required
                  size="large"
                  label="Return all Peaks Detected"
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
            <h3>Edit your Feasible Set Settings</h3>
                <TextField
                margin="normal"
                required
                size="large"
                sx={{ width: '48%', float: 'left' }}
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
                sx={{ width: '48%', float: 'right' }}
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
                sx={{ width: '48%', float: 'left' }}
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
                sx={{ width: '48%', float: 'right' }}
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
                  sx={{ width: '48%', float: 'left' }}
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
                  sx={{ width: '48%', float: 'right', marginBottom: '32px' }}
                  select
                  required
                  className='Floater'
                  size="large"
                  label="Data Publicity"
                  name="setDataPublic"
                  defaultValue={stringDataPublicity}
                  onChange={e => setDataPublic(e.target.value)}
                >
                  {publicPrivate.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                
                </div>
                {isLoading ? (
                    <CircularProgress sx={{float: "right"}} />
                ) : (
                    <Button 
                        variant="contained" 
                        sx={{ width: "30%", marginBottom: "0px", float: "right", backgroundColor:"#04ADEB", marginTop:"10px" }} 
                        onClick={handleAnalysisChanges}
                    >
                        Submit Settings
                    </Button>
                )}
          </TabPanel>

          <TabPanel value={value} index={2} >
          <div style = {{maxHeight:"410px", overflow:"scroll"}}>
            <h3>Edit your Analysis Content</h3>
            
              <TextField
                label="Title"
                defaultValue={allData.title}
                fullWidth
                type="text"
                variant="outlined"
                style={{marginTop: '20px'}}
                onChange={e => setTitle(e.target.value)}
              />
              

              <TextField
                label="Description"
                defaultValue={allData.description}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                style={{marginTop: '20px'}}
                onChange={e => setDescription(e.target.value)}
              />
              <div className = "Tag-input">
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                defaultValue={allData.tags}
                onChange={(event, newValue) => {
                  setTags(newValue);
                }}
                renderTags={(value, getTagProps) =>
                  value.map((tag, index) => (
                    <Chip
                      sx={{ bgcolor: '#02AEEC', color: 'white' }}
                      key={tag}
                      label={tag}
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

                <Autocomplete
                  className = "Margin-top"
                  key={error ? 'error' : 'no-error'}
                  multiple
                  freeSolo
                  options={[]}
                  defaultValue={collaboratorsList}
                  onChange={(event, newValue) => {
                    checkCollaborators(newValue)
                  }}

                  renderTags={(value, getTagProps) =>
                    value.map((tag, index) => (
                      <Chip
                        sx={{ bgcolor: '#02AEEC', color: 'white' }}
                        key={tag}
                        label={tag}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Enter usernames"
                      error={error}
                      helperText={error ? "Username does not exist" : ""}
                    />
                  )}
                />

                <TextField
                  margin="normal"
                  sx={{ width: '100%', float: 'left' }}
                  select
                  className = "Floater"
                  required
                  size="large"
                  
                  label="Post Publicity"
                  name="setPostPublic"
                  defaultValue={stringPublicity}
                  onChange={e => setPostPublic(e.target.value)}
                >
                  {publicPrivate.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

              

            </div>
            {isLoading ? (
                    <CircularProgress sx={{float: "right"}} />
                ) : (
                  <Button variant="contained" sx={{ width: "30%", marginBottom: "0px", float: "right", backgroundColor:"#04ADEB", marginTop:"10px" }} onClick={handleContentSubmit}>
                  Submit Content
              </Button>
                )}
          </TabPanel>

          <TabPanel value={value} index={3} sx={{ margin: 20 }}>
            <h3>Delete Post</h3>

            <p>Are you sure that you want to delete this post? It will be removed from every group it has been shared with and will permanently deleted.<br></br></p>
            <p>This action can not be undone so please be certain before deleting!</p>
            <Grid item xs={12}>
            {isLoading ? (
                    <CircularProgress sx={{float: "right"}} />
                ) : (
                  <Button variant="contained" sx={{ width: "30%", marginBottom: "0px", float: "right", backgroundColor:"#FC7770" }} onClick={handleDelete}>
                    Delete Post
                  </Button>
                )}
              </Grid>

           
          </TabPanel>
        </Box>
      </Box>
    </Dialog>
  );
};
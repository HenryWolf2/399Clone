import instance from '../api/api_instance';
import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GroupForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [groupPicture, setGroupPicture] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('group_pic', groupPicture);
    formData.append('created', groupPicture);

    try {
      await instance.post('/groups/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        console.log(response)
        navigate('/')
      });
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Create a Group
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          multiline
          rows={4}
          fullWidth
          margin="normal"
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <p className="form-description">Choose file for your group. This will be used as the banner image on the group later on</p>
        <TextField
                type="file"
                style = {{width: 400, textAlign: "center"}}
                inputProps={{accept:".png, .jpg, .jpeg"}}
                margin="normal"
                required
                size="large"
                name="groupImageFile"
                autoFocus
                onChange={e => setGroupPicture(e.target.files[0])}
                />
        <Box display="flex" justifyContent="center">
          <Button
            type="submit"
            size="large"
            variant="contained"
            sx={{ mt: 3, mb: 2 , backgroundColor: '#02AEEC'}} 
            style={{ margin: '30px' }}
          >
            Create Group
          </Button>
        </Box>
      </form>
      </Box>
  );
};

export default GroupForm;

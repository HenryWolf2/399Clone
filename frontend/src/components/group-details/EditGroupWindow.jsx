import React, { useState, useEffect } from 'react';
import instance from '../api/api_instance';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { FormControl, FormLabel } from '@mui/material';
import {useNavigate} from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '5px solid #02AEEC',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};

const centerFlex = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '30px',
};


export default function EditModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const [groupname, setGroupname] =   useState('');
  const [description, setDescription] = useState('');
  const [banner, setBanner] = useState('');
  const [userPermission, setUserPermission] = useState('');
  const [isOwner, setIsOwner] = React.useState(false);
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    function updateDeleteView() {
      if(userPermission === "owner") {
        setIsOwner(true);
      }
    }
    updateDeleteView();
  })

  const navigateToLanding = () => {
    navigate('/groups');
  };

  useEffect(() => {
      async function GetGroupInformation() {
        try{ 
          await instance ({
            url: "/group/info",
            method: "GET",
            params: {group_id: props.group_id},       
        }).then((res) => {
          setGroupname(res.data.name)
          setDescription(res.data.description)
          setBanner(res.data.group_pic)
          setUserPermission(res.data.user_permission)
          setMemberList(res.data.members);

        });
        } catch(e) {
          console.error(e)
        }
      }
      GetGroupInformation();
      } , 
      [props.group_id] 
    ) 


  const handleNameChange = (event) => {
    setGroupname(event.target.value);
  };

  const handleBannerPhotoChange = (event) => {
    setBanner(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  async function removeAllMembers() {
    const memberIdList = memberList;
    for (const id of memberIdList) {
      await updateUserPermissions(id[0], props.group_id, 'remove');
    }
  }

  async function handleDeleteGroup() {
    try {
      removeAllMembers();
      await instance({
        url: "/group/delete",
        method: "DELETE",
        data: {group_id: props.group_id}
      });
    } catch(e) {
      console.error(e);
    }
    navigateToLanding();
  }

  const handleGroupUpdate = async () => {
    const formData = new FormData();
    formData.append('group_id', props.group_id);
    if (groupname) {
      formData.append('name', groupname);
    }
    if (banner) {
      formData.append('group_pic', banner);
    }
    formData.append('description', description);

    console.log(formData);

    try{
      await instance.put('/groups/edit', formData, {
        params: {
          group_id: props.group_id
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(
        (res) => {
          
        }
      );
    } catch(e){
        console.error(e)
    }
    window.location.reload(false);
  }

  const updateUserPermissions = async (userId, groupId, permission) => {
    const data = {
      user_id: userId,
      group_id: groupId,
      permissions: permission,
    };

    try {
      await instance.put('groups/update_perms', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Permissions updated successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    <div>
      <Button
        style = {{marginBottom:'-50px', width:'150px'}}
        sx={{backgroundColor:'#02AEEC'}}
        className="custom-button"
        variant="contained"
        onClick={handleOpen} 
      >
        Edit Group
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center', fontWeight: 'bold', fontSize: '30px'}}>
            Edit Profile
          </Typography>
          <FormControl sx={{...centerFlex}}>
            <TextField 
                style={{width:'400px'}}
                id="filled-basic"
                label="Group Name"  
                defaultValue={groupname} 
                onChange={handleNameChange}/>
            <TextField
                id="filled-multiline-static"
                label="Description"
                multiline
                rows={6}
                defaultValue={description}
                sx={{margin: '15px', width: '400px'}}
                onChange={handleDescriptionChange}
            />
            <FormLabel>Change Banner Image</FormLabel>
            <TextField
                type="file"
                style = {{width: 400, textAlign: "center",}}
                inputProps={{accept:".png, .jpg"}}
                margin="normal"
                required
                size="large"
                name="bannerImage"
                autoFocus
                onChange={handleBannerPhotoChange}
                />

            <Button onClick={()=> {handleGroupUpdate(); handleClose(); }} sx={{marginTop:'30px'}} variant='contained'>Save Changes</Button>
            {isOwner ? (
                <Button onClick={()=> {handleDeleteGroup(); handleClose(); }} sx={{marginTop:'17.5px', backgroundColor:'red'}} variant='contained' color='error'>Delete Group</Button>
            ) : (
              <div></div>
            )}
          </FormControl>

        </Box>
      </Modal>
    </div>
  );
}


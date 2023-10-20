import React, { useState, useEffect } from 'react';
import instance from '../api/api_instance';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



export default function PermsCard(props) {

  const [admin, setAdmin] = React.useState(false);
  const [checkingAdmin, setCheckingAdmin] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const groupId = props.group_id;

  const [memberList, setMemberList] = useState([]);
  const [memberObjectList, setMemberObjectList] = useState([]);

  const [tempPerm, setTempPerm] = useState('');
  const [remainingPerms, setRemainingPerms] = useState([]);
  const [tempUsername, setTempUsername] = useState('');
  const [tempUserId, setTempuserId] = useState('');

  const [changedPerm, setChangedPerm] = React.useState('');
  const [currentUserPerm, setCurrentUserPerm] = useState('');

  const handleChange = (event) => {
    setChangedPerm(event.target.value);
  };
  
  const changeAdminPerm = (perm) => {
    if (perm == "admin" || perm == "owner") {
      setCheckingAdmin(true);
    }
    if (currentUserPerm == "owner" && perm == "owner") {
      setCheckingAdmin(true);
    } else if (currentUserPerm == "owner" && perm != "owner") {
      setCheckingAdmin(false);
    }
  }
  

  
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
    display:'flex',
    flexDirection:'column',
    p: 4,
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const setCurrentPerm = (perm) => {
    setTempPerm(perm);
  }

  const setCurrentName = (name) => {
    setTempUsername(name);
  }

  const setCurrentId = (id) => {
    setTempuserId(id);
  }

  const calcRemainingPerms = (perm) => {
    const perms = [];
    if (perm == "admin") {
      perms.push("poster");
      perms.push("viewer");
      setRemainingPerms(perms);
    } else if (perm == "poster") {
      perms.push("admin");
      perms.push("viewer");
      setRemainingPerms(perms);
    } else if (perm == "viewer") {
      perms.push("admin");
      perms.push("poster");
      setRemainingPerms(perms);
    }
  }

  useEffect(() => {
    async function GetGroupInformation() {
      try{ 
        await instance ({
          url: "/group/info",
          method: "GET",
          params: {group_id: props.group_id},       
      }).then((res) => {
        setMemberList(res.data.members)
        const currentUserPerm = res.data.user_permission
        setCurrentUserPerm(currentUserPerm)
        if (currentUserPerm == 'admin' || currentUserPerm == 'owner') {
          setAdmin(true)
        }

      });
      } catch(e) {
        console.error(e)
      }
    }
    GetGroupInformation();
    } , // <- function that will run on every dependency update
    [] // <-- empty dependency array
  ) 

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
          // Include your authentication tokens in the headers if needed
        },
      });
      console.log('Permissions updated successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const GetMemberInformation = async (id) => {
    try {
      return await instance({
        url: "/user/info",
        method: "GET",
        params: {user_id: id},      
      }).then((res) => {
        const username = res.data.username
        const profilePic = res.data.profile_pic && res.data.profile_pic !== '' ? res.data.profile_pic : 'missingImage';
        const memberList = [username, profilePic]

        return memberList
      });
    } catch(e) {
      console.error(e);
    }
  };
  

  useEffect(() => {
    const fetchMemberInformation = async () => {
      const memberIdList = memberList;
      const memberObjectList = [];
      for (const id of memberIdList) {
        const memberInfo = await GetMemberInformation(id[0]);
        memberInfo.push(id[1]);
        memberInfo.push(id[0]);
        memberObjectList.push(memberInfo);
      }
      setMemberObjectList(memberObjectList.map(memberInfo => memberInfo));
    };
  
    fetchMemberInformation();
  }, [memberList]);


  return (
    <div>
      <List dense sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
      {admin ? (
        memberObjectList.map((value) => {
          const labelId = `${value[0]}`;
          return (
            <ListItem
              key={value}
              secondaryAction={
                <Button
                sx={{backgroundColor:'#02AEEC'}}
                className="custom-button"
                variant="contained"
                onClick={() => {
                  handleOpen();
                  setCurrentPerm(value[2]);
                  calcRemainingPerms(value[2]);
                  setCurrentName(value[0]);
                  changeAdminPerm(value[2]);
                  setCurrentId(value[3]);
                }}
                >
                  Change Permissions
                </Button>
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={`${value[0]}`}
                    src={instance.defaults.baseURL.replace('/api', "") + value[1]}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${value[0]}`} secondary={`${value[2]}`} />
              </ListItemButton>
            </ListItem>
          );
        })
      ) : (
        memberObjectList.map((value) => {
          const labelId = `${value[0]}`;
          return (
            <ListItem
              key={value}
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={`${value[0]}`}
                    src={instance.defaults.baseURL.replace('/api', "") + value[1]}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${value[0]}`} secondary={`${value[2]}`} />
              </ListItemButton>
            </ListItem>
          );
        })
      )}
    </List>
        <div>
        {checkingAdmin ? (
          <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <div style={{backgroundColor:'#02AEEC', padding:'10px', borderRadius: '20px'}}>
              <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center', fontWeight: 'bold', fontSize: '30px', color: 'white'}}>
                Unable to Change the Permissions of Fellow Admin
              </Typography>
              </div>
            </Box>
        </Modal>
        ) : (
          <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
            <div style={{backgroundColor:'#02AEEC', padding:'10px', borderRadius: '20px', marginBottom:'35px'}}>
              <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center', fontWeight: 'bold', fontSize: '30px', color: 'white'}}>
                Permission Change
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center', fontWeight: 'bold', fontSize: '30px', color: 'white'}}>
                User: {tempUsername}
              </Typography>
              </div>


                <FormControl fullWidth sx={{marginBottom:'20px'}}>
                  <InputLabel id="demo-simple-select-label">Current Permission: {tempPerm}</InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Current Permission: Poster"
                  onChange={handleChange}
                  >
                    <MenuItem value={tempPerm}>{tempPerm}</MenuItem>
                    <MenuItem value={remainingPerms[0]}>{remainingPerms[0]}</MenuItem>
                    <MenuItem value={remainingPerms[1]}>{remainingPerms[1]}</MenuItem>
                  </Select>
                </FormControl>
                <Button
                className="custom-button"
                variant="contained"
                onClick={() => {
                  handleClose();
                  updateUserPermissions(tempUserId, groupId, changedPerm);
                  window.location.reload(false);
                }}
                >
                  Submit Change
                </Button>
            </Box>
          </Modal>
        )}
    </div>
  </div>
  );
}

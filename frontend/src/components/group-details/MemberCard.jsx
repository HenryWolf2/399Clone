import React, { useState, useEffect } from 'react';
import instance from '../api/api_instance';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ListItem from './ListItem';

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

    const [memberList, setMemberList] = useState([]);
    const [memberObjectList, setMemberObjectList] = useState([]);
    const [memberCount, setMemberCount] = useState(0);

    useEffect(() => {
      async function GetGroupInformation() {
        try{ 
          await instance ({
            url: "/group/info",
            method: "GET",
            params: {group_id: props.group_id},       
        }).then((res) => {
          setMemberList(res.data.members)
          //Need to define perms
        });
        } catch(e) {
          console.error(e)
        }
      }
      GetGroupInformation();
      } , // <- function that will run on every dependency update
      [] // <-- empty dependency array
    ) 

    const GetMemberInformation = async (id) => {
      try {
        return await instance({
          url: "/user/info",
          method: "GET",
          params: {user_id: id},      
        }).then((res) => {
          const username = res.data.username
          const email = res.data.email
          const profilePic = res.data.profile_pic && res.data.profile_pic !== '' ? res.data.profile_pic : 'missingImage';
          const memberList = [username, profilePic, email]

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
          if (id[1] != 'requested') {
            memberObjectList.push(memberInfo);
          }
        }
        setMemberObjectList(memberObjectList.map(memberInfo => memberInfo));
        setMemberCount(memberObjectList.length);
      };

      fetchMemberInformation();
    }, [memberList]);


  return (
    <div>
      <Button
        style={{backgroundColor:'#02AEEC'}}
        variant="contained"
        onClick={handleOpen} // Use onClick here to open the modal
      >
        {memberCount} Members
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
        <div style={{backgroundColor:'#02AEEC', padding:'10px', borderRadius: '20px', marginBottom:'35px'}}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center', fontWeight: 'bold', fontSize: '30px', color: 'white'}}>
            Group Members
          </Typography>

          </div>

          <div style={{height:'250px', overflowY: 'scroll', border:'2px solid #02AEEC'}}>
            <ListItem group_id={props.group_id}></ListItem>
          </div>

        </Box>
      </Modal>
    </div>
  );
}


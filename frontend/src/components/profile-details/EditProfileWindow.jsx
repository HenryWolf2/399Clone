import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { FormControl, FormLabel } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import Upload from '@mui/icons-material/Upload';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
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


export default function EditModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        sx={{ margin: 3.5, top: '250px', left: '25px' }}
        className="custom-button"
        variant="contained"
        onClick={handleOpen} // Use onClick here to open the modal
      >
        Edit Profile
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
            Edit Profile
          </Typography>
          <FormControl sx={{...centerFlex}}>
            <FormLabel sx={{}}>Change Description</FormLabel>
            <TextField
              id="outlined-multiline-flexible"
              label="Describe Yourself"
              multiline
              maxRows={4}
              sx={{margin:'15px'}}
              />
            <FormLabel>Change Banner Photo</FormLabel>
            <Button variant='contained' sx={{margin:'15px'}} endIcon={<UploadIcon/>}>Upload Image</Button>
            <FormLabel>Change Profile Photo</FormLabel>
            <Button variant='contained' sx={{margin:'15px'}} endIcon={<UploadIcon/>}>Upload Image</Button>
            <Button sx={{marginTop:'30px'}}>Save Changes</Button>
          </FormControl>

        </Box>
      </Modal>
    </div>
  );
}


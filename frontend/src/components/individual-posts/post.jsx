import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Contributors from './contributors';
import ProfilePicture from './profile';
import StockImage from '../../assets/images/stock-image.jpg';
import { Button } from '@mui/material';

import '../../assets/styles/global.css';

export default function IndividualPost() {
  return (
    <Box sx={{ width: '100%', maxWidth: 750, bgcolor: '#D9D9D9', borderRadius: '10px', padding: "10px 0px 10px 0px", margin: "20px" }}>
      <Box sx={{ my: 3, mx: 2, margin: "0px" }}>
        <Grid container alignItems="center" >

          {/* Profile picture will need to be reviewed when the backend is linked */}

          <Grid item sx={{margin: "0px 0px 0px 20px"}}>
            <ProfilePicture />
          </Grid>
          <Grid item xs sx={{padding: '0px 0px 0px 10px'}}>
            <Typography gutterBottom variant="h6" component="div" sx={{marginBottom: "0px"}}>
              Group name <br></br>Date and Time ~ Public
            </Typography>
          </Grid>

          {/* Contributors pictures will also need to be reviewed when the backend is linked */} 

          <Grid item sx={{margin: "0px 20px 0px 0px"}}>
              <Contributors />
          </Grid>
        </Grid>
        <Typography gutterBottom variant="h4" component="div" sx={{margin: "0px 20px 0px 20px"}}>
              Title
        </Typography>
        <Typography color="text.secondary" variant="body2" sx={{margin: "0px 20px 0px 20px"}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam iaculis tincidunt imperdiet.
          Phasellus tincidunt lacus et odio elementum tempus. Maecenas porta sodales arcu, ut iaculis libero vehicula in.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam iaculis tincidunt imperdiet.
          Phasellus tincidunt lacus et odio elementum tempus. Maecenas porta sodales arcu, ut iaculis libero vehicula in.
        </Typography>
        <img src={ StockImage } className="Post-image" alt="logo" style={{padding: '10px 0px 10px 0px'}}/>
        <Stack direction="row" spacing={1} sx={{margin: "0px 20px 0px 20px"}}>
          <Chip sx={{ bgcolor: '#02AEEC', color: 'white' }} label="Tag1" />
          <Chip sx={{ bgcolor: '#02AEEC', color: 'white' }} label="Tag2" />
          <Chip sx={{ bgcolor: '#02AEEC', color: 'white' }} label="Tag3" />
          <Chip sx={{ bgcolor: '#02AEEC', color: 'white' }} label="Tag4" />
        </Stack>
      </Box>
    </Box>
  );
}


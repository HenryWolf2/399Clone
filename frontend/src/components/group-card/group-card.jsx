import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import instance from '../api/api_instance.js'
import '../../assets/styles/global.css';
import StockImage from '../../assets/images/stock-image.jpg';

export default function GroupCard(props) {
  
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [groupPicture, setGroupPicture] = useState("")
  
  useEffect(() => {
    async function GetGroupInformation() {
      try{ 
        await instance ({
          url: "/group/id",
          method: "GET",
          params: {group_id: props.group_id}
          
      }).then((res) => {
        setName(res.data.name)
        setDescription(res.data.description)
        setGroupPicture(res.data.group_pic)
        console.log(res.data.group_pic)
      });
      } catch(e) {
        console.error(e)
      }
    }
    GetGroupInformation();
    } , // <- function that will run on every dependency update
    [] // <-- empty dependency array
  )
  

  return (
    <Box sx={{ width: '100%', bgcolor: '#D9D9D9', borderRadius: '10px', padding: "10px 0px 10px 0px" }}>
      <Box sx={{ my: 3, mx: 2, margin: "0px" }}>
        <Grid container alignItems="center" >
          <Grid item xs sx={{padding: '0px 0px 0px 10px'}}>
            <Typography gutterBottom variant="h6" component="div" sx={{marginBottom: "0px"}}>
              {name}
            </Typography>
          </Grid>
        </Grid>

        <Typography color="text.secondary" variant="body2" sx={{margin: "0px 20px 0px 20px"}}>
          { description }
        </Typography>
        <img src={ StockImage } className="Post-image" alt="logo" style={{padding: '10px 0px 10px 0px'}}/>
      </Box>
    </Box>
  );
}

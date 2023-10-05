import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import instance from '../api/api_instance.js'
import '../../assets/styles/global.css';
import StockImage from '../../assets/images/stock-image.jpg';
import { Link } from 'react-router-dom';

export default function GroupCard(props) {
  
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [memberCount, setMemberCount] = useState("")
  const [postCount, setPostCount] = useState("")
  let [groupPicture, setGroupPicture] = useState("")
  const [groupID, setGroupId] = useState("")
  
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
        setMemberCount(res.data.member_count)
        setPostCount(res.data.post_count)
        setGroupId("/group/"+props.group_id)
      });
      } catch(e) {
        console.error(e)
      }
    }
    GetGroupInformation();
    } , // <- function that will run on every dependency update
    [] // <-- empty dependency array
  )  
  const groupPictureURL = `${instance.defaults.baseURL.replace("/api", "")}${groupPicture}`;

  return (
    <Link to={groupID} style={{ textDecoration: "none", color: 'black' }}>
      <Box sx={{ width: '100%', bgcolor: '#D9D9D9', borderRadius: '10px' }}>
        <Box sx={{ my: 3, mx: 2, margin: "0px" }}>
          <Grid container alignItems="center" >
            <Grid item sx={{padding: '10px 10px 6.5px 10px'}}>
              <img src={ groupPictureURL } className="group-landing-image" alt="logo"/>
            </Grid>

            <Grid item xs>
              <Typography gutterBottom component="div" sx={{marginBottom: "0px", fontSize: "15px"}}>
                {name} <br></br> {memberCount} Members | {postCount} Posts
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Link>
  );
}

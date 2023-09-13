import React from 'react';
import NavigationBar from '../components/NavigationBar';
import RegisterForm from '../components/register/registerForm'
import { useState, useEffect } from 'react';
import instance from '../components/api/api_instance';
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import StockImage from '../assets/images/stock-image.jpg';



export default function PostPage(props) {

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [publicity, setPublicity] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  
  useEffect(() => {
    async function GetPostInformation() {
      try{ 
        await instance ({
          url: "/post/get_by_id",
          method: "GET",
          params: {post_id: props.post_id}
          
      }).then((res) => {
        setTitle(res.data.title)
        setSummary(res.data.summary)
        setPublicity(res.data.publicity)
        setDescription(res.data.description)
        setDate(res.data.post_time)
      });
      } catch(e) {
        console.error(e)
      }
    }
    GetPostInformation();
    } , // <- function that will run on every dependency update
    [] // <-- empty dependency array
  )

  return (
    <div className="container">
      <NavigationBar />

      <Box sx={{ width: '80%', bgcolor: '#D9D9D9', borderRadius: '10px', padding: "10px 0px 10px 0px", marginLeft: "10%", marginTop: "2%" }}>
        <Box sx={{ my: 3, mx: 2, margin: "0px" }}>
          <Typography gutterBottom variant="h4" component="div" sx={{margin: "0px 20px 0px 20px"}}>
                { title }
          </Typography>
          <br></br>
          <Typography color="text.secondary" variant="body2" sx={{margin: "0px 20px 0px 20px"}}>
            { summary }
          </Typography>
          <br></br>
          <img src={ StockImage } className="Post-image-page" alt="logo" style={{padding: '10px 0px 10px 0px'}}/>
          <Stack direction="row" spacing={1} sx={{margin: "0px 20px 0px 20px"}}>
            <Chip sx={{ bgcolor: '#02AEEC', color: 'white' }} label="Tag1" />
            <Chip sx={{ bgcolor: '#02AEEC', color: 'white' }} label="Tag2" />
            <Chip sx={{ bgcolor: '#02AEEC', color: 'white' }} label="Tag3" />
            <Chip sx={{ bgcolor: '#02AEEC', color: 'white' }} label="Tag4" />
          </Stack>
        </Box>
      </Box>
    </div>
  );
}
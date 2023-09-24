import React from 'react';
import NavigationBar from '../components/NavigationBar';
import { useState, useEffect } from 'react';
import instance from '../components/api/api_instance';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import StockImage from '../assets/images/stock-image.jpg';
import PostTable from '../components/individual-posts/postTable.jsx'
import PostGraph from '../components/individual-posts/postGraph';

export default function PostPage(props) {

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [publicity, setPublicity] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [results_id, setResultsID] = useState(1)
    
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
        setResultsID(res.data.associated_results)
        setDate(new Date(res.data.post_time).toLocaleDateString())
      });
      } catch(e) {
        console.error(e)
      }
    }
    GetPostInformation();
    } , // <- function that will run on every dependency update
    [] // <-- empty dependency array
  )
  
  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {

    setIsShown(current => !current);

  };


  return (
    <div className="container">
      <NavigationBar />

      <Box sx={{ width: '80%', bgcolor: '#D9D9D9', borderRadius: '10px', padding: "10px 0px 10px 0px", marginLeft: "10%", marginTop: "2%" }}>
        <Box sx={{ my: 3, mx: 2, margin: "0px" }}>
          <Typography gutterBottom variant="h4" component="div" sx={{margin: "0px 20px 0px 20px"}}>
              { title } <br></br>
          </Typography>
          <Stack direction="row" spacing={1} sx={{margin: "0px 20px 0px 20px"}}>
            <Chip sx={{ bgcolor: '#02AEEC', color: 'white' }} label="Tag1" />
            <Chip sx={{ bgcolor: '#02AEEC', color: 'white' }} label="Tag2" />
            <Chip sx={{ bgcolor: '#02AEEC', color: 'white' }} label="Tag3" />
            <Chip sx={{ bgcolor: '#02AEEC', color: 'white' }} label="Tag4" />
          </Stack>
          <Typography variant="h4" component="div" sx={{margin: "0px 20px 0px 20px"}}>
            { date } ~ { publicity ? "Public":"Private" }
          </Typography>
          <img src={ StockImage } className="Post-image-page" alt="logo" style={{padding: '10px 0px 10px 0px'}}/>
          <Typography color="text.secondary" variant="body2" sx={{margin: "0px 20px 0px 20px"}}>
            { description }
          </Typography>

          

          { isShown ? (
            <div>
              <Button onClick={handleClick}> Switch to full table </Button>
              <PostGraph results_id={results_id} />
            </div>
          ) : (
            <div>
              <Button onClick={handleClick}> Switch to data stuff </Button>
              <PostTable results_id={results_id} />
            </div>
          )}
          
        </Box>
      </Box> 
      
    </div>
  );
}
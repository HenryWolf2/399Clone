import React from 'react';
import NavigationBar from '../components/NavigationBar';
import { useState, useEffect } from 'react';
import instance from '../components/api/api_instance';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import StockImage from '../assets/images/stock-image.jpg';
import PostTable from '../components/individual-posts/postTable.jsx'
import PostGraph from '../components/individual-posts/postGraph';
import PublicIcon from '../assets/images/public.png';
import PrivateIcon from '../assets/images/private.png';
import Tags from '../components/individual-posts/tags';

export default function PostPage(props) {

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [publicity, setPublicity] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [resultsId, setResultsID] = useState('')
  const [tags, setTags] = useState([])
    
  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
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
        setTags(res.data.tags)
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
              { title } <br></br>
          </Typography>
          <Tags tagArray={tags}/>
          <Typography variant="h4" component="div" sx={{margin: "0px 20px 0px 20px"}}>
            { date } { publicity ? <img src={PublicIcon} alt="public" width="30" height="30"></img> : <img src={PrivateIcon} alt="private" width="30" height="30"></img> }
          </Typography>
          
          <Typography color="text.secondary" variant="body2" sx={{margin: "0px 20px 0px 20px"}}>
            { description }
            
          </Typography>

          
          <Stack sx={{margin: "0px 20px 0px 20px"}}>
              <PostGraph post_id={props.post_id} />
              
              <PostTable results_id={resultsId} />
          </Stack>
        </Box>
      </Box> 
      
    </div>
  );
}
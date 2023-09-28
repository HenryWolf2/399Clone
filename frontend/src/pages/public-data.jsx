import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import IndividualPost from '../components/individual-posts/post';
import instance from '../components/api/api_instance';
import { useEffect } from 'react';
import PostGrid from '../components/individual-posts/postgrid';
import { Grid, Item, Box, Button } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment'
import { Container, FormControlLabel, Stack } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

export default function Post() {
  const [PublicPosts, setPublicPosts] = useState([])
  const [prompt, setPrompt] = useState("")
  


  const handleSubmit = async (event) => {
    event.preventDefault();
    
    console.log(prompt)
    try{
    await instance({
        url: "post/search",
        method: "GET",
        params: {query: prompt}
    }).then((res) => {
        setPublicPosts(res.data);
        
    });
    } catch(e){
      console.error(e)
    }}

  useEffect(() => {
    async function GetPublicPostsIDs() {
      try{ 
        await instance ({
          // Set URL to get all posts by ID
          url: "/post/get_all",
          method: "GET",
      }).then((res) => {
        setPublicPosts(res.data)
      });
      } catch(e) {
        console.error(e)
      }
    }
    GetPublicPostsIDs();
    } , // <- function that will run on every dependency update
    [] // <-- empty dependency array
  ) 

 

  return (
    <div className="container">
      <NavigationBar />
      <div className="App">

        <h1> Public Posts </h1>
      </div>

      <Container maxWidth= "sm">
          <form onSubmit ={handleSubmit}>
              <TextField
              margin="normal"
              fullWidth
              value={prompt}
              label="Search"
              name="promt"
              autoFocus
              onChange={e => setPrompt(e.target.value)}
              InputProps={{
                  endAdornment: (
                      <InputAdornment position="end">
                      <SearchIcon />
                      </InputAdornment>
                  ),
                  }}
              />     
          </form>
          
          
          

        </Container>
      

      <Box sx={{ flexGrow: 1, width: "98%", padding: "1%" }}>
        <PostGrid narrow={false} post_array={PublicPosts} />    
      </Box>
    </div>
  );
}
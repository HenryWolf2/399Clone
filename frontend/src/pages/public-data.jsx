import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import instance from '../components/api/api_instance';
import { useEffect } from 'react';
import PostGrid from '../components/individual-posts/postgrid';
import { Box,Button, Typography, Container } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment'
import Autocomplete from '@mui/material/Autocomplete';
import MobileOverlay from '../components/MobileOverlay';

export default function Post() {
  const [PublicPosts, setPublicPosts] = useState([])
  const [prompt, setPrompt] = useState("")
  const [isShown, setIsShown] = useState(true);

  const [selectedTags, setSelectedTags] = useState([]);
  const [tagInputValue, setTagInputValue] = useState("");
  const [allTags, setAllTags] = useState([]);
  const[displayMessage, setDisplayMessage] = useState(false);

  const handleClick = event => {

    setIsShown(current => !current);

  };


  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try{
    await instance({
        url: "post/search",
        method: "GET",
        params: {query: prompt}
    }).then((res) => {
      setDisplayMessage(false)
      if(res.data.length === 0){
        setDisplayMessage(true)
      }
        setPublicPosts(res.data);
        
    });
    } catch(e){
      console.error(e)
    }}
  
  const handleSubmit2 = async (event) => {
    event.preventDefault();
    
    try{
      const queryString = selectedTags.map(tag => `query=${encodeURIComponent(tag)}`).join('&');
    
    await instance({
        url: `post/get_post_by_tag?${queryString}`,
        method: "GET",
        params: {query: selectedTags}
    }).then((res) => {
      setDisplayMessage(false)
      if(res.data.length === 0){
        setDisplayMessage(true)
      }
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
  useEffect(() => {
    async function GetAllTags() {
      try{ 
        await instance ({
          // Set URL to get all posts by ID
          url: "/post/tags",
          method: "GET",
      }).then((res) => {
        let newList = [];
        for(let i = 0; i < res.data.length; i++){
          let names = res.data[i].name;
          newList.push(names);

          }
        


        setAllTags(newList)
      });
      } catch(e) {
        console.error(e)
      }
    }
    GetAllTags();
    } , // <- function that will run on every dependency update
    [] // <-- empty dependency array
  ) 

  



  return (
    <div className="container">
      <MobileOverlay />
      <NavigationBar />
      <div className="App">

        <h1> Public Analyses </h1>
      </div>
      <Container maxWidth= "sm">
          
          { isShown ? (
            <div>
              <form onSubmit ={handleSubmit}>
              <TextField
              
              fullWidth
              value={prompt}
              label="Search"
              name="promt"
              onChange={e => setPrompt(e.target.value)}
              InputProps={{
                  endAdornment: (
                      <InputAdornment position="end">
                      <SearchIcon />
                      </InputAdornment>
                  ),
                  }}
              />
              <Box display="flex" justifyContent="space-between">
              <Button variant="text" onClick={handleClick}> Search by Tag </Button>
              <Button variant="text" onClick={handleSubmit}> Submit</Button>  
              </Box>  
          </form>
          
            </div>
          ) : (
            <div>
              <form onSubmit ={handleSubmit2}>
                <Autocomplete
                  multiple
                  
                  options={allTags}
                  onChange={(event, newTag) => {
                    setSelectedTags(newTag);
                  }}
                  inputValue={tagInputValue}
                  onInputChange={(event, newTagInputValue) => {
                    setTagInputValue(newTagInputValue);
                  }}
                  renderInput={(params) => {
                    return <TextField label='Add Tag' {...params} />;
                  }}
                ></Autocomplete>
                <Box display="flex" justifyContent="space-between">
                <Button variant="text" onClick={handleClick}> Search by Text </Button>
                <Button variant="text" onClick={handleSubmit2}> Submit</Button> 
                </Box>
                </form>
                
            </div>
          )}
          
          

        </Container>
      

      <Box sx={{ flexGrow: 1, width: "98%", padding: "1%" }}>
        <PostGrid narrow={false} post_array={PublicPosts} />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
        {displayMessage ? <Typography color="text.secondary" variant="h4" sx={{margin: "0px 20px 0px 20px"}}>No Analyses Found</Typography> : null}

        </Box>
        
           
      </Box>
    </div>
  );
}
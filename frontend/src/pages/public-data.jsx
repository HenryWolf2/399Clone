import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import IndividualPost from '../components/individual-posts/post';
import instance from '../components/api/api_instance';
import { useEffect } from 'react';
import PostGrid from '../components/individual-posts/postgrid';
import { Grid, Item, Box,Button } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment'
import { Container, FormControlLabel, Stack } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';

export default function Post() {
  const [PublicPosts, setPublicPosts] = useState([])
  const [prompt, setPrompt] = useState("")
  const [isShown, setIsShown] = useState(true);

  const [selectedTags, setSelectedTags] = useState([]);
  const [tagInputValue, setTagInputValue] = useState("");
  const [allTags, setAllTags] = useState([]);

  const handleClick = event => {

    setIsShown(current => !current);

  };


  
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
  
  const handleSubmit2 = async (event) => {
    event.preventDefault();
    
    console.log(selectedTags);
    try{
    await instance({
        url: "post/get_post_by_tag",
        method: "GET",
        params: {query: selectedTags}
    }).then((res) => {
        setPublicPosts(res.data);
        console.log(res)
        
    });
    } catch(e){
      console.error(e)
      console.log(e.response)
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
          let names = res.data[i].name.split(",");
          for(let j = 0; j < names.length; j++){
            if(newList.includes(names[j]) === false){
              newList.push(names[j]);
            }

          }
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
      <NavigationBar />
      <div className="App">

        <h1> Public Posts </h1>
      </div>
      <Container maxWidth= "sm">
          
          { isShown ? (
            <div>
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
              <Button variant="text" onClick={handleSubmit}> Submit</Button>     
          </form>
          <Button variant="text" onClick={handleClick}> Switch to Search by Tag </Button>
            </div>
          ) : (
            <div>
              <form onSubmit ={handleSubmit2}>
                <Autocomplete
                  multiple
                  controlled
                  
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
                <Button variant="text" onClick={handleSubmit2}> Submit</Button> 
                </form>
                <Button variant="text" onClick={handleClick}> Switch to Search by All </Button>
            </div>
          )}
          
          

        </Container>
      

      <Box sx={{ flexGrow: 1, width: "98%", padding: "1%" }}>
        <PostGrid narrow={false} post_array={PublicPosts} />    
      </Box>
    </div>
  );
}
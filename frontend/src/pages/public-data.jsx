import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import IndividualPost from '../components/individual-posts/post';
import instance from '../components/api/api_instance';
import { useEffect } from 'react';
import PostGrid from '../components/individual-posts/postgrid';
import { Grid, Item, Box } from '@mui/material';

export default function Post() {
  const [PublicPosts, setPublicPosts] = useState([])

  useEffect(() => {
    async function GetPublicPostsIDs() {
      try{ 
        await instance ({
          // Set URL to get all posts by ID
          url: "/post/get_all",
          method: "GET",
      }).then((res) => {
        console.log(res.data)
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
      

      <Box sx={{ flexGrow: 1, width: "98%", padding: "1%" }}>
        <PostGrid narrow={false} post_array={PublicPosts} />    
      </Box>
      
    </div>
  );
}
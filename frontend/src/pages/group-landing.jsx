import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import IndividualPost from '../components/individual-posts/post';
import instance from '../components/api/api_instance';
import { useEffect } from 'react';
import PostGrid from '../components/individual-posts/postgrid';
import { Grid, Item, Box, Typography } from '@mui/material';
import GroupGrid from '../components/group-card/group-grid';

export default function Groups() {
    const [postIDs, setPostIDs] = useState([])
    const [groupIDs, setGroupIDs] = useState([])
    
    useEffect(() => {
        async function GetGroupInformation() {
        try{ 
            await instance ({
            // Set URL to get all posts by ID
            url: "/group/landing",
            method: "GET",
        }).then((res) => {
            setPostIDs(res.data.posts)
            setGroupIDs(res.data.groups)
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
    <div className="container">
      <NavigationBar />
      <Box sx={{width: '100%', display: 'flex' }}>
      <Box sx={{width: "49%", height: "100vh", padding: "1%", backgroundColor: "#09A9EC", flex: '1' }}>
        <Typography variant='h3' textAlign={'center'} marginBottom={"10px"}>Your Group Posts</Typography>
        <PostGrid narrow={true} post_array={postIDs} />    
      </Box>
      <Box sx={{width: "49%", height: "100vh", padding: "1%", backgroundColor: "white"}}>
        <Typography variant='h3' textAlign={'center'} marginBottom={"10px"}>Recommended Groups</Typography>
        <GroupGrid  group_array={groupIDs} />    
      </Box>
      </Box>
    </div>
  );
}
import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import IndividualPost from '../components/individual-posts/post';
import instance from '../components/api/api_instance';
import { useEffect } from 'react';
import PostGrid from '../components/individual-posts/postgrid';
import { Grid, Item, Box, Typography } from '@mui/material';
import GroupGrid from '../components/group-card/group-grid';
import './/../assets/styles/global.css';
import Link from '@mui/material';
import MobileOverlay from '../components/MobileOverlay';

export default function Groups() {
    const [postIDs, setPostIDs] = useState([])
    const [userGroups, setUserGroups] = useState([])
    const [recommendGroups, setRecommendGroups] = useState([])
    
    
    useEffect(() => {
        async function GetGroupInformation() {
        try{ 
            await instance ({
            // Set URL to get all posts by ID
            url: "/group/landing",
            method: "GET",
        }).then((res) => {
            setPostIDs(res.data.posts)
            setUserGroups(res.data.users_groups)
            setRecommendGroups(res.data.recommended_groups)
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
      <MobileOverlay />
      <NavigationBar />
      <Box sx={{width: '100%', display: 'flex' }}>
        <Box sx={{width: "22%", height: "100vh", padding: "0% 1%", backgroundColor: "#09A9EC"}}>
          <h1 style={{textAlign: 'center', color:'white'}}>Your Groups</h1>
          <GroupGrid group_array={userGroups} />
        </Box>

        <Box sx={{width: "53%", height: "100vh", padding: "0% 1%", backgroundColor: "white", overflow:'scroll'}}>
            <h1 style={{textAlign: 'center'}}>Data from the groups you've joined</h1>
          <PostGrid narrow={true} post_array={postIDs} />    
        </Box>

        <Box sx={{width: "22%", height: "100vh", padding: "0% 1%", backgroundColor: "#09A9EC"}}>
          <h1 style={{textAlign: 'center', color:'white'}}>Suggested Groups</h1> 
          <GroupGrid group_array={recommendGroups} />
        </Box>
      </Box>
    </div>
  );
}
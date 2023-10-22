import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Contributors from './contributors';
import ProfilePicture from './profile';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import instance from '../api/api_instance.js'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Tags from './tags';

import '../../assets/styles/global.css';

export default function IndividualPost(props) {
  
  const [title, setTitle] = useState('')
  const [banner, setBanner] = useState('')
  const [publicity, setPublicity] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [post_id, setPostID] = useState('')
  const [tags, setTags] = useState([])
  const [collaborators, setCollaborators] = useState([])
  
  useEffect(() => {
    async function GetPostInformation() {
      try{ 
        await instance ({
          url: "/post/get_by_id",
          method: "GET",
          params: {post_id: props.post_id}
          
      }).then((res) => {
        setTitle(res.data.title)
        setAuthor(res.data.author)
        setPublicity(res.data.publicity)
        setDescription(res.data.description)
        setDate(new Date(res.data.post_time).toLocaleDateString())
        setPostID("/analysis/"+props.post_id)
        setTags(res.data.tags)
        setCollaborators(res.data.collaborators)
        setBanner(res.data.post_pic)
      });
      } catch(e) {
        console.error(e)
      }
    }
    GetPostInformation();
    } ,
    [props.post_id] 
  )
  

  return (
    <Link to={post_id} style={{ textDecoration: "none", color: 'black' }}>
    <Box sx={{ width: '100%', bgcolor: '#FFFFFF', borderRadius: '10px', padding: "10px 0px 10px 0px", boxShadow: 5, "&:hover": {bgcolor: '#F8F8F8', boxShadow: 8} }}>
      <Box sx={{ my: 3, mx: 2, margin: "0px" }}>
        <Grid container alignItems="center" >

          {/* Profile picture will need to be reviewed when the backend is linked */}

          <Grid item sx={{margin: "0px 0px 0px 20px"}}>
            <ProfilePicture author={author} />
          </Grid>
          <Grid item xs sx={{padding: '0px 0px 0px 10px'}}>
            <Typography gutterBottom variant="h6" component="div" sx={{marginBottom: "0px"}}>
              {date} { publicity ? <PublicIcon /> : <LockIcon /> }
            </Typography>
          </Grid>

          {/* Contributors pictures will also need to be reviewed when the backend is linked */} 

          <Grid item sx={{margin: "0px 20px 0px 0px"}}>
              <Contributors collaborators = {collaborators} />
          </Grid>
        </Grid>
        <Typography gutterBottom variant="h4" component="div" sx={{margin: "0px 20px 0px 20px"}}>
              { title }
        </Typography>
        <Typography color="text.secondary" variant="body2" sx={{margin: "0px 20px 0px 20px"}}>
          { description.slice(0,250) }...
        </Typography>
        <img src={instance.defaults.baseURL.replace("/api", "") + banner} className="Post-image" alt="logo" style={{padding: '10px 0px 10px 0px'}}/>
        <Tags tagArray={tags}/>
      </Box>
    </Box>
    </Link>
  );
}


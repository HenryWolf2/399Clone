import React from 'react';
import NavigationBar from '../components/NavigationBar';
import { useState, useEffect } from 'react';
import instance from '../components/api/api_instance';
import { Box, Button, Chip, Stack, Typography, Grid } from '@mui/material';
import StockImage from '../assets/images/stock-image.jpg';
import PostTable from '../components/individual-posts/postTable.jsx'
import PostGraph from '../components/individual-posts/postGraph';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import Tags from '../components/individual-posts/tags';
import ProfilePicture from '../components/individual-posts/profile';
import Contributors from '../components/individual-posts/contributors';
import EditPopup from '../components/individual-posts/editPost';
import PostCitation from '../components/individual-posts/postCitation';
import MobileOverlay from '../components/MobileOverlay';

export default function PostPage(props) {

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [publicity, setPublicity] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [resultsId, setResultsID] = useState('')
  const [tags, setTags] = useState([])
  const [collaborators, setCollaborators] = useState([])
  const [allData, setAllData] = useState([])
  const [openCitation, setOpenCitation] = useState(false);

  const handleOpenCitation = () => {
    setOpenCitation(true);
  };

  const handleCloseCitation = () => {
    setOpenCitation(false);
  };
    
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
        setCollaborators(res.data.collaborators)
        setTags(res.data.tags)
        setAllData(res.data) 
      });
      } catch(e) {
        console.error(e)
      }
    }
    GetPostInformation();
    } , // <- function that will run on every dependency update
    [] // <-- empty dependency array
  )

  let CheckedResultsId = resultsId
  if (resultsId === "") {
    CheckedResultsId = 1
  }

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container">
      <MobileOverlay />
      <NavigationBar />

      <Box sx={{ width: '80%', bgcolor: '#D9D9D9', borderRadius: '10px', padding: "10px 0px 10px 0px", marginLeft: "10%", marginTop: "2%" }}>
        <Box sx={{ my: 3, mx: 2, margin: "0px" }}>

        <Grid container alignItems="center" >

          {/* Profile picture will need to be reviewed when the backend is linked */}

          <Grid item sx={{margin: "0px 0px 0px 20px"}}>
            <ProfilePicture />
          </Grid>
          <Grid item xs sx={{padding: '0px 0px 0px 10px'}}>
            <Typography gutterBottom variant="h3" component="div" sx={{margin: "20px" }}>
                { title }
            </Typography>
          </Grid>

          {/* Contributors pictures will also need to be reviewed when the backend is linked */} 

          <Grid item sx={{margin: "0px 20px 0px 0px"}}>
              <Contributors collaborators = {collaborators} />
          </Grid>

          <Grid item sx={{margin: "0px 20px 0px 0px"}}>
            <Button variant="contained" sx={{backgroundColor:"#04ADEB"}} onClick={handleOpen}>
              Edit Post
            </Button>
            <EditPopup open={open} setOpen={setOpen} handleClose={handleClose} allData={allData}/>
          </Grid>
          <Grid item sx={{margin: "0px 20px 0px 0px"}}>
            <Button variant="contained" onClick={handleOpenCitation} style={{ backgroundColor: '#02AEEC' }}>
              Cite
            </Button>
            
            <PostCitation openCitation={openCitation} handleCloseCitation={handleCloseCitation}post_id={props.post_id}/>
          </Grid>
        
        </Grid>

          <Tags tagArray={tags}/>

          <Typography variant="h4" component="div" sx={{margin: "20px"}}>
            { date } { publicity ? <PublicIcon /> : <LockIcon /> }
          </Typography>
          
          <Typography color="text.secondary" variant="body1" sx={{margin: "0px 20px 0px 20px"}}>

            { description }
            
          </Typography>
          

          
          <Stack sx={{margin: "0px 20px 0px 20px"}}>
            <h2>Graph</h2>
              <PostGraph post_id={props.post_id} />
            <h2>Results Table</h2>
              <PostTable results_id={CheckedResultsId} />
          </Stack>
        </Box>
      </Box> 
      
    </div>
  );
}
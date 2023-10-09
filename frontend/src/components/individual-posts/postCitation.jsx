import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import instance from '../api/api_instance';
import { Navigate, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import{Box, Container, Typography} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';

import '../../assets/styles/global.css';




export default function PostCitation(props) {
    const [open, setOpen] = useState(false)
    const [citationType, setCitationType] = useState('BibTeX')
    const [citation, setCitation] = useState('')
    const [buttonClicked, setButtonClicked] = useState(false)

    const openCitation = () => {
        setButtonClicked(!buttonClicked)
        setCitationType("BibTeX")
      
    }
    const copyToClipBoard = () => {
        setOpen(true)
        navigator.clipboard.writeText(citation)
      }
    
    const handleAPA7 = () =>{
        setCitationType('APA7')
    }
    const handleBibTeX = () =>{
        setCitationType('BibTeX')
    }
   

  


    useEffect(() => {
        async function GetCitation() {
          try{ 
            await instance ({
                url: "post/citation",
                method: "GET",
                params: {post_id: props.post_id, citation: citationType}
          }).then((res) => {
            setCitation(res.data.citation)
            console.log(res)
          });
          } catch(e) {
            console.error(e)
          }
        }
        GetCitation();
        } , // <- function that will run on every dependency update
        [citationType] // <-- empty dependency array
      ) 
    


    return(
        <Container maxWidth= "sm" sx={{margin: "0px 20px 0px 20px"}}>


        <Button onClick={openCitation}>Citation</Button>
          <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
            message="Copied to clipboard"
          />

          {buttonClicked? (
            <Box>
                <Button onClick= {handleBibTeX}>BibTeX Citation</Button>
                <Button onClick= {handleAPA7}>APA 7 Citation</Button>
                <Typography color="text.secondary" variant="body2" sx={{margin: "0px 20px 0px 20px"}}>
                    { citation }
                </Typography>
                <Button onClick={copyToClipBoard}>Copy to Clipboard</Button>
            </Box>
          
          ) : null}

        
          </Container>
    )
}

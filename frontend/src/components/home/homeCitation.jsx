import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import instance from '../api/api_instance';
import { Navigate, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import{Box, Container} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

import '../../assets/styles/global.css';


export default function HomeCitation(props =1) {
    const [open, setOpen] = useState(false)
    const [citationType, setCitationType] = useState('BibTeX')
    const [citation, setCitation] = useState('')
    const [buttonClicked, setButtonClicked] = useState(false)

    // const handleClick = () => {
    //   setOpen(true)
    //   navigator.clipboard.writeText("Hello World")
      
    // }
    const copyToClipBoard = () => {
        setOpen(true)
        navigator.clipboard.writeText(citation)
        setButtonClicked(!buttonClicked)
        setCitationType("BibTeX")
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
                params: {post_id: 1, citation: citationType}
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
        <Container maxWidth= "sm">


        <Button onClick={copyToClipBoard}>Share</Button>
          {/* <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
            message="Copied to clipboard"
          /> */}

          {buttonClicked? (
            <Box>
                <Button onClick= {handleBibTeX}>APA7 Citation</Button>
                <Button onClick= {handleAPA7}>BibTeX Citation</Button>
            </Box>
          
          ) : null}

        </Container>
    )
}

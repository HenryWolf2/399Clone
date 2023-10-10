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
import InputAdornment from '@mui/material/InputAdornment'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import '../../assets/styles/global.css';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};



export default function PostCitation({ openCitation, handleCloseCitation, post_id }) {
    const [citation, setCitation] = useState('')
    const [value, setValue] = useState(0);
    const[bibTeXCitation, setBibTeXCitation] = useState('')
    const[aPA7Citation, setAPA7Citation] = useState('')


    const copyToClipBoard = () => {
        navigator.clipboard.writeText(citation)
      }
    
    const handleAPA7 = () =>{
        setCitation(aPA7Citation)
        setValue(1);
    }
    const handleBibTeX = () =>{
        setCitation(bibTeXCitation)
        setValue(0);
    }
   



    useEffect(() => {
        async function GetBibTeXCitation() {
          try{ 
            await instance ({
                url: "post/citation",
                method: "GET",
                params: {post_id: post_id, citation: 'BibTeX'}
          }).then((res) => {
            setBibTeXCitation(res.data.citation)
            setCitation(res.data.citation)
            
          });
          } catch(e) {
            console.error(e)
          }
        }
        GetBibTeXCitation();
        } , // <- function that will run on every dependency update
        [] // <-- empty dependency array
      ) 
      useEffect(() => {
        async function GetAPA7Citation() {
          try{ 
            await instance ({
                url: "post/citation",
                method: "GET",
                params: {post_id: post_id, citation: 'APA7'}
          }).then((res) => {
            setAPA7Citation(res.data.citation)
            
          });
          } catch(e) {
            console.error(e)
          }
        }
        GetAPA7Citation();
        } , // <- function that will run on every dependency update
        [] // <-- empty dependency array
      ) 
      
    


    return(
        

        
  <Dialog open={openCitation} onClose={handleCloseCitation} maxWidth="md" fullWidth>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box sx={{ width: 150, backgroundColor: '#f0f0f0' }}>
            <Tab label="BibTeX" onClick={() => handleBibTeX()} sx={{ borderBottom: 1, borderColor: 'divider', width: 150, alignItems: "flex-start" }} />
            <Tab label="APA 7" onClick={() => handleAPA7()} sx={{ borderBottom: 1, borderColor: 'divider', width: 150, alignItems: "flex-start" }} />
          </Box>
  
          <Box sx={{ flex: 1 }}>
            <TabPanel value={value} index={0}>
              <h3>BibTeX Citation</h3>
              <div>
              <Typography color="text.secondary" variant="body2" sx={{margin: "0px 20px 0px 20px"}}>
                    { citation }
                </Typography>
                <Button onClick={copyToClipBoard}>Copy to Clipboard &nbsp;<ContentCopyIcon fontSize='inherit'/></Button>
                

              </div>
            </TabPanel>


            <TabPanel value={value} index={1}>
              <h3>APA 7 Citation</h3>
              <div>
              <Typography color="text.secondary" variant="body2" sx={{margin: "0px 20px 0px 20px"}}>
                    { citation }
                </Typography>
                <Button onClick={copyToClipBoard}>Copy to Clipboard &nbsp;<ContentCopyIcon fontSize='inherit'/></Button>

              </div>
            </TabPanel>
          </Box>
        </Box>
      </Dialog>
         
    )
}

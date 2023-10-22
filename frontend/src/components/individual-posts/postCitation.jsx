import React, { useState } from 'react';
import Button from '@mui/material/Button';
import instance from '../api/api_instance';
import{Box,  Typography} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Tab from '@mui/material/Tab';
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
    const [citation, setCitation] = useState('Please Select either BibTeX or APA 7')
    const [value, setValue] = useState(0);


    const copyToClipBoard = () => {
        navigator.clipboard.writeText(citation)
      }
    
    const handleAPA7 = () =>{
        GetAPA7Citation();
        setValue(2);
    }
    const handleBibTeX = () =>{
        GetBibTeXCitation();
        setValue(1);
    }

    async function GetBibTeXCitation() {
      try{ 
        await instance ({
            url: "post/citation",
            method: "GET",
            params: {post_id: post_id, citation: 'BibTeX'}
      }).then((res) => {
        setCitation(res.data.citation)
         
      });
      } catch(e) {
        console.error(e)
      }
    }
    async function GetAPA7Citation() {
      try{ 
        await instance ({
            url: "post/citation",
            method: "GET",
            params: {post_id: post_id, citation: 'APA7'}
      }).then((res) => {
        setCitation(res.data.citation)
        
      });
      } catch(e) {
        console.error(e)
      }
    }


    return(
        

        
  <Dialog open={openCitation} onClose={handleCloseCitation} maxWidth="md" fullWidth>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box sx={{ width: 150, backgroundColor: '#f0f0f0' }}>
            <Tab label="BibTeX" onClick={() => handleBibTeX()} sx={{ borderBottom: 1, borderColor: 'divider', width: 150, alignItems: "flex-start" }} />
            <Tab label="APA 7" onClick={() => handleAPA7()} sx={{ borderBottom: 1, borderColor: 'divider', width: 150, alignItems: "flex-start" }} />
          </Box>
  
          <Box sx={{ flex: 1 }}>
          <TabPanel value={value} index={0}>
              <h3>Citation</h3>
              <div>
              <Typography color="text.secondary" variant="body2" sx={{margin: "0px 20px 0px 20px"}}>
                    { citation }
                </Typography>
                
                

              </div>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <h3>BibTeX Citation</h3>
              <div>
              <Typography color="text.secondary" variant="body2" sx={{margin: "0px 20px 0px 20px"}}>
                    { citation }
                </Typography>
                <Button onClick={copyToClipBoard}>Copy to Clipboard &nbsp;<ContentCopyIcon fontSize='inherit'/></Button>
                

              </div>
            </TabPanel>


            <TabPanel value={value} index={2}>
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

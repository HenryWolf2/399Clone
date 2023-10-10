import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import instance from '../api/api_instance.js'
import '../../assets/styles/global.css';
import StockImage from '../../assets/images/stock-image.jpg';
import { Link } from 'react-router-dom';

export default function EditGroupCard(props) {
  
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [memberCount, setMemberCount] = useState("")
  const [postCount, setPostCount] = useState("")
  let [groupPicture, setGroupPicture] = useState("")
  const [groupID, setGroupId] = useState("")
  let [isLinked, setIsLinked] = useState(false)

  useEffect(() => {
    async function GetGroupInformation() {
      try{ 
        await instance ({
          url: "/group/id",
          method: "GET",
          params: {group_id: props.group_id}
          
      }).then((res) => {
        setName(res.data.name)
        setGroupPicture(res.data.group_pic)
        setMemberCount(res.data.member_count)
        setPostCount(res.data.post_count)
        setGroupId(props.group_id)
      });
      } catch(e) {
        console.error(e)
      }
    }
    GetGroupInformation();
    } , // <- function that will run on every dependency update
    [] // <-- empty dependency array
  )  
  useEffect(() => {
    async function GetGroupPostConnection() {
      try{ 
        await instance ({
          url: "/post/check_group",
          method: "GET",
          params: {group_id: props.group_id, post_id: props.post_id}
          
      }).then((res) => {
        setIsLinked(res.data.in_group)
        if(res.data.in_group) {
          props.setCheckboxStates({...props.checkboxStates, [groupID]: true});
        }
      });
      } catch(e) {
        console.error(e)
      }
    }
    GetGroupPostConnection();
    } , // <- function that will run on every dependency update
    [] // <-- empty dependency array
  )  

  const groupPictureURL = `${instance.defaults.baseURL.replace("/api", "")}${groupPicture}`;

  const handleCheckboxChange = () => {
    setIsLinked(!isLinked);
    props.setCheckboxStates({...props.checkboxStates, [groupID]: !isLinked});
  };

  return (
    <Box sx={{ width: '100%', bgcolor: '#D9D9D9', borderRadius: '10px', minHeight: '50px', paddingTop: '5px' }}>
      <Box sx={{ my: 3, mx: 2, margin: "0px" }}>
        <Grid container alignItems="center" >
          <Grid item sx={{padding: '10px 10px 6.5px 10px'}}>
            <img src={ groupPictureURL } className="group-landing-image" alt="logo"/>
          </Grid>

          <Grid item xs>
            <Typography gutterBottom component="div" sx={{marginBottom: "0px", fontSize: "15px"}}>
              {name} <br></br> {memberCount} Members | {postCount} Posts
            </Typography>
          </Grid>
          <input
            type="checkbox"
            name={`groupCheckbox${groupID}`}
            style={{ 
              marginLeft: '20px',
              marginRight: '20px',
              width: '20px', 
              height: '20px',
            }}
            checked={isLinked}
            onChange={handleCheckboxChange}
          />
        </Grid>
      </Box>
    </Box>
  );
}

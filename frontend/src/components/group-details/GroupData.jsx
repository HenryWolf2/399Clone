import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import '../../assets/styles/global.css';
import GroupBar from '../profile-details/GroupBar';
import PostGrid from '../individual-posts/postgrid';
import Box from '@mui/material/Box';
import instance from '../api/api_instance';
import LogoTransparent from '../../assets/images/LogoMSH_Transparent.png';

function GroupData(props) {

  {/* API Integration */}

  const [groupname, setGroupname] = useState('')
  const [groupPosts, setGroupPosts] = useState([])
  const [currentPerm, setCurrentPerm] = useState('')
  const [canView, setCanView] = React.useState(false)
  const [zeroPosts, setZeroPosts] = React.useState(false)


  useEffect(() => {
    function checkZeroPosts() {
      if (groupPosts.length !== 0) {
        setZeroPosts(true);
      } else {
        setZeroPosts(false);
      }
    }
    checkZeroPosts();
  })

  useEffect(() => {
    function checkIsViewer() {
      if (currentPerm == "owner" || currentPerm == "viewer" || currentPerm == "poster" || currentPerm == "admin") {
        setCanView(true);
      } else {
        setCanView(false);
      }
    }
    checkIsViewer();
  })

  useEffect(() => {
    async function GetGroupInformation() {
      try{ 
        await instance ({
          url: "/group/info",
          method: "GET",
          params: {group_id: props.group_id}    
      }).then((res) => {
        setGroupPosts(res.data.posts)
        setCurrentPerm(res.data.user_permission)
        //Need to define perms
      });
      } catch(e) {
        console.error(e)
      }
    }
    GetGroupInformation();
    } , // <- function that will run on every dependency update
    [] // <-- empty dependency array
  ) 

  const divStyle = {
    width: '100%',
    backgroundColor: 'grey',
    height: '1000px',
  };

  const bannerStyle = {
    height: '125px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#02AEEC',
    boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  };


  return (
    <div
      style={divStyle}
    >
        <div style={bannerStyle}>
            <h1 style={{marginTop: '40px', color: 'white'}}>Specific Group Data Navigation</h1>
        </div>

        {canView ? (
          <div style={{
            height:'875px',
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#fff',
            boxShadow: '0px 8px 5px rgba(0, 0, 0, 0.2)',
            justifyContent: 'center',
            overflow: 'scroll',
          }}>
          {!zeroPosts ? (
            <div style={{alignItems:'center', alignContent:'center', justifyContent:'center'}}>
              <h1 style={{margin: "300px 20px 0px 20px", minHeight:'5%', backgroundColor:'#02AEEC', color:'white', padding:'20px', borderRadius:'10px', boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.2)', textAlign: "center" }}>There is No Group Data</h1>
            </div>
          ) : (
            <Box sx={{ flexGrow: 1, width: "48.5%", padding: "5%" }}>
              <PostGrid narrow={true} post_array={groupPosts} />    
            </Box>
          )}
          </div>
        ) : (
          <div style={{
            height:'875px',
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#fff',
            boxShadow: '0px 8px 5px rgba(0, 0, 0, 0.2)',
            justifyContent: 'center',
            overflow: 'scroll',
          }}>
            <div style={{alignItems:'center', alignContent:'center', justifyContent:'center'}}>
              <h1 style={{margin: "300px 20px 0px 20px", minHeight:'5%', backgroundColor:'#02AEEC', color:'white', padding:'20px', borderRadius:'10px', boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.2)', textAlign: "center" }}>You Do Not Have Permission to View Group Data</h1>
            </div>
          </div>
        )}


    </div>
  );
}

export default GroupData;
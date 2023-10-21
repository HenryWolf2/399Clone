import React, { useState, useEffect } from 'react';
import '../../assets/styles/global.css';
import PostGrid from '../individual-posts/postgrid';
import Box from '@mui/material/Box';
import instance from '../api/api_instance';

function GroupData(props) {

  const [groupPosts, setGroupPosts] = useState([])


  useEffect(() => {
    async function GetGroupInformation() {
      try{ 
        await instance ({
          url: "/group/info",
          method: "GET",
          params: {group_id: props.group_id}    
      }).then((res) => {
        setGroupPosts(res.data.posts)
      });
      } catch(e) {
        console.error(e)
      }
    }
    GetGroupInformation();
    } , 
    [props.group_id] 
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

        <div
        style={{
          height:'875px',
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#fff',
          boxShadow: '0px 8px 5px rgba(0, 0, 0, 0.2)',
          justifyContent: 'right',
          overflow: 'scroll',
        }}
      >
        <Box sx={{ flexGrow: 1, width: "48.5%", padding: "5%" }}>
            <PostGrid narrow={true} post_array={groupPosts} />    
        </Box>
      </div>


    </div>
  );
}

export default GroupData;
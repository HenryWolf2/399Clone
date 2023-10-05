import React, { useState, useEffect } from 'react';
import Banner from '../../assets/images/group-template-banner.jpg';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import '../../assets/styles/global.css';
import GroupBar from '../profile-details/GroupBar';
import instance from '../api/api_instance';

function GroupDetails(props) {
  const [minimized, setMinimized] = useState(false);

  const toggleMinimized = () => {
    setMinimized(!minimized);
  };

  {/* API Integration */}

  const [groupname, setGroupname] = useState('')
  const [description, setDescription] = useState('')
  const [banner, setBanner] = useState('')
  const [groupPosts, setGroupPosts] = useState([])
  const [memberCount, setMemberCount] = useState('')
  const [postCount, setPostCount] = useState('')
  const [creationDate, setCreationDate] = useState('')
  // Still need to organize user perms

  useEffect(() => {
    async function GetGroupInformation() {
      try{ 
        await instance ({
          url: "/group/info",
          method: "GET",
          params: {group_id: props.group_id},       
      }).then((res) => {
        setGroupname(res.data.name)
        setDescription(res.data.description)
        setBanner(res.data.group_pic)
        setGroupPosts(res.data.posts)
        setMemberCount(res.data.member_count)
        setPostCount(res.data.post_count)
        setCreationDate(new Date(res.data.created).toLocaleDateString())
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
    width: minimized ? '15%' : '50%',
    backgroundColor: 'grey', // Use 'backgroundColor' instead of 'backgroundColour'
    height: '1000px',
  };

  const bannerStyle = {
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: `url(${instance.defaults.baseURL.replace("/api", "") + banner})`,
    borderBottom: '3px solid white',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: minimized ? 'center' : 'center left',
    boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.2)',
  };

  const minimizeButton = {
    color:'white',
    float: 'right',
    fontSize: '40px',
    marginRight:'10px',
    textAlign: 'right',
    width: '50px',
    height: '60px',
  }

  const expandButton = {
    color:'white',
    fontSize: '40px',
    marginRight:'10px',
    textAlign: 'right',
    width: '50px',
    height: '60px',
  }

  const overlayStyleExpanded = {
    position: 'relative',
    alignItems: 'center',
    width: '500px',
    marginRight: '20px',
    height: '400px',
    display: minimized ? 'none' : 'inline',
  }

  const overlayStyleMinimized = {
    position: 'relative',
    display: 'flex',
    alignItems: 'right',
    width: '56%',
    marginRight: '40px',
    height: 'auto',
    display: minimized ? 'inline' : 'none',
  }

  const circleDot = {
    width: '10px',
    height: '10px',
    backgroundColor: 'white',
    borderRadius: '50%',
    marginTop: '35px',
    marginRight: '15px',
  }



  return (
    <div
      className={`minimizable-div ${minimized ? 'minimized' : ''}`}
      style={divStyle}
    >
        <div style={bannerStyle}></div>

        <div
        style={{
          height: minimized ? '750px' : '450px',
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#35CFFF',
          overflowY: 'scroll',
          boxShadow: '0px 8px 5px rgba(0, 0, 0, 0.2)',
          justifyContent: 'right',
        }}
      >

      

          <div style={overlayStyleExpanded}>
            <h1 style={{color: 'white', marginTop: '50px'}}>{groupname}</h1>
            <div style={{display: 'flex', marginTop: '-40px', color: 'white', fontSize: '14px'}}>
              <h1 style={{marginRight: '15px'}}>{creationDate}</h1>
            </div>
            <hr style={{width:'400px', border:' 2px solid #fff', marginRight: '450px',zIndex:900, marginTop: '-10px'}} />
            <div style={{display: 'flex', marginTop: '-20px', color: 'white', fontSize: '14px'}}>
              <h1 style={{marginRight: '15px'}}>{memberCount} Members</h1>
              <span style={circleDot}></span>
              <h1>{postCount} Posts</h1>
            </div>
            <div style={{float:'left', marginTop: '-10px'}}><GroupBar></GroupBar></div>
            <br></br>
            <h1 style={{color: 'white', marginTop: '20px', fontSize: '27px'}}> Description </h1>
            <hr style={{width:'400px', border:' 2px solid #fff', marginRight: '450px',zIndex:900, marginTop: '-10px'}} />
            <p style={{fontSize: '15px', color: 'white'}}>{description}</p>

        </div>


        <div style={overlayStyleMinimized}> 
        <h1 style={{color: 'white', marginTop: '50px'}}>{groupname}</h1>
          <div style={{display: 'flex', marginTop: '-40px', color: 'white', fontSize: '14px'}}>
            <h1 style={{marginRight: '15px'}}>{creationDate}</h1>
          </div>
          <hr style={{width:'250px', border:' 2px solid #fff', marginRight: '450px',zIndex:900, marginTop: '-10px'}} />

        </div>

        
        


              {!minimized && (
        <Button className="zoom" style={minimizeButton} onClick={toggleMinimized}>
          &#10594;
        </Button>
      )}
      {minimized && (
        <Button className="zoom" style={expandButton} onClick={toggleMinimized}>
          &#10596;
        </Button>
      )}


      </div>

      <div style={{
          height: '300px',
          backgroundColor: '#02AEEC',
          display: minimized ? 'none' : 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <div style={{width: '100%', marginBottom: '-15px'}}>
          <p style={{fontSize: '15px', color: 'white', fontWeight: 'bold', textAlign:'left', marginLeft:'5px', marginTop: '5px'}}>Status: ADMIN</p>
          </div>

          <h1 style={{color: 'white', marginTop: '10px'}}> Permissions </h1>
          <div style={{backgroundColor:'grey', width: '85%', height: '60%', marginTop: '0px', border: 'solid 3px white', borderRadius: '10px'}}>


          </div>
          
      </div>

    </div>
  );
}

export default GroupDetails;
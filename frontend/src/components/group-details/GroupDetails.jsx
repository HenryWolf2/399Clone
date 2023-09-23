import React, { useState, useEffect } from 'react';
import Banner from '../../assets/images/group-template-banner.jpg';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import '../../assets/styles/global.css';
import GroupBar from '../profile-details/GroupBar';

function GroupDetails() {
  const [minimized, setMinimized] = useState(false);

  const toggleMinimized = () => {
    setMinimized(!minimized);
  };

  const divStyle = {
    width: minimized ? '15%' : '50%',
    backgroundColor: 'grey', // Use 'backgroundColor' instead of 'backgroundColour'
    height: '1000px',
  };

  const bannerStyle = {
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: `url(${Banner})`,
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
    marginRight: '40px',
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
          boxShadow: '0px 8px 5px rgba(0, 0, 0, 0.2)',
          justifyContent: 'right',
        }}
      >

        <Avatar
            sx={{
              width: '225px',
              height: '225px',
              border: '4px solid white',
              borderRadius: '50%',
              position: 'relative',
              marginTop: '40px',
              marginRight: '40px',
              float:'left',
              display: minimized ? 'none' : 'flex',
            }}
          />
        

        <div style={overlayStyleExpanded}>
          <h1 style={{color: 'white', marginTop: '50px'}}> University of Auckland </h1>
          <div style={{display: 'flex', marginTop: '-40px', color: 'white', fontSize: '14px'}}>
            <h1 style={{marginRight: '15px'}}>21.08.2023</h1>
            <span style={circleDot}></span>
            <h1>Public</h1>
          </div>
          <hr style={{width:'400px', border:' 2px solid #fff', marginRight: '450px',zIndex:900, marginTop: '-10px'}} />
          <div style={{display: 'flex', marginTop: '-20px', color: 'white', fontSize: '14px'}}>
            <h1 style={{marginRight: '15px'}}>7 Members</h1>
            <span style={circleDot}></span>
            <h1>11 Posts</h1>
          </div>
          <div style={{float:'left', marginTop: '-10px'}}><GroupBar></GroupBar></div>
          <br></br>
          <h1 style={{color: 'white', marginTop: '20px', fontSize: '27px'}}> Description </h1>
          <hr style={{width:'400px', border:' 2px solid #fff', marginRight: '450px',zIndex:900, marginTop: '-10px'}} />
          <p style={{fontSize: '15px', color: 'white'}}>The University of Auckland, founded in 1883, is New Zealand's oldest and largest university. Located in Auckland, it is renowned for its academic excellence, diverse programs, and strong international reputation. The university's commitment to research, innovation, and community engagement makes it a leading institution in the region and globally.</p>

          

        </div>

        <div style={overlayStyleMinimized}> 
        <h1 style={{color: 'white', marginTop: '50px'}}> University of Auckland </h1>
          <div style={{display: 'flex', marginTop: '-40px', color: 'white', fontSize: '14px'}}>
            <h1 style={{marginRight: '15px'}}>21.08.2023</h1>
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
        }}>
          
      </div>

    </div>
  );
}

export default GroupDetails;
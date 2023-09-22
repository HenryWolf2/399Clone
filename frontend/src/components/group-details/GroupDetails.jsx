import React, { useState, useEffect } from 'react';
import Banner from '../../assets/images/group-template-banner.jpg';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import '../../assets/styles/global.css';

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
          flexDirection: 'column',
          backgroundColor: '#35CFFF',
          boxShadow: '0px 8px 5px rgba(0, 0, 0, 0.2)',
        }}
      >
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
import React, { useState, useEffect } from 'react';
import Banner from '../../assets/images/group-template-banner.jpg';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

function MinimizableDiv() {
  const [minimized, setMinimized] = useState(false);

  const toggleMinimized = () => {
    setMinimized(!minimized);
  };

  const divStyle = {
    width: minimized ? '250px' : '990px',
    backgroundColor: 'grey', // Use 'backgroundColor' instead of 'backgroundColour'
    height: '1000px'
  };

  const bannerStyle = {
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: `url(${Banner})`,
    borderBottom: '3px solid white',
    backgroundRepeat: '',
    backgroundPosition: 'center left',
    boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.2)',
  };

  const minimizeButton = {
    color:'black',
    width: '100px',
  }

  return (
    <div
      className={`minimizable-div ${minimized ? 'minimized' : ''}`}
      style={divStyle}
    >
        <div style={bannerStyle}></div>

        <div
        style={{
          height: '450px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#35CFFF',
          boxShadow: '0px 8px 5px rgba(0, 0, 0, 0.2)',
        }}
      >

              {!minimized && (
        <button style={minimizeButton} onClick={toggleMinimized}>
          Minimize
        </button>
      )}
      {minimized && (
        <button className="expand-button" onClick={toggleMinimized}>
          Expand
        </button>
      )}

      </div>

    </div>
  );
}

export default MinimizableDiv;
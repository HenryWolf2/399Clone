import React, { useState, useEffect } from 'react';
import Banner from '../../assets/images/template-banner.jpg';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import GroupBar from './GroupBar'

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Update windowSize whenever the window is resized
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      // Remove the resize event listener when the component unmounts
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isWindowWideEnough = windowSize.width >= 1000; // Set your minimum width here

  const containerStyle = {
    position: 'relative',
    height: '900px', // Set a fixed height for the container
    display: 'flex',
    flexDirection: 'column',
  };
  
  const bannerStyle = {
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: `url(${Banner})`,
    borderBottom: '3px solid white',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top left',
    boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.2)',
  };

  // Calculate the position of the overlay based on window size
  const overlayPosition = {

    top: windowSize.width < 1000 ? 100 : 100,
    left: windowSize.width < 1500 ?  100 : 390,
    width: windowSize.width < 1000 ? 600 : 800,

  };

    // Calculate the position of the overlay2 based on window size
  const overlay2Position = {

    top: windowSize.width < 1000 ? 210 : 210,
    left: windowSize.width < 1500 ?  350 : 640,
    width: windowSize.width < 1000 ? 600 : 800,

  };

  const overlayStyle = {
    position: 'absolute',
    width: '900px',
    height: '400px',
    zIndex: 1,
    ...overlayPosition,
  };

  const overlay2Style = {
    position: 'absolute',
    alignItems: 'left',
    width: '400px',
    height: '400px',
    zIndex: 1,
    ...overlay2Position,
  };

  const groupBarDiv = {
    position: 'absolute',
    right: '50px',
    textAlign: 'right',
    width: '350px',
    height: '200px',
    zIndex: 1,
  }

  const headerStyle = {
    fontSize: '40px', // Adjust the font size as needed
    fontWeight: 'bold', // Adjust the font weight as needed
    color: 'black', // Text color
    textAlign: 'left', // Text alignment (centered in this example)
    marginTop: '0px',

  }

  const headerStyle2 = {
    fontSize: '40px', // Adjust the font size as needed
    fontWeight: 'bold', // Adjust the font weight as needed
    color: 'black', // Text color
    marginRight: '55px',
    marginTop: '10px',

  }

  const emailHeader = {
    fontSize: '24px', // Adjust the font size as needed
    fontWeight: 'bold', // Adjust the font weight as needed
    color: 'black', // Text color
    textAlign: 'left', // Text alignment (centered in this example)
    marginTop: '-25px',
  }

  const aboutStyle = {
    fontSize: '16px', // Adjust the font size as needed
    color: 'black', // Text color
    width: '480px',
    marginTop: '20px',
    textAlign: 'justify', // Text alignment (centered in this example)

  }

  return (
    <div style={containerStyle}>

    {/* Banner and Group Bar Elements */}

      <div style={bannerStyle}></div>
      <div
        style={{
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#D9D9D9',
          boxShadow: '0px 8px 5px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div style={groupBarDiv}>
          {isWindowWideEnough && (
            <>
              <h1 style={headerStyle2}> Groups </h1>
              <hr
                style={{
                  width: '200px',
                  border: '2px solid #000',
                  marginTop: '-20px',
                  marginRight: '-15px',
                  marginBottom: '10px',
                }}
              />
              <GroupBar />
            </>
          )}
        </div>
      </div>

                    {/* Overlay Container for Avatar Icon and edit button*/}

      <div style={overlayStyle}>
        <Avatar
          alt="Remy Sharp"
          sx={{
            width: '225px',
            height: '225px',
            border: '4px solid white',
            borderRadius: '50%',
            position: 'absolute',
            marginTop: '10px',
          }}
        />
        <Button sx={{margin:3.5, top:'250px', left: '25px'}} className="custom-button" variant='contained'>Edit Profile</Button>


      </div>

                          {/* Overlay Container Account Details */}

      <div style={overlay2Style}>
        <h1 style={headerStyle}> John Doe </h1>
        <h1 style={emailHeader}> john.doe@gmail.com </h1>
        <hr style={{width:'350px', border:' 2px solid #000', marginRight: '450px'}} />
        <p style={aboutStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ante metus, consequat fringilla dolor eget, auctor tempor nibh. Donec velit odio, viverra at leo quis, ornare blandit augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ante metus, consequat fringilla dolor eget, auctor tempor nibh. Donec velit odio, viverra at leo quis, ornare blandit augue. </p>

      </div>

    </div>
  );
}

export default App;

//<Button sx={{margin:2, top:'250px', left: '25px'}} className="custom-button" variant='contained'>Edit Profile</Button>
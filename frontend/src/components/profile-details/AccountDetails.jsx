import React, { useState, useEffect } from 'react';
import Banner from '../../assets/images/template-banner.jpg';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import GroupBar from './GroupBar'
import instance from '../api/api_instance';
import '../../assets/styles/global.css';

function AccountDetails(props) {
  
  {/* API Integration */}

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    async function GetProfileInformation() {
      try{ 
        await instance ({
          url: "/profile/get",
          method: "GET",
          data: { id: props.id }
          
      }).then((res) => {
        console.log(res)
        setFirstName(res.data.first_name)
        setLastName(res.data.last_name)
        setEmail(res.data.email)
        setDescription(res.data.description)
      });
      } catch(e) {
        console.error(e)
      }
    }
    GetProfileInformation();
    } , // <- function that will run on every dependency update
    [] // <-- empty dependency array
  ) 

  {/* Responsive Design Control */}

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

  /*
  const containerStyle = {
    position: 'relative',
    height: '500px', // Set a fixed height for the container
    display: 'flex',
    flexDirection: 'column',
  };
  */
  
  /*
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
  */

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

  /*
  const groupBarDiv = {
    position: 'absolute',
    right: '50px',
    textAlign: 'right',
    width: '350px',
    height: '200px',
    zIndex: 1,
  }
  */

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
    <div>
    <div className='container-style'>

    {/* Banner and Group Bar Elements */}

        <div className='banner-style'></div>
        <div
          style={{
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#D9D9D9',
            
          }}
        >
          <div className='group-bar-div'>
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
          <h1 style={headerStyle}> { firstName } { lastName } </h1>
          <h1 style={emailHeader}> { email } </h1>
          <hr style={{width:'350px', border:' 2px solid #000', marginRight: '450px'}} />
          <p style={aboutStyle}> { description } </p>

        </div>


    </div> {/* END OF INITIAL CONTAINER*/}

          <div style={{height: '75px', backgroundColor:'#02AEEC', display:'flex'}}>
          <div style={{flex:1, flexDirection: 'row', borderRight: '1px solid grey', height: '100%', boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.2)',}}>
            <h1 style={{textAlign: 'center', color:'white', }}>Personal Data Navigation</h1>
          </div>
          <div style={{flex:1, flexDirection: 'row', height: '100%', boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.2)',}}>
            <h1 style={{textAlign: 'center', color:'white', paddingBottom:'10px'}}>Notepad</h1>
          </div>
        </div>


        <div style={{height: '400px', backgroundColor: 'white'}}>
              <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
              <div style={{ flex: 1, borderRight: '1px solid grey'}}>
                {/* Content for the left div */}

              </div>
              <div style={{ flex: 1}}>
                {/* Content for the right div */}

              </div>
            </div>
        </div>

    </div>
  );
}

export default AccountDetails;

//<Button sx={{margin:2, top:'250px', left: '25px'}} className="custom-button" variant='contained'>Edit Profile</Button>
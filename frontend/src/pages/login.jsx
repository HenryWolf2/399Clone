import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import LoginForm from '../components/login/loginForm';
import RestrictedNavigationBar from '../components/restrictedNavigationBar'
import LoginLanding from '../components/login/loginLanding';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Typography } from '@mui/material';
import MobileOverlay from '../components/MobileOverlay';

import '../assets/styles/global.css';
import { Button } from '@mui/material';

export default function Login() {
  return (
    <div className="container">
      <MobileOverlay />
      <RestrictedNavigationBar/>
      <div className="App">
        <div className='App-header' style={{backgroundAttachment: "fixed"}}>
          <div className="circle-container">
            <div className='White-circle'>
              <h2 style={{ color: '#000000', width: "350px" }}>Login to Mass Spectrometry Hub</h2>
              <LoginForm/>
            </div>
            <div style={{position: "absolute", bottom: "3vh",alignSelf:'center'}}>
              <button className = "scroll-Button" color="white" onClick={() => {
                window.scrollTo({top: window.innerHeight + window.innerHeight / 20, left: 0, behavior: 'smooth'});
                }}
              >
              <Typography color="white" variant="body1">
                Click Here for more Infomation
              </Typography>
              <ArrowDownwardIcon style={{ color: 'white' }} />
            </button>
            </div>
  
          </div>
          <div>
            <div className='White-rectangle'>
              <h2 style={{ color: 'black', width: "500px" }}>What is Mass Spectrometry Hub?</h2>
              <LoginLanding/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
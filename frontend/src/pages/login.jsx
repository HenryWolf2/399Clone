import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import LoginForm from '../components/login/loginForm';
import RestrictedNavigationBar from '../components/restrictedNavigationBar'
import LoginLanding from '../components/login/loginLanding';

import '../assets/styles/global.css';

export default function Login() {
  return (
    <div className="container">
      <RestrictedNavigationBar/>
      <div className="App">
        <div className='App-header' style={{backgroundAttachment: "fixed"}}>
          <div className="circle-container">
            <div className='White-circle'>
              <h2 style={{ color: '#000000', width: "350px" }}>Login to Mass Spectrometry Hub</h2>
              <LoginForm/>
            </div>
            <div style={{position: "absolute", bottom: "3vh",alignSelf:'center'}}>
              <p className="landingText">Scroll for more</p>
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
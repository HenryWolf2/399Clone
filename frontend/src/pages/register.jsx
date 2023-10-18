import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import RegisterForm from '../components/register/registerForm'
import RestrictedNavigationBar from '../components/restrictedNavigationBar'
import MobileOverlay from '../components/MobileOverlay';

export default function Register() {
  return (
    <div className="container">
      <MobileOverlay />
      <RestrictedNavigationBar />
      <div className="App">
        <div className='App-header'>
          <div className='White-circle-register'>
            <h2 style={{ color: '#000000', width: "600px", lineHeight: "1" }}>Register for the Mass Spectrometry Hub</h2>
            <RegisterForm/>
          </div>
        </div>
      </div>
    </div>
  );
}
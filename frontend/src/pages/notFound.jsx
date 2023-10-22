import React from 'react';
import NavigationBar from '../components/NavigationBar';
import MobileOverlay from '../components/MobileOverlay';
import logo from '../assets/images/msh-loading.gif';

import '../assets/styles/global.css';

export default function NotFound() {
  
  return (
    <div className="container">
      <MobileOverlay />
      <NavigationBar />
      <div>
      <div className = 'App-header'>
        <div className='NotFound-popup'>
        <img src={logo} className="Post-logo" alt="logo" />
        <h1 className = 'Overlay-title' style={{marginBottom: 0}}>404: PAGE NOT FOUND</h1>
        <h3 className = 'Post-title'>Please refresh if this is a mistake</h3>
        </div>
        
      </div>
    </div>
    </div>
  );
}

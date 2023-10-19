import React from 'react';
import NavigationBar from '../components/NavigationBar';
import MobileOverlay from '../components/MobileOverlay';
import logo from '../assets/images/LogoMSH_Transparent.png';
import '../assets/styles/global.css';

export default function NotFound() {
  return (
    <div className="container">
      <MobileOverlay />
      <NavigationBar />
      <div style={{ 
      backgroundImage: `url(${logo})`,
      backgroundRepeat: 'round',
      backgroundPosition: 'top left',
      backgroundSize: '30px',
    }}
    className = 'NotFound-background'>
      <div className = 'NotFound-popup'>
        <img src={logo} className="Post-logo" alt="logo" />
        <h1 className = 'Overlay-title'>404: PAGE NOT FOUND</h1>
        
      </div>
    </div>
    </div>
  );
}

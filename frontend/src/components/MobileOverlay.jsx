import React from 'react';
import logo from '../assets/images/msh-loading.gif';

const MobileOverlay = () => {
    return (
        <div className="overlay">
            <div className="Post">
            <h1 className="Overlay-title">Sorry, your screen size size is too small to be supported on this site</h1>
            <img src={logo} className="Too-small" alt="logo" />
            </div>
        </div>
    );
}

export default MobileOverlay;
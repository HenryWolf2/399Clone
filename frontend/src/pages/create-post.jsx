import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import PostForm from '../components/create-post/PostForm';
import LogoTransparent from '../assets/images/LogoMSH_Transparent.png';

export default function CreatePost() {
  return (
    <div className="container">
      <NavigationBar />
      <div className="Post">
        <div className='Post-header'>
          <div className='White-rectangle'>
            <img src={LogoTransparent} className="Post-logo" alt="logo" />
            <h3 className="Post-title">Create your analysis</h3>
            <PostForm/>
          </div>
        </div>
      </div>
    </div>
  );
}
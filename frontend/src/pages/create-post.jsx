import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import PostForm from '../components/create-post/PostForm';

export default function CreatePost() {
  return (
    <div className="container">
      <NavigationBar />
      <div className="Post">
        <div className='Post-header'>
          <div className='White-rectangle'>
            <h2 style={{ color: '#000000', width: "700px" }}>Create Post</h2>
            <PostForm/>
          </div>
        </div>
      </div>
    </div>
  );
}
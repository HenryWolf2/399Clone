import React from 'react';
import NavigationBar from '../components/NavigationBar';
import GroupForm from '../components/create-group/group-form';
import { useState, useEffect } from 'react';
import LogoTransparent from '../assets/images/LogoMSH_Transparent.png';

export default function CreateGroup() {
  return (
    <div className="container">
      <NavigationBar />
      <div className="Post">
        <div className='Post-header'>
          <div className='White-rectangle'>
            <img src={LogoTransparent} className="Post-logo" alt="logo" />
            <h3 className="Post-title">Create Group</h3>
            <GroupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
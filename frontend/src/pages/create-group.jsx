import React from 'react';
import NavigationBar from '../components/NavigationBar';
import GroupForm from '../components/create-group/group-form';
import { useState, useEffect } from 'react';

export default function CreateGroup() {
  return (
    <div className="container">
      <NavigationBar />
      <div className="Post">
        <div className='Post-header'>
          <div className='White-rectangle'>
            <h2 style={{ color: '#000000', width: "700px" }}>Create Group</h2>
            <GroupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
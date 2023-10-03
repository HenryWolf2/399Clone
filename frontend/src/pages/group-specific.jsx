import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import GroupDetails from '../components/group-details/GroupDetails';
import GroupData from '../components/group-details/GroupData';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function GroupSpecific(props) {

  return (
    <div className="container">
      <NavigationBar />
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <GroupDetails group_id={props.group_id}/>
        <GroupData group_id={props.group_id}/>
      </div>
    </div>
  );
}
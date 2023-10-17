import React from 'react';
import { Link, useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import GroupDetails from '../components/group-details/GroupDetails';
import GroupData from '../components/group-details/GroupData';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import MobileOverlay from '../components/MobileOverlay';

export default function GroupSpecific(props) {

  return (
    <div className="container">
      <MobileOverlay />
      <NavigationBar />
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <GroupDetails group_id={props.group_id} />
        <GroupData group_id={props.group_id} />
      </div>
    </div>
  );
}
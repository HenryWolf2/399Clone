import React from 'react';
import { Link, useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import GroupDetails from '../components/group-details/GroupDetails';
import GroupData from '../components/group-details/GroupData';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function GroupSpecific() {

  const {group_id} = useParams();

  return (
    <div className="container">
      <NavigationBar />
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <GroupDetails group_id={group_id} />
        <GroupData group_id={group_id} />
      </div>
    </div>
  );
}
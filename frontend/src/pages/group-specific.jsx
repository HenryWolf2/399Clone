import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import GroupDetails from '../components/group-details/GroupDetails';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Home() {

  return (
    <div className="container">
      <NavigationBar />
      <GroupDetails />
    </div>
  );
}
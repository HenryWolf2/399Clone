import React from 'react';
import { Link } from 'react-router-dom';
import GroupDetails from '../components/group-details/GroupDetails';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Home() {

  return (
    <div className="container">
      <GroupDetails />
      <h1> HOME PAGE </h1>
    </div>
  );
}
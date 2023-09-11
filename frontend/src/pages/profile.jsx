import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import AccountDetails from '../components/profile-details/AccountDetails';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token') == null){
      navigate("/login");
    };
  },)
  return (
    <div className="container">
      <NavigationBar />
      <AccountDetails />
    </div>
  );
}
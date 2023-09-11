import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/profile");;
  },[])
  return (
    <div className="container">
      <NavigationBar />
      <h1> HOME PAGE </h1>
    </div>
  );
}
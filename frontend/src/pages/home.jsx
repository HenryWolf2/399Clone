import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

export default function Home() {
  return (
    <div className="container">
      <NavigationBar></NavigationBar>
      <h1> HOME PAGE </h1>
    </div>
  );
}